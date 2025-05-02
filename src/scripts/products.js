"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let api_base = 'https://jsonplaceholder.typicode.com/todos';
    //let url = `${api_base}/users`
    let request = new Request(api_base, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null //JSON.stringify(data),
    });
    const response = yield fetch(request);
    if (!response.ok) {
        throw new Error(`HTTP error!  xx status: ${response.status}`);
    }
    return yield response.json();
});
exports.getUsers = getUsers;
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("DOMContentLoaded products page");
        let data = yield (0, exports.getUsers)();
        function BuildTableRow(DataRow) {
            const row = document.createElement('tr');
            row.setAttribute('data-id', DataRow.userId);
            const idCell = document.createElement('td');
            idCell.textContent = DataRow.userId;
            const titleCell = document.createElement('td');
            titleCell.textContent = DataRow.title;
            const completedCell = document.createElement('td');
            completedCell.textContent = DataRow.completed;
            row.appendChild(idCell);
            row.appendChild(titleCell);
            row.appendChild(completedCell);
            return row;
        }
        function renderTable(_data) {
            data = data.slice(0, 5);
            const tableBody = document.getElementById('data-table-body');
            tableBody.innerHTML = '';
            data.forEach((item) => {
                let row = BuildTableRow(item);
                tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(row);
            });
        }
        renderTable(data);
    });
});
//# sourceMappingURL=products.js.map