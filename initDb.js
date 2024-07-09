const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/static/data/portfolio.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS languages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                proficiency INTEGER,
                type VARCAHR(25),
                description TEXT,
                icon VARCHAR(50)
                )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS tools (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE,
                    proficiency INTEGER,
                    type VARCAHR(25),
                    description TEXT,
                    icon VARCHAR(50)
                    )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS skills (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL UNIQUE,
                        proficiency INTEGER,
                        type VARCAHR(25),
                        description TEXT,
                        icon VARCHAR(50)
                        )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS extracurricular (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT NOT NULL UNIQUE,
                            description TEXT
                            )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS positions (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            current BOOLEAN,
                            title VARCHAR(30),
                            start DATE,
                            end DATE,
                            description TEXT,
                            extracurricular_id INTEGER NOT NULL,
                            FOREIGN KEY (extracurricular_id) REFERENCES extracurricular(id) ON DELETE CASCADE,
                            UNIQUE (title, extracurricular_id)
                            )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Closed connection");
    });
});
