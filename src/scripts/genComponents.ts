window.exports = {};
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { GlobalParams, appDelay } from "./lib/lib";
export class LoadingComponentX {
    private loadingElement?: HTMLElement;
    private subscription: Subscription;

    constructor() {

          //this.subscription = loadingService.loading$.subscribe((isLoading: any) => {
          //  let that = GlobalParams.getLoadingElement() || undefined;


          //  if (isLoading && that) {
          //      if (GlobalParams.getModalLoading()) {
          //          (GlobalParams.getLoadingContainer() as HTMLDivElement).className = "loading-modal";
          //          that.className = "loader"
          //      } else {
          //          that.className = "loader"
          //      }

          //  } else {
          //      (GlobalParams.getLoadingContainer() as HTMLDivElement).className = "";
          //      (GlobalParams.getLoadingElement() as HTMLDivElement).className = "";
          //  }

        //});
    }

    destroy() {
        this.subscription.unsubscribe();
    }
}

export function addButton(text: string, onClick?: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = "button";
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.textContent = text;
    if (onClick) {
        button.addEventListener('click', onClick);
    }  
    return button;
}

export function deleteTableRow(row: HTMLTableRowElement) {
    let timeoutId: string | number | NodeJS.Timeout;
    row.classList.add('boxfadeOut');
    appDelay(300).then(function (data) {
        row.classList.add('fade-out');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            row.remove();
        }, 100);
    });;
}