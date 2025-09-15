import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { role } = body;

    // Validate the requested role
    if (!['student', 'teacher', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Check if user has the requested role
    const hasRole =
      (role === 'student' && session.user.isStudent) ||
      (role === 'teacher' && session.user.isTeacher) ||
      (role === 'admin' && session.user.isAdmin);

    if (!hasRole) {
      return NextResponse.json(
        { error: 'User does not have the requested role' },
        { status: 403 }
      );
    }

    // The actual role update happens on the client side via update()
    // This endpoint just validates the role change
    return NextResponse.json({
      success: true,
      role: role,
      message: `Switched to ${role} role`
    });
  } catch (error) {
    console.error('Error switching role:', error);
    return NextResponse.json(
      { error: 'Failed to switch role' },
      { status: 500 }
    );
  }
}