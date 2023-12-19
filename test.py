import sqlite3
import time

# Connect to the database
conn = sqlite3.connect('SOLaden.db')
c = conn.cursor()

# Insert a row of data
c.execute("INSERT INTO verbrauch (nutzer_id, station, verbrauch, date, time) VALUES ('1111','Station 1','1000',?,?)", (time.strftime("23.%m.%Y"),(time.strftime("%H:%M:%S"))))


# Commit the changes
conn.commit()

# Fetch and print the updated data
c.execute("SELECT * FROM verbrauch WHERE nutzer_id = 1111")
print(c.fetchall())

# Close the connection
conn.close()
