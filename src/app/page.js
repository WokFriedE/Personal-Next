import React from "react";
import languagesJSON from "../static/data/languages.json";
import skillsJSON from "../static/data/skills.json";
import toolsJSON from "../static/data/tools.json";

import ItemContainer from "./components/item_display";

// Change the icons to b/w

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col py-10">
            <div>
                <p className="text-5xl text-center">
                    Ethan Ho
                </p>
                <p className="text-2xl text-center">
                    Computer Science, B.S.
                </p>
            </div>
            <h1 className="2xl:mx-32 sm:mx-12 mx-1 text-3xl mt-5 py-1 px-auto font-bold uppercase">Skills</h1>
            <div className="2xl:mx-32 sm:mx-12 mx-1 bg-slate-600/[.2] rounded-lg border-2 border-gray-500">
                <div className=" grid md:grid-cols-3 md:divide-x sm:grid-cols-1 divide-y md:divide-y-0 divide-solid">
                    <ItemContainer item={languagesJSON} title="Languages" icon="heroicons-outline:code" />
                    <ItemContainer item={skillsJSON} title="Skills" icon="heroicons-outline:user" />
                    <ItemContainer item={toolsJSON} title="Tools" icon="heroicons-outline:computer-desktop" />
                </div>
            </div>
            <h1 className="2xl:mx-32 sm:mx-12 mx-1 text-3xl mt-5 py-1 px-auto font-bold uppercase">Extracurricular</h1>
            <div className="2xl:mx-32 sm:mx-12 mx-1 bg-slate-600/[.2] rounded-lg border-2 border-gray-500">
            </div>
        </main>
    );
}