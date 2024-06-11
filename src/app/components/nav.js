"use client";

import React from "react";
import { usePathname } from 'next/navigation';

export default function nav() {

    let pages = ["About", "Portfolio", "Photography", "Resume"];
    const pathname = usePathname();

    function currentPage(item) {
        if ((item === "About" && pathname === "/") || (item === "Portfolio" && pathname === "/portfolio/tech") || (item === "Photography" && pathname === "/portfolio/photo") || (item === "Resume" && pathname === "/resume")) {
            return "bg-zinc-500";
        }
    }

    return (
        <div className="rounded-full bg-zinc-700 w-fit">
            {pages.map((item, index) => (
                <button className={("py-1 px-6 rounded-full m-1.5 hover:bg-zinc-300 hover:text-gray-700 ") + currentPage(item)} key={"btn" + index}>
                    {item}
                </button>
            ))}
        </div>
    );
}