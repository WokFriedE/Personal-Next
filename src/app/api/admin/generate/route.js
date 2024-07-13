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
            bycrpt.hash(password, 10, (err, hash) => {
                if (err) {
                    return NextResponse.json({ message: "Error hashing" }, { status: 400 });
                }
                try {
                    // Insert into db otherwise update the password
                    db.run("INSERT INTO users (username, password) VALUES ($user, $pw) ON conflict do UPDATE set username=$user, password=$pw", {
                        $user: username,
                        $pw: hash,
                    });
                } catch (error) {
                    return NextResponse.json({ message: "Error adding" }, { status: 400 });
                }
            });
            return NextResponse.json({ message: "success " + username }, { status: 200 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error has occured" }, { status: 400 });
    }
    return NextResponse.json({ message: "Error has occured" }, { status: 400 });
}

export async function DELETE(req) {
    if (!db) {
        db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });
    }
    try {
        db.run("DELETE FROM users");
        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Missing body" }, { status: 400 });
    }
}
