# TRC TRAINING ACADEMY - BACKEND IMPLEMENTATION GUIDE

## 📋 PROJECT OVERVIEW

This document tracks the implementation of the complete Learning Management System (LMS) for TRC Training Academy, including file management, peer coaching, and Zoom integration.

**Current Status**: Week 1 - COMPLETED ✅
**Last Updated**: October 17, 2025

---

## ✅ WEEK 1: CRITICAL FOUNDATION - COMPLETED

### 1. Database Schema Updates

**Status**: ✅ Complete

**New Models Added**:

- **Upload**: File storage for documents and recordings
- **PeerCoachingPlan**: Teacher-created peer coaching pairs
- **ZoomMeeting**: Zoom meeting tracking and integration
- **FileAccessLog**: Audit trail for file downloads

**Key Changes**:
- Added relations to User model for uploads, peer plans, Zoom meetings
- Added PeerCoachingPlan relation to Class model
- Created UploadType enum (SESSION_DOCUMENT, SESSION_RECORDING, PEER_RECORDING, GENERAL)

**Migration Status**: Schema updated, Prisma client generated. **Production migration pending**.

### 2. File Upload Infrastructure

**Status**: ✅ Complete

**Package Installed**:
```bash
npm install @vercel/blob
```

**Files Created**:

#### `lib/storage.ts` - File Storage Utilities
- `uploadFile()` - Upload files to Vercel Blob
- `deleteFile()` - Delete files from storage
- `listFiles()` - List files in a folder
- `validateFileType()` - Validate file MIME types
- `validateFileSize()` - Validate file size limits
- `formatFileSize()` - Human-readable file sizes

**Supported File Types**:
- Documents: PDF, Word (.doc, .docx), PowerPoint (.ppt, .pptx)
- Videos: MP4, MPEG, QuickTime, AVI
- Max Sizes: Documents (10MB), Videos (500MB), General (50MB)

### 3. File Upload API Endpoints

**Status**: ✅ Complete

#### `POST /api/uploads` - Upload File
**Features**:
- Multi-part form data handling
- File type and size validation
- Permission checking (teachers/admins for sessions, students for peer recordings)
- Automatic file storage organization
- Database record creation with metadata

**Request Format**:
```typescript
FormData {
  file: File,
  uploadType: 'SESSION_DOCUMENT' | 'SESSION_RECORDING' | 'PEER_RECORDING' | 'GENERAL',
  relatedId?: string,  // sessionId or peerSessionId
  isVisible: 'true' | 'false'
}
```

**Response**:
```json
{
  "success": true,
  "upload": {
    "id": "clxxx",
    "fileName": "documents/file-xyz.pdf",
    "originalName": "lesson-plan.pdf",
    "fileUrl": "https://blob.vercel-storage.com/...",
    "fileSize": 1024000,
    "mimeType": "application/pdf",
    "uploadType": "SESSION_DOCUMENT",
    "isVisible": true,
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

#### `GET /api/uploads` - List Files
**Features**:
- Filter by uploadType, relatedId, visibility
- Permission-based filtering (students see only visible files)
- Includes uploader information

**Query Parameters**:
```
?uploadType=SESSION_DOCUMENT
&relatedId=clxxx
&isVisible=true
```

### 4. File Download/Management API

**Status**: ✅ Complete

#### `GET /api/uploads/[id]` - Download File
**Features**:
- Permission checking (class enrollment, material visibility)
- Access logging for audit trail
- Returns file URL for client-side download

**Response**:
```json
{
  "success": true,
  "file": {
    "id": "clxxx",
    "name": "lesson-plan.pdf",
    "url": "https://blob.vercel-storage.com/...",
    "size": 1024000,
    "mimeType": "application/pdf",
    "uploadedBy": "John Doe",
    "uploadedAt": "2025-01-15T10:30:00Z"
  }
}
```

#### `DELETE /api/uploads/[id]` - Delete File
**Features**:
- Permission checking (admin or uploader only)
- Deletes from both Vercel Blob and database
- Audit log creation
- Cascade deletes access logs

#### `PATCH /api/uploads/[id]` - Update File Metadata
**Features**:
- Update file visibility
- Teacher/admin only
- Useful for releasing materials to students

**Request**:
```json
{
  "isVisible": true
}
```

---

## 🔄 PRODUCTION DEPLOYMENT STEPS

### Step 1: Environment Variables

Add to Vercel project settings:

```env
# Existing variables
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://your-domain.com"

# NEW - Add these:
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

**To get BLOB_READ_WRITE_TOKEN**:
1. Go to Vercel Dashboard → Your Project → Storage
2. Create new Blob store (if not exists)
3. Copy the Read/Write token

### Step 2: Database Migration

**Option A: Using Prisma Migrate (Recommended)**

```bash
# On your local machine with production DATABASE_URL
npx prisma migrate dev --name add_file_upload_system

# Then deploy
npx prisma migrate deploy
```

**Option B: Manual SQL (if migrate fails)**

Create a new migration file `add_file_upload_system.sql` and run these commands:

```sql
-- Create Upload table
CREATE TABLE "Upload" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "uploadType" TEXT NOT NULL,
    "relatedId" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- Create PeerCoachingPlan table
CREATE TABLE "PeerCoachingPlan" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "student1Id" TEXT NOT NULL,
    "student2Id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PeerCoachingPlan_pkey" PRIMARY KEY ("id")
);

-- Create ZoomMeeting table
CREATE TABLE "ZoomMeeting" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "sessionId" TEXT,
    "peerSessionId" TEXT,
    "hostId" TEXT NOT NULL,
    "joinUrl" TEXT NOT NULL,
    "startUrl" TEXT NOT NULL,
    "password" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "participantCount" INTEGER NOT NULL DEFAULT 0,
    "recordingUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ZoomMeeting_pkey" PRIMARY KEY ("id")
);

-- Create FileAccessLog table
CREATE TABLE "FileAccessLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "ipAddress" TEXT,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FileAccessLog_pkey" PRIMARY KEY ("id")
);

-- Create UploadType enum
CREATE TYPE "UploadType" AS ENUM ('SESSION_DOCUMENT', 'SESSION_RECORDING', 'PEER_RECORDING', 'GENERAL');

-- Alter Upload table to use enum
ALTER TABLE "Upload" ALTER COLUMN "uploadType" TYPE "UploadType" USING ("uploadType"::"UploadType");

-- Create indexes
CREATE UNIQUE INDEX "ZoomMeeting_meetingId_key" ON "ZoomMeeting"("meetingId");
CREATE UNIQUE INDEX "PeerCoachingPlan_classId_student1Id_student2Id_key" ON "PeerCoachingPlan"("classId", "student1Id", "student2Id");
CREATE INDEX "Upload_uploadType_idx" ON "Upload"("uploadType");
CREATE INDEX "Upload_relatedId_idx" ON "Upload"("relatedId");
CREATE INDEX "FileAccessLog_userId_idx" ON "FileAccessLog"("userId");
CREATE INDEX "FileAccessLog_uploadId_idx" ON "FileAccessLog"("uploadId");

-- Add foreign keys
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_student1Id_fkey" FOREIGN KEY ("student1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_student2Id_fkey" FOREIGN KEY ("student2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ZoomMeeting" ADD CONSTRAINT "ZoomMeeting_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "FileAccessLog" ADD CONSTRAINT "FileAccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "FileAccessLog" ADD CONSTRAINT "FileAccessLog_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "Upload"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### Step 3: Deploy to Vercel

```bash
git add .
git commit -m "Add file upload system and enhanced peer coaching"
git push origin main
```

Vercel will automatically deploy.

### Step 4: Test File Upload

Use the following curl command or Postman:

```bash
curl -X POST https://your-domain.com/api/uploads \
  -H "Cookie: next-auth.session-token=..." \
  -F "file=@test.pdf" \
  -F "uploadType=SESSION_DOCUMENT" \
  -F "isVisible=false"
