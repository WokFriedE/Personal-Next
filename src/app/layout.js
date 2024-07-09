import { Inter } from "next/font/google";
import "../static/styles/globals.css";
import Head from "next/head";

import NavBar from "./components/nav";
import Footer from "./components/footer";
import fav from "../../public/comp.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Ethan H's Page",
    description: "A portfolio page for Ethan H. and his projects.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>Ethan Ho's Page</title>
                <link rel="icon" type="image/x-icon" href="../../public/comp.svg" />
            </Head>
            <body className={inter.className}>
                <div className="p-5">
                    <div className="flex flex-row justify-center">
                        <NavBar />
                    </div>
                    {children}
                    <div className="flex flex-row justify-center">
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
