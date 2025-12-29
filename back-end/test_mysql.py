import mysql.connector
from config import config

print("Attempting connection...")

db = mysql.connector.connect(
    **config,
    connection_timeout=5
)

print("CONNECTED")

db.close()
