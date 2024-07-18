const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/static/data/portfolio.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error("table making ", err.message);
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
                icon VARCHAR(50),
                is_active INT(1) DEFAULT 1
                )`,
        (err) => {
            if (err) {
                return console.error("table lang", err.message);
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
                    icon VARCHAR(50),
                    is_active INT(1) DEFAULT 1
                    )`,
        (err) => {
            if (err) {
                return console.error("table tool ", err.message);
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
                        icon VARCHAR(50),
                        is_active INT(1) DEFAULT 1
                        )`,
        (err) => {
            if (err) {
                return console.error("table skills ", err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS extracurricular (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT NOT NULL UNIQUE,
                            description TEXT,
                            is_active INT(1) DEFAULT 1
                            )`,
        (err) => {
            if (err) {
                return console.error("table extracurricular ", err.message);
            }
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS positions (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            current INT(1) DEFAULT 1,
                            title VARCHAR(30),
                            start DATE,
                            end DATE,
                            description TEXT,
                            extracurricular_id INTEGER NOT NULL,
                            is_active INT(1) DEFAULT 1,
                            FOREIGN KEY (extracurricular_id) REFERENCES extracurricular(id) ON DELETE CASCADE,
                            UNIQUE (title, extracurricular_id)
                            )`,
        (err) => {
            if (err) {
                return console.error("table positions ", err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS projects (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            current INT(1) DEFAULT 1,
                            title VARCHAR(30) UNIQUE,
                            start DATE,
                            end DATE,
                            description TEXT,
                            link TEXT,
                            github TEXT,
                            videoSrc TEXT,
                            imgSrc TEXT,
                            is_active INT(1) DEFAULT 1
                            )`,
        (err) => {
            if (err) {
                return console.error("table projects ", err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS projectFeatures (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            feature TEXT,
                            project_id INTEGER NOT NULL,
                            is_active INT(1) DEFAULT 1,
                            UNIQUE (feature, project_id),
                            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
                            )`,
        (err) => {
            if (err) {
                return console.error("table projectFeatures ", err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS projectLangs (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            project_id INTEGER NOT NULL,
                            language_id INTEGER NOT NULL,
                            is_active INT(1) DEFAULT 1,
                            UNIQUE (language_id, project_id),
                            FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
                            )`,
        (err) => {
            if (err) {
                return console.error("table projectLangs ", err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS projectTools (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            project_id INTEGER NOT NULL,
                            tool_id INTEGER NOT NULL,
                            is_active INT(1) DEFAULT 1,
                            UNIQUE (tool_id, project_id),
                            FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE
                            )`,
        (err) => {
            if (err) {
                return console.error("table projectTools ", err.message);
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username VARCHAR(50) NOT NULL UNIQUE,
                            password VARCHAR(50) NOT NULL,
                            is_active INT(1) DEFAULT 1
                                                        )`,
        (err) => {
            if (err) {
                return console.error("table users ", err.message);
            }
        }
    );

    db.close((err) => {
        if (err) {
            return console.error("table close ", err.message);
        }
        console.log("Closed connection");
    });
});
