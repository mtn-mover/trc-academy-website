import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

// GET /api/classes/[id]/enrollments - Get all enrollments for a class
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Teachers can see all enrollments for their classes
    // Students can only see enrollments for classes they're enrolled in
    if (session.user.isTeacher) {
      // Verify the teacher owns this class
      const classData = await prisma.class.findFirst({
        where: {
          id: id,
          teachers: {
            some: {
              teachers: {
          some: {
            teacherId: session.user.id,
          },
        },
            },
          },
        },
      });

      if (!classData) {
        return NextResponse.json({ error: 'Class not found' }, { status: 404 });
      }
    } else {
      // Check if student is enrolled in this class
      const enrollment = await prisma.classMember.findFirst({
        where: {
          classId: id,
          userId: session.user.id,
        },
      });

      if (!enrollment) {
        return NextResponse.json({ error: 'Not enrolled in this class' }, { status: 403 });
      }
    }

    const enrollments = await prisma.classMember.findMany({
      where: {
        classId: id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        joinedAt: 'desc',
      },
    });

    return NextResponse.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    );
  }
}

// POST /api/classes/[id]/enrollments - Enroll students in a class
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!session.user.isTeacher) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Verify the teacher owns this class
    const classData = await prisma.class.findFirst({
      where: {
        id: id,
        teachers: {
          some: {
            teacherId: session.user.id,
          },
        },
      },
    });

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    const body = await request.json();
    const { studentIds } = body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json(
        { error: 'Student IDs are required' },
        { status: 400 }
      );
    }

    // Verify all students exist
    const students = await prisma.user.findMany({
      where: {
        id: { in: studentIds },
        role: 'STUDENT',
      },
    });

    if (students.length !== studentIds.length) {
      return NextResponse.json(
        { error: 'Some students were not found' },
        { status: 400 }
      );
    }

    // Check for existing enrollments
    const existingEnrollments = await prisma.enrollment.findMany({
      where: {
        classId: id,
        userId: { in: studentIds },
      },
    });

    const existingUserIds = existingEnrollments.map(e => e.userId);
    const newStudentIds = studentIds.filter(userId => !existingUserIds.includes(userId));

    if (newStudentIds.length === 0) {
      return NextResponse.json(
        { message: 'All students are already enrolled' },
        { status: 200 }
      );
    }

    // Create enrollments
    const enrollments = await prisma.enrollment.createMany({
      data: newStudentIds.map(userId => ({
        userId,
        classId: id,
      })),
    });

    return NextResponse.json({
      message: `Successfully enrolled ${enrollments.count} student(s)`,
      enrolledCount: enrollments.count,
      alreadyEnrolledCount: existingUserIds.length,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to enroll students' },
      { status: 500 }
    );
  }
}

// DELETE /api/classes/[id]/enrollments - Remove students from a class
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

    if (!session.user.isTeacher) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Verify the teacher owns this class
    const classData = await prisma.class.findFirst({
      where: {
        id: id,
        teachers: {
          some: {
            teacherId: session.user.id,
          },
        },
      },
    });

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    const body = await request.json();
    const { studentIds } = body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json(
        { error: 'Student IDs are required' },
        { status: 400 }
      );
    }

    // Delete enrollments
    const result = await prisma.enrollment.deleteMany({
      where: {
        classId: id,
        userId: { in: studentIds },
      },
    });

    return NextResponse.json({
      message: `Successfully removed ${result.count} student(s) from the class`,
      removedCount: result.count,
    });
  } catch (error) {
    console.error('Error removing enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to remove students from class' },
      { status: 500 }
    );
  }
}