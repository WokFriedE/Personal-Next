"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ExtracurricularFormComp(props) {
    const [positions, setPositions] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);

    const [pending, setPending] = useState(false);
    const handleSubmit = props.submit;

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
        // console.log(selectedItem, data[event.target.value]);
    };

    const handleReset = () => {
        setPositions(1);
        setSelectedItem(null);
    };

    useEffect(() => {
        if (!selectedItem) {
            setPositions(1);
            return;
        }
        console.log(selectedItem);
        setPositions(selectedItem.positions.length > 0 ? selectedItem.positions.length : 1);
    }, [selectedItem]);

    return (
        <div className="grid grid-cols-1 gap-y-2">
            <select className="bg-gray-400 mt-3" onChange={handleUpdateItem}>
                <option value={""}>New Item</option>
                {data.map((item) => (
                    <option value={item.name} key={`extracurricular_obtain_${item.name}`}>
                        {item.name}
                    </option>
                ))}
            </select>

            <form className="grid grid-cols-1" id="extracurricular" onSubmit={handleSubmitAPI}>
                <label htmlFor="name">Name*</label>
                <input autoComplete="off" type="text" placeholder="Extracurricular" name="name" required defaultValue={selectedItem?.name ?? ""} />
                <label htmlFor="description">Description</label>
                <textarea name="description" placeholder="Description" defaultValue={selectedItem?.description ?? ""} />
            </form>

            {Array.from({ length: positions }).map((_, index) => (
                <fieldset form="extracurricular" key={`pos_${index}`} className="grid grid-cols-1 bg-slate-500 px-3 py-1 pb-2 rounded-md">
                    <label htmlFor="position">Position {index + 1}*</label>
                    <input
                        form="extracurricular"
                        placeholder={`Position ${index + 1} Title`}
                        name={`pos${index}_title`}
                        required
                        defaultValue={selectedItem?.positions[index]?.title ?? ""}
                    />
                    <label htmlFor={`pos${index}_current`}>Current?</label>
                    <select
                        name={`pos${index}_current`}
                        className="m-1"
                        form="extracurricular"
                        defaultValue={selectedItem?.positions[index]?.current ?? ""}
                    >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                    <label htmlFor="start">Start Date*</label>
                    <input
                        form="extracurricular"
                        type="date"
                        name={`pos${index}_start`}
                        required
                        defaultValue={selectedItem?.positions[index]?.start ?? ""}
                    />
                    <label htmlFor="date">End Date</label>
                    <input form="extracurricular" type="date" name={`pos${index}_end`} defaultValue={selectedItem?.positions[index]?.end ?? ""} />
                    <label htmlFor="description">Description</label>
                    <textarea
                        form="extracurricular"
                        name={`pos${index}_description`}
                        placeholder="Description"
                        defaultValue={selectedItem?.positions[index]?.description ?? ""}
                    />
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

            <fieldset className="flex flex-row px-3 gap-x-3" form="extracurricular">
                <button type="submit" className="basicBtn mt-2 mx-auto" disabled={pending} form="extracurricular">
                    {pending ? "Adding..." : "Add Item"}
                </button>
                <button type="reset" className=" basicBtn mt-2 mx-auto" disabled={pending} onClick={handleReset} form="extracurricular">
                    {pending ? "Adding..." : "Reset"}
                </button>
            </fieldset>
        </div>
    );
}
