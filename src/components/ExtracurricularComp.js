"use client";
import React, { useState } from "react";

export default function ExtracurricularComponent(props) {
    const extraData = props.data;
    const [currentExtra, setCurrentExtra] = useState(extraData[0]);

    return (
        <div className="2xl:mx-32 sm:mx-12 mx-1 bg-slate-600/[.2] rounded-lg border-2 border-gray-500">
            {/* Selection */}
            <div className="overflow-auto flex divide-x border-b-2 bg-slate-700 border-gray-500 rounded-t-md">
                {extraData.map((item) => (
                    <div key={`div_${item.id}`} className="flex-1 justify-center flex">
                        <button
                            className={
                                (currentExtra.name === item.name ? "border-b-2 border-gray-400" : "border-b-2 border-transparent") +
                                " flex-1 text-nowrap py-0.5 px-3 mx-2 my-1.5 hover:border-b-2 hover:border-gray-200 ease-in-out duration-100 text-center align-middle"
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
            <div className="grid grid-cols-2 grid-flow-col w-auto divide-x my-2 px-10 py-2">
                <div className="flex flex-col items-center justify-center border-gray-500">
                    <h2 className="text-3xl font-semibold">{currentExtra.name}</h2>
                    <p className="mx-16 text-center text-md italic">{currentExtra.description}</p>
                </div>
                <div className="flex flex-col justify-center items-center border-gray-500 px-5 h-80 overflow-auto" style={{ scrollbarWidth: "thin" }}>
                    {currentExtra.positions.map((pos) => (
                        <div className="m-2" key={pos.id}>
                            <p className="text-xl text-center font-medium">{pos.title}</p>
                            <p className="text-md text-center">
                                {pos.start}
                                {pos.current == 1 ? " - Current" : ` - ${pos.end}`}
                            </p>
                            <p className="text-sm text-center italic font-normal">{pos.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
