import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function resetDemoUsers() {
  console.log('🗑️  Deleting all existing users...');

  try {
    // First, delete all related records
    await prisma.classMember.deleteMany({});
    await prisma.classTeacher.deleteMany({});
    await prisma.auditLog.deleteMany({});

    // Then delete all users
    await prisma.user.deleteMany({});
    console.log('✅ All users deleted');

    // Create demo users
    console.log('👥 Creating demo users...');

    // Admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@trc-academy.com',
        name: 'Admin User',
        givenName: 'Admin',
        familyName: 'User',
        password: adminPassword,
        timezone: 'America/Denver',
        isAdmin: true,
        isActive: true,
      },
    });
    console.log('✅ Admin created: admin@trc-academy.com / admin123');

    // Teacher user
    const teacherPassword = await bcrypt.hash('teacher123', 10);
    const teacher = await prisma.user.create({
      data: {
        email: 'karen@trc-academy.com',
        name: 'Karen Wahlstrom',
        givenName: 'Karen',
        familyName: 'Wahlstrom',
        password: teacherPassword,
        timezone: 'America/Denver',
        isTeacher: true,
        isActive: true,
      },
    });
    console.log('✅ Teacher created: karen@trc-academy.com / teacher123');

    // Student users
    const studentPassword = await bcrypt.hash('student123', 10);

    const student1 = await prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        name: 'John Doe',
        givenName: 'John',
        familyName: 'Doe',
        password: studentPassword,
        timezone: 'America/Denver',
        isStudent: true,
        isActive: true,
        accessExpiry: new Date('2025-12-31'),
      },
    });
    console.log('✅ Student 1 created: john.doe@example.com / student123');

    const student2 = await prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        givenName: 'Jane',
        familyName: 'Smith',
        password: studentPassword,
        timezone: 'America/New_York',
        isStudent: true,
        isActive: true,
        accessExpiry: new Date('2025-06-30'),
      },
    });
    console.log('✅ Student 2 created: jane.smith@example.com / student123');

    const student3 = await prisma.user.create({
      data: {
        email: 'mike.wilson@example.com',
        name: 'Mike Wilson',
        givenName: 'Mike',
        familyName: 'Wilson',
        password: studentPassword,
        timezone: 'America/Los_Angeles',
        isStudent: true,
        isActive: true,
        accessExpiry: new Date('2024-12-31'), // Expired
      },
    });
    console.log('✅ Student 3 created: mike.wilson@example.com / student123 (expired access)');

    const student4 = await prisma.user.create({
      data: {
        email: 'sarah.johnson@example.com',
        name: 'Sarah Johnson',
        givenName: 'Sarah',
        familyName: 'Johnson',
        password: studentPassword,
        timezone: 'Europe/London',
        isStudent: true,
        isActive: false, // Inactive
        accessExpiry: new Date('2025-12-31'),
      },
    });
    console.log('✅ Student 4 created: sarah.johnson@example.com / student123 (inactive)');

    // Get the active class if it exists
    const activeClass = await prisma.class.findFirst({
      where: { isActive: true },
    });

    // If there's an active class, assign teacher and some students
    if (activeClass) {
      console.log('📚 Assigning users to active class...');

      // Assign teacher
      await prisma.classTeacher.create({
        data: {
          classId: activeClass.id,
          teacherId: teacher.id,
        },
      });
      console.log('✅ Teacher assigned to class');

      // Assign students
      await prisma.classMember.createMany({
        data: [
          { classId: activeClass.id, userId: student1.id },
          { classId: activeClass.id, userId: student2.id },
        ],
      });
      console.log('✅ Students assigned to class');
    }

    console.log('\n🎉 Demo users created successfully!');
    console.log('\n📋 Login credentials:');
    console.log('Admin: admin@trc-academy.com / admin123');
    console.log('Teacher: karen@trc-academy.com / teacher123');
    console.log('Students: [any student email] / student123');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetDemoUsers();