# PostgreSQL Database Setup Guide

## Quick Setup with Vercel Postgres (Recommended)

### Step 1: Create Database in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `trc-academy-website`
3. Click on **Storage** tab
4. Click **Create Database** → Choose **Postgres**
5. Name it: `trc-academy-db`
6. Select region closest to you
7. Click **Create**

### Step 2: Get Connection String
After creation, Vercel shows connection details. You'll see:
- `POSTGRES_URL` (This is what we need!)
- `POSTGRES_PRISMA_URL`
- Other connection variables

### Step 3: Update DATABASE_URL in Vercel

Copy the `POSTGRES_PRISMA_URL` value and run this command (replace with your actual URL):

```bash
# Remove old DATABASE_URL
vercel env rm DATABASE_URL production -y

# Add new PostgreSQL URL (replace with your POSTGRES_PRISMA_URL)
echo "postgresql://..." | vercel env add DATABASE_URL production
```

### Step 4: Run Database Migrations

After setting up the database, run these commands:

```bash
# Pull the new environment variables
vercel env pull .env.production

# Run migrations on production database
npx prisma migrate deploy --schema ./prisma/schema.prisma

# Generate Prisma client
npx prisma generate
```

### Step 5: Create Your Admin User

Once database is set up, create your admin account:

```bash
# Run the seed script to create initial admin
npx tsx scripts/create-admin.ts
```

---

## Alternative: Use External PostgreSQL

### Option A: Supabase (Free tier available)
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy the connection string
5. Add to Vercel as DATABASE_URL

### Option B: Neon (Free tier available)
1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy the connection string
4. Add to Vercel as DATABASE_URL

### Option C: Railway (Pay as you go)
1. Sign up at [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection URL
4. Add to Vercel as DATABASE_URL

---

## Why PostgreSQL over SQLite?

**SQLite Issues for Production:**
- File-based (stored on server filesystem)
- No concurrent writes
- Limited to single server
- Can be lost on Vercel deployments
- Not suitable for multiple users

**PostgreSQL Benefits:**
- Cloud-hosted & managed
- Handles concurrent users
- Automatic backups
- Scales with your app
- Professional & reliable

---

## Troubleshooting

### Error: "Can't reach database"
- Check if DATABASE_URL is correctly set in Vercel
- Ensure database is not paused (free tiers may auto-pause)
- Check connection string format

### Error: "Migration failed"
- Make sure database is empty for first migration
- Or use `npx prisma db push` for initial setup

### Need Help?
The simplest option is Vercel Postgres - it's integrated and just works!