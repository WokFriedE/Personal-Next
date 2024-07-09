"use client";

import React, { useState } from "react";
import langaugesJSON from "../../../static/data/languages.json";
import toolsJSON from "../../../static/data/tools.json";

export default function adminDataPage() {
    let db = null;
    const [task, setTask] = useState({ name: "C++", proficiency: 4, type: "langauge", icon: "vscode-icons:file-type-cpp2" });

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

    return (
        <div className="flex min-h-screen flex-col py-10">
            <h1>Admin Data Page</h1>
            <div className="flex flex-row space-x-3">
                <div className="flex flex-row space-x-3 bg-slate-600 p-1.5 rounded-md">
                    <button onClick={handleClickLangs} className="w-32 bg-slate-200 text-black rounded-md">
                        Add Langs
                    </button>
                    <button onClick={handleClickToolsDelete} className="w-32 bg-slate-200 text-black rounded-md">
                        Delete All Langs
                    </button>
                </div>
                <div className="flex flex-row space-x-3 bg-slate-600 p-1.5 rounded-md">
                    <button onClick={handleClickTools} className="w-32 bg-slate-200 text-black rounded-md">
                        Add Tools
                    </button>
                    <button onClick={handleClickToolsDelete} className="w-32 bg-slate-200 text-black rounded-md">
                        Delete All Tools
                    </button>
                </div>
            </div>
        </div>
    );
}
