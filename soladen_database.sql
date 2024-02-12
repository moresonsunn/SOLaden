DROP DATABASE soladen;
CREATE DATABASE soladen
 CHARACTER SET utf8mb4
 COLLATE utf8mb4_german2_ci
;

USE soladen;

DROP TABLE IF EXISTS nutzer;
DROP TABLE IF EXISTS station;
DROP TABLE IF EXISTS verbauch;


# Tabelle "nutzer" erstellen // nutzer_name /* inner join!!!! */
CREATE TABLE nutzer(
            nutzer_id INTEGER,
            nutzer_name VARCHAR(255),                
            passwort VARCHAR(255),
            PRIMARY KEY(nutzer_id)
            );



# Tabelle "station" erstellen // station_name /* inner join!!!! */
CREATE TABLE station (
            station_id INTEGER AUTO_INCREMENT,
            station_name VARCHAR(255),                  
            station_verbrauch VARCHAR(255),
            station_anmerkung VARCHAR(255),
            PRIMARY KEY(station_id)
            );
            
# Tabelle "verbrauch" erstellen
CREATE TABLE verbrauch (
            verbraucher_id INTEGER AUTO_INCREMENT,
            nutzer_id INTEGER,
            station_id INTEGER,
            verbrauch VARCHAR(255),
            date DATE,
            time TIME,
            PRIMARY KEY(verbraucher_id),
            FOREIGN KEY (station_id) REFERENCES station(station_id),
            FOREIGN KEY (nutzer_id) REFERENCES nutzer(nutzer_id)
            );