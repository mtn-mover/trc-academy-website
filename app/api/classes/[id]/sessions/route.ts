import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is a teacher for this class
    const classTeacher = await prisma.classTeacher.findFirst({
      where: {
        classId: params.id,
        teacher: {
          email: session.user.email
        }
      }
    });

    if (!classTeacher && !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'You are not authorized to create sessions for this class' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, date, startTime, duration, status, materialsVisible } = body;

    // Validate required fields
    if (!title || !date || !startTime || !duration) {
      return NextResponse.json(
        { error: 'Title, date, start time, and duration are required' },
        { status: 400 }
      );
    }

    // Create the session
    const newSession = await prisma.session.create({
      data: {
        classId: params.id,
        title,
        description: description || null,
        date: new Date(date),
        startTime,
        duration: parseInt(duration),
        status: status || 'PLANNED',
        materialsVisible: materialsVisible || false
      }
    });

    return NextResponse.json(newSession);
  } catch (error) {
    console.error('Failed to create session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all sessions for the class
    const sessions = await prisma.session.findMany({
      where: {
        classId: params.id
      },
      include: {
        documents: true,
        recordings: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}