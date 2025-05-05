"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalParams = void 0;
exports.appDelay = appDelay;
exports.splitFullName = splitFullName;
exports.getFullName = getFullName;
window.exports = {};
function appDelay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
//export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
function splitFullName(fullName) {
    if (!fullName) {
        return null;
    }
    const names = fullName.trim().split(" ");
    if (names.length === 0) {
        return null;
    }
    if (names.length === 1) {
        return {
            firstName: names[0],
            lastName: ""
        };
    }
    const firstName = names[0];
    const lastName = names.slice(1).join(" ");
    return {
        firstName,
        lastName
    };
}
function getFullName(firstName, lastName) {
    if (!firstName && !lastName) {
        return null;
    }
    if (!firstName) {
        return lastName;
    }
    if (!lastName) {
        return firstName;
    }
    return `${firstName} ${lastName}`;
}
class GlobalParams {
    constructor() {
    }
    static initialize() {
        var _a, _b;
        this.useModalLoading = false;
        GlobalParams.loadingContainer = (_a = document.getElementById('loading-indicator')) !== null && _a !== void 0 ? _a : undefined;
        console.log(GlobalParams.loadingContainer);
        GlobalParams.loadingElement = (_b = GlobalParams.loadingContainer) === null || _b === void 0 ? void 0 : _b.children[0];
    }
    static setModalLoading() {
        this.useModalLoading = true;
    }
    static getModalLoading() {
        return this.useModalLoading;
    }
    static getLoadingContainer() {
        return this.loadingContainer;
    }
    static getLoadingElement() {
        return this.loadingElement;
    }
}
exports.GlobalParams = GlobalParams;
GlobalParams.useModalLoading = false;
