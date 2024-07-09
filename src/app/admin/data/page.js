"use client";

import React from "react";
import langaugesJSON from "../../../static/data/languages.json";
import toolsJSON from "../../../static/data/tools.json";
import skillsJSON from "../../../static/data/skills.json";
import extracurricularJSON from "../../../static/data/manual/extracurricular.json";

export default function adminDataPage() {
    let db = null;

    // Lang
    const handleClickLangs = async () => {
        fetch("http://localhost:3000/api/languages", {
            method: "POST",
            body: JSON.stringify({ task: langaugesJSON }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };
    const handleClickLangsDelete = async () => {
        fetch("http://localhost:3000/api/languages", {
            method: "DELETE",
            body: JSON.stringify({ task: { method: "all" } }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };
    // Tools
    const handleClickTools = async () => {
        fetch("http://localhost:3000/api/tools", {
            method: "POST",
            body: JSON.stringify({ task: toolsJSON }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };
    const handleClickToolsDelete = async () => {
        fetch("http://localhost:3000/api/tools", {
            method: "DELETE",
            body: JSON.stringify({ task: { method: "all" } }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };
    // Skills
    const handleClickSkills = async () => {
        fetch("http://localhost:3000/api/skills", {
            method: "POST",
            body: JSON.stringify({ task: skillsJSON }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };
    const handleClickSkillsDelete = async () => {
        fetch("http://localhost:3000/api/skills", {
            method: "DELETE",
            body: JSON.stringify({ task: { method: "all" } }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };
    // Extracurricular
    const handleClickExtracurricular = async () => {
        fetch("http://localhost:3000/api/extracurricular", {
            method: "POST",
            body: JSON.stringify({ task: extracurricularJSON }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };
    const handleClickExtracurricularDelete = async () => {
        fetch("http://localhost:3000/api/extracurricular", {
            method: "DELETE",
            body: JSON.stringify({ task: { method: "all" } }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };

    return (
        <div className="flex min-h-screen flex-col py-10">
            <h1>Admin Data Page</h1>
            <div className="flex flex-row space-x-3">
                {/* Langs */}
                <div className="flex flex-row flex-1 space-x-3 bg-slate-600 px-1.5 rounded-md py-2">
                    <button onClick={handleClickLangs} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                        Add Langs
                    </button>
                    <button onClick={handleClickLangsDelete} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                        Delete All Langs
                    </button>
                </div>
                {/* Tools */}
                <div className="flex flex-row flex-1 space-x-3 bg-slate-600 px-1.5 rounded-md py-2">
                    <button onClick={handleClickTools} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                        Add Tools
                    </button>
                    <button onClick={handleClickToolsDelete} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                        Delete All Tools
                    </button>
                </div>
                {/* Skills */}
                <div className="flex flex-row flex-1 space-x-3 bg-slate-600 px-1.5 rounded-md py-2">
                    <button onClick={handleClickSkills} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                        Add Skills
                    </button>
                    <button onClick={handleClickSkillsDelete} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                        Delete All Skills
                    </button>
                </div>
                {/* Extracurricular */}
                <div className="flex flex-row flex-1 space-x-3 bg-slate-600 px-1.5 rounded-md py-2">
                    <button onClick={handleClickExtracurricular} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                        Add Extracurricular
                    </button>
                    <button onClick={handleClickExtracurricularDelete} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                        Delete All Extracurricular
                    </button>
                </div>
            </div>
        </div>
    );
}
