"use client";

import React, { useEffect, useState } from "react";
import languagesJSON from "../static/data/languages.json";
import skillsJSON from "../static/data/skills.json";
import toolsJSON from "../static/data/tools.json";

import ItemContainer from "./components/item_display";

export default function Home() {
    const [langs, setLangs] = useState([]);
    const [tools, setTools] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        setLangs(languagesJSON);
        setSkills(skillsJSON);
        setTools(toolsJSON);
    }, []);

    return (
        <main className="flex min-h-screen flex-col py-10">
            <p className="text-4xl text-center">
                Ethan Ho
            </p>
            <p className="text-xl text-center">
                Computer Science, B.S.
            </p>
            <div className="flex flex-wrap pt-8 px-10">
                {/*   <button className="bg-gray-300 text-gray-700 flex-2 px-6 py-1 text-lg rounded-full">Tech Portfolio</button>
                <button className="bg-gray-300 text-gray-700 flex-2 px-6 py-1 text-lg rounded-full">Photo Portfolio</button> */}
                <ItemContainer title="Tools" item={tools} />
                <ItemContainer title="Skills" item={skills} />
            </div>
            <div className="flex flex-wrap py-1 px-10">
                <ItemContainer title="Languages" item={langs} />
            </div>
        </main>
    );
}
