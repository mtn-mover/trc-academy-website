import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function createAdmin() {
  console.log('=================================');
  console.log('  Create Admin Account Setup');
  console.log('=================================\n');

  try {
    // Get admin details
    const email = await question('Admin email: ');
    const name = await question('Full name: ');
    const password = await question('Password (min 8 characters): ');

    // Validate password
    if (password.length < 8) {
      console.error('\n❌ Password must be at least 8 characters');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.error('\n❌ User with this email already exists');
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isAdmin: true,
        isActive: true,
      }
    });

    console.log('\n✅ Admin account created successfully!');
    console.log('Email:', admin.email);
    console.log('Name:', admin.name);
    console.log('Role: Administrator');
    console.log('\nYou can now login at /login');

  } catch (error) {
    console.error('\n❌ Error creating admin:', error);
    process.exit(1);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

// Run the script
createAdmin().catch(console.error);