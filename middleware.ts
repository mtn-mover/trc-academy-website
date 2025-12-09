import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirect to login if not authenticated
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check if user is admin
    if (!token.isAdmin) {
      return NextResponse.redirect(new URL('/login?error=no-permissions', req.url));
    }

    // Handle /dashboard route - redirect to admin programs
    if (path === '/dashboard') {
      return NextResponse.redirect(new URL('/admin/programs', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard',
    '/admin/:path*',
  ],
};
