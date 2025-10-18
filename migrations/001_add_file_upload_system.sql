-- =====================================================
-- TRC Training Academy - Database Migration
-- Version: 001
-- Description: Add file upload system and peer coaching enhancements
-- Date: October 17, 2025
-- =====================================================

-- IMPORTANT: Run this SQL in your PostgreSQL database
-- This migration adds: Upload, PeerCoachingPlan, ZoomMeeting, FileAccessLog tables

BEGIN;

-- =====================================================
-- 1. CREATE ENUM TYPES
-- =====================================================

-- Create UploadType enum
DO $$ BEGIN
    CREATE TYPE "UploadType" AS ENUM ('SESSION_DOCUMENT', 'SESSION_RECORDING', 'PEER_RECORDING', 'GENERAL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- 2. CREATE UPLOAD TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS "Upload" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "uploadType" "UploadType" NOT NULL,
    "relatedId" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- =====================================================
-- 3. CREATE PEER COACHING PLAN TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS "PeerCoachingPlan" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "student1Id" TEXT NOT NULL,
    "student2Id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PeerCoachingPlan_pkey" PRIMARY KEY ("id")
);

-- =====================================================
-- 4. CREATE ZOOM MEETING TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS "ZoomMeeting" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZoomMeeting_pkey" PRIMARY KEY ("id")
);

-- =====================================================
-- 5. CREATE FILE ACCESS LOG TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS "FileAccessLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "ipAddress" TEXT,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileAccessLog_pkey" PRIMARY KEY ("id")
);

-- =====================================================
-- 6. CREATE UNIQUE CONSTRAINTS
-- =====================================================

-- ZoomMeeting unique constraint on meetingId
DO $$ BEGIN
    ALTER TABLE "ZoomMeeting" ADD CONSTRAINT "ZoomMeeting_meetingId_key" UNIQUE ("meetingId");
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- PeerCoachingPlan unique constraint
DO $$ BEGIN
    ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_classId_student1Id_student2Id_key"
    UNIQUE ("classId", "student1Id", "student2Id");
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- 7. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS "Upload_uploadType_idx" ON "Upload"("uploadType");
CREATE INDEX IF NOT EXISTS "Upload_relatedId_idx" ON "Upload"("relatedId");
CREATE INDEX IF NOT EXISTS "Upload_uploadedBy_idx" ON "Upload"("uploadedBy");
CREATE INDEX IF NOT EXISTS "Upload_isVisible_idx" ON "Upload"("isVisible");

CREATE INDEX IF NOT EXISTS "PeerCoachingPlan_classId_idx" ON "PeerCoachingPlan"("classId");
CREATE INDEX IF NOT EXISTS "PeerCoachingPlan_student1Id_idx" ON "PeerCoachingPlan"("student1Id");
CREATE INDEX IF NOT EXISTS "PeerCoachingPlan_student2Id_idx" ON "PeerCoachingPlan"("student2Id");

CREATE INDEX IF NOT EXISTS "ZoomMeeting_sessionId_idx" ON "ZoomMeeting"("sessionId");
CREATE INDEX IF NOT EXISTS "ZoomMeeting_peerSessionId_idx" ON "ZoomMeeting"("peerSessionId");
CREATE INDEX IF NOT EXISTS "ZoomMeeting_hostId_idx" ON "ZoomMeeting"("hostId");

CREATE INDEX IF NOT EXISTS "FileAccessLog_userId_idx" ON "FileAccessLog"("userId");
CREATE INDEX IF NOT EXISTS "FileAccessLog_uploadId_idx" ON "FileAccessLog"("uploadId");
CREATE INDEX IF NOT EXISTS "FileAccessLog_accessedAt_idx" ON "FileAccessLog"("accessedAt");

-- =====================================================
-- 8. CREATE FOREIGN KEY CONSTRAINTS
-- =====================================================

-- Upload foreign keys
DO $$ BEGIN
    ALTER TABLE "Upload" ADD CONSTRAINT "Upload_uploadedBy_fkey"
    FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- PeerCoachingPlan foreign keys
DO $$ BEGIN
    ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_classId_fkey"
    FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_student1Id_fkey"
    FOREIGN KEY ("student1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_student2Id_fkey"
    FOREIGN KEY ("student2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "PeerCoachingPlan" ADD CONSTRAINT "PeerCoachingPlan_createdBy_fkey"
    FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ZoomMeeting foreign keys
DO $$ BEGIN
    ALTER TABLE "ZoomMeeting" ADD CONSTRAINT "ZoomMeeting_hostId_fkey"
    FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- FileAccessLog foreign keys
DO $$ BEGIN
    ALTER TABLE "FileAccessLog" ADD CONSTRAINT "FileAccessLog_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "FileAccessLog" ADD CONSTRAINT "FileAccessLog_uploadId_fkey"
    FOREIGN KEY ("uploadId") REFERENCES "Upload"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- 9. CREATE TRIGGER FOR UPDATED_AT
-- =====================================================

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Upload trigger
DROP TRIGGER IF EXISTS update_upload_updated_at ON "Upload";
CREATE TRIGGER update_upload_updated_at
    BEFORE UPDATE ON "Upload"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- PeerCoachingPlan trigger
DROP TRIGGER IF EXISTS update_peer_coaching_plan_updated_at ON "PeerCoachingPlan";
CREATE TRIGGER update_peer_coaching_plan_updated_at
    BEFORE UPDATE ON "PeerCoachingPlan"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ZoomMeeting trigger
DROP TRIGGER IF EXISTS update_zoom_meeting_updated_at ON "ZoomMeeting";
CREATE TRIGGER update_zoom_meeting_updated_at
    BEFORE UPDATE ON "ZoomMeeting"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMIT;

-- =====================================================
-- 10. VERIFICATION QUERIES
-- =====================================================

-- Run these after migration to verify success:

-- Check that all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('Upload', 'PeerCoachingPlan', 'ZoomMeeting', 'FileAccessLog');

-- Check that enum type exists
SELECT enumlabel
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'UploadType';

-- Check indexes
SELECT indexname
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('Upload', 'PeerCoachingPlan', 'ZoomMeeting', 'FileAccessLog');

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- If you see no errors above, the migration was successful!
-- You can now use the file upload system.
-- =====================================================
