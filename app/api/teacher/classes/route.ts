import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!session.user.isTeacher && !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Teachers only' }, { status: 403 });
    }

    // Get all classes assigned to this teacher
    const teacherClasses = await prisma.classTeacher.findMany({
      where: {
        teacherId: session.user.id
      },
      include: {
        class: {
          include: {
            members: true,
            sessions: true,
            teachers: {
              include: {
                teacher: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        }
      }
    });

    // Format the response
    const classes = teacherClasses.map(tc => ({
      id: tc.class.id,
      name: tc.class.name,
      description: tc.class.description,
      startDate: tc.class.startDate,
      endDate: tc.class.endDate,
      timezone: tc.class.timezone,
      isActive: tc.class.isActive,
      isPrimary: tc.isPrimary,
      memberCount: tc.class.members.length,
      sessionCount: tc.class.sessions.length,
      teachers: tc.class.teachers.map(t => ({
        id: t.teacher.id,
        name: t.teacher.name,
        email: t.teacher.email,
        isPrimary: t.isPrimary
      }))
    }));

    return NextResponse.json({ classes });
  } catch (error) {
    console.error('Error fetching teacher classes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}