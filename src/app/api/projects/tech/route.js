import sqlite3 from "sqlite3";
import { open } from "sqlite";

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
    const currId = task.id;

    // Add tech statcks
    temp.forEach(async (task) => {
        if (!task.feature) {
            return new Response(
                JSON.stringify({ message: "failed: " + JSON.stringify(task) }, { headers: { "content-type": "application/json" }, status: 400 })
            );
        }
        task.tech.forEach(async (techItem) => {
            if (techItem.language_id) {
                db.run("INSERT INTO projectLangs (language_id, projects_id) VALUES (?, ?)", techItem.language_id, currId);
            } else if (techItem.tool_id) {
                db.run("INSERT INTO projectTools (tool_id, projects_id) VALUES (?, ?)", techItem.tool_id, currId);
            }
        });
    });
    return new Response(JSON.stringify({ message: "success: added feat" }, { headers: { "content-type": "application/json" }, status: 200 }));
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
        await db.run("DELETE FROM projectLangs");
        await db.run("DELETE FROM projectTools");
    }
    //TODO fix & add delete for both: else if (!task.title) await db.run("DELETE FROM projects WHERE name = ?", task.title);
    else return new Response(JSON.stringify({ message: "failed: no name" }, { headers: { "content-type": "application/json" }, status: 400 }));
    return new Response(JSON.stringify({ message: "success" }, { headers: { "content-type": "application/json" }, status: 200 }));
}
