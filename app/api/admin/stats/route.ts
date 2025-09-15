import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user statistics
    const totalUsers = await prisma.user.count();

    const totalStudents = await prisma.user.count({
      where: { isStudent: true }
    });

    const totalTeachers = await prisma.user.count({
      where: { isTeacher: true }
    });

    // Get class statistics
    const totalClasses = await prisma.class.count();

    const activeClasses = await prisma.class.count({
      where: {
        isActive: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      }
    });

    // Get expired access count
    const expiredAccess = await prisma.user.count({
      where: {
        isStudent: true,
        accessExpiry: {
          not: null,
          lt: new Date()
        }
      }
    });

    return NextResponse.json({
      totalUsers,
      totalStudents,
      totalTeachers,
      totalClasses,
      activeClasses,
      expiredAccess,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}