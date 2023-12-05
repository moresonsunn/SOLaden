const dataButton = document.getElementById('dataButton');
dataButton.addEventListener('click', import_and_execute);
const url = 'http://127.0.0.1:3000/database';

async function get_data(url) {
    return await fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error(error);
        });
}

async function import_and_execute() {
    const data = await get_data(url);
    console.log(data);

    // Display the data in the table
    const table = document.getElementById('table-container');
    table.innerHTML = '';
    for (const row of data) {
        const tr = document.createElement('tr');
        for (const cell of row) {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}
