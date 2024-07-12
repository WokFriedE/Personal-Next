import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

// Handler to GET request to get all data
export async function GET(req, res) {
    if (!db) {
        db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });
    }
    const extracurrData = await db.all("SELECT * FROM extracurricular");
    const posData = await db.all("SELECT * FROM positions");
    // Combines the positions with the extracurricular data
    extracurrData.forEach((extracurr) => {
        extracurr.positions = posData.filter((pos) => pos.extracurricular_id === extracurr.id);
    });
    return new Response(JSON.stringify(extracurrData), {
        headers: { "content-type": "application/json" },
        status: 200,
    });
}

// Post Request
export async function POST(req, res) {
    if (!db) {
        db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });
    }

    const { task } = await req.json();
    const temp = [];
    if (!Array.isArray(task)) {
        temp.push(task);
    } else {
        temp.push(...task);
    }

    temp.forEach(async (task) => {
        if (!task.name || task.positions.length < 1) {
            return new Response(
                JSON.stringify({ message: "failed: " + JSON.stringify(task) }, { headers: { "content-type": "application/json" }, status: 400 })
            );
        }
        const currId = await db.run(
            "INSERT INTO extracurricular (name, description) VALUES (?, ?) RETURNING id",
            task.name,
            task.orgDescription ?? "n/a"
        );
        task.positions.forEach(async (pos) => {
            db.run(
                "INSERT INTO positions (title, description, start, end, current, extracurricular_id) VALUES (?, ?, ?, ?, ?, ?)",
                pos.title,
                pos.description ?? "n/a",
                pos.start ?? null,
                pos.end ?? null,
                pos.current ?? false,
                currId.lastID
            );
        });
    });
    return new Response(JSON.stringify({ message: "success" }, { headers: { "content-type": "application/json" }, status: 200 }));
}

// Delete request
export async function DELETE(req, res) {
    if (!db) {
        db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });
    }

    const { task } = await req.json();
    if (task.method === "all") {
        await db.run("DELETE FROM extracurricular");
        await db.run("DELETE FROM positions");
    } else if (!task.title) await db.run("DELETE FROM extracurricular WHERE name = ?", task.title);
    else return new Response(JSON.stringify({ message: "failed: no name" }, { headers: { "content-type": "application/json" }, status: 400 }));
    return new Response(JSON.stringify({ message: "success" }, { headers: { "content-type": "application/json" }, status: 200 }));
}
