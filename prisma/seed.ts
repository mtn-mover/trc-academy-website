import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const teacherPassword = await bcrypt.hash('teacher123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  // Create admin account with all roles for testing
  const admin = await prisma.user.upsert({
    where: { email: 'admin@trc.com' },
    update: {
      isAdmin: true,
      isTeacher: true,
      isStudent: true,
    },
    create: {
      email: 'admin@trc.com',
      name: 'Admin User',
      password: adminPassword,
      isAdmin: true,
      isTeacher: true,
      isStudent: true,
      timezone: 'Europe/Zurich',
    },
  });

  // Create teacher account
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@trc.com' },
    update: {},
    create: {
      email: 'teacher@trc.com',
      name: 'Karen Florence',
      password: teacherPassword,
      isTeacher: true,
      isStudent: false,
      isAdmin: false,
      timezone: 'Europe/Zurich',
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
      isStudent: true,
      isTeacher: false,
      isAdmin: false,
      timezone: 'Europe/Zurich',
    },
  });

  // Create multi-role user (teacher + admin)
  const multiRole = await prisma.user.upsert({
    where: { email: 'multi@trc.com' },
    update: {},
    create: {
      email: 'multi@trc.com',
      name: 'Multi Role User',
      password: adminPassword,
      isAdmin: true,
      isTeacher: true,
      isStudent: false,
      timezone: 'Europe/Zurich',
    },
  });

  console.log('Seed data created:');
  console.log('Admin:', admin.email, '(password: admin123)');
  console.log('Teacher:', teacher.email, '(password: teacher123)');
  console.log('Student:', student.email, '(password: student123)');
  console.log('Multi-role:', multiRole.email, '(password: admin123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });