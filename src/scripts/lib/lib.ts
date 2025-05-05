window.exports = {};
import { BehaviorSubject, Observable } from "rxjs";

export function appDelay(milliseconds:any) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
//export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export function splitFullName(fullName: any) {
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
export function getFullName(firstName: any, lastName: any) {
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

export class GlobalParams {

    private static useModalLoading: boolean = false;
    private static loadingElement: HTMLElement | undefined;
    private static loadingContainer: HTMLElement | undefined;

    private constructor() {

    }

    static initialize(): void {
        this.useModalLoading = false;
        GlobalParams.loadingContainer = document.getElementById('loading-indicator') ?? undefined;
        console.log(GlobalParams.loadingContainer);
        GlobalParams.loadingElement = GlobalParams.loadingContainer?.children[0] as HTMLElement;
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

