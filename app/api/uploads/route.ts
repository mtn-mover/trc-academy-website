/**
 * File Upload API Endpoint
 * POST /api/uploads - Upload a new file
 * Handles documents, recordings, and other file types
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { UploadType } from '@prisma/client';
import {
  uploadFile,
  validateFileType,
  validateFileSize,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZES
} from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadType = formData.get('uploadType') as string;
    const relatedId = formData.get('relatedId') as string | null;
    const isVisible = formData.get('isVisible') === 'true';

    // Validation
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!uploadType) {
      return NextResponse.json(
        { error: 'Upload type is required' },
        { status: 400 }
      );
    }

    // Validate upload type
    const validUploadTypes = ['SESSION_DOCUMENT', 'SESSION_RECORDING', 'PEER_RECORDING', 'GENERAL'];
    if (!validUploadTypes.includes(uploadType)) {
      return NextResponse.json(
        { error: 'Invalid upload type' },
        { status: 400 }
      );
    }

    // Determine allowed file types based on upload type
    let allowedTypes: string[];
    let maxSize: number;

    if (uploadType.includes('RECORDING')) {
      allowedTypes = ALLOWED_FILE_TYPES.videos;
      maxSize = MAX_FILE_SIZES.video;
    } else if (uploadType.includes('DOCUMENT')) {
      allowedTypes = ALLOWED_FILE_TYPES.documents;
      maxSize = MAX_FILE_SIZES.document;
    } else {
      allowedTypes = ALLOWED_FILE_TYPES.all;
      maxSize = MAX_FILE_SIZES.general;
    }

    // Validate file type
    if (!validateFileType(file, allowedTypes)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF, Word document, or video file.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (!validateFileSize(file, maxSize)) {
      return NextResponse.json(
        { error: `File size exceeds maximum limit of ${maxSize}MB` },
        { status: 400 }
      );
    }

    // Permission check
    // Teachers and admins can upload session materials
    // Students can upload peer coaching recordings
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isStudent: true, isTeacher: true, isAdmin: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check permissions based on upload type
    if (uploadType.includes('SESSION_') && !user.isTeacher && !user.isAdmin) {
      return NextResponse.json(
        { error: 'Only teachers and admins can upload session materials' },
        { status: 403 }
      );
    }

    // If uploading to a session, verify teacher has access to that class
    if (relatedId && uploadType.includes('SESSION_')) {
      const trainingSession = await prisma.session.findUnique({
        where: { id: relatedId },
        include: {
          class: {
            include: {
              teachers: {
                where: { teacherId: session.user.id },
              },
            },
          },
        },
      });

      if (!trainingSession || (trainingSession.class.teachers.length === 0 && !user.isAdmin)) {
        return NextResponse.json(
          { error: 'You do not have permission to upload to this session' },
          { status: 403 }
        );
      }
    }

    // Upload file to Vercel Blob
    const folder = uploadType.toLowerCase().replace('_', '/');
    const uploadResult = await uploadFile(file, { folder });

    // Save upload record to database
    const upload = await prisma.upload.create({
      data: {
        fileName: uploadResult.pathname,
        originalName: file.name,
        fileUrl: uploadResult.url,
        fileSize: uploadResult.size,
        mimeType: file.type,
        uploadedBy: session.user.id,
        uploadType: uploadType as 'SESSION_DOCUMENT' | 'SESSION_RECORDING' | 'PEER_RECORDING' | 'GENERAL',
        relatedId,
        isVisible,
      },
      include: {
        uploadedByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      upload,
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// GET /api/uploads - List uploads (with filters)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const uploadType = searchParams.get('uploadType');
    const relatedId = searchParams.get('relatedId');
    const isVisible = searchParams.get('isVisible');

    // Build query filters
    const where: {
      uploadType?: UploadType;
      relatedId?: string;
      isVisible?: boolean;
    } = {};

    if (uploadType) {
      where.uploadType = uploadType as UploadType;
    }

    if (relatedId) {
      where.relatedId = relatedId;
    }

    if (isVisible !== null) {
      where.isVisible = isVisible === 'true';
    }

    // Get user to check permissions
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isStudent: true, isTeacher: true, isAdmin: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Students can only see visible uploads
    if (user.isStudent && !user.isTeacher && !user.isAdmin) {
      where.isVisible = true;
    }

    const uploads = await prisma.upload.findMany({
      where,
      include: {
        uploadedByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(uploads);

  } catch (error) {
    console.error('List uploads error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch uploads' },
      { status: 500 }
    );
  }
}
