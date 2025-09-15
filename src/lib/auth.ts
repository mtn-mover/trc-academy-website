import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Check if user account is active
        if (!user.isActive) {
          throw new Error('Account is inactive. Please contact administrator.');
        }

        // Check if user has any role assigned
        if (!user.isStudent && !user.isTeacher && !user.isAdmin) {
          throw new Error('Access denied - no permissions assigned');
        }

        // Check password
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordsMatch) {
          throw new Error('Invalid email or password');
        }

        // Check access expiry for students (simple date comparison)
        if (user.isStudent && user.accessExpiry) {
          const now = new Date();
          if (user.accessExpiry < now) {
            throw new Error('Access expired. Please contact administrator to renew.');
          }
        }

        // Return user data for session
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          timezone: user.timezone,
          isStudent: user.isStudent,
          isTeacher: user.isTeacher,
          isAdmin: user.isAdmin,
          accessExpiry: user.accessExpiry?.toISOString() || null,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.timezone = user.timezone;
        token.isStudent = user.isStudent;
        token.isTeacher = user.isTeacher;
        token.isAdmin = user.isAdmin;
        token.accessExpiry = user.accessExpiry;

        // Set initial current role based on hierarchy
        if (user.isAdmin) {
          token.currentRole = 'admin';
        } else if (user.isTeacher) {
          token.currentRole = 'teacher';
        } else if (user.isStudent) {
          token.currentRole = 'student';
        }
      }

      // Handle session updates (e.g., role switching)
      if (trigger === 'update' && session?.currentRole) {
        token.currentRole = session.currentRole;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user && token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.timezone = token.timezone as string;
        session.user.isStudent = token.isStudent as boolean;
        session.user.isTeacher = token.isTeacher as boolean;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.accessExpiry = token.accessExpiry as string | null;

        // Add a roles array for easier checking
        const roles = [];
        if (token.isStudent) roles.push('STUDENT');
        if (token.isTeacher) roles.push('TEACHER');
        if (token.isAdmin) roles.push('ADMIN');
        session.user.roles = roles;

        // Include current role
        session.user.currentRole = token.currentRole as 'student' | 'teacher' | 'admin' | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
};