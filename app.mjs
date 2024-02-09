import express from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 5000;
const ip = 'localhost';

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const itemsPerPage = 10;
let currentPage = 1;

let usernameData = {
    username: '',
    password: ''
};
function ersterTagDerWoche() {
    // Aktuelles Datum erhalten
    var heute = new Date();

    // Den Wochentag des aktuellen Datums erhalten (0 = Sonntag, 1 = Montag, ..., 6 = Samstag)
    var wochentag = heute.getDay() - 1;
8
    // Den Zeitpunkt auf den ersten Tag der aktuellen Woche setzen
    var ersterTag = new Date(heute);
    ersterTag.setDate(heute.getDate() - wochentag);

    // Das Datum im gewünschten Format erstellen (TT.MM.JJJJ)
    var tag = ersterTag.getDate();
    var monat = ersterTag.getMonth() + 1; // Monate sind nullbasiert
    var jahr = ersterTag.getFullYear();

    // Führende Nullen hinzufügen, wenn nötig
    tag = tag < 10 ? "0" + tag : tag;
    monat = monat < 10 ? "0" + monat : monat;

    // Das Datum im Format "TT.MM.JJJJ" zurückgeben
    return tag + "." + monat + "." + jahr;
}

// Beispielaufruf
console.log(ersterTagDerWoche()); //erster tag in der woche !!!!

function letzterTagDerWoche() {
    // Aktuelles Datum erhalten
    var heute = new Date();

    // Den Wochentag des aktuellen Datums erhalten (0 = Sonntag, 1 = Montag, ..., 6 = Samstag)
    var wochentag = heute.getDay() - 1;

    // Den Zeitpunkt auf den letzten Tag der aktuellen Woche setzen
    var letzterTag = new Date(heute);
    letzterTag.setDate(heute.getDate() + (6 - wochentag));

    // Das Datum im gewünschten Format erstellen (TT.MM.JJJJ)
    var tag = letzterTag.getDate();
    var monat = letzterTag.getMonth() + 1; // Monate sind nullbasiert
    var jahr = letzterTag.getFullYear();

    // Führende Nullen hinzufügen, wenn nötig
    tag = tag < 10 ? "0" + tag : tag;
    monat = monat < 10 ? "0" + monat : monat;

    // Das Datum im Format "TT.MM.JJJJ" zurückgeben
    return tag + "." + monat + "." + jahr;
}

function aktuellerMonatAlsZahl() {
    // Aktuelles Datum erstellen
    var aktuellesDatum = new Date();
  
    // Monat extrahieren (0-basiert, daher +1)
    var aktuellerMonat = aktuellesDatum.getMonth() + 1;
  
    // Variable zurückgeben
    return aktuellerMonat;
}
function aktuellesJahrAlsZahl() {
    // Aktuelles Datum erstellen
    var aktuellesDatum = new Date();
  
    // Monat extrahieren (0-basiert, daher +1)
    var aktuellesJahr = aktuellesDatum.getFullYear();
  
    // Variable zurückgeben
    return aktuellesJahr;
}

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

app.post('/login.html', (req, res) => {
    res.sendFile(path.resolve('login.html'));
});

app.get('/src/css/index.css', (req, res) => {
    res.sendFile(path.resolve('src/css/index.css'), { cacheControl: true });
});

app.get('/src/css/ladestation.css', (req, res) => {
    res.sendFile(path.resolve('src/css/ladestation.css'), { cacheControl: true });
});

app.get('/src/css/adminpanel.css', (req, res) => {
    res.sendFile(path.resolve('src/css/adminpanel.css'), { cacheControl: true });
});

app.get('/src/css/login.css', (req, res) => {
    res.sendFile(path.resolve('src/css/login.css'), { cacheControl: true });
});

app.post('/ladestation.html', (req, res) => {
    usernameData.username = req.body.username;
    usernameData.password = req.body.password;
    const conn = openDatabase();

    conn.get('SELECT * FROM nutzer WHERE nutzer_id = ? AND passwort = ?', [usernameData.username, usernameData.password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else if (row) {
            if (usernameData.username === '0000') {
                res.sendFile(path.resolve('adminpanel.html'));
            } else {
                res.sendFile(path.resolve('ladestation.html'));
            }
            console.log(req.body);
        } else {
            res.status(401).send('Unauthorized');
            console.log(req.body);
        }
    });
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

app.get('/nutzer', (req, res) => {
    const conn = openDatabase();
    const offset = (currentPage - 1) * itemsPerPage;

    const data = conn.prepare('SELECT * FROM nutzer LIMIT ? OFFSET ?');
    data.all([itemsPerPage, offset], (err, rows) => {
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
    const offset = (currentPage - 1) * itemsPerPage;

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
    };
    const datum = new Intl.DateTimeFormat('de-DE', options);
    const formatiertesDatum = datum.format(date).replace(/,/g, '');
    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? AND date = ? LIMIT ? OFFSET ?',[usernameData.username,formatiertesDatum, itemsPerPage, offset]);
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
    var ergebnisAlsZahl = aktuellerMonatAlsZahl();
    var ergebnisAlsZahl2 = aktuellesJahrAlsZahl();
    const date = "%."+ergebnisAlsZahl+"."+ergebnisAlsZahl2;
    var ergebnisAlsZahl = aktuellesJahrAlsZahl();
    const date2 = "%."+ergebnisAlsZahl;
    const offset = (currentPage - 1) * itemsPerPage;

    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? AND date LIKE ? AND date LIKE ? AND date BETWEEN ? AND ? ORDER BY date DESC LIMIT ? OFFSET ?');
    data.all([usernameData.username, date,date2, ersterTagDerWoche(),letzterTagDerWoche(),itemsPerPage,offset], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            res.json(rows);
        }
        data.finalize();
        conn.close();
    });
});

app.get('/database/monatsverbrauch', (req, res) => {
    const conn = openDatabase();    
    var ergebnisAlsZahl = aktuellerMonatAlsZahl();
    var ergebnisAlsZahl2 = aktuellesJahrAlsZahl();
    const date = "%."+ergebnisAlsZahl+"."+ergebnisAlsZahl2;
    const offset = (currentPage - 1) * itemsPerPage;

    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? AND date Like ? ORDER BY date DESC LIMIT ? OFFSET ?');
    
    data.all([usernameData.username,date,itemsPerPage,offset], (err, rows) => {
        console.log(date);
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
    var ergebnisAlsZahl = aktuellesJahrAlsZahl();
    const date = "%."+ergebnisAlsZahl;
    const offset = (currentPage - 1) * itemsPerPage;

    const data = conn.prepare('SELECT * FROM verbrauch WHERE nutzer_id = ? AND date LIKE ? ORDER BY date DESC LIMIT ? OFFSET ?');
    data.all([usernameData.username, date,itemsPerPage,offset], (err, rows) => {
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

app.listen(port, () => {
    console.log(`Server running at http://${ip}:${port}/`);
});
