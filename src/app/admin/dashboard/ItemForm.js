import React from "react";
import apiService from "../../../../lib/apiHandler";
import { toastMsg } from "@/../lib/toastCli";

export default function ItemForm(props) {
    const itemSubmit = async (formData) => {
        "use server";
        const output = {
            name: formData.get("name"),
            proficiency: formData.get("proficiency"),
            type: formData.get("type"),
            icon: formData.get("icon"),
            description: formData.get("description"),
        };
        console.log(output, props.api);
        // try {
        //     const res = await fetch(props.api, {
        //         method: "POST",
        //         body: JSON.stringify({ task: output }),
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: process.env.API_TOK,
        //         },
        //     }).catch((err) => {
        //         console.error(err);
        //         throw new Error("Network error or unexpected response");
        //     });
        //     toast.promise(res, {
        //         pending: "Adding to " + props.api + "...",
        //         success: props.api + " Added",
        //         error: props.api + " Error",
        //     });
        // } catch (err) {
        //     console.error(err);
        //     toast.error("Network error or unexpected response");
        // }
    };
    toastMsg("hi", "info");

    return (
        <form className="grid grid-cols-1" action={itemSubmit}>
            <label className="text-slate-50" htmlFor="name">
                Name*
            </label>
            <input autoComplete="off" type="text" placeholder="Language" name="name" required />
            <label className="text-slate-50" htmlFor="proficiency">
                Proficiency
            </label>
            <input autoComplete="off" type="number" placeholder="Proficiency" name="proficiency" />
            <label className="text-slate-50" htmlFor="type">
                Type*
            </label>
            <select name="type" placeholder="Type" required>
                <option value={"language"}>Language</option>
                <option value={"framework"}>Framework</option>
                <option value={"library"}>Library</option>
                <option value={"database"}>Database</option>
                <option value={"other"}>Other</option>
            </select>
            <label className="text-slate-50" htmlFor="icon" required>
                Icon*
            </label>
            <input autoComplete="off" type="text" name="icon" placeholder="Icon" defaultValue={"vscode-icons:default-file"} />
            <label className="text-slate-50" htmlFor="description">
                Description
            </label>
            <textarea name="description" placeholder="Description" />
            <button type="submit" className="mt-2 mx-auto">
                Add
            </button>
        </form>
    );
}
