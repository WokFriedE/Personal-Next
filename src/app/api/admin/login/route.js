import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bycrpt from "bcrypt";
import { NextResponse } from "next/server";

let db = null;

export async function POST(req) {
    if (!db) {
        db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });
    }

    try {
        const { username, password } = await req.json();

        if (username && password) {
            try {
                // Insert into db otherwise update the password
                const hash = await db.get("SELECT password FROM users WHERE username=$user LIMIT 1", {
                    $user: username,
                });

                const res = await bycrpt.compare(password, hash.password);

                if (res) return NextResponse.json({ message: "User Verified" }, { status: 200 });
                else return NextResponse.json({ message: "User Invalid" }, { status: 400 });
            } catch (error) {
                return NextResponse.json({ message: "Invalid User" }, { status: 401 });
            }
        }
    } catch (err) {
        return NextResponse.json({ message: "Error has occured" }, { status: 400 });
    }
    return NextResponse.json({ message: "Error has occured" }, { status: 400 });
}
