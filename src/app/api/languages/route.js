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

    const langData = await db.all("SELECT * FROM languages WHERE is_active = 1");
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
            `INSERT INTO languages (name, proficiency, type, description, icon, is_active) VALUES ($name, $proficiency, $type, $description, $icon, $is_active)
            ON conflict do UPDATE set name=$name, proficiency=$proficiency, type=$type, description=$description, icon=$icon, is_active=$is_active`,
            {
                $name: task.name,
                $proficiency: task.proficiency ?? -1,
                $type: task.type ?? "n/a",
                $description: task.description ?? "n/a",
                $icon: task.icon ?? "n/a",
                $is_active: 1,
            }
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
    if (task.method === "all") await db.run("DELETE FROM languages");
    else if (!task.name) await db.run("DELETE FROM languages WHERE name = ?", task.name);
    else return new Response(JSON.stringify({ message: "failed: no name" }, { headers: { "content-type": "application/json" }, status: 400 }));
    return new Response(JSON.stringify({ message: "success" }, { headers: { "content-type": "application/json" }, status: 200 }));
}
