import React from "react";
import { Icon } from "@iconify/react";
import { projectGET } from "../../../../lib/dbHandler";

async function TechPage() {
    const projectData = await projectGET();

    return (
        <div className="flex min-h-max flex-col justify-center items-center">
            {/* Each Project */}
            {projectData.map((project, i) => (
                <div className={"py-5 w-screen " + (i % 2 === 0 && "bg-slate-800")} key={`project_${i}`}>
                    <div className={"mx-10 lg:mx-20"}>
                        <h2 className="text-3xl text-center">{project.title}</h2>
                        {/* Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 my-2 gap-x-10 items-center gap-y-4">
                            {/* Left Side */}
                            <div className="flex flex-col flex-1 text-left gap-y-2">
                                {/* Desc */}
                                <p className="text-left">{project.description}</p>
                                {/* Features */}
                                <div className="flex flex-col">
                                    <p>Features:</p>
                                    <ul className="items-center justify-center ml-5 list-disc">
                                        {project.features.map((item) => (
                                            <li key={`feat_${item.id}`} className="text-wrap">
                                                {item.feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Chips */}
                                <div className="flex flex-row justify-center flex-wrap">
                                    {project.tech.map((item) => (
                                        <div className="flex flex-wrap items-center justify-center" key={item.name}>
                                            <div className="flex flex-initial sm:my-2 px-4 py-0.5 m-1 rounded-full items-center gap-x-2 bg-neutral-900 border border-neutral-500">
                                                {item.icon && <Icon icon={item.icon} />}
                                                <p className="text-center">{item.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Links */}
                                <div className="flex flex-row justify-center gap-x-2.5">
                                    {/* Website */}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            className="bg-neutral-700 p-1.5 w-fit h-fit rounded-full hover:scale-110 hover:ease-in-out hover:duration-75 hover:bg-neutral-500"
                                        >
                                            <Icon icon={"mdi:web"} className="text-3xl" />
                                        </a>
                                    )}
                                    {/* Github */}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            className="bg-neutral-700 p-1.5 w-fit h-fit rounded-full hover:scale-110 hover:ease-in-out hover:duration-75 hover:bg-neutral-500"
                                        >
                                            <Icon icon={"bi:github"} className="text-3xl" />
                                        </a>
                                    )}
                                    {/* Video */}
                                    {project.videoSrc && (
                                        <a
                                            href={project.videoSrc}
                                            className="bg-neutral-700 p-1.5 w-fit h-fit rounded-full hover:scale-110 hover:ease-in-out hover:duration-75 hover:bg-neutral-500"
                                        >
                                            <Icon icon={"material-symbols:video-camera-back"} className="text-3xl" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            {/* Right side */}
                            <div className="flex-1 flex justify-center">
                                <img src={project.imgSrc} alt={project.title} className="lg:h-64 lg:max-w-[70%] border border-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TechPage;
