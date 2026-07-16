import { NextResponse } from 'next/server'

/**
 * Middleware placeholder. Future auth/session checks will be added here.
 * For now this is a pass-through.
 */
export function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
