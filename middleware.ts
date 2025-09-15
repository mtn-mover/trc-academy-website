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

    // Role-based routing
    if (path.startsWith('/teacher') && token.role !== 'TEACHER') {
      return NextResponse.redirect(new URL('/student/dashboard', req.url));
    }

    if (path.startsWith('/student') && token.role !== 'STUDENT') {
      return NextResponse.redirect(new URL('/teacher/dashboard', req.url));
    }

    // Redirect from /dashboard based on role
    if (path === '/dashboard') {
      if (token.role === 'TEACHER') {
        return NextResponse.redirect(new URL('/teacher/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/student/dashboard', req.url));
      }
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
    '/teacher/:path*',
    '/student/:path*',
  ],
};