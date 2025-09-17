'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
}

interface Recording {
  id: string;
  title: string;
  videoUrl: string;
}

interface SessionData {
  id: string;
  title: string;
  description: string | null;
  date: string;
  startTime: string;
  duration: number;
  status: string;
  materialsVisible: boolean;
  documents: Document[];
  recordings: Recording[];
}

export default function SessionsListPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [className, setClassName] = useState('');

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
  }, [session, resolvedParams.id]);

  const fetchData = async () => {
    try {
      // Fetch class info
      const classResponse = await fetch(`/api/classes/${resolvedParams.id}`);
      if (classResponse.ok) {
        const classData = await classResponse.json();
        setClassName(classData.name);
      }

      // Fetch sessions
      const sessionsResponse = await fetch(`/api/classes/${resolvedParams.id}/sessions`);
      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json();
        setSessions(sessionsData);
      } else {
        setError('Failed to fetch sessions');
      }
    } catch {
      setError('An error occurred while loading sessions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSessionStatus = (date: string, status: string) => {
    if (status === 'CANCELLED') return { text: 'Cancelled', color: 'bg-red-100 text-red-800' };
    if (status === 'COMPLETED') return { text: 'Completed', color: 'bg-gray-100 text-gray-800' };

    const sessionDate = new Date(date);
    const now = new Date();
    if (sessionDate < now) return { text: 'Past', color: 'bg-gray-100 text-gray-800' };
    if (sessionDate.toDateString() === now.toDateString()) return { text: 'Today', color: 'bg-blue-100 text-blue-800' };
    return { text: 'Upcoming', color: 'bg-green-100 text-green-800' };
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!session?.user.isTeacher) {
    return null;
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
          <Link
            href={`/teacher/classes/${resolvedParams.id}`}
            className="mt-4 inline-block text-purple-600 hover:text-purple-700"
          >
            ← Back to Class
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/teacher/classes/${resolvedParams.id}`}
            className="text-purple-600 hover:text-purple-700 text-sm mb-4 inline-block"
          >
            ← Back to Class
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Class Sessions</h1>
              {className && (
                <p className="text-gray-600 mt-1">{className}</p>
              )}
            </div>
            <Link
              href={`/teacher/classes/${resolvedParams.id}/sessions/new`}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Session
            </Link>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-lg shadow">
          {sessions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {sessions.map((sessionItem) => {
                const statusInfo = getSessionStatus(sessionItem.date, sessionItem.status);
                return (
                  <div key={sessionItem.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{sessionItem.title}</h3>
                          <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                        </div>
                        {sessionItem.description && (
                          <p className="text-sm text-gray-600 mt-1">{sessionItem.description}</p>
                        )}
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(sessionItem.date)}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {sessionItem.startTime} ({sessionItem.duration} min)
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {sessionItem.documents.length} document{sessionItem.documents.length !== 1 ? 's' : ''}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            {sessionItem.recordings.length} recording{sessionItem.recordings.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        {sessionItem.materialsVisible && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Materials Visible
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex items-center space-x-2">
                        <Link
                          href={`/teacher/classes/${resolvedParams.id}/sessions/${sessionItem.id}`}
                          className="px-3 py-1 text-sm text-purple-600 hover:text-purple-900 font-medium"
                        >
                          View
                        </Link>
                        <Link
                          href={`/teacher/classes/${resolvedParams.id}/sessions/${sessionItem.id}/edit`}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600">No sessions scheduled yet</p>
              <p className="text-sm text-gray-500 mt-1">Create your first session to get started</p>
              <Link
                href={`/teacher/classes/${resolvedParams.id}/sessions/new`}
                className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Session
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}