import sqlite3
import time
import pandas as pd
import sqlite3

# Connect to the database
conn = sqlite3.connect('SOLaden.db')
c = conn.cursor()

# Insert a row of data
#c.execute("INSERT INTO verbrauch (nutzer_id, station, verbrauch, date, time) VALUES ('1111','Station 1','1000',?,?)", (time.strftime("23.%m.%Y"),(time.strftime("%H:%M:%S"))))

# Fetch data from the database
query = "SELECT * FROM verbrauch"
df = pd.read_sql_query(query, conn)

# Create an Excel file
excel_file = 'SOLaden_data.xlsx'
df.to_excel(excel_file, index=False)

# Close the connection
conn.close()


# Commit the changes
conn.commit()

# Fetch and print the updated data
c.execute("SELECT * FROM verbrauch WHERE nutzer_id = 1111")
print(c.fetchall())

# Close the connection
conn.close()
