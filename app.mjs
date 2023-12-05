import express from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const itemsPerPage = 10;
let currentPage = 1;

let usernameData = {
    username: '',
    password: ''
};

function openDatabase() {
    const conn = new sqlite3.Database('SOLaden.db');
    return conn;
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.get('/main.js', (req, res) => {
    res.sendFile(path.resolve('src/js/main.js'));
});

app.get('/database', (req, res) => {
    const conn = openDatabase();
    const offset = (currentPage - 1) * itemsPerPage;

    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? LIMIT ? OFFSET ?');
    data.all([usernameData.username, itemsPerPage, offset], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
        data.finalize();
        conn.close();
    });
});

app.get('/database/tagesverbrauch', (req, res) => {
    const conn = openDatabase();
    const date = new Date();

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
    };
    const datum = new Intl.DateTimeFormat('de-DE', options);
    const formatiertesDatum = datum.format(date).replace(/,/g, '');
    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? AND date LIKE ?',[usernameData.username,formatiertesDatum + '%']);
    console.log(formatiertesDatum);
    data.all((err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
        data.finalize();
        conn.close();
    });
});

app.get('/database/wochenverbrauch', (req, res) => {
    const conn = openDatabase();
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 (Sonntag) bis 6 (Samstag)
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1; // Anzahl der Tage bis Montag
    const mondayDate = new Date(currentDate); // Kopie des aktuellen Datums
    mondayDate.setDate(currentDate.getDate() - daysToMonday); // Setzen des Datums auf Montag

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
    };
    const datum = new Intl.DateTimeFormat('de-DE', options);
    const formattedMondayDate = datum.format(mondayDate).replace(/,/g, '');
    const formattedCurrentDate = datum.format(currentDate).replace(/,/g, '');

    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? AND date >= ? AND date <= ?');
    data.all([usernameData.username, formattedMondayDate, formattedCurrentDate], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
        data.finalize();
        conn.close();
    });
});

app.get('/database/monatsverbrauch', (req, res) => {
    const conn = openDatabase();
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // 1 bis 31
    const daysToFirst = currentDay - 1; // Anzahl der Tage bis zum ersten des Monats
    const firstDate = new Date(currentDate); // Kopie des aktuellen Datums
    firstDate.setDate(currentDate.getDate() - daysToFirst); // Setzen des Datums auf den ersten des Monats

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
    };
    const datum = new Intl.DateTimeFormat('de-DE', options);
    const formattedFirstDate = datum.format(firstDate).replace(/,/g, '');
    const formattedCurrentDate = datum.format(currentDate).replace(/,/g, '');

    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? AND date >= ? AND date <= ?');
    data.all([usernameData.username, formattedFirstDate, formattedCurrentDate], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
        data.finalize();
        conn.close();
    });
});

app.get('/database/jahresverbrauch', (req, res) => {
    const conn = openDatabase();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0 (Januar) bis 11 (Dezember)
    const monthsToFirst = currentMonth; // Anzahl der Monate bis zum ersten des Jahres
    const firstDate = new Date(currentDate); // Kopie des aktuellen Datums
    firstDate.setMonth(currentDate.getMonth() - monthsToFirst); // Setzen des Datums auf den ersten des Jahres

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
    };
    const datum = new Intl.DateTimeFormat('de-DE', options);
    const formattedFirstDate = datum.format(firstDate).replace(/,/g, '');
    const formattedCurrentDate = datum.format(currentDate).replace(/,/g, '');

    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? AND date >= ? AND date <= ?');
    data.all([usernameData.username, formattedFirstDate, formattedCurrentDate], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
        data.finalize();
        conn.close();
    });
});

app.get('/database/next', (req, res) => {
    currentPage++;
    res.redirect('/database');
});

app.get('/database/prev', (req, res) => {
    if (currentPage > 1) {
        currentPage--;
    }
    res.redirect('/database');
});

app.post('/login.html', (req, res) => {
    res.sendFile(path.resolve('login.html'));
});

app.post('/ladestation.html', (req, res) => {
    usernameData.username = req.body.username;
    usernameData.password = req.body.password;
    const conn = openDatabase();

    conn.get('SELECT * FROM nutzer WHERE nutzer_id = ? AND passwort = ?', [usernameData.username, usernameData.password], (err, row) => {
        if (err) {
            console.error(err);
        } else if (row) {
            res.sendFile(path.resolve('ladestation.html'));
            console.log(req.body);
        } else {
            res.status(401).send('Unauthorized');
            console.log(req.body);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
