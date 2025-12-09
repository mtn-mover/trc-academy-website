# CLAUDE.md - AI Assistant Guide for TRC Academy Website

> **Purpose**: This document provides AI assistants (like Claude) with comprehensive context about the TRC Training Academy website codebase, architecture, conventions, and development workflows.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Stack](#architecture--stack)
3. [Codebase Structure](#codebase-structure)
4. [Database Schema](#database-schema)
5. [Authentication & Authorization](#authentication--authorization)
6. [Development Workflows](#development-workflows)
7. [Coding Conventions](#coding-conventions)
8. [Common Patterns](#common-patterns)
9. [API Routes](#api-routes)
10. [Testing & Quality](#testing--quality)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**TRC Training Academy Website** is a full-stack web application for managing a professional coaching certification program targeted at mature professionals (45+). The platform includes:

- **Public-facing marketing site** with course information
- **Student portal** for accessing course materials, sessions, and recordings
- **Teacher dashboard** for managing classes, students, and content
- **Admin panel** for user management and system administration
- **Multi-role authentication** supporting users with multiple roles (student/teacher/admin)

### Key Business Context
- Target demographic: 45+ professionals seeking second careers in coaching
- Focus on accessibility, large readable fonts, professional design
- Timezone-aware scheduling (supports international students)
- Access expiry management for student enrollments
- Peer coaching session scheduling and tracking

---

## 🏗 Architecture & Stack

### Core Technologies

```
Framework:      Next.js 15.5.3 (App Router)
Language:       TypeScript 5.x (strict mode)
Database:       PostgreSQL (via Prisma ORM)
Authentication: NextAuth.js v4 (JWT strategy)
Styling:        Tailwind CSS v4 + Custom CSS
Email:          Resend API
File Storage:   Vercel Blob Storage
Deployment:     Vercel (production)
```

### Key Dependencies

```json
{
  "runtime": "Node.js 18+",
  "orm": "@prisma/client ^6.16.1",
  "auth": "next-auth ^4.24.11",
  "email": "resend ^6.1.0",
  "storage": "@vercel/blob ^2.0.0",
  "dates": "date-fns ^4.1.0, date-fns-tz ^3.2.0",
  "password": "bcryptjs ^3.0.2"
}
```

### File Structure

```
trc-academy-website/
├── app/                        # Next.js App Router (pages & layouts)
│   ├── api/                   # API routes
│   │   ├── admin/            # Admin-only endpoints
│   │   ├── teacher/          # Teacher endpoints
│   │   ├── student/          # Student endpoints
│   │   ├── auth/             # Authentication endpoints
│   │   ├── classes/          # Class management
│   │   ├── enrollments/      # Enrollment management
│   │   └── uploads/          # File upload handling
│   ├── admin/                # Admin dashboard pages
│   ├── teacher/              # Teacher dashboard pages
│   ├── student/              # Student portal pages
│   ├── (public pages)        # about, contact, login, etc.
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── src/
│   ├── components/           # React components
│   │   ├── common/          # Shared components
│   │   ├── layouts/         # Layout components
│   │   └── providers/       # Context providers
│   └── lib/                 # Utility libraries
│       ├── auth.ts          # NextAuth configuration
│       ├── prisma.ts        # Prisma client singleton
│       ├── storage.ts       # File storage utilities
│       ├── timezone.ts      # Timezone utilities
│       └── recaptcha.ts     # reCAPTCHA utilities
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── migrations/          # Database migrations
│   └── seed.ts             # Database seeding
├── types/
│   └── next-auth.d.ts      # TypeScript type extensions
├── scripts/                 # Utility scripts
│   ├── create-admin.ts     # Admin user creation
│   └── reset-demo-users.ts # Demo user management
├── public/                  # Static assets
│   ├── images/             # Image files
│   └── video/              # Video files
├── migrations/              # SQL migration files
└── (config files)          # Various configuration files
```

---

## 📊 Database Schema

### Core Models

#### User Model
```prisma
model User {
  id           String    @id @default(cuid())
  email        String    @unique
  password     String    // bcrypt hashed
  name         String
  familyName   String?
  givenName    String?
  timezone     String    @default("UTC")

  // Role flags (users can have multiple roles)
  isStudent    Boolean   @default(false)
  isTeacher    Boolean   @default(false)
  isAdmin      Boolean   @default(false)

  // Account management
  isActive     Boolean   @default(true)
  accessExpiry DateTime? // For student access control

  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

#### Class Model
```prisma
model Class {
  id          String    @id @default(cuid())
  name        String
  description String?
  timezone    String    @default("Europe/Zurich")
  startDate   DateTime
  endDate     DateTime
  isActive    Boolean   @default(true)

  // Relations
  members     ClassMember[]
  teachers    ClassTeacher[]
  sessions    Session[]
  classDays   ClassDay[]
}
```

#### Session Model
```prisma
model Session {
  id                   String        @id
  classId              String
  title                String
  description          String?
  date                 DateTime
  startTime            String        // "HH:mm" format
  duration             Int           // minutes
  status               SessionStatus // PLANNED, IN_PROGRESS, COMPLETED, CANCELLED
  summary              String?
  materialsVisible     Boolean       @default(false)
  materialsReleaseDate DateTime?

  documents            Document[]
  recordings           Recording[]
}
```

### Key Relationships

- **User ↔ Class**: Many-to-many via `ClassMember` (student enrollment)
- **User ↔ Class**: Many-to-many via `ClassTeacher` (teacher assignment)
- **Class ↔ Session**: One-to-many (class has multiple sessions)
- **Session ↔ Document/Recording**: One-to-many (materials per session)
- **User ↔ Upload**: One-to-many (file uploads tracked by user)

### Important Constraints

- `ClassMember`: Unique constraint on `[userId, classId]` (no duplicate enrollments)
- `ClassTeacher`: Unique constraint on `[classId, teacherId]` (no duplicate teacher assignments)
- Users must have at least one role flag (`isStudent`, `isTeacher`, or `isAdmin`) to log in
- All timestamps are stored in UTC in the database

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Login**: POST to `/api/auth/signin` with credentials
2. **Validation**: Check user exists, is active, has roles, password matches
3. **Session**: JWT token created with user data and roles
4. **Middleware**: Protected routes validated via `middleware.ts`

### Role Hierarchy

```
Admin > Teacher > Student
```

**Multi-role Support**: Users can have multiple roles simultaneously
- Example: A teacher can also be a student in another class
- Role switching via `/api/auth/switch-role`

### Authorization Patterns

#### In API Routes
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Role check
  if (!session.user.isAdmin) {
    return new Response('Forbidden', { status: 403 });
  }

  // ... authorized logic
}
```

#### In Client Components
```typescript
'use client';
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') return <div>Access Denied</div>;

  const isAdmin = session?.user?.isAdmin;
  // ... render based on roles
}
```

#### In Server Components
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    redirect('/login');
  }

  // ... render page
}
```

### Protected Routes (middleware.ts)

```typescript
matcher: [
  '/dashboard',
  '/admin/:path*',
  '/teacher/:path*',
  '/student/:path*',
  '/profile',
]
```

### Session Configuration

- **Strategy**: JWT (no database sessions)
- **Max Age**: 7 days for all users
- **Token Contents**: id, email, name, timezone, role flags, accessExpiry

---

## 💻 Development Workflows

### Initial Setup

```bash
# Clone repository
git clone <repo-url>
cd trc-academy-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start PostgreSQL (Docker recommended)
docker-compose up -d

# Push database schema
npx prisma db push

# Optional: Create admin user
npx tsx scripts/create-admin.ts

# Start development server
npm run dev
```

### Environment Variables

**Required**:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
```

**Optional**:
```env
RESEND_API_KEY="re_..."              # For email functionality
CONTACT_EMAIL_TO="admin@example.com" # Contact form recipient
NEXT_PUBLIC_GA_ID="G-..."            # Google Analytics
BLOB_READ_WRITE_TOKEN="..."          # Vercel Blob storage
```

### Database Workflows

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Create migration (production-ready)
npx prisma migrate dev --name description_of_change

# View database in browser
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Run seed file
npm run seed
```

### Common Commands

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm run format           # Format with Prettier

# Deployment
npm run deploy           # Deploy to Vercel production
npm run deploy:preview   # Deploy preview to Vercel
```

### Git Workflow

1. Create feature branch from main
2. Make changes and commit with clear messages
3. Push to remote
4. Create pull request
5. Deploy preview automatically created by Vercel
6. Merge to main → automatic production deployment

---

## 📐 Coding Conventions

### TypeScript

- **Strict mode enabled**: All TypeScript strict checks are on
- **Explicit types**: Prefer explicit typing over inference for function parameters and return types
- **No `any`**: Avoid using `any`; use `unknown` or proper types
- **Type files**: Custom type definitions in `/types` directory

### File Naming

```
Components:     PascalCase.tsx     (Header.tsx, UserProfile.tsx)
Pages:          lowercase          (page.tsx, layout.tsx)
API Routes:     lowercase          (route.ts)
Utilities:      camelCase.ts       (auth.ts, prisma.ts)
Types:          kebab-case.d.ts    (next-auth.d.ts)
```

### Component Structure

```typescript
'use client'; // Only if needed (client component)

import { useState } from 'react';
import { ComponentProps } from '@/types';

interface MyComponentProps {
  title: string;
  count?: number;
}

export default function MyComponent({ title, count = 0 }: MyComponentProps) {
  const [state, setState] = useState(0);

  // Event handlers
  const handleClick = () => {
    setState(prev => prev + 1);
  };

  // Render
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Count: {count + state}</button>
    </div>
  );
}
```

### API Route Structure

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Authorization
    if (!session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 3. Business logic
    const data = await prisma.model.findMany({
      where: { /* conditions */ },
      include: { /* relations */ },
    });

    // 4. Return response
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in GET /api/route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Styling Conventions

- **Primary approach**: Tailwind CSS utility classes
- **Custom styles**: Only when Tailwind cannot achieve the design
- **Global styles**: `app/globals.css` for typography and base styles
- **Component styles**: Inline Tailwind classes

**Color Palette**:
```css
/* Defined in globals.css */
trc-blue:    #4f46e5   /* Primary brand color */
trc-gold:    #d97706   /* Accent color */
trc-orange:  #ea580c   /* Alert/warning color */
trc-gray-*:  Gray scale for text and backgrounds
```

**Typography**:
- Font: Inter (sans-serif)
- Base: 16px (1rem)
- Headings: Bold/Extra-bold, larger sizes for accessibility

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## 🔄 Common Patterns

### Fetching Data in Server Components

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { redirect } from 'next/navigation';

export default async function ClassPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const classData = await prisma.class.findUnique({
    where: { id: params.id },
    include: {
      members: { include: { user: true } },
      teachers: { include: { teacher: true } },
      sessions: { orderBy: { date: 'asc' } },
    },
  });

  if (!classData) {
    redirect('/404');
  }

  return <div>{/* render classData */}</div>;
}
```

### Client-Side Data Fetching

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/endpoint')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* render data */}</div>;
}
```

### Form Handling

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit');
      }

      router.push('/success');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* form fields */}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### Timezone Handling

```typescript
import { format, parseISO } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

// Display date in user's timezone
const userTimezone = session.user.timezone || 'UTC';
const displayDate = formatInTimeZone(
  new Date(session.date),
  userTimezone,
  'PPP p' // "Jan 1, 2024 9:00 AM"
);

// Store dates in UTC in database
const utcDate = new Date(); // Always stores in UTC
await prisma.session.create({
  data: {
    date: utcDate,
    // ...
  },
});
```

### Error Handling Pattern

```typescript
// In API routes
try {
  // ... logic
} catch (error) {
  console.error('Detailed error context:', error);
  return NextResponse.json(
    { error: 'User-friendly message' },
    { status: 500 }
  );
}

// In server components
try {
  // ... logic
} catch (error) {
  console.error('Error loading data:', error);
  return <div>Failed to load data. Please try again.</div>;
}
```

---

## 🌐 API Routes

### Route Organization

```
/api
├── /admin              # Admin-only operations
│   ├── /classes
│   ├── /users
│   ├── /stats
│   └── /teachers
├── /teacher            # Teacher operations
│   ├── /classes
│   └── /stats
├── /student            # Student operations
│   └── /enrollments
├── /auth               # Authentication
│   ├── /[...nextauth]
│   └── /switch-role
├── /classes            # Public/shared class operations
├── /enrollments        # Enrollment management
├── /uploads            # File upload/download
└── /contact            # Contact form
```

### Common Endpoints

#### Classes
```
GET    /api/classes           - List all active classes
GET    /api/classes/[id]      - Get class details
POST   /api/admin/classes     - Create new class (admin)
PUT    /api/admin/classes/[id] - Update class (admin)
DELETE /api/admin/classes/[id] - Delete class (admin)
```

#### Users
```
GET    /api/admin/users        - List all users (admin)
POST   /api/admin/users        - Create user (admin)
PUT    /api/admin/users/[id]   - Update user (admin)
DELETE /api/admin/users/[id]   - Delete user (admin)
PATCH  /api/admin/users/[id]/status - Toggle active status
```

#### Sessions
```
GET    /api/classes/[id]/sessions        - List class sessions
POST   /api/classes/[id]/sessions        - Create session (teacher)
PUT    /api/classes/[id]/sessions/[sid]  - Update session
DELETE /api/classes/[id]/sessions/[sid]  - Delete session
```

### Response Format

**Success**:
```json
{
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

**Error**:
```json
{
  "error": "User-friendly error message",
  "details": "Technical details (development only)"
}
```

### Status Codes

```
200 - OK (successful GET, PUT)
201 - Created (successful POST)
204 - No Content (successful DELETE)
400 - Bad Request (validation error)
401 - Unauthorized (not authenticated)
403 - Forbidden (insufficient permissions)
404 - Not Found
500 - Internal Server Error
```

---

## ✅ Testing & Quality

### Type Checking

```bash
npm run type-check
```

**Before committing**: Always run type check to catch TypeScript errors

### Linting

```bash
npm run lint       # Check for issues
npm run lint --fix # Auto-fix issues
```

### Code Formatting

```bash
npm run format     # Format all files with Prettier
```

### Manual Testing Checklist

When making changes, test these scenarios:

**Authentication**:
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Access expired student account
- [ ] Inactive user account
- [ ] Logout and redirect

**Authorization**:
- [ ] Admin accessing admin routes
- [ ] Teacher accessing teacher routes
- [ ] Student accessing student routes
- [ ] Unauthorized role access attempts
- [ ] Multi-role user switching roles

**CRUD Operations**:
- [ ] Create new entity
- [ ] Read/list entities
- [ ] Update existing entity
- [ ] Delete entity
- [ ] Validation errors handled

**Timezone Handling**:
- [ ] Dates display in user's timezone
- [ ] Dates store correctly in UTC
- [ ] Timezone conversions accurate

---

## 🚀 Deployment

### Vercel Deployment (Production)

**Automatic**: Every push to `main` branch triggers production deployment

**Manual**:
```bash
npm run deploy
```

### Environment Variables (Production)

Set these in Vercel dashboard:

```
DATABASE_URL          - PostgreSQL connection string
NEXTAUTH_URL          - Production URL (e.g., https://trcacademy.com)
NEXTAUTH_SECRET       - Secure random string (min 32 chars)
RESEND_API_KEY        - Resend email API key
CONTACT_EMAIL_TO      - Contact form recipient email
BLOB_READ_WRITE_TOKEN - Vercel Blob storage token
NEXT_PUBLIC_GA_ID     - Google Analytics ID (optional)
```

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Type check passes (`npm run type-check`)
- [ ] Lint check passes (`npm run lint`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Database migrations created and tested
- [ ] Environment variables set in Vercel
- [ ] No sensitive data in code/logs

### Database Migration Process

**Development → Production**:

1. Create migration locally:
   ```bash
   npx prisma migrate dev --name migration_description
   ```

2. Commit migration files:
   ```bash
   git add prisma/migrations
   git commit -m "Add migration: description"
   ```

3. Push to main (triggers deployment)

4. Migration runs automatically during build:
   ```bash
   npx prisma migrate deploy
   ```

### Post-Deployment Verification

- [ ] Homepage loads
- [ ] Login works
- [ ] Protected routes require authentication
- [ ] Database queries succeed
- [ ] File uploads work
- [ ] Email sending works (if using Resend)
- [ ] No console errors in browser

---

## 🔧 Troubleshooting

### Common Issues

#### "Database connection failed"

**Cause**: Invalid DATABASE_URL or database not running

**Solution**:
```bash
# Check Docker container
docker ps

# Restart PostgreSQL
docker-compose down
docker-compose up -d

# Verify connection string in .env.local
# Format: postgresql://user:password@host:port/database?schema=public
```

#### "Prisma Client not generated"

**Cause**: Missing Prisma Client after schema changes

**Solution**:
```bash
npx prisma generate
```

#### "Module not found" errors

**Cause**: Import path issues or missing dependencies

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check import paths use @/ alias correctly
import { prisma } from '@/src/lib/prisma';
```

#### "Unauthorized" after login

**Cause**: User doesn't have required role flags

**Solution**:
```bash
# Check user in database
npx prisma studio

# Ensure user has at least one role:
# isStudent: true, isTeacher: true, or isAdmin: true
```

#### "Access expired" for student

**Cause**: Student's accessExpiry date is in the past

**Solution**:
- Update user's `accessExpiry` in database to future date
- Or set to NULL for no expiration

#### "Session not found" errors

**Cause**: NEXTAUTH_SECRET changed or not set

**Solution**:
```bash
# Generate new secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET="generated_secret_here"
```

#### Build fails with TypeScript errors

**Cause**: Type mismatches or missing type definitions

**Solution**:
```bash
# Run type check to see all errors
npm run type-check

# Common fixes:
# - Add proper types to function parameters
# - Check for null/undefined handling
# - Ensure @types packages installed
```

### Debug Mode

Enable detailed logging:

```typescript
// Add to API route for debugging
console.log('Request:', request);
console.log('Session:', session);
console.log('Query result:', result);
```

### Getting Help

1. Check existing documentation files in repository
2. Review Next.js documentation: https://nextjs.org/docs
3. Check Prisma documentation: https://www.prisma.io/docs
4. Review NextAuth.js documentation: https://next-auth.js.org

---

## 📚 Additional Documentation

This repository contains several other documentation files:

- **README.md** - General project overview and quick start
- **LOCAL_DEV_SETUP.md** - Detailed local development setup with PostgreSQL
- **DEPLOYMENT.md** - Production deployment guide
- **SETUP_POSTGRES.md** - PostgreSQL setup instructions
- **CONTACT_FORM_SETUP.md** - Email contact form configuration
- **IMPLEMENTATION_GUIDE.md** - Feature implementation guides

---

## 🤖 AI Assistant Guidelines

### When Making Code Changes

1. **Always read files first** before suggesting changes
2. **Use explicit types** - no implicit any
3. **Follow existing patterns** in the codebase
4. **Test authentication** - ensure proper session checks
5. **Handle timezones** - use user's timezone for display
6. **Consider multi-role users** - users can have multiple roles
7. **Error handling** - always wrap in try-catch
8. **Prisma queries** - use proper relations and include
9. **Commit messages** - be descriptive and specific
10. **Update related docs** - if changing major features

### Before Suggesting Database Changes

1. Read `prisma/schema.prisma` to understand current schema
2. Consider migration impact on existing data
3. Check for unique constraints and relations
4. Test locally before suggesting migration
5. Document breaking changes clearly

### Code Review Checklist

- [ ] TypeScript types are explicit and correct
- [ ] Authentication check is present for protected routes
- [ ] Authorization check validates correct role
- [ ] Errors are handled and logged appropriately
- [ ] Database queries use proper includes/selects
- [ ] Timezone handling is correct (UTC in DB, user TZ for display)
- [ ] UI is accessible (proper contrast, font sizes)
- [ ] No sensitive data exposed in client-side code
- [ ] Follows existing code style and patterns
- [ ] Changes are tested manually

### Security Considerations

- **Never expose passwords** - always use bcrypt hashing
- **Validate all inputs** - especially in API routes
- **Check authentication** - every protected route/API
- **Check authorization** - verify role permissions
- **Sanitize user input** - prevent XSS/SQL injection
- **Use parameterized queries** - Prisma handles this
- **No secrets in code** - use environment variables
- **Secure file uploads** - validate file types and sizes

---

## 📝 Change Log

When making significant changes, update this section:

**Format**:
```markdown
### [Date] - [Feature/Change]
- Description of change
- Impact on existing functionality
- Migration steps required (if any)
```

---

*Last Updated: 2025-12-08*
*Version: 1.0.0*
*Maintained for AI assistants working on TRC Academy codebase*
