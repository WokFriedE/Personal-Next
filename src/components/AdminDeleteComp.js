"use client";
import React, { useState } from "react";

export default function AdminDeleteComp(props) {
    const [data, setData] = useState(props.data.map((item) => ({ name: item.name ?? item.title, id: item.id, is_active: item.is_active })));
    const [selectedDelete, setSelectedDelete] = useState(data[0] ?? "");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await props.delete(props.api, selectedDelete).then(() => {
            setData(
                data.map((item) => {
                    if (item.title === selectedDelete) item.is_active = !item.is_active;
                    return item;
                })
            );
        });
    };

    const handleChange = (event) => {
        setSelectedDelete(event.target.value);
    };

    return (
        <div className="px-auto flex justify-center">
            <form onSubmit={handleSubmit} className="gap-x-2 flex my-2">
                <select onChange={handleChange} value={selectedDelete}>
                    {data.map((item) => (
                        <option value={item.name} key={`delete_${item.id}`}>
                            {item.title}
                            {!item.is_active ? "*" : ""}
                        </option>
                    ))}
                </select>
                <button>Toggle</button>
            </form>
        </div>
    );
}
