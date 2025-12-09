import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// GET /api/programs - List all active programs (public endpoint)
export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: {
        isActive: true,
      },
      orderBy: { startDate: 'asc' },
      select: {
        id: true,
        title: true,
        teacherName: true,
        description: true,
        startDate: true,
        endDate: true,
        price: true,
        paymentConditions: true,
      },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}
