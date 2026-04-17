import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

// Next.js 16: "middleware" is now called "proxy"
export async function proxy(request: NextRequest) {
  // updateSession parses cookies, refreshes the user session, and if they
  // attempt to access '/dashboard/*' without being logged in, redirects to '/login'.
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
