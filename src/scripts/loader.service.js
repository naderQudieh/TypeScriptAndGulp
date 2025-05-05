"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class HttpService {
    constructor(baseURL, timeout) {
        this.timeout = 5000;
        this.loadingSubject = new rxjs_1.Subject();
        this.errorSubject = new rxjs_1.Subject();
        // Public observables for external subscriptions
        this.loading$ = this.loadingSubject.asObservable();
        this.error$ = this.errorSubject.asObservable();
        this.baseURL = baseURL;
        this.timeout = timeout;
    }
    request(endpoint, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);
            try {
                this.loadingSubject.next(true);
                this.errorSubject.next(null);
                const response = yield fetch(`${this.baseURL}${endpoint}`, Object.assign(Object.assign({}, config), { signal: controller.signal }));
                clearTimeout(timeoutId);
                if (!response.ok) {
                    const errorData = yield response.json().catch(() => ({}));
                    throw {
                        message: `HTTP error ${response.status}`,
                        status: response.status,
                        data: errorData
                    };
                }
                const data = yield response.json();
                return {
                    data,
                    status: response.status,
                    statusText: response.statusText
                };
            }
            catch (err) {
                clearTimeout(timeoutId);
                const error = this.normalizeError(err);
                this.errorSubject.next(error);
                throw error;
            }
            finally {
                this.loadingSubject.next(false);
            }
        });
    }
    normalizeError(error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            return { message: `Request timed out after ${this.timeout}ms` };
        }
        return error;
    }
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    }
}
class App {
    constructor() {
        this.dataService = new HttpService('https://jsonplaceholder.typicode.com');
        this.subscriptions = new rxjs_1.Subscription();
        this.setupUI();
        this.setupSubscriptions();
    }
    setupUI() {
        var _a, _b;
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
        (_a = document.getElementById('load')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.loadData());
        (_b = document.getElementById('create')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.createTodo());
    }
    setupSubscriptions() {
        const loadingElement = document.getElementById('loading');
        const errorElement = document.getElementById('error');
        // Subscribe to loading state
        this.subscriptions.add(this.dataService.loading$.subscribe(isLoading => {
            loadingElement.style.display = isLoading ? 'block' : 'none';
        }));
        // Subscribe to errors
        this.subscriptions.add(this.dataService.error$.subscribe(error => {
            if (error) {
                errorElement.textContent = `Error: ${error.message}`;
                errorElement.style.display = 'block';
            }
            else {
                errorElement.style.display = 'none';
            }
        }));
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.dataService.get('/todos');
                this.updateOutput(response.data);
            }
            catch (error) {
                console.error('Loading failed:', error);
            }
        });
    }
    createTodo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTodo = { title: 'New Todo', completed: false };
                const response = yield this.dataService.post('/todos', newTodo);
                this.addTodoToList(response.data);
            }
            catch (error) {
                console.error('Creation failed:', error);
            }
        });
    }
    updateOutput(items) {
        const output = document.getElementById('output');
        output.innerHTML = items
            .slice(0, 5)
            .map(item => `<li>${item.title} (${item.completed ? '✓' : '×'})</li>`)
            .join('');
    }
    addTodoToList(item) {
        const output = document.getElementById('output');
        const listItem = document.createElement('li');
        listItem.textContent = `Created: ${item.title} (ID: ${item.id})`;
        listItem.style.color = 'green';
        output.prepend(listItem);
    }
    destroy() {
        this.subscriptions.unsubscribe();
    }
}
// Initialize and cleanup
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    // Example cleanup on unload
    window.addEventListener('beforeunload', () => app.destroy());
});
