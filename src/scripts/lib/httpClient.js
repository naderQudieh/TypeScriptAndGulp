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
exports.clientApi = void 0;
window.exports = {};
const lib_1 = require("./lib");
const SharedDataService_1 = require("./SharedDataService");
class Client_Api {
    constructor() {
        //promise by defult
        this.getRows = (_url) => __awaiter(this, void 0, void 0, function* () {
            console.log("getRows Client_Api");
            SharedDataService_1.sharedDataService.updateData({ isLoading: true });
            yield (0, lib_1.appDelay)(2000);
            const response = yield fetch(_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            try {
                if (!response.ok) {
                    throw new Error(`Failed to delete to-do: ${response.statusText}`);
                }
                return (yield response.json());
            }
            finally {
                SharedDataService_1.sharedDataService.updateData({ isLoading: false });
                // loadingService.hide();
            }
        });
        this.addRow = (_url, data) => __awaiter(this, void 0, void 0, function* () {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const request = new Request(_url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: headers,
            });
            SharedDataService_1.sharedDataService.updateData({ isLoading: true });
            try {
                const response = yield fetch(request);
                if (!response.ok) {
                    throw new Error(`Failed to add to-do: ${response.statusText}`);
                }
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }
                return yield response.json();
            }
            finally {
                SharedDataService_1.sharedDataService.updateData({ isLoading: false });
                // loadingService.hide();
            }
        });
        this.updateRow = (_url, todo) => __awaiter(this, void 0, void 0, function* () {
            SharedDataService_1.sharedDataService.updateData({ isLoading: true });
            const response = yield fetch(`${_url}/${todo.id}`, {
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
                return yield response.json();
            }
            finally {
                SharedDataService_1.sharedDataService.updateData({ isLoading: false });
                // loadingService.hide();
            }
        });
        this.deleteRow = (_url, id) => __awaiter(this, void 0, void 0, function* () {
            SharedDataService_1.sharedDataService.updateData({ isLoading: true });
            //await appDelay(2000)
            const response = yield fetch(`${_url}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            try {
                if (!response.ok) {
                    throw new Error(`Failed to delete to-do: ${response.statusText}`);
                }
                return yield response.json();
            }
            finally {
                SharedDataService_1.sharedDataService.updateData({ isLoading: false });
                // loadingService.hide();
            }
        });
        this.getRowById = (_url, id) => __awaiter(this, void 0, void 0, function* () {
            SharedDataService_1.sharedDataService.updateData({ isLoading: true });
            try {
                const response = yield fetch(`${_url}/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete to-do: ${response.statusText}`);
                }
                return (yield response.json());
            }
            finally {
                SharedDataService_1.sharedDataService.updateData({ isLoading: false });
                // loadingService.hide();
            }
        });
        console.log("constructor Client_Api");
    }
}
const clientApi = new Client_Api();
exports.clientApi = clientApi;
