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
    const projectData = await db.all("SELECT * FROM projects");
    const featureData = await db.all("SELECT * FROM projectFeatures");
    const techData = await db.all(
        "SELECT * FROM (SELECT * FROM projectTools LEFT JOIN tools ON projectTools.tool_id = tools.id UNION ALL SELECT * FROM projectLangs LEFT JOIN languages ON projectLangs.language_id = languages.id)"
    );
    // Combines the projectFeatures with the projects data
    projectData.forEach((project) => {
        project.features = featureData.filter((feat) => feat.project_id === project.id);
        project.tech = techData.filter((tech) => tech.project_id === project.id);
    });
    return new Response(JSON.stringify(projectData), {
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

    // add projects
    try {
        temp.forEach(async (taskI) => {
            if (!taskI.title || taskI.features.length < 1) {
                return new Response(
                    JSON.stringify({ message: "failed: " + JSON.stringify(taskI) }, { headers: { "content-type": "application/json" }, status: 400 })
                );
            }

            const currId = await db.run(
                "INSERT INTO projects (title, current, start, end, description, imgSrc, link, github, videoSrc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id",
                taskI.title,
                taskI.current ?? false,
                taskI.start ?? null,
                taskI.end ?? null,
                taskI.description ?? "n/a",
                taskI.imgSrc ?? null,
                taskI.link ?? null,
                taskI.github ?? null,
                taskI.videoSrc ?? null
            );
            taskI.features.forEach(async (feat) => {
                db.run("INSERT INTO projectFeatures (feature, project_id) VALUES (?, ?)", feat, currId.lastID);
            });
            if (taskI.tech) {
                taskI.tech.forEach(async (techItem) => {
                    if (techItem.language_id) {
                        db.run("INSERT INTO projectLangs (language_id, project_id) VALUES (?, ?)", techItem.language_id, currId.lastID);
                    } else if (techItem.tool_id) {
                        db.run("INSERT INTO projectTools (tool_id, project_id) VALUES (?, ?)", techItem.tool_id, currId.lastID);
                    }
                });
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: "success: added all" }, { headers: { "content-type": "application/json" }, status: 200 }));
    }
    return new Response(
        JSON.stringify({ message: "failed", curr: JSON.stringify(task) }, { headers: { "content-type": "application/json" }, status: 400 })
    );
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
        await db.run("DELETE FROM projects");
    } else if (!task.title) await db.run("DELETE FROM projects WHERE name = ?", task.title);
    else return new Response(JSON.stringify({ message: "failed: no name" }, { headers: { "content-type": "application/json" }, status: 400 }));
    return new Response(JSON.stringify({ message: "success" }, { headers: { "content-type": "application/json" }, status: 200 }));
}
