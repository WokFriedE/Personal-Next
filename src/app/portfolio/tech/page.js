import React from "react";
import apiHandler from "../../../../lib/apiHandler.js";

async function TechPage() {
    const projectData = await apiHandler.fetchProjectsData();

    return (
        <div className="flex min-h-max flex-col">
            <p>hello</p>
        </div>
    );
}

export default TechPage;
