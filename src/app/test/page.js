import React from "react";
import { projectPOST, toolsDelete, toolsGet, toolsPost } from "@/../lib/dbHandler";

export default async function TestPage(props) {
    const test = async () => {
        "use server";
        console.log(await toolsGet());
    };
    const testDelete = async () => {
        "use server";
        await toolsDelete();
    };

    const addTest = async (formData) => {
        "use server";
        let data = [];
        try {
            data = JSON.parse(formData.get("jsonD"));
            console.log("valid json");
            await projectPOST(data);
        } catch (err) {
            console.log("invalid json");
        }
    };

    return (
        <div>
            <p>Test Page</p>
            <form action={test}>
                <button type="submit">submit</button>
            </form>
            <form action={testDelete}>
                <button type="submit">delete</button>
            </form>
            <br />
            {/* <Button /> */}
            <form action={addTest}>
                <textarea name="jsonD" placeholder="json" />
                <button type="submit">submit</button>
            </form>
            {/* <Button /> */}
        </div>
    );
}
