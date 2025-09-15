import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

// GET /api/admin/classes - Get all classes
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const classes = await prisma.class.findMany({
      include: {
        teachers: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}

// POST /api/admin/classes - Create a new class
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      teachers,
      timezone,
      startDate,
      endDate,
      isActive,
    } = body;

    // Validation
    if (!name || !teachers || teachers.length === 0 || !timezone || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Name, at least one teacher, timezone, start date, and end date are required' },
        { status: 400 }
      );
    }

    // Verify all teachers exist and have teacher role
    const teacherIds = teachers.map((t: any) => t.id);
    const verifiedTeachers = await prisma.user.findMany({
      where: {
        id: { in: teacherIds },
        isTeacher: true,
      },
    });

    if (verifiedTeachers.length !== teacherIds.length) {
      return NextResponse.json(
        { error: 'One or more selected users are not valid teachers' },
        { status: 400 }
      );
    }

    // Create class with teachers
    const newClass = await prisma.class.create({
      data: {
        name,
        description,
        timezone,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: isActive !== undefined ? isActive : true,
        teachers: {
          create: teachers.map((t: any) => ({
            teacherId: t.id,
            isPrimary: t.isPrimary || false,
          })),
        },
      },
      include: {
        teachers: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    // Create audit log
    const primaryTeacher = newClass.teachers.find(t => t.isPrimary);
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE_CLASS',
        entityId: newClass.id,
        entityType: 'CLASS',
        metadata: JSON.stringify({
          className: newClass.name,
          teachers: newClass.teachers.map(t => ({
            id: t.teacher.id,
            name: t.teacher.name,
            isPrimary: t.isPrimary,
          })),
        }),
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { error: 'Failed to create class' },
      { status: 500 }
    );
  }
}