'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import FileUpload from '@/src/components/FileUpload';
import Link from 'next/link';
import { getFileIcon, formatFileSize, getFileTypeLabel, ACCEPTED_DOCUMENT_TYPES, ACCEPTED_VIDEO_TYPES } from '@/src/lib/fileHelpers';

interface Upload {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadType: string;
  isVisible: boolean;
  createdAt: string;
  uploadedByUser: {
    id: string;
    name: string;
  };
}

interface SessionData {
  id: string;
  classId: string;
  title: string;
  description: string | null;
  date: string;
  startTime: string;
  duration: number;
  status: string;
  materialsVisible: boolean;
}

export default function SessionMaterialsPage({
  params,
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const resolvedParams = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [materialsVisible, setMaterialsVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session && !session.user.isTeacher) {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user.isTeacher) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, resolvedParams.sessionId]);

  const fetchData = async () => {
    try {
      // Fetch session info
      const sessionResponse = await fetch(`/api/classes/${resolvedParams.id}/sessions`);
      if (sessionResponse.ok) {
        const sessionsData = await sessionResponse.json();
        const currentSession = sessionsData.find((s: SessionData) => s.id === resolvedParams.sessionId);
        if (currentSession) {
          setSessionData(currentSession);
          setMaterialsVisible(currentSession.materialsVisible);
        } else {
          setError('Session not found');
        }
      }

      // Fetch uploads for this session
      const uploadsResponse = await fetch(`/api/uploads?relatedId=${resolvedParams.sessionId}`);
      if (uploadsResponse.ok) {
        const uploadsData = await uploadsResponse.json();
        setUploads(uploadsData);
      }
    } catch {
      setError('An error occurred while loading session materials');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (upload: any) => {
    setUploads((prev) => [upload, ...prev]);
  };

  const handleDeleteFile = async (uploadId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/uploads/${uploadId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUploads((prev) => prev.filter((u) => u.id !== uploadId));
      } else {
        alert('Failed to delete file');
      }
    } catch {
      alert('An error occurred while deleting the file');
    }
  };

  const handleToggleVisibility = async (uploadId: string, currentVisibility: boolean) => {
    try {
      const response = await fetch(`/api/uploads/${uploadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !currentVisibility }),
      });

      if (response.ok) {
        setUploads((prev) =>
          prev.map((u) => (u.id === uploadId ? { ...u, isVisible: !currentVisibility } : u))
        );
      } else {
        alert('Failed to update visibility');
      }
    } catch {
      alert('An error occurred while updating visibility');
    }
  };

  const handleToggleMaterialsVisibility = async () => {
    setUpdating(true);
    try {
      // This would need a new API endpoint to update session
      // For now, we'll just update the local state
      // You'll need to create PUT /api/classes/[id]/sessions/[sessionId] endpoint
      setMaterialsVisible(!materialsVisible);
      alert('Note: This feature requires backend implementation');
    } catch {
      alert('Failed to update materials visibility');
    } finally {
      setUpdating(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trc-blue-600"></div>
      </div>
    );
  }

  if (!session?.user.isTeacher || error || !sessionData) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error || 'Session not found'}
          </div>
          <Link
            href={`/teacher/classes/${resolvedParams.id}/sessions`}
            className="mt-4 inline-block text-trc-blue-600 hover:text-trc-blue-700"
          >
            ← Back to Sessions
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const documents = uploads.filter((u) => u.uploadType === 'SESSION_DOCUMENT');
  const recordings = uploads.filter((u) => u.uploadType === 'SESSION_RECORDING');

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/teacher/classes/${resolvedParams.id}/sessions`}
            className="text-trc-blue-600 hover:text-trc-blue-700 text-sm mb-4 inline-block"
          >
            ← Back to Sessions
          </Link>
          <h1 className="text-3xl font-bold text-trc-gray-900">{sessionData.title}</h1>
          <p className="text-trc-gray-600 mt-2">
            {new Date(sessionData.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            at {sessionData.startTime}
          </p>
          {sessionData.description && (
            <p className="text-trc-gray-600 mt-2">{sessionData.description}</p>
          )}
        </div>

        {/* Materials Visibility Toggle */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-trc-gray-900">Student Access</h3>
              <p className="text-sm text-trc-gray-600 mt-1">
                {materialsVisible
                  ? 'Students can currently see and download all visible materials'
                  : 'Materials are hidden from students'}
              </p>
            </div>
            <button
              onClick={handleToggleMaterialsVisibility}
              disabled={updating}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-trc-blue-600 focus:ring-offset-2
                ${materialsVisible ? 'bg-trc-blue-600' : 'bg-gray-200'}
              `}
            >
              <span
                className={`
                  inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${materialsVisible ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Documents Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-trc-gray-900">Documents</h2>
              <span className="text-sm text-trc-gray-600">{documents.length} files</span>
            </div>

            <FileUpload
              uploadType="SESSION_DOCUMENT"
              relatedId={resolvedParams.sessionId}
              isVisible={materialsVisible}
              accept={ACCEPTED_DOCUMENT_TYPES}
              maxSize={10}
              label="Upload Document"
              onUploadSuccess={handleUploadSuccess}
              className="mb-4"
            />

            <div className="space-y-3">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start p-3 border rounded-lg hover:bg-gray-50"
                  >
                    {getFileIcon(doc.mimeType, doc.originalName)}
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-trc-gray-900 text-sm">{doc.originalName}</p>
                      <p className="text-xs text-trc-gray-600">
                        {getFileTypeLabel(doc.mimeType, doc.originalName)} • {formatFileSize(doc.fileSize)}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleVisibility(doc.id, doc.isVisible)}
                          className="text-xs text-trc-blue-600 hover:underline"
                        >
                          {doc.isVisible ? '👁️ Visible' : '🔒 Hidden'}
                        </button>
                        <span className="text-gray-300">•</span>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-trc-blue-600 hover:underline"
                        >
                          Download
                        </a>
                        <span className="text-gray-300">•</span>
                        <button
                          onClick={() => handleDeleteFile(doc.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-trc-gray-600 text-center py-8">
                  No documents uploaded yet
                </p>
              )}
            </div>
          </div>

          {/* Recordings Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-trc-gray-900">Recordings</h2>
              <span className="text-sm text-trc-gray-600">{recordings.length} files</span>
            </div>

            <FileUpload
              uploadType="SESSION_RECORDING"
              relatedId={resolvedParams.sessionId}
              isVisible={materialsVisible}
              accept={ACCEPTED_VIDEO_TYPES}
              maxSize={500}
              label="Upload Recording"
              onUploadSuccess={handleUploadSuccess}
              className="mb-4"
            />

            <div className="space-y-3">
              {recordings.length > 0 ? (
                recordings.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-start p-3 border rounded-lg hover:bg-gray-50"
                  >
                    {getFileIcon(rec.mimeType, rec.originalName)}
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-trc-gray-900 text-sm">{rec.originalName}</p>
                      <p className="text-xs text-trc-gray-600">
                        {getFileTypeLabel(rec.mimeType, rec.originalName)} • {formatFileSize(rec.fileSize)}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleVisibility(rec.id, rec.isVisible)}
                          className="text-xs text-trc-blue-600 hover:underline"
                        >
                          {rec.isVisible ? '👁️ Visible' : '🔒 Hidden'}
                        </button>
                        <span className="text-gray-300">•</span>
                        <a
                          href={rec.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-trc-blue-600 hover:underline"
                        >
                          Download
                        </a>
                        <span className="text-gray-300">•</span>
                        <button
                          onClick={() => handleDeleteFile(rec.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-trc-gray-600 text-center py-8">
                  No recordings uploaded yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
