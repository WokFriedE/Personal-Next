"use client";
import React from "react";

export default function ControlButtons(props) {
    const api = props.api;
    const tok = props.tok;
    const handleClick = async () => {
        const res = await fetch(api, {
            method: "POST",
            body: JSON.stringify({ task: props.task }),
            headers: {
                "Content-Type": "application/json",
                Authorization: tok,
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };
    const handleClickDelete = async () => {
        fetch(api, {
            method: "DELETE",
            body: JSON.stringify({ task: { method: "all" } }),
            headers: {
                "Content-Type": "application/json",
                Authorization: tok,
            },
        })
            .catch((err) => console.error(err))
            .then(console.log("Success"));
    };

    return (
        <div className="flex flex-col flex-1 bg-slate-600 px-2 rounded-md py-2">
            <p>{props.title}</p>
            <div className="flex space-x-3 flex-row flex-1">
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
