"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProjectFormComp(props) {
    const [pending, setPending] = useState(false);
    const handleSubmit = props.submit;
    const [positions, setPositions] = useState(1);

    const handleSubmitAPI = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setPending(true);
        const res = handleSubmit(formData)
            .then(() => {
                setPending(false);
                toast.promise(res, {
                    pending: "Project | Adding...",
                    success: "Project | Added",
                    error: "Project | Error",
                });
            })
            .catch((err) => {
                toast.error("An error has occured");
                setPending(false);
            });
    };

    return (
        <div className="grid grid-cols-1">
            <form className="grid grid-cols-1" id="project" onSubmit={handleSubmitAPI}>
                <label htmlFor="name">Name*</label>
                <input autoComplete="off" type="text" placeholder="Project" name="title" required />

                <label htmlFor="link">Link</label>
                <input type="url" name="link" placeholder="Link" />

                <label htmlFor="github">Github</label>
                <input type="url" name="Github" placeholder="Github" />

                <label htmlFor="video">Video</label>
                <input type="url" name="video" placeholder="video" />

                <label htmlFor={`current`}>Current?</label>
                <select name={`current`} className="m-1" form="project">
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>

                <label htmlFor="start">Start*</label>
                <input type="date" name="start" required />

                <label htmlFor="end">End</label>
                <input type="date" name="end" />

                <label htmlFor="img">Image</label>
                <input type="file" name="img" placeholder="Image" accept=".png,.jpg,.webp,.gif" className="text-slate-50" />

                <label htmlFor="tools">Tools</label>
                <select name="tools" form="project" multiple>
                    {props.tools.map((tool) => (
                        <option key={tool.id} value={tool.id}>
                            {tool.title}
                        </option>
                    ))}
                </select>

                <label htmlFor="languages">Languages</label>
                <select name="languages" form="project" multiple>
                    {props.languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>
                            {lang.title}
                        </option>
                    ))}
                </select>

                <label htmlFor="description">Description</label>
                <textarea name="description" placeholder="Description" />

                {Array.from({ length: positions }).map((_, index) => (
                    <fieldset form="project" key={`pos_${index}`} className="grid grid-cols-1 bg-slate-500 px-3 py-1 pb-2 rounded-md m-2">
                        <label htmlFor="description" className="text-slate-50">
                            Feature {index + 1}*
                        </label>
                        <textarea form="project" name={`feats`} placeholder="Feature" required />
                    </fieldset>
                ))}
                <div className="flex flex-row mx-auto gap-x-5">
                    <button
                        type="button"
                        className="flex-1 text-nowrap px-2 bg-slate-200 text-black rounded-md py-1 mt-3 hover:bg-slate-400"
                        onClick={() => setPositions(positions + 1)}
                    >
                        Add Position
                    </button>
                    <button
                        type="button"
                        className="flex-1 text-nowrap px-2 bg-red-400 text-black rounded-md py-1 mt-3 hover:bg-red-500"
                        onClick={() => positions > 1 && setPositions(positions - 1)}
                    >
                        Remove Position
                    </button>
                </div>

                <fieldset className="flex flex-row px-3 gap-x-3">
                    <button type="submit" className="basicBtn mt-2 mx-auto" disabled={pending}>
                        {pending ? "Adding..." : "Add Item"}
                    </button>
                    <button
                        type="button"
                        className=" basicBtn mt-2 mx-auto "
                        onClick={() => {
                            setPending(false);
                            setPositions(1);
                        }}
                    >
                        {pending ? "Reset?" : "Reset"}
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
