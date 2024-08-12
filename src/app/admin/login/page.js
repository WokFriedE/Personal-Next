"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { getAccessCookie } from "../../../../lib/handleCookie";
// import { loginPOST } from "../../../../lib/dbHandler";
import { handleLogin as handleLoginLocal } from "../../../../lib/handleCookie";

export default function loginAdmin() {
    const [visible, setVisible] = useState(false);
    const [access, setAccess] = useState(false);

    const handleVisibility = () => {
        setVisible(!visible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.username.value === "" || e.target.password.value === "") {
            toast.warning("Empty fields");
            return;
        }
        const user = e.target.username.value;
        const pass = e.target.password.value;

        if (handleLoginLocal(user, pass)) {
            toast.success("Logged in");
            setAccess(true);
        } else {
            toast.warning("Invalid");
        }
    };

    const getCookie = async () => {
        const val = await getAccessCookie();
        if (val) setAccess(true);
    };

    useEffect(() => {
        getCookie();
        if (access) redirect("/admin/dashboard");
    }, [access]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
                <label className="text-xl">Username</label>
                <input className="text-slate-950" type="text" name="username" autoComplete="username" />
                <label className="text-xl">Password</label>
                <input className="text-slate-950" type={visible ? "text" : "password"} name="password" autoComplete="current-password" />
                <span className="flex flex-row">
                    <button type="button" onClick={handleVisibility} className="ml-2 h-auto">
                        <Icon icon={visible ? "material-symbols:visibility" : "material-symbols:visibility-off"} />
                    </button>
                </span>
                <button type="submit" className="text-xl bg-slate-600 rounded-sm">
                    Submit
                </button>
            </form>
        </div>
    );
}
