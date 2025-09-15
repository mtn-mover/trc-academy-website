import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAdminRoles() {
  try {
    // Update admin user to have all three roles for testing
    const updatedAdmin = await prisma.user.update({
      where: { email: 'admin@trc.com' },
      data: {
        isAdmin: true,
        isTeacher: true,
        isStudent: true,
      },
    });

    console.log('Admin user updated with all roles:', updatedAdmin.email);
    console.log('Roles: Admin:', updatedAdmin.isAdmin, 'Teacher:', updatedAdmin.isTeacher, 'Student:', updatedAdmin.isStudent);
  } catch (error) {
    console.error('Error updating admin roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminRoles();