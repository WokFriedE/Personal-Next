import React from "react";
import ItemContainer from "../components/item_display";
import sortExtracurricular from "../../lib/sortExtracurricular";
import ExtracurricularComponent from "../components/ExtracurricularComp";
import apiService from "../../lib/apiHandler";

import Debugger from "../components/debug";
// TODO Change the icons to b/w?
// TODO add a work experience section and a courses section

export default async function Home() {
    const languagesJSON = await apiService.fetchLangData(),
        skillsJSON = await apiService.fetchSkillsData(),
        toolsJSON = await apiService.fetchToolsData(),
        extraJSON = sortExtracurricular(await apiService.fetchExtracurricularData());

    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero */}
            <div>
                <p className="text-5xl text-center">Ethan Ho</p>
                <p className="text-2xl text-center">Computer Science, B.S.</p>
            </div>
            {/* Skills */}
            <h1 className="2xl:mx-32 sm:mx-12 mx-1 text-3xl mt-5 py-1 px-auto font-bold uppercase">Skills</h1>
            <div className="2xl:mx-32 sm:mx-12 mx-1 bg-slate-600/[.2] rounded-lg border-2 border-gray-500">
                <div className=" grid md:grid-cols-3 md:divide-x-2 sm:grid-cols-1 md:divide-y-0 divide-solid divide-y-2 divide-gray-500">
                    <ItemContainer item={languagesJSON} title="Languages" icon="heroicons-outline:code" />
                    <ItemContainer item={skillsJSON} title="Skills" icon="heroicons-outline:user" />
                    <ItemContainer item={toolsJSON} title="Tools" icon="heroicons-outline:computer-desktop" />
                </div>
            </div>
            {/* Extracurricular */}
            <h1 className="2xl:mx-32 sm:mx-12 mx-1 text-3xl mt-5 py-1 px-auto font-bold uppercase">ExtracurricularS</h1>
            <ExtracurricularComponent data={extraJSON} />
        </div>
    );
}
