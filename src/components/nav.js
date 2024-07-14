"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Photography: "/portfolio/photo",
export default function nav() {
    let pages = { About: "/", Projects: "/portfolio/tech", Resume: "/resume", Admin: "/admin/data" };
    const pathname = usePathname();

    function currentPage(item) {
        if (
            (item === "About" && pathname === "/") ||
            (item === "Projects" && pathname === "/portfolio/tech") ||
            // (item === "Photography" && pathname === "/portfolio/photo") ||
            (item === "Resume" && pathname === "/resume") ||
            (item === "Admin" && pathname === "/admin/data")
        ) {
            return "bg-zinc-500";
        }
    }

    return (
        <div className="rounded-full bg-zinc-700 w-fit">
            {Object.keys(pages).map((item, index) => (
                <Link href={pages[item]} key={`link_${item}`}>
                    <button
                        className={"py-1 px-6 rounded-full m-1.5 hover:bg-zinc-300 hover:text-gray-700 ease-in-out duration-150 " + currentPage(item)}
                        key={"btn" + index}
                    >
                        {item}
                    </button>
                </Link>
            ))}
        </div>
    );
}
