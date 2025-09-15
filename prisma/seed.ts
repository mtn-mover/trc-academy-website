import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const teacherPassword = await bcrypt.hash('teacher123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  // Create teacher account
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@trc.com' },
    update: {},
    create: {
      email: 'teacher@trc.com',
      name: 'Karen Florence',
      password: teacherPassword,
      role: 'TEACHER',
    },
  });

  // Create student account
  const student = await prisma.user.upsert({
    where: { email: 'student@trc.com' },
    update: {},
    create: {
      email: 'student@trc.com',
      name: 'Sarah Mitchell',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  console.log('Seed data created:');
  console.log('Teacher:', teacher.email);
  console.log('Student:', student.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });