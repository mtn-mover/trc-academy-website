# 🚀 PRODUCTION DEPLOYMENT GUIDE

**Last Updated**: October 17, 2025
**Migration Version**: 001 - File Upload System

---

## ✅ CHECKLIST

- [ ] Vercel Blob storage created
- [ ] BLOB_READ_WRITE_TOKEN added to environment variables
- [ ] Database migration SQL reviewed
- [ ] Database backup created (recommended)
- [ ] Migration applied to production database
- [ ] Deployment verified on Vercel
- [ ] File upload tested

---

## STEP 1: Setup Vercel Blob Storage

### 1.1 Access Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Click on your project: **trc-academy-website**

### 1.2 Create Blob Storage

1. Click **Storage** tab at the top
2. Click **Create Database** or **Connect Store** button
3. Select **Blob** from the list
4. Click **Continue**
5. Configure:
   - **Name**: `trc-files` (or any name you prefer)
   - **Region**: Select same as your app (probably `Washington, D.C., USA (East) – iad1`)
6. Click **Create**

### 1.3 Copy Environment Variable

After creation, you'll see:

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXXX
```

**Copy this entire value** (starts with `vercel_blob_rw_`)

### 1.4 Add Environment Variable

1. In Vercel, go to **Settings** → **Environment Variables**
2. Click **Add New**
3. Fill in:
   - **Key**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Paste the token you copied
   - **Environments**: Check ALL three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
4. Click **Save**

✅ **Step 1 Complete!** Blob storage is now configured.

---

## STEP 2: Access Your Production Database

You need to run SQL commands on your PostgreSQL database.

### Option A: Using Database GUI (Recommended)

If you're using **Prisma Accelerate** or have a database GUI:

1. Go to your database provider (e.g., https://cloud.prisma.io or PlanetScale, Supabase, etc.)
2. Find the **SQL Console** or **Query Editor**
3. Keep this window open - you'll use it in Step 3

### Option B: Using Command Line

If you have `psql` installed:

```bash
# Connect to your database
psql "postgresql://[YOUR_DATABASE_URL]"
```

### How to find your DATABASE_URL

1. In Vercel, go to **Settings** → **Environment Variables**
2. Find `DATABASE_URL`
3. Click to reveal the value
4. Copy it (it looks like: `postgresql://username:password@host:5432/database`)

---

## STEP 3: Run Database Migration

### 3.1 Create Backup (IMPORTANT!)

Before running any migration, create a backup:

**If using Prisma Cloud**:
- Database → Backups → Create Manual Backup

**If using psql**:
```bash
pg_dump "postgresql://[YOUR_DATABASE_URL]" > backup_before_migration_$(date +%Y%m%d).sql
```

### 3.2 Run Migration SQL

1. Open the file: `migrations/001_add_file_upload_system.sql`
2. Copy the **entire contents** of that file
3. Paste into your SQL console/editor
4. Click **Execute** or **Run**

### 3.3 Verify Success

Run this query to check tables were created:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('Upload', 'PeerCoachingPlan', 'ZoomMeeting', 'FileAccessLog');
```

**Expected result**: You should see 4 rows showing all 4 tables.

### 3.4 Check Enum Type

```sql
SELECT enumlabel
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'UploadType';
```

**Expected result**: 4 rows showing:
- SESSION_DOCUMENT
- SESSION_RECORDING
- PEER_RECORDING
- GENERAL

✅ **Step 3 Complete!** Database is now ready for file uploads.

---

## STEP 4: Verify Deployment

### 4.1 Check Vercel Deployment

1. Go to Vercel dashboard → **Deployments**
2. The latest deployment should show: ✅ **Ready**
3. If it shows an error, check the build logs

### 4.2 Redeploy (if needed)

If your deployment was before adding BLOB_READ_WRITE_TOKEN:

1. Go to **Deployments** → Click on latest deployment
2. Click the **⋯** menu → **Redeploy**
3. Wait for deployment to complete

---

## STEP 5: Test File Upload System

### 5.1 Login to Your Site

1. Go to your site: `https://your-domain.vercel.app`
2. Login as a **teacher** or **admin** user

### 5.2 Test Upload (Manual)

You can test using the browser's developer tools:

```javascript
// Open browser console (F12)
// Paste this code:

const formData = new FormData();
const testFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

formData.append('file', testFile);
formData.append('uploadType', 'SESSION_DOCUMENT');
formData.append('isVisible', 'true');

fetch('/api/uploads', {
  method: 'POST',
  body: formData,
  credentials: 'include'
})
.then(res => res.json())
.then(data => console.log('Upload result:', data));
```

