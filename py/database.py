import sqlite3

class Database:
    def __init__(self, host, user, password, db_name):
        self.host = host
        self.user = user
        self.password = password
        self.db_name = db_name
        self.connection = sqlite3.connect(self.db_name)
        self.cursor = self.connection.cursor()
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL
        );
        """)
        self.connection.commit()
    
    def insert(self, name, description):
        self.cursor.execute(f"""
        INSERT INTO users (name, description)
        VALUES ('{name}', '{description}');
        """)
        self.connection.commit()
    
    def select(self):
        self.cursor.execute("""
        SELECT * FROM users;
        """)
        return self.cursor.fetchall()
    
    def select_by_id(self, id):
        self.cursor.execute(f"""
        SELECT * FROM users WHERE id = {id};
        """)
        return self.cursor.fetchone()
    
    def update(self, id, name, description):
        self.cursor.execute(f"""
        UPDATE users SET name = '{name}', description = '{description}' WHERE id = {id};
        """)
        self.connection.commit()
    
    def delete(self, id):
        self.cursor.execute(f"""
        DELETE FROM users WHERE id = {id};
        """)
        self.connection.commit()

start = Database(1, 1, 1, 'database.db')

print(start.select())
print(start.select_by_id(1))
