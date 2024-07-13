import React from "react";
import languagesJSON from "../../../static/data/languages.json";
import toolsJSON from "../../../static/data/tools.json";
import skillsJSON from "../../../static/data/skills.json";
import extracurricularJSON from "../../../static/data/manual/extracurricular.json";
import projectJSON from "../../../static/data/manual/projects.json";

import ControlButtons from "../../../components/controlBtn";

export default function adminDataPage() {
    const token = process.env.API_TOK;
    return (
        <div className="flex min-h-screen flex-col py-10">
            <h1>Admin Data Page</h1>
            <div className="flex flex-row gap-x-3 flex-wrap gap-y-3">
                {/* Langs */}
                <ControlButtons title="Language" api="/api/languages" task={languagesJSON} tok={token} />
                {/* Tools */}
                <ControlButtons title="Tools" api="/api/tools" task={toolsJSON} tok={token} />
                {/* Skills */}
                <ControlButtons title="Skills" api="/api/skills" task={skillsJSON} tok={token} />
                {/* Extracurricular */}
                <ControlButtons title="Extracurricular" api="/api/extracurricular" task={extracurricularJSON} tok={token} />
                {/* Projects */}
                <ControlButtons title="Projects" api="/api/projects" task={projectJSON} tok={token} />
            </div>
        </div>
    );
}
