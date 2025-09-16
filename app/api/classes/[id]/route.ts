import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

// GET /api/classes/[id] - Get a single class
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

    // Allow both teachers and admins to access class details
    if (!session.user.isTeacher && !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // For admins, get any class; for teachers, only their classes
    const whereClause = session.user.isAdmin
      ? { id: id }
      : {
          id: id,
          teachers: {
            some: {
              teacherId: session.user.id,
            },
          },
        };

    const classData = await prisma.class.findFirst({
      where: whereClause,
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    return NextResponse.json(classData);
  } catch (error) {
    console.error('Error fetching class:', error);
    return NextResponse.json(
      { error: 'Failed to fetch class' },
      { status: 500 }
    );
  }
}

// PUT /api/classes/[id] - Update a class
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Allow both teachers and admins to update classes
    if (!session.user.isTeacher && !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, startDate, endDate } = body;

    // For admins, check any class; for teachers, only their classes
    const whereClause = session.user.isAdmin
      ? { id: id }
      : {
          id: id,
          teachers: {
            some: {
              teacherId: session.user.id,
            },
          },
        };

    const existingClass = await prisma.class.findFirst({
      where: whereClause,
    });

    if (!existingClass) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Validation
    if (!name || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Name, start date, and end date are required' },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    const updatedClass = await prisma.class.update({
      where: {
        id: id,
      },
      data: {
        name,
        description: description || null,
        startDate: start,
        endDate: end,
      },
    });

    return NextResponse.json(updatedClass);
  } catch (error) {
    console.error('Error updating class:', error);
    return NextResponse.json(
      { error: 'Failed to update class' },
      { status: 500 }
    );
  }
}

// DELETE /api/classes/[id] - Delete a class
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

    // Allow both teachers and admins to delete classes
    if (!session.user.isTeacher && !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // For admins, check any class; for teachers, only their classes
    const whereClause = session.user.isAdmin
      ? { id: id }
      : {
          id: id,
          teachers: {
            some: {
              teacherId: session.user.id,
            },
          },
        };

    const existingClass = await prisma.class.findFirst({
      where: whereClause,
    });

    if (!existingClass) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Delete all class members first (due to foreign key constraints)
    await prisma.classMember.deleteMany({
      where: {
        classId: id,
      },
    });

    // Delete the class
    await prisma.class.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting class:', error);
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    );
  }
}