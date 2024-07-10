"use client";
import React, { useState } from "react";

export default function ExtracurricularComponent(props) {
    const extraData = props.data;
    const [currentExtra, setCurrentExtra] = useState(extraData[0]);

    return (
        <div className="2xl:mx-32 sm:mx-12 mx-1 bg-slate-600/[.2] rounded-lg border-2 border-gray-500 relative mt-7">
            {/* Selection */}
            <div className="flex divide-x border-2 absolute -top-7 -left-0.5 rounded-md bg-gray-800 border-gray-500">
                {extraData.map((item) => (
                    <div key={`div_${item.id}`}>
                        <button
                            className={
                                (currentExtra.name === item.name && "border-b-2 border-gray-400") +
                                " py-0.5 px-3 mx-2 my-1.5 hover:border-b-2 hover:border-gray-200 ease-in-out duration-100"
                            }
                            key={`btn${item.id}`}
                            onClick={() => setCurrentExtra(item)}
                        >
                            {item.name}
                        </button>
                    </div>
                ))}
            </div>
            {/* Info */}
            <div className="mt-8"></div>
        </div>
    );
}
