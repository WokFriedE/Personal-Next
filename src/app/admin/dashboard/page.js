import React from "react";
import languagesJSON from "../../../static/data/languages.json";
import toolsJSON from "../../../static/data/tools.json";
import skillsJSON from "../../../static/data/skills.json";
import extracurricularJSON from "../../../static/data/manual/extracurricular.json";
import projectJSON from "../../../static/data/manual/projects.json";

import ControlButtons from "../../../components/controlBtn";
import SignOut from "../../../components/SignOut";

import ExtracurricularFormComp from "./ExtracurricularForm";
import ProjectFormComp from "./ProjectForm";
import apiService from "../../../../lib/apiHandler";
import ItemForm from "./ItemForm";

export default async function adminDataPage() {
    const token = process.env.API_TOK;
    //
    const languages = (await apiService.fetchLangData())
        .map((lang) => ({ title: lang.name, id: lang.id }))
        .sort((a, b) => a.title.localeCompare(b.title));
    const tools = (await apiService.fetchToolsData())
        .map((lang) => ({ title: lang.name, id: lang.id }))
        .sort((a, b) => a.title.localeCompare(b.title));

    const itemSubmit = async (formData, api) => {
        "use server";
        const output = {
            name: formData.get("name"),
            proficiency: formData.get("proficiency"),
            type: formData.get("type"),
            icon: formData.get("icon"),
            description: formData.get("description"),
        };
        console.log(output, api);
    };

    const handleExtraSubmit = async (formData) => {
        "use server";
        let curr = 0;
        let positions = [];
        for (const key of formData.keys()) {
            if (key.endsWith("_title")) {
                curr = key[3];
                positions.push({
                    title: formData.get(key),
                    current: formData.get(`pos${curr}_current`),
                    start: formData.get(`pos${curr}_start`),
                    end: formData.get(`pos${curr}_end`),
                    description: formData.get(`pos${curr}_description`),
                });
            }
        }
        let output = {
            name: formData.get("name"),
            orgDescription: formData.get("description"),
            positions: positions,
        };
        console.log(output);
    };

    const handleProjectSubmit = async (formData) => {
        "use server";
        console.log(formData);

        // Process image
        const img = formData.get("img");
        const tech = formData
            .getAll("languages")
            .map((lang) => ({ language_id: lang }))
            .concat(formData.getAll("tools").map((tool) => ({ tool_id: tool })));
        const output = {
            title: formData.get("title"),
            current: formData.get("current"),
            start: formData.get("start"),
            end: formData.get("end"),
            description: formData.get("description"),
            imgSrc: "/images/1332803.png",
            link: formData.get("link"),
            github: formData.get("github"),
            videoSrc: formData.get("video"),
            tech: tech,
        };

        console.log(output);
    };

    return (
        <div className="flex min-h-screen flex-col py-10 gap-y-4">
            <h1 className="text-2xl">Admin Data Page</h1>
            <SignOut />
            <div className="flex flex-col flex-wrap gap-y-3">
                <div className="flex flex-row gap-x-3">
                    {/* Langs */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                        <p>Langs</p>
                        <ControlButtons title="Language" api="/api/languages" task={languagesJSON} tok={token} />
                        <ItemForm api="/api/languages/" />
                    </div>
                    {/* Tools */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                        <p>Tools</p>
                        <ControlButtons title="Tools" api="/api/tools/" task={toolsJSON} tok={token} />
                        <ItemForm api="/api/tools/" />
                    </div>
                    {/* Skills */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                        <p>Skills</p>
                        <ControlButtons title="Skills" api="/api/skills/" task={skillsJSON} tok={token} />
                        <ItemForm api="/api/skills/" />
                    </div>
                </div>
                <div className="flex flex-row gap-x-3 gap-y-3">
                    {/* Extracurricular */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                        <p>Extracurricular</p>
                        <ControlButtons title="Extracurricular" api="/api/extracurricular/" task={extracurricularJSON} tok={token} />
                        <ExtracurricularFormComp handleSubmit={handleExtraSubmit} />
                    </div>
                    {/* Projects */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
                        <p>Projects</p>
                        <ControlButtons title="Projects" api="/api/projects/" task={projectJSON} tok={token} />
                        <ProjectFormComp languages={languages} tools={tools} handleSubmit={handleProjectSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}
