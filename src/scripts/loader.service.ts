import { Subscription, Subject } from "rxjs";
 

// loader.service.ts
interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

interface ApiError {
    message: string;
    status?: number;
    data?: unknown;
}

class HttpService {
    private baseURL: string;
    private timeout: number = 5000;
    private loadingSubject = new Subject<boolean>();
    private errorSubject = new Subject<ApiError | null>();

    // Public observables for external subscriptions
    public loading$ = this.loadingSubject.asObservable();
    public error$ = this.errorSubject.asObservable();

    constructor(baseURL: string, timeout?: number) {
        this.baseURL = baseURL;
        this.timeout = timeout;
    }

    private async request<T>(endpoint: string, config: RequestInit): Promise<ApiResponse<T>> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            this.loadingSubject.next(true);
            this.errorSubject.next(null);

            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...config,
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw {
                    message: `HTTP error ${response.status}`,
                    status: response.status,
                    data: errorData
                } as ApiError;
            }

            const data: T = await response.json();
            return {
                data,
                status: response.status,
                statusText: response.statusText
            };
        } catch (err) {
            clearTimeout(timeoutId);
            const error = this.normalizeError(err);
            this.errorSubject.next(error);
            throw error;
        } finally {
            this.loadingSubject.next(false);
        }
    }

    private normalizeError(error: unknown): ApiError {
        if (error instanceof DOMException && error.name === 'AbortError') {
            return { message: `Request timed out after ${this.timeout}ms` };
        }
        return error as ApiError;
    }

    public get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    public delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    public post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    }
}

// app.ts
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

class App {
    private dataService = new HttpService('https://jsonplaceholder.typicode.com');
    private subscriptions = new Subscription();

    constructor() {
        this.setupUI();
        this.setupSubscriptions();
    }

    private setupUI() {
        document.body.innerHTML = `
      <div>
        <h1>Observable Loader Example</h1>
        <button id="load">Load Data</button>
        <button id="create">Create Todo</button>
        <div id="loading" style="display: none;">Loading...</div>
        <div id="error" style="color: red; display: none;"></div>
        <ul id="output"></ul>
      </div>
    `;

        document.getElementById('load')?.addEventListener('click', () => this.loadData());
        document.getElementById('create')?.addEventListener('click', () => this.createTodo());
    }

    private setupSubscriptions() {
        const loadingElement = document.getElementById('loading')!;
        const errorElement = document.getElementById('error')!;

        // Subscribe to loading state
        this.subscriptions.add(
            this.dataService.loading$.subscribe(isLoading => {
                loadingElement.style.display = isLoading ? 'block' : 'none';
            })
        );

        // Subscribe to errors
        this.subscriptions.add(
            this.dataService.error$.subscribe(error => {
                if (error) {
                    errorElement.textContent = `Error: ${error.message}`;
                    errorElement.style.display = 'block';
                } else {
                    errorElement.style.display = 'none';
                }
            })
        );
    }

    private async loadData() {
        try {
            const response = await this.dataService.get<Todo[]>('/todos');
            this.updateOutput(response.data);
        } catch (error) {
            console.error('Loading failed:', error);
        }
    }

    private async createTodo() {
        try {
            const newTodo = { title: 'New Todo', completed: false };
            const response = await this.dataService.post<Todo>('/todos', newTodo);
            this.addTodoToList(response.data);
        } catch (error) {
            console.error('Creation failed:', error);
        }
    }

    private updateOutput(items: Todo[]) {
        const output = document.getElementById('output')!;
        output.innerHTML = items
            .slice(0, 5)
            .map(item => `<li>${item.title} (${item.completed ? '✓' : '×'})</li>`)
            .join('');
    }

    private addTodoToList(item: Todo) {
        const output = document.getElementById('output')!;
        const listItem = document.createElement('li');
        listItem.textContent = `Created: ${item.title} (ID: ${item.id})`;
        listItem.style.color = 'green';
        output.prepend(listItem);
    }

    public destroy() {
        this.subscriptions.unsubscribe();
    }
}

// Initialize and cleanup
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();

    // Example cleanup on unload
    window.addEventListener('beforeunload', () => app.destroy());
});