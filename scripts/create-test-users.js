/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create teacher account
  const hashedPassword = await bcrypt.hash('password123', 10);

  try {
    // Check if teacher exists
    const existingTeacher = await prisma.user.findUnique({
      where: { email: 'karen@trcacademy.com' }
    });

    if (!existingTeacher) {
      const teacher = await prisma.user.create({
        data: {
          email: 'karen@trcacademy.com',
          name: 'Karen Wahlstrom',
          password: hashedPassword,
          role: 'TEACHER',
        },
      });
      console.log('Created teacher:', teacher);
    } else {
      console.log('Teacher already exists');
    }

    // Check if student exists
    const existingStudent = await prisma.user.findUnique({
      where: { email: 'student@example.com' }
    });

    if (!existingStudent) {
      const student = await prisma.user.create({
        data: {
          email: 'student@example.com',
          name: 'Test Student',
          password: hashedPassword,
          role: 'STUDENT',
        },
      });
      console.log('Created student:', student);
    } else {
      console.log('Student already exists');
    }

    console.log('Test users created successfully!');
    console.log('Teacher login: karen@trcacademy.com / password123');
    console.log('Student login: student@example.com / password123');
  } catch (error) {
    console.error('Error creating test users:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });