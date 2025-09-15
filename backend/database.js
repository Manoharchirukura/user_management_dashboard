// backend/database.js
const sqlite3 = require('sqlite3').verbose();

// Connect to a database file. If the file does not exist, it will be created.
const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        // SQL statement to create the users table
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                phone TEXT,
                company TEXT,
                address_street TEXT,
                address_city TEXT,
                address_zip TEXT,
                geo_lat REAL,
                geo_lng REAL
            )
        `;

        db.run(createTableSql, (err) => {
            if (err) {
                // Table already created or another error
                console.error(err.message);
            } else {
                console.log("Users table created or already exists.");
            }
        });
    }
});

module.exports = db;