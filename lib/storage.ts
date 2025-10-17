/**
 * File Storage Utilities using Vercel Blob
 * Handles file uploads, deletions, and URL generation
 */

import { put, del, list } from '@vercel/blob';

export interface UploadResult {
  url: string;
  pathname: string;
  size: number;
}

export interface UploadOptions {
  folder?: string;
  access?: 'public' | 'private';
  addRandomSuffix?: boolean;
}

/**
 * Upload a file to Vercel Blob storage
 * @param file - The file to upload
 * @param options - Upload configuration options
 * @returns Upload result with URL and metadata
 */
export async function uploadFile(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const {
    folder = 'uploads',
    access = 'public',
    addRandomSuffix = true,
  } = options;

  try {
    const pathname = `${folder}/${file.name}`;

    const blob = await put(pathname, file, {
      access,
      addRandomSuffix,
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
    };
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('Failed to upload file');
  }
}

/**
 * Delete a file from Vercel Blob storage
 * @param url - The blob URL to delete
 */
export async function deleteFile(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('File deletion error:', error);
    throw new Error('Failed to delete file');
  }
}

/**
 * List files in a specific folder
 * @param folder - The folder to list files from
 * @returns Array of blob objects
 */
export async function listFiles(folder: string = 'uploads') {
  try {
    const { blobs } = await list({
      prefix: folder,
    });

    return blobs;
  } catch (error) {
    console.error('List files error:', error);
    throw new Error('Failed to list files');
  }
}

/**
 * Validate file type against allowed types
 * @param file - The file to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns boolean indicating if file type is valid
 */
export function validateFileType(
  file: File,
  allowedTypes: string[]
): boolean {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      const category = type.split('/')[0];
      return file.type.startsWith(category + '/');
    }
    return file.type === type;
  });
}

/**
 * Validate file size against maximum allowed size
 * @param file - The file to validate
 * @param maxSizeInMB - Maximum file size in megabytes
 * @returns boolean indicating if file size is valid
 */
export function validateFileSize(
  file: File,
  maxSizeInMB: number
): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

/**
 * Get human-readable file size
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Allowed file types for different upload categories
 */
export const ALLOWED_FILE_TYPES = {
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ],
  videos: [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo',
  ],
  all: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
  ],
};

/**
 * Maximum file sizes for different categories (in MB)
 */
export const MAX_FILE_SIZES = {
  document: 10,  // 10 MB
  video: 500,    // 500 MB
  general: 50,   // 50 MB
};
