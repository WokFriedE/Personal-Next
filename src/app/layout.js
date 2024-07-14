import { Inter } from "next/font/google";
import "../static/styles/globals.css";

import { ToastContainer } from "../components/ToastProvider";

import NavBar from "../components/nav";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

// Acts as head for all pages
export const metadata = {
    title: "Ethan Ho | Personal Portfolio",
    description: "A portfolio page for Ethan H. and his projects.",
    icons: {
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='white' stroke-linejoin='round' stroke-width='4'%3E%3Crect width='36' height='28' x='6' y='6' rx='3'/%3E%3Cpath stroke-linecap='round' d='M14 42h20m-10-8v8'/%3E%3C/g%3E%3C/svg%3E",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className + " p-5 flex flex-col"}>
                <div className="flex flex-row justify-center items-center sticky top-3">
                    <NavBar />
                </div>
                <main className="my-5 flex-grow">{children}</main>
                <div className=" flex flex-row justify-center">
                    <Footer />
                </div>
                <ToastContainer position="top-left" autoClose={2000} closeOnClick theme="dark" newestOnTop={true} limit={3} />
            </body>
        </html>
    );
}
// TODO: Add session cookie
// TODO: Update all API endpoints to use NextResponse and be more streamlined
// TODO: Update all POST requests to update on conflict
// TODO: Update middleware to prevent unauthorized access to admin pages

// TODO: Allow for the addition of new projects
// TODO: allow admin to add/delete features and tech for each project
// TODO: Allow for additions of everything
// TODO: Admin page has the ability to nuke all the databases and reset them

// TODO: Make "resume" page --> add contact information for requesting resume + other socials like LinkedIn
// TODO: Add an image upload ability

// TODO: Add a light mode
// TODO: Fix 404 error with toastify / swap it out
// TODO: add scroll animations
// TODO: dynamic loading for projects tab
