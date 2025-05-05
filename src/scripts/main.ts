window.exports = {};
import { Observable, Subscription } from "rxjs";
import { apiUsers } from "./lib/apiUsers";



document.addEventListener('DOMContentLoaded', async () => { 
    const data: Observable<any[]> = await apiUsers.getUsers();
    data.subscribe((_data: any) => {
        console.log("DOMContentLoaded",_data); 
    });

});

