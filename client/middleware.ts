import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware placeholder. Future auth/session checks will be added here.
 * For now this is a pass-through.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
