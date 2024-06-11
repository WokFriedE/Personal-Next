import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col py-10">
            <p className="text-4xl text-center">
                Ethan Ho
            </p>
            <p className="text-xl text-center">
                Computer Science, B.S.
            </p>
            <div className="flex flex-wrap py-10 space-x-5 px-10">
                {/*   <button className="bg-gray-300 text-gray-700 flex-2 px-6 py-1 text-lg rounded-full">Tech Portfolio</button>
                <button className="bg-gray-300 text-gray-700 flex-2 px-6 py-1 text-lg rounded-full">Photo Portfolio</button> */}
                <div className="border-gray-500 border grow relative">
                    <p className="absolute -top-3.5 left-2 bg-gray-900 px-2 rounded-lg border-gray-500 border ">Tools</p>
                </div>
                <div className="border-gray-500 border grow relative">
                    <p className="absolute -top-3.5 left-2 bg-gray-900 px-2 rounded-lg border-gray-500 border ">Skill</p>
                </div>
            </div>
        </main>
    );
}
