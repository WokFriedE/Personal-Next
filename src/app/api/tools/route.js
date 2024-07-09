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

    const langData = await db.all("SELECT * FROM tools");
    return new Response(JSON.stringify(langData), {
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
        if (!task.name || !task.proficiency) {
            return new Response(
                JSON.stringify({ message: "failed: " + JSON.stringify(task) }, { headers: { "content-type": "application/json" }, status: 400 })
            );
        }
        await db.run(
            "INSERT INTO tools (name, proficiency, type, description, icon) VALUES (?, ?, ?, ?, ?)",
            task.name,
            task.proficiency ?? -1,
            task.type ?? "n/a",
            task.description ?? "n/a",
            task.icon ?? "n/a"
        );
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
    if (task.method === "all") await db.run("DELETE FROM tools");
    else if (!task.name) await db.run("DELETE FROM tools WHERE name = ?", task.name);
    else return new Response(JSON.stringify({ message: "failed: no name" }, { headers: { "content-type": "application/json" }, status: 400 }));
    return new Response(JSON.stringify({ message: "success" }, { headers: { "content-type": "application/json" }, status: 200 }));
}
