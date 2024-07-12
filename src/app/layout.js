import { Inter } from "next/font/google";
import "../static/styles/globals.css";
import Head from "next/head";

import NavBar from "../components/nav";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Ethan H's Page",
    description: "A portfolio page for Ethan H. and his projects.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>Ethan Ho | Personal Portfolio</title>
                <link
                    rel="icon"
                    type="image/svg"
                    sizes="any"
                    href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='white' stroke-linejoin='round' stroke-width='4'%3E%3Crect width='36' height='28' x='6' y='6' rx='3'/%3E%3Cpath stroke-linecap='round' d='M14 42h20m-10-8v8'/%3E%3C/g%3E%3C/svg%3E"
                />
            </Head>
            <body className={inter.className + " p-5 flex flex-col"}>
                <div className="flex flex-row justify-center sticky top-3">
                    <NavBar />
                </div>
                <main className="my-5 flex-grow">{children}</main>
                <div className=" flex flex-row justify-center">
                    <Footer />
                </div>
            </body>
        </html>
    );
}
