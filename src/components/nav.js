"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Photography: "/portfolio/photo",
export default function nav() {
    let pages = { About: "/", Projects: "/portfolio/tech", Contact: "/contact" };
    const pathname = usePathname();

    function currentPage(item) {
        if (
            (item === "About" && pathname === "/") ||
            (item === "Projects" && pathname === "/portfolio/tech") ||
            // (item === "Photography" && pathname === "/portfolio/photo") ||
            (item === "Contact" && pathname === "/contact") ||
            (item === "Admin" && pathname === "/admin/dashboard")
        ) {
            return "bg-zinc-500";
        }
    }

    return (
        <div className="rounded-full bg-zinc-700 w-fit p-0.5 py-1.5">
            {Object.keys(pages).map((item, index) => (
                <Link href={pages[item]} key={`link_${item}`}>
                    <button
                        className={"py-1 px-3 mx-1 rounded-full hover:bg-zinc-300 hover:text-gray-700 ease-in-out duration-150 " + currentPage(item)}
                        key={"btn" + index}
                    >
                        {item}
                    </button>
                </Link>
            ))}
        </div>
    );
}
