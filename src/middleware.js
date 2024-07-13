import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.headers.get("Authorization");
    const auth = { loggedIn: true };
    if (token && token !== process.env.API_TOK) return NextResponse.json({ error: "Invalid API token" }, { status: 401 });
    else if (auth && auth.loggedIn !== true) return NextResponse.redirect(new URL("/admin/login", request.url));

    return NextResponse.next();
}

// The () act as regex where as /api/* is invalid - ((?!login)) is exclusion of login
export const config = {
    matcher: ["/api/(.*)", "/admin/((?!login).*)"],
};
