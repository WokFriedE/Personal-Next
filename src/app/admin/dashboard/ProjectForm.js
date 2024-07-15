import React from "react";

export default function ProjectFormComp(props) {
    return (
        <div className="grid grid-cols-1">
            <form className="grid grid-cols-1" id="project" action={props.handleSubmit}>
                <label htmlFor="name">Name*</label>
                <input autoComplete="off" type="text" placeholder="Project" name="title" required />

                <label htmlFor="link">Link</label>
                <input type="url" name="link" placeholder="Link" />

                <label htmlFor="github">Github</label>
                <input type="url" name="Github" placeholder="Github" />

                <label htmlFor="video">Video</label>
                <input type="url" name="video" placeholder="video" />

                <label htmlFor={`current`}>Current?</label>
                <select name={`current`} className="m-1" form="extracurricular">
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>

                <label htmlFor="start">Start*</label>
                <input type="date" name="start" required />

                <label htmlFor="end">End</label>
                <input type="date" name="end" />

                <label htmlFor="img">Image</label>
                <input type="file" name="img" placeholder="Image" accept=".png,.jpg,.webp,.gif" className="text-slate-50" />

                <label htmlFor="tools">Tools</label>
                <select name="tools" form="project" multiple>
                    {props.tools.map((tool) => (
                        <option key={tool.id} value={tool.id}>
                            {tool.title}
                        </option>
                    ))}
                </select>

                <label htmlFor="languages">Languages</label>
                <select name="languages" form="project" multiple>
                    {props.languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>
                            {lang.title}
                        </option>
                    ))}
                </select>

                <label htmlFor="description">Description</label>
                <textarea name="description" placeholder="Description" />

                <button type="submit" className="mt-2 mx-auto">
                    Add Project
                </button>
            </form>
        </div>
    );
}