```

---

## 📊 API TESTING CHECKLIST

### File Upload Tests

- [ ] Upload document as teacher
- [ ] Upload video as teacher
- [ ] Upload peer recording as student
- [ ] Verify file type validation
- [ ] Verify file size validation
- [ ] Test upload to specific session

### File Download Tests

- [ ] Teacher downloads any file
- [ ] Admin downloads any file
- [ ] Student downloads visible file
- [ ] Student blocked from invisible file
- [ ] Student blocked from non-enrolled class file
- [ ] Verify access logging

### File Management Tests

- [ ] List files with filters
- [ ] Update file visibility
- [ ] Delete file as uploader
- [ ] Delete blocked for non-owner

---

## 📝 NEXT STEPS - WEEK 2

### Student Area Implementation

1. **Student Dashboard** (`app/student/dashboard/page.tsx`)
   - Fetch real enrollment data
   - Show upcoming sessions
   - Display available materials
   - Show peer coaching partner

2. **Documents Page** (`app/student/documents/page.tsx`)
   - List session documents
   - Filter by class/session
   - Download documents
   - Search functionality

3. **Recordings Page** (`app/student/recordings/page.tsx`)
   - List session recordings
   - Video player integration
   - Filter and search

4. **Peer Coaching Page** (`app/student/peer-coaching/page.tsx`)
   - View assigned partner
   - Schedule sessions
   - Upload recordings
   - View session history

### API Endpoints Needed

- `GET /api/student/classes` - List enrolled classes
- `GET /api/student/sessions` - List upcoming sessions
- `GET /api/student/documents` - List available documents
- `GET /api/student/recordings` - List available recordings
- `GET /api/student/peer-coaching/partner` - Get assigned partner
- `GET /api/student/peer-coaching/sessions` - List peer sessions
- `POST /api/student/peer-coaching/sessions` - Schedule peer session

---

## 🔒 SECURITY CONSIDERATIONS

### Implemented

- ✅ Session-based authentication for all endpoints
- ✅ Role-based access control (student/teacher/admin)
- ✅ File type and size validation
- ✅ Class enrollment verification
- ✅ Material visibility checks
- ✅ File access logging
- ✅ Audit trail for deletions

### Recommended Additions

- [ ] Rate limiting for file uploads
- [ ] Virus scanning for uploaded files
- [ ] Content Security Policy headers
- [ ] CORS configuration
- [ ] IP-based access restrictions (optional)

---

## 📈 MONITORING & ANALYTICS

### Database Queries to Monitor

```sql
-- Most downloaded files
SELECT u.originalName, COUNT(fal.id) as downloads
FROM "Upload" u
LEFT JOIN "FileAccessLog" fal ON u.id = fal."uploadId"
GROUP BY u.id
ORDER BY downloads DESC
LIMIT 10;

-- Storage usage by upload type
SELECT "uploadType",
       SUM("fileSize") as total_bytes,
       COUNT(*) as file_count
FROM "Upload"
GROUP BY "uploadType";

-- Recent file accesses
SELECT u.name as user_name,
       up.originalName as file_name,
       fal.action,
       fal."accessedAt"
FROM "FileAccessLog" fal
JOIN "User" u ON fal."userId" = u.id
JOIN "Upload" up ON fal."uploadId" = up.id
ORDER BY fal."accessedAt" DESC
LIMIT 20;
```

---

## 🐛 TROUBLESHOOTING

### Issue: "Failed to upload file"

**Possible causes**:
1. Missing BLOB_READ_WRITE_TOKEN environment variable
2. Vercel Blob storage not created
3. File size exceeds limits
4. Invalid file type

**Solution**:
1. Check Vercel Dashboard → Storage
2. Verify environment variables
3. Check browser console for detailed error
4. Review server logs in Vercel

### Issue: "You do not have permission to access this file"

**Possible causes**:
1. Student not enrolled in class
2. Materials not yet visible
3. File marked as not visible

**Solution**:
1. Check class enrollment in database
2. Verify session.materialsVisible = true
3. Check upload.isVisible = true

### Issue: Database migration fails

**Solution**:
```bash
# Reset migrations (DEV ONLY - will lose data)
rm -rf prisma/migrations
npx prisma migrate dev --name init

# Or manually run SQL from Step 2 above
```

---

## 📚 USEFUL COMMANDS

```bash
# Generate Prisma client after schema changes
npx prisma generate

# View database in browser
npx prisma studio

# Check database schema
npx prisma db pull

# Format Prisma schema
npx prisma format

# Validate schema
npx prisma validate

# View migration status
npx prisma migrate status
```

---

## 🎯 SUCCESS CRITERIA

### Week 1 - File Upload System

- [x] Database schema updated
- [x] Vercel Blob integration
- [x] Upload API endpoint
- [x] Download API with permissions
- [x] File type validation
- [x] Access logging
- [ ] Production deployment
- [ ] End-to-end testing

### Week 2 - Student Area

- [ ] Real data integration
- [ ] Document browsing
- [ ] Recording viewing
- [ ] Peer coaching partner view
- [ ] Basic session scheduling

### Week 3 - Peer Coaching

- [ ] Teacher creates plans
- [ ] Student schedules sessions
- [ ] Recording upload
- [ ] Session notes

### Week 4 - Zoom Integration

- [ ] Zoom Developer account
- [ ] Meeting creation API
- [ ] Auto-generate links
- [ ] Teacher oversight

---

## 📞 SUPPORT RESOURCES

- **Vercel Blob Docs**: https://vercel.com/docs/storage/vercel-blob
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth Docs**: https://next-auth.js.org
- **Zoom API Docs**: https://developers.zoom.us

---

**Document Version**: 1.0
**Last Updated**: October 17, 2025
**Maintained By**: Development Team
