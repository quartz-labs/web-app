import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    if (!request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next();
    }
    
    // Create the rewritten URL
    const pathParts = request.nextUrl.pathname.split('/api/')[1];
    const newUrl = `https://api.quartzpay.io/${pathParts}${request.nextUrl.search}`;

    // Add CORS headers
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
    });

    // Rewrite the request
    return NextResponse.rewrite(new URL(newUrl), {
        headers
    });
}
 
// Configure which paths trigger the middleware
export const config = {
    matcher: '/api/:path*'
}