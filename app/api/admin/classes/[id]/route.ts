import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

// GET /api/admin/classes/[id] - Get a single class
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const classData = await prisma.class.findUnique({
      where: { id },
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
        classDays: true,
        _count: {
          select: {
            members: true,
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

// PUT /api/admin/classes/[id] - Update a class
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Check if class exists
    const existingClass = await prisma.class.findUnique({
      where: { id },
    });

    if (!existingClass) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // If teachers are being updated, verify them
    if (teachers && teachers.length > 0) {
      const teacherIds = teachers.map((t: { id: string; isPrimary?: boolean }) => t.id);
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
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (timezone !== undefined) updateData.timezone = timezone;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = new Date(endDate);
    if (isActive !== undefined) updateData.isActive = isActive;

    // If teachers are being updated, handle the relationship update
    if (teachers && teachers.length > 0) {
      // Delete existing teacher relationships
      await prisma.classTeacher.deleteMany({
        where: { classId: id },
      });
      // Create new teacher relationships
      updateData.teachers = {
        create: teachers.map((t: { id: string; isPrimary?: boolean }) => ({
          teacherId: t.id,
          isPrimary: t.isPrimary || false,
        })),
      };
    }

    const updatedClass = await prisma.class.update({
      where: { id },
      data: updateData,
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
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE_CLASS',
        entityId: id,
        entityType: 'CLASS',
        metadata: JSON.stringify({
          className: updatedClass.name,
          changes: Object.keys(updateData),
        }),
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

// DELETE /api/admin/classes/[id] - Delete a class
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if class exists
    const existingClass = await prisma.class.findUnique({
      where: { id },
      include: {
        teachers: {
          include: {
            teacher: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!existingClass) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Delete all related data first
    await prisma.classMember.deleteMany({
      where: { classId: id },
    });

    await prisma.classDay.deleteMany({
      where: { classId: id },
    });

    await prisma.classTeacher.deleteMany({
      where: { classId: id },
    });

    // Delete the class
    await prisma.class.delete({
      where: { id },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE_CLASS',
        entityId: id,
        entityType: 'CLASS',
        metadata: JSON.stringify({
          className: existingClass.name,
          teachers: existingClass.teachers.map(t => t.teacher.name),
        }),
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