/**
 * Demo Data Seeder
 * Creates a complete demo class with sessions and enrollments
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating demo data...\n');

  // Get the student user
  const student = await prisma.user.findUnique({
    where: { email: 'student@trc.com' },
  });

  const teacher = await prisma.user.findUnique({
    where: { email: 'teacher@trc.com' },
  });

  if (!student || !teacher) {
    console.error('Please run the main seed script first to create users');
    return;
  }

  // Create a demo class
  const demoClass = await prisma.class.upsert({
    where: { id: 'demo-class-001' },
    update: {},
    create: {
      id: 'demo-class-001',
      name: 'Professional Certified Coach (PCC) Program - 2025',
      description: 'ICF-accredited Professional Certified Coach training program',
      timezone: 'America/Denver',
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-12-15'),
      isActive: true,
    },
  });

  console.log('✓ Created demo class:', demoClass.name);

  // Assign teacher to class
  await prisma.classTeacher.upsert({
    where: {
      classId_teacherId: {
        classId: demoClass.id,
        teacherId: teacher.id,
      },
    },
    update: {},
    create: {
      classId: demoClass.id,
      teacherId: teacher.id,
      isPrimary: true,
    },
  });

  console.log('✓ Assigned teacher to class');

  // Enroll student in class
  await prisma.classMember.upsert({
    where: {
      userId_classId: {
        userId: student.id,
        classId: demoClass.id,
      },
    },
    update: {},
    create: {
      userId: student.id,
      classId: demoClass.id,
      role: 'STUDENT',
    },
  });

  console.log('✓ Enrolled student in class');

  // Create sessions
  const sessions = [
    {
      title: 'Introduction to Professional Coaching',
      description: 'Overview of the PCC certification path and ICF core competencies',
      date: new Date('2025-01-20'),
      startTime: '10:00 AM MST',
      duration: 120,
      status: 'COMPLETED' as const,
      materialsVisible: true,
    },
    {
      title: 'Establishing the Coaching Agreement',
      description: 'Understanding and practicing the coaching agreement process',
      date: new Date('2025-02-03'),
      startTime: '10:00 AM MST',
      duration: 120,
      status: 'COMPLETED' as const,
      materialsVisible: true,
    },
    {
      title: 'Cultivating Trust and Safety',
      description: 'Building a safe and trusting coaching environment',
      date: new Date('2025-02-17'),
      startTime: '10:00 AM MST',
      duration: 120,
      status: 'COMPLETED' as const,
      materialsVisible: true,
    },
    {
      title: 'Maintaining Presence',
      description: 'Developing full consciousness and presence with the client',
      date: new Date('2025-03-03'),
      startTime: '10:00 AM MST',
      duration: 120,
      status: 'COMPLETED' as const,
      materialsVisible: false,
    },
    {
      title: 'Listening Actively',
      description: 'Advanced active listening techniques and practices',
      date: new Date('2025-03-17'),
      startTime: '10:00 AM MST',
      duration: 120,
      status: 'PLANNED' as const,
      materialsVisible: false,
    },
    {
      title: 'Evoking Awareness',
      description: 'Facilitating client insight and learning',
      date: new Date('2025-04-07'),
      startTime: '10:00 AM MST',
      duration: 120,
      status: 'PLANNED' as const,
      materialsVisible: false,
    },
    {
      title: 'Facilitating Client Growth',
      description: 'Supporting client development and goal achievement',
      date: new Date('2025-04-21'),
      startTime: '10:00 AM MST',
      duration: 120,
      status: 'PLANNED' as const,
      materialsVisible: false,
    },
    {
      title: 'Mid-Program Review and Practice',
      description: 'Review of concepts and supervised coaching practice',
      date: new Date('2025-05-05'),
      startTime: '10:00 AM MST',
      duration: 180,
      status: 'PLANNED' as const,
      materialsVisible: false,
    },
  ];

  for (const sessionData of sessions) {
    await prisma.session.upsert({
      where: { id: `session-${sessionData.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `session-${sessionData.title.toLowerCase().replace(/\s+/g, '-')}`,
        classId: demoClass.id,
        ...sessionData,
      },
    });
  }

  console.log(`✓ Created ${sessions.length} training sessions`);

  // Create some sample documents for completed sessions
  const completedSessions = await prisma.session.findMany({
    where: {
      classId: demoClass.id,
      status: 'COMPLETED',
    },
    take: 2,
  });

  for (const session of completedSessions) {
    await prisma.document.create({
      data: {
        sessionId: session.id,
        title: `${session.title} - Slides`,
        fileName: `${session.title.toLowerCase().replace(/\s+/g, '-')}-slides.pdf`,
        fileUrl: 'https://example.com/placeholder.pdf',
        fileSize: 2048000,
        mimeType: 'application/pdf',
        isVisible: true,
      },
    });

    await prisma.recording.create({
      data: {
        sessionId: session.id,
        title: `${session.title} - Recording`,
        videoUrl: 'https://example.com/placeholder-video.mp4',
        isVisible: session.materialsVisible,
      },
    });
  }

  console.log('✓ Created sample documents and recordings');

  console.log('\n✅ Demo data created successfully!');
  console.log('\nYou can now login with:');
  console.log('Email: student@trc.com');
  console.log('Password: student123');
  console.log('\nAnd see a fully populated dashboard!');
}

main()
  .catch((e) => {
    console.error('Error creating demo data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
