"use client";

import React, { useState } from "react";
import langaugesJSON from "../../../static/data/languages.json";

export default function adminDataPage() {
    let db = null;
    const [task, setTask] = useState({ name: "C++", proficiency: 4, type: "langauge", icon: "vscode-icons:file-type-cpp2" });

    const handleClick = async () => {
        fetch("http://localhost:3000/api", {
            method: "POST",
            body: JSON.stringify({ task: langaugesJSON }),
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
            <button onClick={handleClick} className="bg-slate-200 text-black">
                Add Langs
            </button>
        </div>
    );
}
