'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import { useStudentEnrollments, useClassSessions } from '@/src/hooks/useStudentData';
import { getFileIcon, formatFileSize, getFileTypeLabel } from '@/src/lib/fileHelpers';

interface Upload {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadType: string;
  relatedId: string | null;
  isVisible: boolean;
  createdAt: string;
  uploadedByUser: {
    id: string;
    name: string;
    email: string;
  };
}

export default function StudentMaterialsPage() {
  const { data: session } = useSession();
  const { enrollments, loading: enrollmentsLoading } = useStudentEnrollments();
  const currentClass = enrollments.find((e) => e.class.isActive);
  const { sessions, loading: sessionsLoading } = useClassSessions(currentClass?.class.id || null);

  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'ALL' | 'SESSION_DOCUMENT' | 'SESSION_RECORDING'>('ALL');
  const [filterSession, setFilterSession] = useState<string>('ALL');

  useEffect(() => {
    if (currentClass) {
      fetchUploads();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass]);

  const fetchUploads = async () => {
    try {
      const response = await fetch('/api/uploads?isVisible=true');
      if (response.ok) {
        const data = await response.json();
        // Filter to only show uploads related to current class sessions
        const sessionIds = sessions.map((s) => s.id);
        const filteredUploads = data.filter(
          (u: Upload) => u.relatedId && sessionIds.includes(u.relatedId)
        );
        setUploads(filteredUploads);
      }
    } catch (error) {
      console.error('Failed to fetch uploads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (uploadId: string) => {
    try {
      const response = await fetch(`/api/uploads/${uploadId}`);
      if (response.ok) {
        const data = await response.json();
        // Open file in new tab
        window.open(data.file.url, '_blank');
      } else {
        alert('Failed to access file');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('An error occurred while accessing the file');
    }
  };

  const getSessionTitle = (relatedId: string | null) => {
    if (!relatedId) return 'General';
    const session = sessions.find((s) => s.id === relatedId);
    return session?.title || 'Unknown Session';
  };

  // Filter uploads
  const filteredUploads = uploads.filter((upload) => {
    if (filterType !== 'ALL' && upload.uploadType !== filterType) return false;
    if (filterSession !== 'ALL' && upload.relatedId !== filterSession) return false;
    return true;
  });

  // Group by session
  const groupedUploads = filteredUploads.reduce((acc, upload) => {
    const sessionId = upload.relatedId || 'GENERAL';
    if (!acc[sessionId]) acc[sessionId] = [];
    acc[sessionId].push(upload);
    return acc;
  }, {} as Record<string, Upload[]>);

  const isLoading = enrollmentsLoading || sessionsLoading || loading;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trc-blue-600 mx-auto"></div>
            <p className="mt-4 text-trc-gray-600">Loading materials...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentClass) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-trc-gray-900 mb-4">Course Materials</h1>
          <p className="text-trc-gray-600">
            You are not currently enrolled in any classes.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-trc-gray-900">Course Materials</h1>
          <p className="text-trc-gray-600 mt-2">{currentClass.class.name}</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-trc-gray-700 mb-2">
                Material Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trc-blue-500"
              >
                <option value="ALL">All Types</option>
                <option value="SESSION_DOCUMENT">Documents Only</option>
                <option value="SESSION_RECORDING">Recordings Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-trc-gray-700 mb-2">
                Session
              </label>
              <select
                value={filterSession}
                onChange={(e) => setFilterSession(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trc-blue-500"
              >
                <option value="ALL">All Sessions</option>
                {sessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-sm text-trc-gray-600">
            Showing {filteredUploads.length} of {uploads.length} materials
          </div>
        </div>

        {/* Materials List */}
        {Object.keys(groupedUploads).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedUploads).map(([sessionId, sessionUploads]) => (
              <div key={sessionId} className="bg-white rounded-lg shadow">
                <div className="bg-trc-blue-50 px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-trc-gray-900">
                    {getSessionTitle(sessionId === 'GENERAL' ? null : sessionId)}
                  </h2>
                  <p className="text-sm text-trc-gray-600 mt-1">
                    {sessionUploads.length} file{sessionUploads.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="divide-y divide-gray-200">
                  {sessionUploads.map((upload) => (
                    <div
                      key={upload.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {getFileIcon(upload.mimeType, upload.originalName)}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-trc-gray-900">
                            {upload.originalName}
                          </h3>
                          <p className="text-sm text-trc-gray-600 mt-1">
                            {getFileTypeLabel(upload.mimeType, upload.originalName)} •{' '}
                            {formatFileSize(upload.fileSize)}
                          </p>
                          <p className="text-xs text-trc-gray-500 mt-1">
                            Uploaded by {upload.uploadedByUser.name} on{' '}
                            {new Date(upload.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => handleDownload(upload.id)}
                            className="inline-flex items-center px-4 py-2 bg-trc-blue-600 text-white text-sm font-medium rounded-lg hover:bg-trc-blue-700 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-trc-gray-900 mb-2">
              No materials available
            </h3>
            <p className="text-trc-gray-600">
              {filterType !== 'ALL' || filterSession !== 'ALL'
                ? 'No materials match your current filters. Try adjusting your selection.'
                : 'Your instructor hasn\'t uploaded any materials yet. Check back later!'}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
