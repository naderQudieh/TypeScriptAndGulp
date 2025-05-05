"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiProducts = void 0;
window.exports = {};
const rxjs_1 = require("rxjs");
const httpClient_1 = require("./httpClient");
class Api_Products {
    constructor() {
        this.api_base = 'https://fakestoreapi.com';
        this.getAll = () => {
            let _url = `${this.api_base}/products`;
            return (0, rxjs_1.from)(httpClient_1.clientApi.getRows(_url));
        };
        //await deleteById(userid); 
        this.deleteById = (_id) => {
            let _url = `${this.api_base}/products/`;
            return httpClient_1.clientApi.deleteRow(_url, _id);
        };
        this.initialize();
    }
    initialize() {
    }
}
var apiProducts = new Api_Products();
exports.apiProducts = apiProducts;
