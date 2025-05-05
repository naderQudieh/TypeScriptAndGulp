window.exports = {};
import { appDelay } from "./lib"
import { interval } from "rxjs/internal/observable/interval";
import { debounce } from "rxjs/internal/operators/debounce";
import { delay } from "rxjs/internal/operators/delay";
import { timer, of, map, concatMap, throwError } from "rxjs";
import { from as rxFrom, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { sharedDataService } from "./SharedDataService";
  
interface ApiResponse<T> {
	data: T;
	status: number;
	statusText: string;
}

// Define error type
interface ApiError {
	message: string;
	status?: number;
	data?: unknown;
}

// Define loader service configuration
interface LoaderServiceConfig {
	baseURL: string;
	timeout?: number;
	headers?: HeadersInit;
}
class Client_Api {
	 
	constructor() {
		console.log("constructor Client_Api");
	} 

	//promise by defult
	getRows = async<T>(_url: string) => {
		console.log("getRows Client_Api" );
		sharedDataService.updateData({ isLoading: true });
		await appDelay(2000)
		const response = await fetch(_url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		try {
			if (!response.ok) {
				throw new Error(`Failed to delete to-do: ${response.statusText}`);
			}
			return (await response.json()) as T[];
		} finally {
			 sharedDataService.updateData({ isLoading: false });
			// loadingService.hide();
		}
	
	};




	addRow = async<T>(_url: string, data?: any) => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		const request = new Request(_url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: headers,
		});
		sharedDataService.updateData({ isLoading: true });
		try {
			const response = await fetch(request);
			if (!response.ok) {
				throw new Error(`Failed to add to-do: ${response.statusText}`);
			}
			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				throw new TypeError("Oops, we haven't got JSON!");
			}
			return await response.json();
		} finally {
			sharedDataService.updateData({ isLoading: false });
			// loadingService.hide();
		}

		
	}

	updateRow = async<T>(_url: string, todo?: any) => {
		sharedDataService.updateData({ isLoading: true });
		const response = await fetch(`${_url}/${todo.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todo),
		});
		try {
			if (!response.ok) {
				throw new Error(`Failed to update to-do: ${response.statusText}`);
			}
			return await response.json();
		} finally {
			sharedDataService.updateData({ isLoading: false });
			// loadingService.hide();
		}

		
	};

	deleteRow = async<T>(_url: string, id?: any) => {
		sharedDataService.updateData({ isLoading: true });
		//await appDelay(2000)
		const response = await fetch(`${_url}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		try {
			if (!response.ok) {
				throw new Error(`Failed to delete to-do: ${response.statusText}`);
			}
			return await response.json();
		} finally {
			sharedDataService.updateData({ isLoading: false });
			// loadingService.hide();
		}
		
	};




	getRowById = async<T>(_url: string, id?: any) => {
		sharedDataService.updateData({ isLoading: true });
		try {
			const response = await fetch(`${_url}/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`Failed to delete to-do: ${response.statusText}`);
			}
			return (await response.json()) as T[];
		} finally {
			sharedDataService.updateData({ isLoading: false });
			// loadingService.hide();
		}
		
	}
}
const clientApi = new Client_Api();

 
export { clientApi };