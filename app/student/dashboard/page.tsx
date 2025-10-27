'use client';

import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  useStudentEnrollments,
  useClassSessions,
  calculateProgress,
  getUpcomingSessions,
  getRecentSessions,
} from '@/src/hooks/useStudentData';

export default function StudentDashboard() {
  const { data: session } = useSession();
  const { enrollments, loading: enrollmentsLoading } = useStudentEnrollments();

  // Get the first active class (you can make this selectable later)
  const currentClass = enrollments.find(e => e.class.isActive);

  const { sessions, loading: sessionsLoading } = useClassSessions(
    currentClass?.class.id || null
  );

  const studentName = session?.user?.name || session?.user?.email || 'Student';
  const currentProgram = currentClass?.class.name || 'No active enrollment';
  const progress = calculateProgress(sessions);
  const upcomingSessions = getUpcomingSessions(sessions, 3);
  const recentSessions = getRecentSessions(sessions, 3);

  const isLoading = enrollmentsLoading || sessionsLoading;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trc-blue-600 mx-auto"></div>
            <p className="mt-4 text-trc-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentClass) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-trc-gray-900 mb-4">Welcome, {studentName}!</h1>
          <p className="text-trc-gray-600 mb-8">
            You are not currently enrolled in any classes.
          </p>
          <p className="text-trc-gray-600">
            Please contact your administrator to enroll in a program.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-trc-gray-900">Welcome back, {studentName}!</h1>
          <p className="text-trc-gray-600 mt-2">Continue your learning journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Program Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Your Current Program
              </h2>
              <div className="mb-4">
                <p className="text-lg font-medium text-trc-gray-900">{currentProgram}</p>
                <p className="text-trc-gray-600">
                  Started: {new Date(currentClass.class.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {currentClass.class.teachers.length > 0 && (
                  <p className="text-trc-gray-600 mt-1">
                    Instructor: {currentClass.class.teachers[0].teacher.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-trc-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-trc-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-trc-gray-600 mt-2">
                  {sessions.filter(s => s.status === 'COMPLETED').length} of {sessions.length} sessions completed
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/student/courses"
                  className="inline-block px-4 py-2 bg-trc-blue-600 text-white rounded-lg hover:bg-trc-blue-700 transition-colors"
                >
                  View All Sessions
                </Link>
                <Link
                  href="/student/materials"
                  className="inline-block px-4 py-2 bg-trc-warm-600 text-white rounded-lg hover:bg-trc-warm-700 transition-colors"
                >
                  Course Materials
                </Link>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Recent Sessions
              </h2>
              {recentSessions.length > 0 ? (
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div
                      key={session.id}
                      className={`border-l-4 pl-4 ${
                        index === 0
                          ? 'border-trc-blue-600'
                          : index === 1
                          ? 'border-trc-warm-600'
                          : 'border-gray-300'
                      }`}
                    >
                      <h3 className="font-semibold text-trc-gray-900">{session.title}</h3>
                      <p className="text-trc-gray-600 text-sm">
                        Completed on {new Date(session.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      {session.materialsVisible && (
                        <p className="text-trc-blue-600 text-sm mt-1">
                          📁 Materials available
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-trc-gray-600">No completed sessions yet.</p>
              )}
            </div>

            {/* Resources */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Resources & Materials
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/student/materials"
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-8 h-8 text-trc-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div>
                    <p className="font-semibold text-trc-gray-900">Course Materials</p>
                    <p className="text-sm text-trc-gray-600">PDFs, Videos, Guides</p>
                  </div>
                </Link>
                <Link
                  href="/student/materials"
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-8 h-8 text-trc-warm-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-trc-gray-900">Recorded Sessions</p>
                    <p className="text-sm text-trc-gray-600">
                      {sessions.filter(s => s.recordings.length > 0).length} recordings available
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Upcoming Sessions
              </h2>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSessions.map((session, index) => (
                    <div
                      key={session.id}
                      className={`border-l-4 pl-3 ${
                        index === 0
                          ? 'border-trc-blue-600'
                          : index === 1
                          ? 'border-trc-warm-600'
                          : 'border-gray-300'
                      }`}
                    >
                      <p className="font-semibold text-trc-gray-900 text-sm">{session.title}</p>
                      <p className="text-xs text-trc-gray-600">
                        {new Date(session.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} - {session.startTime}
                      </p>
                      {session.description && (
                        <p className="text-xs text-trc-gray-500 mt-1 line-clamp-2">
                          {session.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-trc-gray-600 text-sm">No upcoming sessions scheduled.</p>
              )}
              <Link
                href="/student/courses"
                className="block mt-4 text-center text-trc-blue-600 hover:underline text-sm font-medium"
              >
                View Full Calendar
              </Link>
            </div>

            {/* Class Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Your Statistics
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-trc-gray-600">Total Sessions:</span>
                  <span className="font-semibold text-trc-gray-900">{sessions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-trc-gray-600">Completed:</span>
                  <span className="font-semibold text-green-600">
                    {sessions.filter(s => s.status === 'COMPLETED').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-trc-gray-600">Upcoming:</span>
                  <span className="font-semibold text-trc-blue-600">
                    {upcomingSessions.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-trc-gray-600">Materials Available:</span>
                  <span className="font-semibold text-trc-warm-600">
                    {sessions.filter(s => s.materialsVisible).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Quick Links
              </h2>
              <div className="space-y-2">
                <Link href="/student/courses" className="block text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  View All Sessions
                </Link>
                <a href="https://coachingfederation.org/credentials-and-standards/core-competencies"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  ICF Core Competencies
                </a>
                <a href="https://coachingfederation.org/ethics/code-of-ethics"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  Code of Ethics
                </a>
                <Link href="/contact" className="block text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  Technical Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
