import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get('jwtToken')?.value;

    if (token) {
        return NextResponse.rewrite(new URL('/', request.url));
    } else {
        return NextResponse.rewrite(new URL('/login', request.url));
    }
}

export const config = {
    matcher: '/'
};