**Expected result**: You should see:
```json
{
  "success": true,
  "upload": {
    "id": "clxxx",
    "fileName": "...",
    "fileUrl": "https://..."
  }
}
```

### 5.3 Verify in Database

Run this query:

```sql
SELECT * FROM "Upload" ORDER BY "createdAt" DESC LIMIT 5;
```

You should see your test upload!

### 5.4 Test Download

```javascript
// In browser console:
fetch('/api/uploads/[UPLOAD_ID]', {
  credentials: 'include'
})
.then(res => res.json())
.then(data => {
  console.log('File info:', data);
  // Open file in new tab
  window.open(data.file.url, '_blank');
});
```

Replace `[UPLOAD_ID]` with the ID from your upload result.

---

## STEP 6: Monitor Access Logs

Check that file access is being logged:

```sql
SELECT
  u.name as user_name,
  up.originalName as file_name,
  fal.action,
  fal."accessedAt"
FROM "FileAccessLog" fal
JOIN "User" u ON fal."userId" = u.id
JOIN "Upload" up ON fal."uploadId" = up.id
ORDER BY fal."accessedAt" DESC
LIMIT 10;
```

---

## 🎯 SUCCESS CRITERIA

Your deployment is successful if:

- ✅ Vercel deployment shows "Ready" status
- ✅ All 4 new tables exist in database
- ✅ UploadType enum has 4 values
- ✅ File upload via API returns success
- ✅ File is visible in Vercel Blob storage
- ✅ Database shows upload record
- ✅ File download works
- ✅ FileAccessLog records downloads

---

## 🐛 TROUBLESHOOTING

### Error: "BLOB_READ_WRITE_TOKEN is not defined"

**Solution**:
1. Check Vercel → Settings → Environment Variables
2. Ensure BLOB_READ_WRITE_TOKEN exists
3. Ensure it's enabled for Production
4. Redeploy the application

### Error: "relation 'Upload' does not exist"

**Solution**:
1. The migration hasn't been run yet
2. Go back to Step 3 and run the SQL migration
3. Verify tables exist with the verification query

### Error: "Failed to upload file"

**Solution**:
1. Check browser console for detailed error
2. Check Vercel function logs
3. Verify BLOB_READ_WRITE_TOKEN is correct
4. Try creating a new Blob storage in Vercel

### Error: "Type 'UploadType' does not exist"

**Solution**:
```sql
-- Manually create the enum
CREATE TYPE "UploadType" AS ENUM (
  'SESSION_DOCUMENT',
  'SESSION_RECORDING',
  'PEER_RECORDING',
  'GENERAL'
);
```

---

## 📊 DATABASE STATISTICS

After deployment, monitor these metrics:

```sql
-- Total storage used
SELECT
  uploadType,
  COUNT(*) as file_count,
  SUM(fileSize) / 1024 / 1024 as total_mb
FROM "Upload"
GROUP BY uploadType;

-- Most active uploaders
SELECT
  u.name,
  COUNT(up.id) as uploads,
  SUM(up.fileSize) / 1024 / 1024 as total_mb
FROM "User" u
LEFT JOIN "Upload" up ON u.id = up.uploadedBy
GROUP BY u.id, u.name
ORDER BY uploads DESC
LIMIT 10;

-- Recent uploads
SELECT
  u.name as uploaded_by,
  up.originalName,
  up.uploadType,
  up.fileSize / 1024 / 1024 as size_mb,
  up.createdAt
FROM "Upload" up
JOIN "User" u ON up.uploadedBy = u.id
ORDER BY up.createdAt DESC
LIMIT 20;
```

---

## 📞 SUPPORT

If you encounter issues:

1. Check Vercel build logs
2. Check database error logs
3. Review `IMPLEMENTATION_GUIDE.md` for detailed API documentation
4. Check browser console for client-side errors

---

## ✅ POST-DEPLOYMENT CHECKLIST

After successful deployment:

- [ ] Test file upload as teacher
- [ ] Test file upload as student (should fail for session materials)
- [ ] Test file download with different user roles
- [ ] Verify access logs are being created
- [ ] Check Vercel Blob dashboard for uploaded files
- [ ] Monitor database for proper relationships
- [ ] Test file deletion (admin only)
- [ ] Test file visibility toggle

---

**🎉 Deployment Complete!**

Your TRC Training Academy now has a fully functional file upload and management system.

Next steps: Week 2 - Student Area Implementation

