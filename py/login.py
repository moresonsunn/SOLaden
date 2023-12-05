
import sqlite3

# Verbindung zur Datenbank herstellen
conn = sqlite3.connect('logins.db')

# Cursor-Objekt erstellen
c = conn.cursor()

# Tabelle erstellen
c.execute('''CREATE TABLE users_login
             (user text, pw text)''')

# Daten in die Tabelle einfügen
c.execute("INSERT INTO users_login VALUES ('user1', 'password1')")
c.execute("INSERT INTO users_login VALUES ('user2', 'password2')")
c.execute("INSERT INTO users_login VALUES ('user3', 'password3')")

# Änderungen speichern
conn.commit()

# Verbindung zur Datenbank beenden
conn.close()
