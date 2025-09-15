const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create admin user
  try {
    const admin = await prisma.user.upsert({
      where: { email: 'admin@trcacademy.com' },
      update: {},
      create: {
        email: 'admin@trcacademy.com',
        name: 'Admin User',
        password: hashedPassword,
        timezone: 'Europe/Zurich',
        isAdmin: true,
        isTeacher: true, // Admin also has teacher permissions
        isStudent: false,
        isActive: true,
      },
    });
    console.log('Created/Updated admin:', admin.email);
  } catch (error) {
    console.error('Error creating admin:', error);
  }

  // Create teacher user (Karen)
  try {
    const teacher = await prisma.user.upsert({
      where: { email: 'karen@trcacademy.com' },
      update: {
        isStudent: false,
        isTeacher: true,
        isAdmin: false,
        timezone: 'Europe/Zurich',
        isActive: true,
      },
      create: {
        email: 'karen@trcacademy.com',
        name: 'Karen Wahlstrom',
        password: hashedPassword,
        timezone: 'Europe/Zurich',
        isStudent: false,
        isTeacher: true,
        isAdmin: false,
        isActive: true,
      },
    });
    console.log('Created/Updated teacher:', teacher.email);
  } catch (error) {
    console.error('Error creating teacher:', error);
  }

  // Create student with no expiry
  try {
    const student = await prisma.user.upsert({
      where: { email: 'student@example.com' },
      update: {
        isStudent: true,
        isTeacher: false,
        isAdmin: false,
        timezone: 'America/New_York',
        isActive: true,
      },
      create: {
        email: 'student@example.com',
        name: 'Test Student',
        password: hashedPassword,
        timezone: 'America/New_York',
        isStudent: true,
        isTeacher: false,
        isAdmin: false,
        isActive: true,
        accessExpiry: null, // No expiry
      },
    });
    console.log('Created/Updated student:', student.email);
  } catch (error) {
    console.error('Error creating student:', error);
  }

  // Create student with future expiry
  try {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 6); // 6 months from now

    const activeStudent = await prisma.user.upsert({
      where: { email: 'active.student@example.com' },
      update: {
        isStudent: true,
        isTeacher: false,
        isAdmin: false,
        timezone: 'Asia/Tokyo',
        isActive: true,
        accessExpiry: futureDate,
      },
      create: {
        email: 'active.student@example.com',
        name: 'Active Student',
        password: hashedPassword,
        timezone: 'Asia/Tokyo',
        isStudent: true,
        isTeacher: false,
        isAdmin: false,
        isActive: true,
        accessExpiry: futureDate,
      },
    });
    console.log('Created/Updated active student:', activeStudent.email);
  } catch (error) {
    console.error('Error creating active student:', error);
  }

  // Create student with expired access
  try {
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1); // 1 month ago

    const expiredStudent = await prisma.user.upsert({
      where: { email: 'expired.student@example.com' },
      update: {
        isStudent: true,
        isTeacher: false,
        isAdmin: false,
        timezone: 'America/Los_Angeles',
        isActive: true,
        accessExpiry: pastDate,
      },
      create: {
        email: 'expired.student@example.com',
        name: 'Expired Student',
        password: hashedPassword,
        timezone: 'America/Los_Angeles',
        isStudent: true,
        isTeacher: false,
        isAdmin: false,
        isActive: true,
        accessExpiry: pastDate,
      },
    });
    console.log('Created/Updated expired student:', expiredStudent.email);
  } catch (error) {
    console.error('Error creating expired student:', error);
  }

  // Create multi-role user (Teacher + Student)
  try {
    const multiRole = await prisma.user.upsert({
      where: { email: 'multi@example.com' },
      update: {
        isStudent: true,
        isTeacher: true,
        isAdmin: false,
        timezone: 'Europe/Paris',
        isActive: true,
      },
      create: {
        email: 'multi@example.com',
        name: 'Multi Role User',
        password: hashedPassword,
        timezone: 'Europe/Paris',
        isStudent: true,
        isTeacher: true,
        isAdmin: false,
        isActive: true,
        accessExpiry: null,
      },
    });
    console.log('Created/Updated multi-role user:', multiRole.email);
  } catch (error) {
    console.error('Error creating multi-role user:', error);
  }

  // Create inactive user
  try {
    const inactive = await prisma.user.upsert({
      where: { email: 'inactive@example.com' },
      update: {
        isStudent: true,
        isTeacher: false,
        isAdmin: false,
        isActive: false,
      },
      create: {
        email: 'inactive@example.com',
        name: 'Inactive User',
        password: hashedPassword,
        timezone: 'UTC',
        isStudent: true,
        isTeacher: false,
        isAdmin: false,
        isActive: false,
      },
    });
    console.log('Created/Updated inactive user:', inactive.email);
  } catch (error) {
    console.error('Error creating inactive user:', error);
  }

  // Create user with no roles
  try {
    const noRoles = await prisma.user.upsert({
      where: { email: 'noroles@example.com' },
      update: {
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
        isActive: true,
      },
      create: {
        email: 'noroles@example.com',
        name: 'No Roles User',
        password: hashedPassword,
        timezone: 'UTC',
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
        isActive: true,
      },
    });
    console.log('Created/Updated no-roles user:', noRoles.email);
  } catch (error) {
    console.error('Error creating no-roles user:', error);
  }

  console.log('\n========================================');
  console.log('Test users created successfully!');
  console.log('========================================\n');
  console.log('Admin login: admin@trcacademy.com / password123');
  console.log('Teacher login: karen@trcacademy.com / password123');
  console.log('Student login: student@example.com / password123');
  console.log('Active Student (6mo expiry): active.student@example.com / password123');
  console.log('Expired Student: expired.student@example.com / password123 (should fail)');
  console.log('Multi-role login: multi@example.com / password123');
  console.log('Inactive login: inactive@example.com / password123 (should fail)');
  console.log('No-roles login: noroles@example.com / password123 (should fail)');
  console.log('========================================\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });