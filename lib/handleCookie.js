"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bycrpt from "bcrypt";

export async function getAccessCookie() {
    const token = cookies().get("access-token") ?? { value: "" };
    return token.value;
}
export async function deleteAccessCookie() {
    cookies().delete("access-token");
    redirect("/");
}

export async function handleLogin(username, password) {
    try {
        let db = await open({
            filename: "./src/static/data/portfolio.db",
            driver: sqlite3.Database,
        });

        try {
            if (username && password) {
                try {
                    const hash = await db.get("SELECT password FROM users WHERE username=$user AND is_active = 1 LIMIT 1", {
                        $user: username,
                    });
                    if (!hash) {
                        return false;
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
                        return true;
                    } else return false;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }
        } catch (err) {
            console.error(error);
            return false;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}
