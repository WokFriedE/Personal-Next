"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ItemForm(props) {
    const handleSubmit = props.submit.bind(null, props.api);
    const [selectedItem, setSelectedItem] = useState({});
    const types = props.types ?? ["n/a"];
    const propsData = props.data ?? [];
    const [pending, setPending] = useState(false);

    const handleSubmitAPI = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setPending(true);
        const res = handleSubmit(formData)
            .then(() => {
                setPending(false);
                toast.promise(res, {
                    pending: `${props.api} | Adding...`,
                    success: `${props.api} | Added`,
                    error: `${props.api} | Error`,
                });
            })
            .catch((err) => {
                toast.error("An error has occured");
                setPending(false);
            });
    };

    const handleUpdateItem = (event) => {
        if (event.target.value === "") return;
        setSelectedItem(propsData[event.target.value]);
    };

    return (
        <form className="grid grid-cols-1 py-2" onSubmit={handleSubmitAPI}>
            <select className="bg-gray-400" onSubmit={handleUpdateItem}>
                <option value={""}>New Item</option>
                {propsData.map((item) => (
                    <option value={item.name} key={`${props.api}_obtain_${item.name}`}>
                        {console.log(item)}
                        {item.name}
                    </option>
                ))}
            </select>
            <label className="text-slate-50" htmlFor="name">
                Name*
            </label>
            {console.log(selectedItem.name)}
            <input autoComplete="off" type="text" placeholder="Language" name="name" required defaultValue={selectedItem.name ?? ""} />
            <label className="text-slate-50" htmlFor="proficiency">
                Proficiency
            </label>
            <input autoComplete="off" type="number" placeholder="Proficiency" name="proficiency" />
            <label className="text-slate-50" htmlFor="type">
                Type*
            </label>
            <select name="type" placeholder="Type" required>
                {types.map((type) => (
                    <option value={type} key={`menu_${type}`}>
                        {type}
                    </option>
                ))}
            </select>
            <label className="text-slate-50" htmlFor="icon" required>
                Icon*
            </label>
            <input autoComplete="off" type="text" name="icon" placeholder="Icon" defaultValue={"vscode-icons:default-file"} />
            <label className="text-slate-50" htmlFor="description">
                Description
            </label>
            <textarea name="description" placeholder="Description" />
            <fieldset className="flex flex-row px-3 gap-x-3">
                <button type="submit" className="basicBtn mt-2 mx-auto" disabled={pending}>
                    {pending ? "Adding..." : "Add Item"}
                </button>
                <button type="reset" className=" basicBtn mt-2 mx-auto" disabled={pending}>
                    {pending ? "Adding..." : "Reset"}
                </button>
            </fieldset>
        </form>
    );
}
