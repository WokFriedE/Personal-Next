import React from "react";
import languagesJSON from "../static/data/languages.json";
import skillsJSON from "../static/data/skills.json";
import toolsJSON from "../static/data/tools.json";

import ItemContainer from "./components/item_display";

// Change the icons to b/w

export default function Home() {
    // const [langs, setLangs] = useState([]);
    // const [tools, setTools] = useState([]);
    // const [skills, setSkills] = useState([]);

    // useEffect(() => {
    //     setLangs(languagesJSON);
    //     setSkills(skillsJSON);
    //     setTools(toolsJSON);
    // }, []);

    return (
        <main className="flex min-h-screen flex-col py-10">
            <div>
                <p className="text-4xl text-center">
                    Ethan Ho
                </p>
                <p className="text-xl text-center">
                    Computer Science, B.S.
                </p>
            </div>
            <h1 className="text-2xl mt-5 py-1 px-auto mx-20 2xl:mx-32">SKILLS</h1>
            <div className="bg-slate-600/[.2] rounded-md p-1 2xl:mx-32 mx-12 border-2 border-gray-500 py-2">
                <div className="flex flex-wrap pt-2 px-10">
                    {/*   <button className="bg-gray-300 text-gray-700 flex-2 px-6 py-1 text-lg rounded-full">Tech Portfolio</button>
<button className="bg-gray-300 text-gray-700 flex-2 px-6 py-1 text-lg rounded-full">Photo Portfolio</button> */}
                    <ItemContainer title="Tools" item={toolsJSON} />
                    <ItemContainer title="Soft Skills" item={skillsJSON} />
                </div>
                <div className="flex flex-wrap py-1 px-10">
                    <ItemContainer title="Languages" item={languagesJSON} />
                </div>
            </div>
            <h1 className="text-2xl mt-5 py-1 px-auto mx-20 2xl:mx-32">EXTRACURRICULARS</h1>
            <div className="bg-slate-600/[.2] rounded-md p-1 2xl:mx-32 mx-12 border-2 border-gray-500 py-2">
            </div>
        </main>
    );
}


