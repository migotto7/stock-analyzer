import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";

const publicRoutes = [];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function Proxy(request: NextRequest) {
    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        
    ]
}