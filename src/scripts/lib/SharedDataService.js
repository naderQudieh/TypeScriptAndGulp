"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingService = exports.sharedDataService = void 0;
const rxjs_1 = require("rxjs");
class Shared_DataService {
    constructor() {
        this.dataSubject = new rxjs_1.Subject();
        this.data$ = this.dataSubject.asObservable();
    }
    updateData(data) {
        //console.log('updateData:', data);
        this.dataSubject.next(data);
    }
}
class Loading_Service {
    constructor(sharedService) {
        this.loadingContainer = document.getElementById('loading-indicator');
        if (this.loadingContainer) {
            this.loadingElement = this.loadingContainer.children[0];
            this.errorElement = document.getElementById('error');
        }
        sharedService.data$.subscribe(data => {
            if (data.isLoading) {
                this.show();
            }
            else {
                this.hide();
            }
        });
    }
    show() {
        if (!this.loadingContainer) {
            this.loadingContainer = document.getElementById('loading-indicator');
            this.loadingElement = this.loadingContainer.children[0];
            this.errorElement = document.getElementById('error');
        }
        this.loadingElement.className = "loader";
    }
    hide() {
        this.loadingElement.className = "";
    }
}
const sharedDataService = new Shared_DataService();
exports.sharedDataService = sharedDataService;
const loadingService = new Loading_Service(sharedDataService);
exports.loadingService = loadingService;
