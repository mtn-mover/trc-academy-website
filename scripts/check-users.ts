import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('Checking database connection...');

    // Count users
    const userCount = await prisma.user.count();
    console.log(`\nTotal users in database: ${userCount}`);

    // Get admin users
    const admins = await prisma.user.findMany({
      where: { isAdmin: true },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true
      }
    });

    if (admins.length > 0) {
      console.log('\nAdmin users found:');
      admins.forEach(admin => {
        console.log(`- ${admin.email} (${admin.name}) - Active: ${admin.isActive}`);
      });
    } else {
      console.log('\n⚠️  No admin users found in database!');
      console.log('You need to create an admin account.');
    }

    // Check database tables
    console.log('\n✅ Database is connected and working!');
    console.log('Database URL: postgres://...@db.prisma.io:5432/postgres');

  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();