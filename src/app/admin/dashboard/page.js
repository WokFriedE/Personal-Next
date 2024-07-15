import React from "react";
import languagesJSON from "../../../static/data/languages.json";
import toolsJSON from "../../../static/data/tools.json";
import skillsJSON from "../../../static/data/skills.json";
import extracurricularJSON from "../../../static/data/manual/extracurricular.json";
import projectJSON from "../../../static/data/manual/projects.json";

import ControlButtons from "../../../components/controlBtn";
import SignOut from "../../../components/SignOut";

export default function adminDataPage() {
    const token = process.env.API_TOK;
    return (
        <div className="flex min-h-screen flex-col py-10 gap-y-4">
            <h1 className="text-2xl">Admin Data Page</h1>
            <SignOut />
            <div className="flex flex-row gap-x-3 flex-wrap gap-y-3">
                {/* Langs */}
                <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                    <p>Langs</p>
                    <ControlButtons title="Language" api="/api/languages" task={languagesJSON} tok={token} />
                    <form className="grid grid-cols-1">
                        <label className="text-slate-50" htmlFor="name">
                            Name
                        </label>
                        <input type="text" placeholder="Language" name="name" />
                        <label className="text-slate-50" htmlFor="proficiency">
                            Proficiency
                        </label>
                        <input type="number" placeholder="Proficiency" name="proficiency" />
                        <label className="text-slate-50" htmlFor="type">
                            Type
                        </label>
                        <select name="type" placeholder="Type">
                            <option>language</option>
                            <option>framework</option>
                            <option>library</option>
                            <option>database</option>
                            <option>other</option>
                        </select>
                        <label className="text-slate-50" htmlFor="icon">
                            Icon
                        </label>
                        <input type="text" placeholder="Icon" />
                        <label className="text-slate-50" htmlFor="description">
                            Description
                        </label>
                        <textarea name="description" placeholder="Description" />
                        <button type="submit">Add</button>
                    </form>
                </div>
                {/* Tools */}
                <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                    <p>Tools</p>
                    <ControlButtons title="Tools" api="/api/tools" task={toolsJSON} tok={token} />
                </div>
                {/* Skills */}
                <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                    <p>Skills</p>
                    <ControlButtons title="Skills" api="/api/skills" task={skillsJSON} tok={token} />
                </div>
                {/* Extracurricular */}
                <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                    <p>Extracurricular</p>
                    <ControlButtons title="Extracurricular" api="/api/extracurricular" task={extracurricularJSON} tok={token} />
                </div>
                {/* Projects */}
                <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                    <p>Projects</p>
                    <ControlButtons title="Projects" api="/api/projects" task={projectJSON} tok={token} />
                </div>
            </div>
        </div>
    );
}
