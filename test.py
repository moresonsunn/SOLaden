import sqlite3
from datetime import datetime

connect = sqlite3.connect("SOLaden.db")
c = connect.cursor()

# Tabellen lÃ¶schen, falls sie bereits existieren
c.execute("""DROP TABLE IF EXISTS nutzer""")
c.execute("""DROP TABLE IF EXISTS verbrauch""")
c.execute("""DROP TABLE IF EXISTS station""")

# Tabelle "nutzer" erstellen // nutzer_name /* inner join!!!! */
c.execute("""CREATE TABLE nutzer(
            nutzer_id INTEGER PRIMARY KEY,
            nutzer_name TEXT,                
            passwort TEXT
            )""")



# Tabelle "station" erstellen // station_name /* inner join!!!! */
c.execute("""CREATE TABLE station (
            station_id INTEGER PRIMARY KEY AUTOINCREMENT,
            station_name TEXT,                  
            station_verbrauch TEXT,
            station_anmerkung TEXT
            )""")

# Tabelle "verbrauch" erstellen
c.execute("""CREATE TABLE verbrauch (
            verbraucher_id INTEGER PRIMARY KEY AUTOINCREMENT,
            nutzer_id INTEGER,
            station_id INTEGER,
            verbrauch TEXT,
            date DATE,
            time TIME,
            FOREIGN KEY (station_id) REFERENCES station(station_id),
            FOREIGN KEY (nutzer_id) REFERENCES nutzer(nutzer_id)
            )""")


connect.commit()
connect.close()