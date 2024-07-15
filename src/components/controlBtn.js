"use client";
import React from "react";
import { toast } from "react-toastify";

export default function ControlButtons(props) {
    const api = props.api;
    const tok = props.tok;
    const handleClick = async () => {
        const res = fetch(api, {
            method: "POST",
            body: JSON.stringify({ task: props.task }),
            headers: {
                "Content-Type": "application/json",
                Authorization: tok,
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
        toast.promise(res, {
            pending: `${props.title} Adding...`,
            success: `${props.title} Added`,
            error: `${props.title} Error`,
        });
    };
    const handleClickDelete = async () => {
        const res = fetch(api, {
            method: "DELETE",
            body: JSON.stringify({ task: { method: "all" } }),
            headers: {
                "Content-Type": "application/json",
                Authorization: tok,
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
        toast.promise(res, {
            pending: `${props.title} Deleting...`,
            success: `${props.title} Deleted`,
            error: `${props.title} Error`,
        });
    };

    return (
        <div className="flex space-x-3 flex-row flex-initial">
            <button onClick={handleClick} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                Add All
            </button>
            <button onClick={handleClickDelete} className="flex-1 w-32 bg-slate-200 text-black rounded-md md:py-1">
                Delete All
            </button>
        </div>
    );
}
