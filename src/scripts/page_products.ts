window.exports = {};
import { Observable } from "rxjs/internal/Observable";
import { apiProducts } from "./lib/apiProducts";
import { addButton, deleteTableRow } from "./genComponents";

document.addEventListener("DOMContentLoaded", async function () {

	console.log("DOMContentLoaded products page");

	const data: Observable<any[]> = await apiProducts.getAll();
	function BuildTableRow(DataRow: any) {
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
		let btn = addButton("Delete");
		action1Cell.appendChild(btn);
		btn.addEventListener('click', async (e) => {
			//let userid = ActiomCell.textContent;
			await apiProducts.deleteById(DataRow.id);
			deleteTableRow(row);
			//deleteUser(ActiomCell.textContent).then(function (response) {
			//	deleteTableRow(row)
			//});
		})
		return row;
	}

	function renderTable(_data: any) {
		_data = _data.slice(0,10);
		const tableBody = document.getElementById('data-table-body');
		tableBody.innerHTML = '';

		_data.forEach((item: any) => { 
			let row = BuildTableRow(item);
			tableBody?.appendChild(row);
		});
	}


	data.subscribe((_data: any) => {
		console.log(_data);
		renderTable(_data);
	});
});
