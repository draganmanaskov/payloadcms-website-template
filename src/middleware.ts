// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// import createMiddleware from 'next-intl/middleware'
// import { routing } from '@/i18n/routing'

// const handleI18nRouting = createMiddleware(routing)

// export async function middleware(request: NextRequest) {
//   // Check if the path is '/admin/login'
//   if (request.nextUrl.pathname === '/admin/login') {
//     // Redirect to '/sign-in'
//     return NextResponse.redirect(new URL('/sign-in', request.url))
//   }

//   handleI18nRouting(request)
// }

// // Optional: Define paths where the middleware should run
// export const config = {
//   matcher: ['/', '/(mk|en)/:path*', '/admin/login'], // Only apply middleware to this path
// }

import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(mk|en)/:path*'],
}
