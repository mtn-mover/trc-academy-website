/**
 * File Download/Delete API Endpoint
 * GET /api/uploads/[id] - Download a file
 * DELETE /api/uploads/[id] - Delete a file
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { deleteFile } from '@/lib/storage';

// GET /api/uploads/[id] - Download file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Find the upload
    const upload = await prisma.upload.findUnique({
      where: { id },
      include: {
        uploadedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!upload) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Get current user details
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

    // Permission check
    // Admins and teachers can access any file
    // Students can only access visible files or their own uploads
    const canAccess =
      user.isAdmin ||
      user.isTeacher ||
      upload.isVisible ||
      upload.uploadedBy === session.user.id;

    if (!canAccess) {
      return NextResponse.json(
        { error: 'You do not have permission to access this file' },
        { status: 403 }
      );
    }

    // If relatedId exists (session file), verify student has access to that class
    if (upload.relatedId && user.isStudent && !user.isTeacher && !user.isAdmin) {
      // Check if file is related to a session
      if (upload.uploadType.includes('SESSION_')) {
        const session = await prisma.session.findUnique({
          where: { id: upload.relatedId },
          include: {
            class: {
              include: {
                members: {
                  where: { userId: session.user.id },
                },
              },
            },
          },
        });

        if (!session || session.class.members.length === 0) {
          return NextResponse.json(
            { error: 'You are not enrolled in the class for this file' },
            { status: 403 }
          );
        }

        // Check if materials are visible
        if (!session.materialsVisible) {
          return NextResponse.json(
            { error: 'Materials for this session are not yet available' },
            { status: 403 }
          );
        }
      }
    }

    // Log the file access
    await prisma.fileAccessLog.create({
      data: {
        userId: session.user.id,
        uploadId: upload.id,
        action: 'DOWNLOAD',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      },
    });

    // Return file information for client-side download
    // In a browser, you can use this URL to trigger download
    return NextResponse.json({
      success: true,
      file: {
        id: upload.id,
        name: upload.originalName,
        url: upload.fileUrl,
        size: upload.fileSize,
        mimeType: upload.mimeType,
        uploadedBy: upload.uploadedByUser.name,
        uploadedAt: upload.createdAt,
      },
    });

  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json(
      { error: 'Failed to access file' },
      { status: 500 }
    );
  }
}

// DELETE /api/uploads/[id] - Delete file
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Find the upload
    const upload = await prisma.upload.findUnique({
      where: { id },
    });

    if (!upload) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Get current user details
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true, isTeacher: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Permission check
    // Only admins, teachers who uploaded it, or the uploader can delete
    const canDelete =
      user.isAdmin ||
      upload.uploadedBy === session.user.id;

    if (!canDelete) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this file' },
        { status: 403 }
      );
    }

    // Delete from Vercel Blob storage
    try {
      await deleteFile(upload.fileUrl);
    } catch (error) {
      console.error('Blob deletion error:', error);
      // Continue even if blob deletion fails
    }

    // Delete from database (this will cascade delete access logs)
    await prisma.upload.delete({
      where: { id },
    });

    // Log the deletion
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE_FILE',
        entityId: upload.id,
        entityType: 'Upload',
        metadata: JSON.stringify({
          fileName: upload.originalName,
          uploadType: upload.uploadType,
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });

  } catch (error) {
    console.error('File deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}

// PATCH /api/uploads/[id] - Update file visibility or metadata
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Find the upload
    const upload = await prisma.upload.findUnique({
      where: { id },
    });

    if (!upload) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Get current user details
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true, isTeacher: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Permission check
    const canUpdate =
      user.isAdmin ||
      (user.isTeacher && upload.uploadedBy === session.user.id);

    if (!canUpdate) {
      return NextResponse.json(
        { error: 'You do not have permission to update this file' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { isVisible } = body;

    // Update upload
    const updatedUpload = await prisma.upload.update({
      where: { id },
      data: {
        isVisible: isVisible !== undefined ? isVisible : upload.isVisible,
      },
      include: {
        uploadedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      upload: updatedUpload,
    });

  } catch (error) {
    console.error('File update error:', error);
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    );
  }
}
