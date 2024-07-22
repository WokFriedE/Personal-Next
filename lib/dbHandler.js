import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bycrpt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// TODO update the routes to utilize the DB handler

// Management of the database
let db = null;
export const establishDB = async (debug = false) => {
    try {
        db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });
        if (debug) console.log("Establishing DB");
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const dbClose = async (debug = false) => {
    await db.close();
    if (debug) console.log("DB Close");
};

// Establish the database
await establishDB();

export const fullHandle = async (func) => {
    if (!db) {
        await establishDB(true);
    }
    const res = await func();
    await dbClose(true);
    return res;
};

// Login Handler
export async function loginPOST(username, password) {
    try {
        if (username && password) {
            try {
                const hash = await db.get("SELECT password FROM users WHERE username=$user AND is_active = 1 LIMIT 1", {
                    $user: username,
                });
                if (!hash) {
                    return false;
                }

                const res = await bycrpt.compare(password, hash.password);
                // TODO: Establish with JWT
                // const authenticated = await bycrpt.hash(process.env.LOGIN_TOK, 10);
                const authenticated = process.env.LOGIN_TOK;
                if (res) {
                    cookies().set("access-token", authenticated, {
                        maxAge: 60 * 60 * 24,
                        secure: true,
                    });
                    return true;
                } else return false;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    } catch (err) {
        console.error(error);
        return false;
    }
    return false;
}

// ========================
// Generic Handlers
// ========================

// Handler to GET request to get all data
export function genericGET(table) {
    if (table === "extracurricular") return extracurricularGET;
    else if (table === "projects") return projectGET;

    // tables: tools, languages, skills, extracurricular, projects
    return async (activeOnly = true) => {
        try {
            const data = await db.all(`SELECT * FROM ${table} ${activeOnly ? "WHERE is_active = 1" : ""}`);
            return data;
        } catch (err) {
            console.error(err);
            return [];
        }
    };
}

// Post Request
export function genericPOST(table) {
    if (table === "extracurricular") return extracurricularPOST;
    else if (table === "projects") return projectPOST;

    // tables: tools, languages, skills, extracurricular, projects

    return async (task) => {
        if (!db) return [];

        const temp = [];
        if (!Array.isArray(task)) {
            temp.push(task);
        } else {
            temp.push(...task);
        }
        temp.forEach(async (task) => {
            if (!task.name) {
                return false;
            }
            try {
                await db.run(
                    `INSERT INTO ${table} (name, proficiency, type, description, icon, is_active) VALUES ($name, $proficiency, $type, $description, $icon, $is_active)
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
            } catch (err) {
                console.error(err);
                return false;
            }
        });
        return true;
    };
}

// Delete request
export function genericDELETE(table) {
    if (table === "extracurricular") return extracurricularDELETE;
    else if (table === "projects") return projectDELETE;

    return async (title = "", method = "all", disable = true) => {
        try {
            if (!disable && method !== "toggleAll") {
                if (method === "all") await db.run(`DELETE FROM ${table}`);
                else if (title) await db.run(`DELETE FROM ${table} WHERE name = ?`, title);
                else return false;
                return true;
            } else {
                if (method === "all") await db.run(`UPDATE ${table} SET is_active = 0`);
                else if (method === "toggleAll") await db.run(`UPDATE ${table} SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END)`);
                else if (title) await db.run(`UPDATE ${table} SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END) WHERE name = ?`, title);
                else return false;
                return true;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    };
}
// Delete request
export function genericUPDATE(table) {
    if (table === "extracurricular") return extracurricularUPDATE;
    else if (table === "projects") return [];

    return async (id, data) => {
        try {
            await db.run(
                `UPDATE ${table} SET name = $name, proficiency = $proficiency, type = $type, description = $description, icon = $icon WHERE id = $id`,
                {
                    $name: data.name,
                    $proficiency: data.proficiency,
                    $type: data.type,
                    $description: data.description,
                    $icon: data.icon,
                    $id: id,
                }
            );
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };
}

// Utilizing closures to create specific handlers
// Specific POST requests
export const toolsPost = genericPOST("tools");
export const skillsPost = genericPOST("skills");
export const languagesPost = genericPOST("languages");

// Specific GET requests
export const toolsGet = genericGET("tools");
export const skillsGet = genericGET("skills");
export const languagesGet = genericGET("languages");

// Specific DELETE requests
export const toolsDelete = genericDELETE("tools");
export const skillsDelete = genericDELETE("skills");
export const languagesDelete = genericDELETE("languages");

// ========================
// Extracurricular Handler
// ========================
export async function extracurricularGET(activeOnly = true) {
    const extracurrData = await db.all(`SELECT * FROM extracurricular ${activeOnly ? "WHERE is_active = 1" : ""}`);
    const posData = await db.all(`SELECT * FROM positions ${activeOnly ? "WHERE is_active = 1" : ""}`);

    // Combines the positions with the extracurricular data
    extracurrData.forEach((extracurr) => {
        extracurr.positions = posData.filter((pos) => pos.extracurricular_id === extracurr.id);
    });
    return extracurrData;
}

// Post Request
export async function extracurricularPOST(task) {
    const temp = [];
    if (!Array.isArray(task)) {
        temp.push(task);
    } else {
        temp.push(...task);
    }

    temp.forEach(async (task) => {
        if (!task.name || task.positions.length < 1) {
            return false;
        }
        try {
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
        } catch (err) {
            console.error(err);
            return false;
        }
    });
    return true;
}

// Delete request
export async function extracurricularDELETE(title = "", method = "all", disable = true) {
    try {
        if (!disable && method !== "toggleAll") {
            if (method === "all") {
                await db.run(`DELETE FROM extracurricular`);
                await db.run(`DELETE FROM positions`);
            } else if (title) await db.run(`DELETE FROM extracurricular WHERE name = ?`, title);
            else return false;
            return true;
        } else {
            if (method === "all") {
                await db.run(`UPDATE extracurricular SET is_active = 0`);
                await db.run(`UPDATE positions SET is_active = 0`);
            } else if (method === "toggleAll") {
                await db.run(`UPDATE extracurricular SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END)`);
                await db.run(`UPDATE positions SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END)`);
            } else if (title)
                await db.run(`UPDATE extracurricular SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END) WHERE name = ?`, title);
            else return false;
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function extracurricularUPDATE(id, data) {
    try {
        await db.run(`UPDATE extracurricular SET name = $name, description = $description WHERE id = $id`, {
            $name: data.name,
            $description: data.description,
            $id: id,
        });
        await db.run(`DELETE FROM positions WHERE extracurricular_id = $id`, { $id: id });
        data.positions.forEach(async (pos) => {
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
    } catch (err) {
        console.error(err);
        return false;
    }
}

// ========================
// Project Handler
// ========================

export async function projectGET(activeOnly = true) {
    const projectData = await db.all(`SELECT * FROM projects ${activeOnly ? "WHERE is_active = 1" : ""}`);
    const featureData = await db.all(`SELECT * FROM projectFeatures ${activeOnly ? "WHERE is_active = 1" : ""}`);
    const techData = await db.all(
        "SELECT * FROM (SELECT * FROM projectTools LEFT JOIN tools ON projectTools.tool_id = tools.id UNION ALL SELECT * FROM projectLangs LEFT JOIN languages ON projectLangs.language_id = languages.id)"
    );
    // Combines the projectFeatures with the projects data
    projectData.forEach((project) => {
        project.features = featureData.filter((feat) => feat.project_id === project.id);
        project.tech = techData.filter((tech) => tech.project_id === project.id);
    });

    return projectData;
}

// Post Request
export async function projectPOST(task) {
    const temp = [];
    if (!Array.isArray(task)) {
        temp.push(task);
    } else {
        temp.push(...task);
    }

    try {
        temp.forEach(async (taskI) => {
            if (!taskI.title || taskI.features.length < 1) {
                return false;
            }

            const currId = await db.run(
                `INSERT INTO projects (title, current, start, end, description, imgSrc, link, github, videoSrc, is_active) VALUES ($title, $current, $start, $end, $description, $imgSrc, $link, $github, $videoSrc, $is_active) 
                ON conflict do UPDATE set title=$title, current=$current, start=$start, end=$end, description=$description, imgSrc=$imgSrc, link=$link, github=$github, videoSrc=$videoSrc, is_active=$is_active
                RETURNING id `,
                {
                    $title: taskI.title,
                    $current: taskI.current ?? false,
                    $start: taskI.start ?? null,
                    $end: taskI.end ?? null,
                    $description: taskI.description ?? "n/a",
                    $imgSrc: taskI.imgSrc ?? null,
                    $link: taskI.link ?? null,
                    $github: taskI.github ?? null,
                    $videoSrc: taskI.videoSrc ?? null,
                    $is_active: 1,
                }
            );
            taskI.features.forEach(async (feat) => {
                db.run(
                    `INSERT INTO projectFeatures (feature, project_id, is_active) VALUES ($feature, $pid, $is_active) 
                    ON conflict do UPDATE set feature=$feature, is_active=$is_active`,
                    {
                        $feature: feat,
                        $pid: currId.lastID,
                        $is_active: 1,
                    }
                );
            });
            if (taskI.tech) {
                taskI.tech.forEach(async (techItem) => {
                    if (techItem.language_id) {
                        db.run(`INSERT INTO projectLangs (language_id, project_id) VALUES ($lid, $pid)`, techItem.language_id, currId.lastID);
                    } else if (techItem.tool_id) {
                        db.run(`INSERT INTO projectTools (tool_id, project_id) VALUES ($tid, $pid)`, techItem.tool_id, currId.lastID);
                    }
                });
            }
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

// Delete request
export async function projectDELETE(title = "", method = "all", disable = true) {
    try {
        if (!disable && method !== "toggleAll") {
            if (method === "all") {
                await db.run(`DELETE FROM projects`);
                await db.run(`DELETE FROM projectFeatures`);
                await db.run(`DELETE FROM projectLangs`);
                await db.run(`DELETE FROM projectTools`);
            } else if (title) await db.run(`DELETE FROM projects WHERE name = ?`, title);
            else return false;
            return true;
        } else {
            if (method === "all") {
                await db.run(`UPDATE projects SET is_active = 0`);
                await db.run(`UPDATE projectFeatures SET is_active = 0`);
                await db.run(`UPDATE projectLangs SET is_active = 0`);
                await db.run(`UPDATE projectTools SET is_active = 0`);
            } else if (method === "toggleAll") {
                await db.run(`UPDATE projects SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END)`);
                await db.run(`UPDATE projectFeatures SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END)`);
                await db.run(`UPDATE projectLangs SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END)`);
                await db.run(`UPDATE projectTools SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END)`);
            } else if (title) await db.run(`UPDATE projects SET is_active = (CASE WHEN is_active = 0 THEN 1 ELSE 0 END) WHERE title = ?`, title);
            else return false;
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}
