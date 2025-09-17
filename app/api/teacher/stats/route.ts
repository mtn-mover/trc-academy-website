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

    // Get teacher's classes
    const teacherClasses = await prisma.classTeacher.findMany({
      where: {
        teacherId: session.user.id
      },
      include: {
        class: {
          include: {
            members: true,
            sessions: true,
            peerCoachingSessions: {
              where: {
                status: 'SCHEDULED'
              }
            }
          }
        }
      }
    });

    // Calculate statistics
    const totalClasses = teacherClasses.length;

    // Count unique students across all classes
    const uniqueStudents = new Set();
    teacherClasses.forEach(tc => {
      tc.class.members.forEach(member => {
        uniqueStudents.add(member.userId);
      });
    });
    const totalStudents = uniqueStudents.size;

    // Count sessions
    const now = new Date();
    let totalSessions = 0;
    let upcomingSessions = 0;
    let pendingCoaching = 0;

    teacherClasses.forEach(tc => {
      totalSessions += tc.class.sessions.length;
      tc.class.sessions.forEach(session => {
        if (new Date(session.date) > now) {
          upcomingSessions++;
        }
      });
      pendingCoaching += tc.class.peerCoachingSessions.length;
    });

    return NextResponse.json({
      totalClasses,
      totalStudents,
      totalSessions,
      upcomingSessions,
      pendingCoaching
    });
  } catch (error) {
    console.error('Error fetching teacher stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}