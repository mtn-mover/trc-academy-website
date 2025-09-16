import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { rememberMe } = body;

    const response = NextResponse.json({ success: true });

    if (rememberMe) {
      // Set a persistent cookie for 7 days
      response.cookies.set('remember-me', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
    } else {
      // Remove the remember-me cookie
      response.cookies.delete('remember-me');
    }

    return response;
  } catch (error) {
    console.error('Remember me error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}