import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if the path is '/admin/login'
  if (request.nextUrl.pathname === '/admin/login') {
    // Redirect to '/sign-in'
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

// Optional: Define paths where the middleware should run
export const config = {
  matcher: ['/admin/login'], // Only apply middleware to this path
}
