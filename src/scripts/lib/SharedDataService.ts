import { Subject } from "rxjs";



type sharedData = {
    isLoading?: boolean;
    message?: string;
}
class Shared_DataService {
    public dataSubject = new Subject<sharedData>();
    public data$ = this.dataSubject.asObservable();

    updateData(data: sharedData) {
        //console.log('updateData:', data);
        this.dataSubject.next(data);
    }
}


class Loading_Service {
    public loadingContainer;
    public loadingElement;
    public errorElement;
    constructor(sharedService: Shared_DataService) {
         this.loadingContainer = document.getElementById('loading-indicator')!;
         if (this.loadingContainer) {
             this.loadingElement = this.loadingContainer.children[0] as HTMLElement;
             this.errorElement = document.getElementById('error')!;
         }
        

        sharedService.data$.subscribe(data => { 
            if (data.isLoading) {
                this.show();
            } else {
                this.hide();
            }
        })

    }

    show() {
        if (!this.loadingContainer) {
            this.loadingContainer = document.getElementById('loading-indicator')!;
            this.loadingElement = this.loadingContainer.children[0] as HTMLElement;
            this.errorElement = document.getElementById('error')!;
        }
        this.loadingElement.className = "loader";
    }
    hide() {
        this.loadingElement.className = "";
    }
}

const sharedDataService = new Shared_DataService();
const loadingService = new Loading_Service(sharedDataService); 
export { sharedDataService, loadingService };

 