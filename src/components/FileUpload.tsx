'use client';

import { useState, useRef } from 'react';

interface UploadResult {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadType: string;
  isVisible: boolean;
  createdAt: string;
}

export interface FileUploadProps {
  onUploadSuccess?: (upload: UploadResult) => void;
  onUploadError?: (error: string) => void;
  uploadType: 'SESSION_DOCUMENT' | 'SESSION_RECORDING' | 'PEER_RECORDING' | 'GENERAL';
  relatedId?: string;
  isVisible?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  className?: string;
}

export default function FileUpload({
  onUploadSuccess,
  onUploadError,
  uploadType,
  relatedId,
  isVisible = false,
  accept,
  maxSize = 500,
  label = 'Upload File',
  className = '',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setProgress(0);

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      const errorMsg = `File size (${fileSizeMB.toFixed(2)}MB) exceeds maximum allowed size of ${maxSize}MB`;
      setError(errorMsg);
      if (onUploadError) onUploadError(errorMsg);
      return;
    }

    // Start upload
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('uploadType', uploadType);
      if (relatedId) formData.append('relatedId', relatedId);
      formData.append('isVisible', isVisible.toString());

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      setProgress(100);

      if (onUploadSuccess) {
        onUploadSuccess(result.upload);
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Clear progress after a delay
      setTimeout(() => {
        setProgress(0);
        setUploading(false);
      }, 2000);

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMsg);
      if (onUploadError) onUploadError(errorMsg);
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept={accept}
        className="hidden"
        disabled={uploading}
      />

      <button
        type="button"
        onClick={handleButtonClick}
        disabled={uploading}
        className={`
          inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
          ${uploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-trc-blue-600 hover:bg-trc-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trc-blue-500'
          }
          text-white transition-colors
        `}
      >
        {uploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {label}
          </>
        )}
      </button>

      {/* Progress Bar */}
      {uploading && progress > 0 && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-trc-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-trc-gray-600 mt-1">{progress}% uploaded</p>
        </div>
      )}

      {/* Success Message */}
      {progress === 100 && !uploading && (
        <div className="mt-2 flex items-center text-sm text-green-600">
          <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Upload successful!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
