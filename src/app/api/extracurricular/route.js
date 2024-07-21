import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

// Handler to GET request to get all data
export async function GET(req) {
    if (!db) {
        db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });
    }
    const extracurrData = await db.all(`SELECT * FROM extracurricular WHERE is_active = 1`);
    const posData = await db.all(`SELECT * FROM positions WHERE is_active = 1`);
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
export async function POST(req) {
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
            `INSERT INTO extracurricular (name, description, is_active) VALUES ($name, $description, $is_active) RETURNING id`,
            {
                $name: task.name,
                $description: task.orgDescription ?? "n/a",
                $is_active: 1,
            }
        );
        task.positions.forEach(async (pos) => {
            db.run(
                `INSERT INTO positions (title, description, start, end, current, extracurricular_id, is_active) VALUES ($title, $description, $start, $end, $current, $currId, $is_active)
                ON conflict do UPDATE set title=$title, description=$description, start=$start, end=$end, current=$current, extracurricular_id=$currId, is_active=$is_active`,
                {
                    $title: pos.title,
                    $description: pos.description ?? "n/a",
                    $start: pos.start ?? null,
                    $end: pos.end ?? null,
                    $current: pos.current ?? false,
                    $currId: currId.lastID,
                    $is_active: 1,
                }
            );
        });
    });
    return new Response(JSON.stringify({ message: "success" }, { headers: { "content-type": "application/json" }, status: 200 }));
}

// Delete request
export async function DELETE(req) {
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
