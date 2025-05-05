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
window.exports = {};
const apiProducts_1 = require("./lib/apiProducts");
const genComponents_1 = require("./genComponents");
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("DOMContentLoaded products page");
        const data = yield apiProducts_1.apiProducts.getAll();
        function BuildTableRow(DataRow) {
            const row = document.createElement('tr');
            row.setAttribute('data-id', DataRow.id);
            const idCell = document.createElement('td');
            idCell.textContent = DataRow.id;
            const titleCell = document.createElement('td');
            titleCell.textContent = DataRow.category;
            const completedCell = document.createElement('td');
            completedCell.textContent = DataRow.price;
            const action1Cell = document.createElement('td');
            row.appendChild(idCell);
            row.appendChild(titleCell);
            row.appendChild(completedCell);
            row.appendChild(action1Cell);
            let btn = (0, genComponents_1.addButton)("Delete");
            action1Cell.appendChild(btn);
            btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                //let userid = ActiomCell.textContent;
                yield apiProducts_1.apiProducts.deleteById(DataRow.id);
                (0, genComponents_1.deleteTableRow)(row);
                //deleteUser(ActiomCell.textContent).then(function (response) {
                //	deleteTableRow(row)
                //});
            }));
            return row;
        }
        function renderTable(_data) {
            _data = _data.slice(0, 10);
            const tableBody = document.getElementById('data-table-body');
            tableBody.innerHTML = '';
            _data.forEach((item) => {
                let row = BuildTableRow(item);
                tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(row);
            });
        }
        data.subscribe((_data) => {
            console.log(_data);
            renderTable(_data);
        });
    });
});
