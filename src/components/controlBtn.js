"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ControlButtons(props) {
    const [task, setTask] = useState("");
    const api = props.api;
    const handleClick = async () => {
        const res = props.add(api, task);
        toast.promise(res, {
            pending: `${props.title} Adding...`,
            success: `${props.title} Added`,
            error: `${props.title} Error`,
        });
    };
    const handleClickDelete = async () => {
        const res = props.delete(api);
        toast.promise(res, {
            pending: `${props.title} Deleting...`,
            success: `${props.title} Deleted`,
            error: `${props.title} Error`,
        });
    };

    const taskUpdate = (e) => {
        // setTask(e.target.value);
        const info = e.target.value;
        try {
            console.log(JSON.parse(info));
            setTask(JSON.parse(info));
            toast.success("Valid JSON");
        } catch (error) {
            toast.error("Invalid JSON");
        }
    };

    return (
        <div className="flex flex-col gap-y-3">
            <textarea onChange={taskUpdate} className="flex" placeholder="JSON" />
            <div className="flex gap-x-3 flex-row flex-initial">
                <button onClick={handleClick} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                    Add All
                </button>
                <button onClick={handleClickDelete} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                    Delete All
                </button>
            </div>
        </div>
    );
}
