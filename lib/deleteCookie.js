"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteAccessCookie() {
    cookies().delete("access-token");
    redirect("/");
}
