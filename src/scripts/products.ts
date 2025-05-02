 

export const getUsers = async () => {
	let api_base = 'https://jsonplaceholder.typicode.com/todos';
	//let url = `${api_base}/users`
	let request = new Request(api_base, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		body: null//JSON.stringify(data),
	});
	const response = await fetch(request);
	if (!response.ok) {
		throw new Error(`HTTP error!  xx status: ${response.status}`);
	}

	return await response.json();
};
 
document.addEventListener("DOMContentLoaded", async function () {

	console.log("DOMContentLoaded products page");
	 
    let data = await getUsers();

	function BuildTableRow(DataRow: any) {
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

	function renderTable(_data:any) {
		data = data.slice(0, 5);
		const tableBody = document.getElementById('data-table-body');
		tableBody.innerHTML = '';

		data.forEach((item: any) => {
			let row = BuildTableRow(item);
			tableBody?.appendChild(row);
		});
	}

	renderTable(data);

});
