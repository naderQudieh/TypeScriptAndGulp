 
 
 
class App { 
    clickCount =0 
    constructor() {
        this.clickCount = 0;
        this.initialize();
    }
    initialize() {
        const button = document.getElementById('clickMe');
        const output = document.getElementById('output');
        button.addEventListener('click', () => {
            this.clickCount++;
            output.textContent = `Button clicked ${this.clickCount} times`;
        });
    }
}
// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded index page");
    new App();
});
 