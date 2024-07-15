"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAccessCookie() {
    const token = cookies().get("access-token") ?? { value: "" };
    return token.value;
}
export async function deleteAccessCookie() {
    cookies().delete("access-token");
    redirect("/");
}
