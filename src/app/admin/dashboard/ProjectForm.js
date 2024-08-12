"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ProjectFormComp(props) {
    const [pending, setPending] = useState(false);
    const handleSubmit = props.submit;
    const [features, setFeatures] = useState(1);

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedTools, setSelectedTools] = useState(null);
    const [selectedLangs, setSelectedLangs] = useState(null);
    const data = props.data ?? [];

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

    const handleUpdateItem = (event) => {
        if (event.target.value === "") {
            setSelectedItem(null);
            return;
        }
        setSelectedItem(data.find((item) => item.name === event.target.value));
    };

    const handleReset = () => {
        setPending(false);
        setFeatures(1);
        setSelectedItem(null);
    };

    const handleToolsSelect = (event) => {
        const selected = parseInt(event.target.value);
        if (!selectedTools) return;
        if (selectedTools && selectedTools.includes(selected)) setSelectedTools(selectedTools.filter((tool) => tool !== selected));
        else setSelectedTools([...selectedTools, selected]);
    };

    const handleLangsSelect = (event) => {
        const selected = parseInt(event.target.value);
        if (!selectedLangs) return;
        if (selectedLangs && selectedLangs.includes(selected)) setSelectedLangs(selectedLangs.filter((lang) => lang !== selected));
        else setSelectedLangs([...selectedLangs, selected]);
    };

    useEffect(() => {
        if (!selectedItem) {
            setFeatures(1);
            return;
        }
        setFeatures(selectedItem.features.length > 0 ? selectedItem.features.length : 1);
        const sTools = [];
        const sLangs = [];

        selectedItem.tech.forEach((tech) => {
            if (props.tools.map((tool) => tool.name).includes(tech.name)) sTools.push(tech.id);
            else sLangs.push(tech.id);
        });

        setSelectedTools(sTools);
        setSelectedLangs(sLangs);
    }, [selectedItem]);

    return (
        <div className="grid grid-cols-1">
            <select className="bg-gray-400 mt-3" onChange={handleUpdateItem}>
                <option value={""}>New Item</option>
                {data.map((item) => (
                    <option value={item.name} key={`extracurricular_obtain_${item.name}`}>
                        {item.name}
                    </option>
                ))}
            </select>

            <form className="grid grid-cols-1" id="project" onSubmit={handleSubmitAPI}>
                <label htmlFor="name">Name*</label>
                <input autoComplete="off" type="text" placeholder="Project" name="title" required defaultValue={selectedItem?.name ?? null} />

                <label htmlFor="link">Link</label>
                <input type="url" name="link" placeholder="Link" defaultValue={selectedItem?.link ?? null} />

                <label htmlFor="github">Github</label>
                <input type="url" name="Github" placeholder="Github" defaultValue={selectedItem?.github ?? null} />

                <label htmlFor="video">Video</label>
                <input type="url" name="video" placeholder="video" defaultValue={selectedItem?.videoSrc ?? null} />

                <label htmlFor={`current`}>Current?</label>
                <select name={`current`} className="m-1" form="project" defaultValue={selectedItem?.current ?? null}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>

                <label htmlFor="start">Start*</label>
                <input type="date" name="start" required defaultValue={selectedItem?.start ?? null} />

                <label htmlFor="end">End</label>
                <input type="date" name="end" defaultValue={selectedItem?.end ?? null} />

                <label htmlFor="img">Image</label>
                <input
                    type="file"
                    name="img"
                    placeholder="Image"
                    accept=".png,.jpg,.webp,.gif"
                    className="text-slate-50"
                    defaultValue={selectedItem?.imgSrc ?? null}
                />
                {console.log(selectedTools, selectedLangs)}
                <label htmlFor="tools">Tools</label>
                <select name="tools" form="project" multiple value={selectedTools} onChange={handleToolsSelect}>
                    {/*defaultValue= {selectedTools ?? null}>*/}
                    {props.tools.map((tool) => (
                        <option key={tool.id} value={tool.id}>
                            {tool.name}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => setSelectedTools([])} className="mt-2">
                    Clear
                </button>

                <label htmlFor="languages">Languages</label>
                <select name="languages" form="project" multiple value={selectedLangs} onChange={handleLangsSelect}>
                    {/* defaultValue={selectedLangs ?? null}> */}
                    {props.languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => setSelectedLangs([])} className="mt-2">
                    Clear
                </button>

                <label htmlFor="description">Description</label>
                <textarea name="description" placeholder="Description" defaultValue={selectedItem?.description ?? null} />

                {Array.from({ length: features }).map((_, index) => (
                    <fieldset form="project" key={`pos_${index}`} className="grid grid-cols-1 bg-slate-500 px-3 py-1 pb-2 rounded-md m-2">
                        <label htmlFor="description" className="text-slate-50">
                            Feature {index + 1}*
                        </label>
                        <textarea
                            form="project"
                            name={`feats`}
                            placeholder="Feature"
                            required
                            defaultValue={selectedItem?.features[index]?.feature}
                        />
                    </fieldset>
                ))}
                <div className="flex flex-row mx-auto gap-x-5">
                    <button
                        type="button"
                        className="flex-1 text-nowrap px-2 bg-slate-200 text-black rounded-md py-1 mt-3 hover:bg-slate-400"
                        onClick={() => setFeatures(features + 1)}
                    >
                        Add Position
                    </button>
                    <button
                        type="button"
                        className="flex-1 text-nowrap px-2 bg-red-400 text-black rounded-md py-1 mt-3 hover:bg-red-500"
                        onClick={() => features > 1 && setFeatures(features - 1)}
                    >
                        Remove Position
                    </button>
                </div>

                <fieldset className="flex flex-row px-3 gap-x-3">
                    <button type="submit" className="basicBtn mt-2 mx-auto" disabled={pending}>
                        {pending ? "Adding..." : "Add Item"}
                    </button>
                    <button type="button" className=" basicBtn mt-2 mx-auto " onClick={handleReset}>
                        {pending ? "Reset?" : "Reset"}
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
