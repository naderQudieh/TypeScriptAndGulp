window.exports = {};
import { defer, from } from "rxjs";
import { clientApi } from "./httpClient";
 
class Api_Products {
     api_base = 'https://fakestoreapi.com';
    constructor() {
        this.initialize();
    }

    initialize() {

    }
    getAll = () => {
        let _url = `${this.api_base}/products`
        return from(clientApi.getRows(_url));
    }
    //await deleteById(userid); 
    deleteById = (_id: any) => {
        let _url = `${this.api_base}/products/`;
        return clientApi.deleteRow(_url,_id);
    }
}
var apiProducts = new Api_Products();
export { apiProducts };