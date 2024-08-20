import React from "react";
import ItemContainer from "../components/item_display";
import sortExtracurricular from "../../lib/sortExtracurricular";
import ExtracurricularComponent from "../components/ExtracurricularComp";

import Debugger from "../components/debug";
import { extracurricularGET, languagesGet, skillsGet, toolsGet } from "../../lib/dbHandler";
// TODO Change the icons to b/w?
// TODO add a work experience section and a courses section

export default async function Home() {
    try {
        let languagesJSON = await languagesGet(),
            skillsJSON = await skillsGet(),
            toolsJSON = await toolsGet(),
            extraJSON = sortExtracurricular(await extracurricularGET());

        return (
            <div className="flex min-h-screen flex-col">
                {/* Hero */}
                <div className="flex flex-col items-center">
                    <p className="text-5xl text-center">Ethan Ho</p>
                    <p className="text-2xl text-center">Computer Science, B.S.</p>
                    <div className="mb-3" />
                    <img src="/images/formal_pfp.png" alt="profile picture" className="w-40 rounded-3xl"></img>
                </div>
                {/* Skills */}
                <h1 className="2xl:mx-32 sm:mx-12 mx-1 text-3xl mt-3 py-1 px-auto font-bold uppercase">Skills</h1>
                <div className="2xl:mx-32 sm:mx-12 mx-1 bg-slate-600/[.2] rounded-lg border-2 border-gray-500">
                    <div className=" grid md:grid-cols-3 md:divide-x-2 sm:grid-cols-1 md:divide-y-0 divide-solid divide-y-2 divide-gray-500">
                        {languagesJSON.length !== 0 ? (
                            <ItemContainer item={languagesJSON} title="Technologies" icon="heroicons-outline:code" />
                        ) : (
                            <></>
                        )}
                        {skillsJSON.length !== 0 ? <ItemContainer item={skillsJSON} title="Skills" icon="heroicons-outline:user" /> : <></>}
                        {toolsJSON.length !== 0 ? <ItemContainer item={toolsJSON} title="Tools" icon="heroicons-outline:computer-desktop" /> : <></>}
                    </div>
                </div>
                {/* Extracurricular */}
                {extraJSON.length !== 0 ? (
                    <>
                        <h1 className="2xl:mx-32 sm:mx-12 mx-1 text-3xl mt-5 py-1 px-auto font-bold uppercase">ExtracurricularS</h1>
                        <ExtracurricularComponent data={extraJSON} />
                    </>
                ) : (
                    <></>
                )}
            </div>
        );
    } catch (error) {
        console.error(error);

        if (error.message === "Invalid Token") {
            return (
                <div className="flex min-h-screen flex-col">
                    <p className="text-5xl text-center">Error</p>
                    <p className="text-2xl text-center">Invalid API Token</p>
                </div>
            );
        }
        return (
            <div className="flex min-h-screen flex-col">
                <p className="text-5xl text-center">Error</p>
                <p className="text-2xl text-center">An error has occurred.</p>
            </div>
        );
    }
}
