"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingComponentX = void 0;
exports.addButton = addButton;
exports.deleteTableRow = deleteTableRow;
window.exports = {};
const lib_1 = require("./lib/lib");
class LoadingComponentX {
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
exports.LoadingComponentX = LoadingComponentX;
function addButton(text, onClick) {
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
function deleteTableRow(row) {
    let timeoutId;
    row.classList.add('boxfadeOut');
    (0, lib_1.appDelay)(300).then(function (data) {
        row.classList.add('fade-out');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            row.remove();
        }, 100);
    });
    ;
}
