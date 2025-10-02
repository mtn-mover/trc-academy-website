# Local Development Setup with PostgreSQL

## Why Use PostgreSQL Locally?

Using the same database in development and production prevents:
- Syntax differences between SQLite and PostgreSQL
- Migration issues
- Unexpected bugs in production
- Data type mismatches

## Quick Setup Options

### Option 1: Docker (Recommended - 2 minutes)

**Prerequisites:** Install Docker Desktop from [docker.com](https://docker.com)

**Steps:**
1. Start PostgreSQL with Docker Compose:
```bash
docker-compose up -d
```

2. Create `.env.local` file:
```env
DATABASE_URL="postgresql://postgres:localdev123@localhost:5432/trc_academy_dev?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="local-development-secret-key-only-for-dev"
RESEND_API_KEY="re_6L5qPEiR_6sAJ76YqDEvg2AV5vwpu8PU5"
```

3. Push schema to database:
```bash
npx prisma db push
```

4. Create test admin (optional):
```bash
npx tsx scripts/create-admin.ts
```

5. Start development:
```bash
npm run dev
```

**Stop PostgreSQL:**
```bash
docker-compose down
```

### Option 2: Direct PostgreSQL Installation

**Windows:**
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install with default settings
3. Remember your password!
4. Create database: `trc_academy_dev`

**Mac:**
```bash
brew install postgresql@16
brew services start postgresql@16
createdb trc_academy_dev
```

**Then use this DATABASE_URL:**
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/trc_academy_dev?schema=public"
```

### Option 3: Cloud Development Database (Free)

Use a free cloud PostgreSQL for development:

**Supabase (Recommended):**
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project (free)
3. Go to Settings → Database
4. Copy connection string
5. Add to `.env.local`

**Neon.tech:**
1. Sign up at [neon.tech](https://neon.tech)
2. Create project
3. Copy connection string
4. Add to `.env.local`

## Database Commands

**Push schema changes:**
```bash
npx prisma db push
```

**Create migration:**
```bash
npx prisma migrate dev --name description-of-change
```

**View database:**
```bash
npx prisma studio
```

**Reset database:**
```bash
npx prisma migrate reset
```

## Switching Between Databases

**Use local PostgreSQL:**
```bash
# Copy local config
cp .env.development .env.local
# Update DATABASE_URL to use local PostgreSQL
```

**Use production database (careful!):**
```bash
# Pull production env
vercel env pull .env.local
```

## Troubleshooting

### "Can't connect to PostgreSQL"
- Check Docker is running: `docker ps`
- Check PostgreSQL is running: `docker-compose ps`
- Verify port 5432 is not in use: `netstat -an | findstr 5432`

### "Database does not exist"
```bash
# With Docker:
docker exec -it trc-academy-db createdb -U postgres trc_academy_dev

# Without Docker:
createdb trc_academy_dev
```

### "Permission denied"
Check your DATABASE_URL has correct username/password

### "Schema out of sync"
```bash
npx prisma db push --force-reset
```

## Best Practices

1. **Never commit `.env.local`** - It's in .gitignore
2. **Use different databases** for development and production
3. **Regular backups** of production database
4. **Test migrations** locally before production
5. **Use seeders** for test data, not production data

## Current Setup Status

✅ Production: PostgreSQL on Prisma Data Platform
✅ Docker Compose: Ready for local PostgreSQL
✅ Scripts: Admin creation script available
⚠️  Local: Currently using production database (should change!)

## Recommended Next Steps

1. Start Docker PostgreSQL:
   ```bash
   docker-compose up -d
   ```

2. Update `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres:localdev123@localhost:5432/trc_academy_dev?schema=public"
   ```

3. Push schema:
   ```bash
   npx prisma db push
   ```

4. You're ready for safe local development!