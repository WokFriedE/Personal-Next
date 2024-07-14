"use client";
import React from "react";
import deleteCookie from "@/../lib/deleteCookie";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function SignOut() {
    const handleClick = async () => {
        const res = deleteCookie();
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
