import React from "react";

export default function AdminDeleteComp(props) {
    const data = props.data.map((item) => item.name ?? item.title);

    return (
        <div>
            <form>
                <select>
                    {data.map((item) => (
                        <option value={item}>{item}</option>
                    ))}
                </select>
                <button>Delete</button>
            </form>
        </div>
    );
}
