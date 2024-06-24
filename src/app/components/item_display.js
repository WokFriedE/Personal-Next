"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function DisplayContainer(props) {

    const [innerData, setInnerData] = useState("");

    return (
        <div className="border-gray-500 border flex-1 relative m-2 min-w-52 items-center justify-center flex rounded-md">
            <p className="absolute -top-3.5 left-2 bg-gray-900 px-2 rounded-lg border-gray-500 border ">{props.title}</p>
            <div className="flex px-3 py-4 flex-wrap items-center justify-center">
                {props.item.map((item) => (<div className="flex-initial px-4 rounded-full border-2 border-neutral-700 m-1 flex items-center gap-x-1">
                    {item.icon &&
                        <Icon icon={item.icon}></Icon>}
                    <p p className="text-center" style={{ hover: {} }}>
                        {item.name}
                    </p>
                </div>
                )
                )}
            </div>
        </div >
    );
}
