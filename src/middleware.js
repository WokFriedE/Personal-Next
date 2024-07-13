import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.headers.get("Authorization");
    if (token !== process.env.API_TOK) {
        return NextResponse.json({ error: "Invalid API token" }, { status: 401 });
    }

    return NextResponse.next();
}

// The () act as regex where as /api/* is invalid
export const config = {
    matcher: ["/api/(.*)"],
};
