import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.headers.get("Authorization");
    const authTok = request.cookies.get("access-token") ?? { value: "" };
    const auth = authTok.value == process.env.LOGIN_TOK;

    if (token && token !== process.env.API_TOK) return NextResponse.json({ error: "Invalid API token" }, { status: 401 });
    else if (request.nextUrl.pathname.startsWith("/admin") && !auth) return NextResponse.redirect(new URL("/admin/login", request.url));

    return NextResponse.next();
}

// The () act as regex where as /api/* is invalid - ((?!login)) is exclusion of login
export const config = {
    matcher: ["/api/(.*)", "/admin/((?!login).*)"],
};
