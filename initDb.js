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
    db.run(
        `CREATE TABLE IF NOT EXISTS projects (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            current BOOLEAN,
                            title VARCHAR(30) UNIQUE,
                            start DATE,
                            end DATE,
                            description TEXT,
                            link TEXT,
                            github TEXT,
                            videoSrc TEXT,
                            imgSrc TEXT
                            )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS projectFeatures (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            feature TEXT,
                            project_id INTEGER NOT NULL,
                            UNIQUE (feature, project_id),
                            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
                            )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS projectLangs (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            project_id INTEGER NOT NULL,
                            language_id INTEGER NOT NULL,
                            UNIQUE (language_id, project_id),
                            FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
                            )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS projectTools (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            project_id INTEGER NOT NULL,
                            tool_id INTEGER NOT NULL,
                            UNIQUE (tool_id, project_id),
                            FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE
                            )`,
        (err) => {
            if (err) {
                return console.error(err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username VARCHAR(50) NOT NULL UNIQUE,
                            password VARCHAR(50) NOT NULL
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
