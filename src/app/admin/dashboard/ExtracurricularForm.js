"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ExtracurricularFormComp(props) {
    const [positions, setPositions] = useState(1);

    const [pending, setPending] = useState(false);
    const handleSubmit = props.submit;

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
        <div className="grid grid-cols-1 gap-y-3">
            <form className="grid grid-cols-1" id="extracurricular" onSubmit={handleSubmitAPI}>
                <label htmlFor="name">Name*</label>
                <input autoComplete="off" type="text" placeholder="Extracurricular" name="name" required />
                <label htmlFor="description">Description</label>
                <textarea name="description" placeholder="Description" />
            </form>

            {Array.from({ length: positions }).map((_, index) => (
                <fieldset form="extracurricular" key={`pos_${index}`} className="grid grid-cols-1 bg-slate-500 px-3 py-1 pb-2 rounded-md">
                    <label htmlFor="position">Position {index + 1}*</label>
                    <input form="extracurricular" placeholder={`Position ${index + 1} Title`} name={`pos${index}_title`} required />
                    <label htmlFor={`pos${index}_current`}>Current?</label>
                    <select name={`pos${index}_current`} className="m-1" form="extracurricular">
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                    <label htmlFor="start">Start Date*</label>
                    <input form="extracurricular" type="date" name={`pos${index}_start`} required />
                    <label htmlFor="date">End Date</label>
                    <input form="extracurricular" type="date" name={`pos${index}_end`} />
                    <label htmlFor="description">Description</label>
                    <textarea form="extracurricular" name={`pos${index}_description`} placeholder="Description" />
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
                <button type="reset" className=" basicBtn mt-2 mx-auto" disabled={pending} onClick={() => setPositions(1)} form="extracurricular">
                    {pending ? "Adding..." : "Reset"}
                </button>
            </fieldset>
        </div>
    );
}
