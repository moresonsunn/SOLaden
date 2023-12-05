const dataButton = document.getElementById('dataButton');
const url = 'http://127.0.0.1:5000/login';

async function get_data(url) {
    return await fetch(url, {
        method: 'POST',
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
