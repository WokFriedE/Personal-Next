import React from "react";
// import languagesJSON from "../../../static/data/languages.json";
// import toolsJSON from "../../../static/data/tools.json";
// import skillsJSON from "../../../static/data/skills.json";
// import extracurricularJSON from "../../../static/data/manual/extracurricular.json";
// import projectJSON from "../../../static/data/manual/projects.json";

import ControlButtons from "../../../components/controlBtn";
import SignOut from "../../../components/SignOut";

import ExtracurricularFormComp from "./ExtracurricularForm";
import ProjectFormComp from "./ProjectForm";
import ItemForm from "./ItemForm";
import AdminDeleteComp from "@/components/AdminDeleteComp";
import {
    extracurricularGET,
    extracurricularPOST,
    genericDELETE,
    genericPOST,
    languagesGet,
    projectGET,
    projectPOST,
    skillsGet,
    toolsGet,
} from "../../../../lib/dbHandler";

// TODO fix the controlBtn to use server actions

export default async function adminDataPage() {
    const token = process.env.API_TOK;
    const BASE_URL = process.env.BASE_URL;

    const languages = (await languagesGet(false))
        .map((lang) => ({ title: lang.name, id: lang.id, is_active: lang.is_active }))
        .sort((a, b) => a.title.localeCompare(b.title));
    const tools = (await toolsGet(false))
        .map((tool) => ({ title: tool.name, id: tool.id, is_active: tool.is_active }))
        .sort((a, b) => a.title.localeCompare(b.title));
    const skills = (await skillsGet(false))
        .map((item) => ({ title: item.name, id: item.id, is_active: item.is_active }))
        .sort((a, b) => a.title.localeCompare(b.title));
    const extracurriculars = (await extracurricularGET(false))
        .map((item) => ({ title: item.name, id: item.id, is_active: item.is_active }))
        .sort((a, b) => a.title.localeCompare(b.title));
    const projects = (await projectGET(false))
        .map((item) => ({ title: item.title, id: item.id, is_active: item.is_active }))
        .sort((a, b) => a.title.localeCompare(b.title));

    // Generics
    const itemSubmit = async (table, formData) => {
        "use server";
        const output = {
            name: formData.get("name"),
            proficiency: formData.get("proficiency"),
            type: formData.get("type"),
            icon: formData.get("icon"),
            description: formData.get("description"),
        };

        try {
            await genericPOST(table)(output);
            return Promise.resolve("Success");
        } catch (err) {
            console.error(err);
            return new Error("Error");
        }
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

        try {
            await extracurricularPOST(output);
            return Promise.resolve("Success");
        } catch (err) {
            console.error(err);
            return new Error("Error");
        }
    };

    // Individual submit
    const handleProjectSubmit = async (formData) => {
        "use server";

        // Process image
        const img = formData.get("img");

        const tech = formData
            .getAll("languages")
            .map((lang) => ({ language_id: lang }))
            .concat(formData.getAll("tools").map((tool) => ({ tool_id: tool })));
        const feats = formData.getAll("feats");
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
            features: feats,
        };

        try {
            await projectPOST(output);
            return Promise.resolve("Success");
        } catch (err) {
            console.error(err);
            return new Error("Error");
        }
    };

    const itemAdd = async (table, taskEnter) => {
        "use server";
        try {
            await genericPOST(table)(taskEnter);
            return Promise.resolve("Success");
        } catch (err) {
            console.error(err);
            return new Error("Error adding all");
        }
    };

    const itemDelete = async (table) => {
        "use server";
        try {
            await genericDELETE(table)("", "toggleAll");
            return Promise.resolve("Success");
        } catch (err) {
            console.error(err);
            return new Error("Error deleteing all");
        }
    };
    const selectDelete = async (table, title) => {
        "use server";
        try {
            console.log("Deleting", title);
            await genericDELETE(table)(title, "name", true);
            return Promise.resolve("Success");
        } catch (err) {
            console.error(err);
            return new Error("Error deleteing all");
        }
    };

    return (
        <div className="flex min-h-screen flex-col py-10 gap-y-4">
            <h1 className="text-2xl">Admin Data Page</h1>
            {/* <toastMsg msg="hi" type="info" /> */}
            <SignOut />
            <div className="flex flex-col flex-wrap gap-y-3">
                <div className="flex flex-row gap-x-3">
                    {/* Langs */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2 divide-y gap-y-2">
                        <p className="text-xl text-center">Langs</p>
                        <ControlButtons title="Language" api="languages" delete={itemDelete} add={itemAdd} />
                        <ItemForm api="languages" submit={itemSubmit} types={["Language", "Framework", "Library", "Database", "Other"]} />
                        <AdminDeleteComp data={languages} api="languages" delete={selectDelete} />
                    </div>
                    {/* Tools */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2 divide-y gap-y-2">
                        <p className="text-xl text-center">Tools</p>
                        <ControlButtons title="Tools" api="tools" delete={itemDelete} add={itemAdd} />
                        <ItemForm api="tools" submit={itemSubmit} types={["Version Control", "Application", "Operating System", "Other"]} />
                        <AdminDeleteComp data={tools} api="tools" delete={selectDelete} />
                    </div>
                    {/* Skills */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2 divide-y gap-y-2">
                        <p className="text-xl text-center">Skills</p>
                        <ControlButtons title="Skills" api="skills" delete={itemDelete} add={itemAdd} />
                        <ItemForm api="skills" submit={itemSubmit} />
                        <AdminDeleteComp data={skills} api="skills" delete={selectDelete} />
                    </div>
                </div>
                <div className="flex flex-row gap-x-3 gap-y-3">
                    {/* Extracurricular */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2 divide-y gap-y-2">
                        <p className="text-xl text-center">Extracurricular</p>
                        <ControlButtons title="Extracurricular" api="extracurricular" delete={itemDelete} add={itemAdd} />
                        <ExtracurricularFormComp submit={handleExtraSubmit} />
                        <AdminDeleteComp data={extracurriculars} api="extracurriculars" delete={selectDelete} />
                    </div>
                    {/* Projects */}
                    <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2 divide-y gap-y-2">
                        <p className="text-xl text-center">Projects</p>
                        <ControlButtons title="Projects" api="projects" delete={itemDelete} add={itemAdd} />
                        <ProjectFormComp languages={languages} tools={tools} submit={handleProjectSubmit} />
                        <AdminDeleteComp data={projects} api="projects" delete={selectDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
}
