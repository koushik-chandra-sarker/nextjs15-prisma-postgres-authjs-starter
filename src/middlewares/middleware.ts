import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: Request) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=300");
    return response;
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
