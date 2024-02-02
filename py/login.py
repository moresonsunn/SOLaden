import sqlite3

conn = sqlite3.connect('logins.db')

c = conn.cursor()

c.execute('''CREATE TABLE users_login
             (user text, pw text)''')

c.execute("INSERT INTO users_login VALUES ('user1', 'password1')")
c.execute("INSERT INTO users_login VALUES ('user2', 'password2')")
c.execute("INSERT INTO users_login VALUES ('user3', 'password3')")

conn.commit()

conn.close()
