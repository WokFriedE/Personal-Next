"use server";
import { cookies } from "next/headers";

export default async function getAccessCookie() {
    const token = cookies().get("access-token") ?? { value: "" };
    return token.value;
}
