import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bycrpt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

let db = null;

export async function POST(req) {
    if (!db) {
        db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });
    }
    const { username, password } = await req.json();
    try {
        if (username && password) {
            try {
                const hash = await db.get("SELECT password FROM users WHERE username=$user AND is_active = 1 LIMIT 1", {
                    $user: username,
                });
                if (!hash) {
                    return NextResponse.json({ message: "Invalid User" }, { status: 401 });
                }

                const res = await bycrpt.compare(password, hash.password);
                // TODO: Establish with JWT
                // const authenticated = await bycrpt.hash(process.env.LOGIN_TOK, 10);
                const authenticated = process.env.LOGIN_TOK;
                if (res) {
                    cookies().set("access-token", authenticated, {
                        maxAge: 60 * 60 * 24,
                        secure: true,
                    });
                    return NextResponse.json({ message: "User Verified" }, { status: 200 });
                } else return NextResponse.json({ message: "User Invalid" }, { status: 401 });
            } catch (error) {
                console.error(error);
                return NextResponse.json({ message: "Invalid User" }, { status: 401 });
            }
        }
    } catch (err) {
        console.error(error);
        return NextResponse.json({ message: "Error has occured" }, { status: 400 });
    }
    return NextResponse.json({ message: "Error has occured" }, { status: 400 });
}
