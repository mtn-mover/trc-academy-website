'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';

interface TeacherStats {
  totalClasses: number;
  totalStudents: number;
  upcomingSessions: number;
  totalSessions: number;
  pendingCoaching: number;
}

interface ClassData {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  memberCount: number;
  sessionCount: number;
}

export default function TeacherDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, classesResponse] = await Promise.all([
        fetch('/api/teacher/stats'),
        fetch('/api/teacher/classes')
      ]);

      if (!statsResponse.ok || !classesResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [statsData, classesData] = await Promise.all([
        statsResponse.json(),
        classesResponse.json()
      ]);

      setStats(statsData);
      setClasses(classesData.classes || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
          <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        </div>

        {/* Statistics Boxes - Orange Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/teacher/classes" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">My Classes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.totalClasses || 0}</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/teacher/students" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.totalStudents || 0}</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/teacher/sessions" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Upcoming Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.upcomingSessions || 0}</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/teacher/peer-coaching" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Peer Coaching</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.pendingCoaching || 0}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/teacher/sessions/new" className="bg-orange-600 text-white px-4 py-3 rounded-lg text-center hover:bg-orange-700 transition-colors">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Session
            </Link>
            <Link href="/teacher/materials/upload" className="bg-orange-600 text-white px-4 py-3 rounded-lg text-center hover:bg-orange-700 transition-colors">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Materials
            </Link>
            <Link href="/teacher/peer-coaching/schedule" className="bg-orange-600 text-white px-4 py-3 rounded-lg text-center hover:bg-orange-700 transition-colors">
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Peer Coaching
            </Link>
          </div>
        </div>

        {/* My Classes */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">My Classes</h2>
              <Link href="/teacher/classes" className="text-orange-600 hover:text-orange-700">
                View All →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {classes.length > 0 ? (
              <div className="space-y-4">
                {classes.slice(0, 3).map((classItem) => (
                  <div key={classItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Link href={`/teacher/classes/${classItem.id}`} className="text-lg font-semibold text-gray-900 hover:text-orange-600">
                          {classItem.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">{classItem.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {classItem.memberCount} students
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {classItem.sessionCount} sessions
                          </span>
                          <span>{formatDate(classItem.startDate)} - {formatDate(classItem.endDate)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link href={`/teacher/classes/${classItem.id}/sessions`} className="px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 text-sm">
                          Sessions
                        </Link>
                        <Link href={`/teacher/classes/${classItem.id}/students`} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">
                          Students
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p>No classes assigned yet</p>
                <p className="text-sm mt-2">Classes will appear here once the admin assigns them to you</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">Teacher Workspace</h3>
          <p className="text-orange-800">
            As a teacher, you can manage your classes, create and schedule sessions, upload learning materials,
            and organize peer coaching sessions for your students. Use the quick actions above to get started.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}