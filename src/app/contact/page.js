import { Icon } from "@iconify/react";
import React from "react";

export default function ResumePage() {
    const LinkedIn = process.env.LINKEDIN;
    const Github = process.env.GITHUB;
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col gap-y-3 min-w-fit w-64 items-center">
                <h3 className="text-center text-lg">Please feel free to contact me via any of the following</h3>
                <a
                    href={LinkedIn}
                    className="bg-neutral-700 px-4 py-1.5 w-fit h-fit rounded-full hover:scale-110 hover:ease-in-out hover:duration-75 hover:bg-neutral-500 flex flex-row items-center gap-x-2"
                >
                    <Icon icon={"grommet-icons:linkedin-option"} className="text-3xl" />
                    <h3>LinkedIn</h3>
                </a>
                <a
                    href={Github}
                    className="bg-neutral-700 px-4 py-1.5 w-max h-fit rounded-full hover:scale-110 hover:ease-in-out hover:duration-75 hover:bg-neutral-500 flex flex-row items-center gap-x-2"
                >
                    <Icon icon={"grommet-icons:github"} className="text-3xl" />
                    <h3>Github</h3>
                </a>
            </div>
        </div>
    );
}
