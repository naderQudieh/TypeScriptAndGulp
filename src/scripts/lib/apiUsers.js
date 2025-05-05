"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiUsers = void 0;
window.exports = {};
const rxjs_1 = require("rxjs");
const httpClient_1 = require("./httpClient");
class Api_Users {
    constructor() {
        this.api_base = 'https://jsonplaceholder.typicode.com';
        //await deleteUserById(userid); 
        this.AddUser = (data) => {
            let _url = `${this.api_base}/users/`;
            return httpClient_1.clientApi.addRow(_url, data);
        };
        //await deleteUserById(userid); 
        this.deleteUserById = (user_id) => {
            let _url = `${this.api_base}/users/`;
            return httpClient_1.clientApi.deleteRow(_url, user_id);
        };
        //getUserById1().subscribe(data => { });
        this.getUserById = (user_id) => {
            let _url = `${this.api_base}/users/`;
            const apiCall = () => httpClient_1.clientApi.getRowById(_url, user_id);
            return (0, rxjs_1.defer)(() => (0, rxjs_1.from)(apiCall()));
        };
        //getUsers11().subscribe(data => { });
        this.getUsers = () => {
            let _url = `${this.api_base}/users`;
            return (0, rxjs_1.from)(httpClient_1.clientApi.getRows(_url));
        };
        // this.api_base = url_user ?? this.api_base;
        this.initialize();
    }
    initialize() {
    }
}
var apiUsers = new Api_Users();
exports.apiUsers = apiUsers;
