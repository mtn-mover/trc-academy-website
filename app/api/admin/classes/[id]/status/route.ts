import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

// PUT /api/admin/classes/[id]/status - Toggle class active status
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
    const { isActive } = body;

    // Check if class exists
    const existingClass = await prisma.class.findUnique({
      where: { id },
    });

    if (!existingClass) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    const updatedClass = await prisma.class.update({
      where: { id },
      data: { isActive },
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
        action: isActive ? 'ACTIVATE_CLASS' : 'DEACTIVATE_CLASS',
        entityId: id,
        entityType: 'CLASS',
        metadata: JSON.stringify({
          className: updatedClass.name,
          newStatus: isActive ? 'active' : 'inactive',
        }),
      },
    });

    return NextResponse.json(updatedClass);
  } catch (error) {
    console.error('Error updating class status:', error);
    return NextResponse.json(
      { error: 'Failed to update class status' },
      { status: 500 }
    );
  }
}