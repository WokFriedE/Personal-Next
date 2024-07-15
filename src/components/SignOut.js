"use client";
import React from "react";
import { toast } from "react-toastify";
import { deleteAccessCookie } from "@/../lib/handleCookie";

export default function SignOut() {
    const handleClick = async () => {
        const res = deleteAccessCookie();
        toast.promise(res, {
            pending: "Signing Out...",
            success: "Signed Out",
            error: "Error",
        });
    };

    return (
        <button className="bg-red-700 px-2 py-1 rounded-lg w-fit hover:bg-red-800" onClick={handleClick}>
            Sign Out
        </button>
    );
}
