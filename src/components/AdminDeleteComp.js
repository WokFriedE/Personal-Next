"use client";
import React, { useState } from "react";

export default function AdminDeleteComp(props) {
    const data = props.data.map((item) => ({ title: item.name ?? item.title, id: item.id, is_active: item.is_active }));
    const [selectedDelete, setSelectedDelete] = useState(data[0] ?? "");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await props.delete(props.api, selectedDelete);
    };

    const handleChange = (event) => {
        setSelectedDelete(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select onChange={handleChange} value={selectedDelete}>
                    {data.map((item) => (
                        <option value={item.title} key={`delete_${item.id}`}>
                            {item.title}
                            {item.is_active ? "" : "*"}
                        </option>
                    ))}
                </select>
                <button>Delete</button>
            </form>
        </div>
    );
}
