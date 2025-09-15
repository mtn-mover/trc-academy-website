import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

// DELETE /api/enrollments/[id] - Remove a student from a class
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Find the enrollment and verify teacher owns the class
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        id: id,
      },
      include: {
        class: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Check if the teacher owns this class
    if (enrollment.class.teacherId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete the enrollment
    await prisma.enrollment.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Student removed from class successfully' });
  } catch (error) {
    console.error('Error removing enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to remove student from class' },
      { status: 500 }
    );
  }
}