"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function DisplayContainer(props) {

    return (
        <div className="p-5 flex flex-col items-center">
            {props.icon &&
                <Icon icon={props.icon} className="text-4xl my-1" />}
            <h4 className="md:text-2xl sm:text-xl text-sm pb-2 text-center capitalize ">{props.title}</h4>
            <div className="flex flex-wrap items-center justify-center">
                {props.item.map((item) => (<div className="flex flex-initial sm:my-2 px-4 rounded-full border-2 border-neutral-700 m-1 items-center gap-x-1">
                    {item.icon &&
                        <Icon icon={item.icon} />}
                    <p p className="text-center">
                        {item.name}
                    </p>
                </div>
                )
                )}
            </div>
        </div >
    );
}
