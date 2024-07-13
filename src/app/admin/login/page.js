"use client";
import React from "react";

export default function loginAdmin() {
    // const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">Login</h1>
            <form onSubmit={handleSubmit}>
                <input className="text-slate-950" type="text" name="PASSWORD" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
