import { NextResponse, type NextRequest } from 'next/server'

// Must match SESSION_COOKIE in lib/auth/session.ts. Not imported from there,
// because that module pulls in the database client.
const SESSION_COOKIE = 'session'

export function proxy(request: NextRequest) {
  const check = request.cookies.has(SESSION_COOKIE)
  if (!check) return NextResponse.redirect(new URL('/login', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/study/:path*'],
}
