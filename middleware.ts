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

    // Check if account has any role
    if (!token.isStudent && !token.isTeacher && !token.isAdmin) {
      return NextResponse.redirect(new URL('/login?error=no-permissions', req.url));
    }

    // Check access expiry for students (simplified check without timezone lib)
    if (token.isStudent && token.accessExpiry) {
      const expiryDate = new Date(token.accessExpiry);
      const now = new Date();
      if (expiryDate < now) {
        return NextResponse.redirect(new URL('/login?error=access-expired', req.url));
      }
    }

    // Role-based routing - allow users with multiple roles to access any of their role's pages
    if (path.startsWith('/admin')) {
      if (!token.isAdmin) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    if (path.startsWith('/teacher')) {
      if (!token.isTeacher) {
        // If user doesn't have teacher role, redirect to their dashboard
        if (token.isAdmin) {
          return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        } else if (token.isStudent) {
          return NextResponse.redirect(new URL('/student/dashboard', req.url));
        }
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    if (path.startsWith('/student')) {
      if (!token.isStudent) {
        // If user doesn't have student role, redirect to their dashboard
        if (token.isAdmin) {
          return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        } else if (token.isTeacher) {
          return NextResponse.redirect(new URL('/teacher/dashboard', req.url));
        }
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // Handle /dashboard route - redirect based on highest priority role
    if (path === '/dashboard') {
      // Priority: Admin > Teacher > Student
      if (token.isAdmin) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      } else if (token.isTeacher) {
        return NextResponse.redirect(new URL('/teacher/dashboard', req.url));
      } else if (token.isStudent) {
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
    '/admin/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/profile',
  ],
};