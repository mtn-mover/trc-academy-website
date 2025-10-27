'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';

interface ClassData {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  timezone: string;
  isActive: boolean;
  isPrimary: boolean;
  memberCount: number;
  sessionCount: number;
}

export default function TeacherDashboard() {
  const { } = useSession();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/teacher/classes');

      if (!response.ok) {
        throw new Error('Failed to fetch classes');
      }

      const data = await response.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getClassStatus = (startDate: string, endDate: string, isActive: boolean) => {
    if (!isActive) return { text: 'Inactive', color: 'bg-gray-100 text-gray-800', isCompleted: true };

    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return { text: 'Upcoming', color: 'bg-yellow-100 text-yellow-800', isCompleted: false };
    if (now > end) return { text: 'Completed', color: 'bg-gray-100 text-gray-800', isCompleted: true };
    return { text: 'Active', color: 'bg-green-100 text-green-800', isCompleted: false };
  };

  // Separate active and completed classes
  const activeClasses = classes.filter(c => !getClassStatus(c.startDate, c.endDate, c.isActive).isCompleted);
  const completedClasses = classes.filter(c => getClassStatus(c.startDate, c.endDate, c.isActive).isCompleted);

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600 mt-2">Manage your classes, sessions, and students</p>
        </div>

        {/* Active Classes */}
        {activeClasses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Active Classes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeClasses.map((classItem) => {
                const status = getClassStatus(classItem.startDate, classItem.endDate, classItem.isActive);
                return (
                  <div key={classItem.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {classItem.name}
                        </h3>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                          {classItem.isPrimary && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Primary
                            </span>
                          )}
                        </div>
                      </div>

                      {classItem.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {classItem.description}
                        </p>
                      )}

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(classItem.startDate)} - {formatDate(classItem.endDate)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {classItem.memberCount} students enrolled
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          {classItem.sessionCount} sessions
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {classItem.timezone}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/teacher/classes/${classItem.id}`}
                          className="flex-1 text-center px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/teacher/classes/${classItem.id}/sessions`}
                          className="flex-1 text-center px-3 py-2 border border-orange-300 text-orange-700 rounded-md hover:bg-orange-50 transition-colors text-sm"
                        >
                          Sessions
                        </Link>
                        <Link
                          href={`/teacher/classes/${classItem.id}/students`}
                          className="flex-1 text-center px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                        >
                          Students
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Classes */}
        {completedClasses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Completed Classes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedClasses.map((classItem) => {
                const status = getClassStatus(classItem.startDate, classItem.endDate, classItem.isActive);
                return (
                  <div key={classItem.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow opacity-75">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {classItem.name}
                        </h3>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.text}
                          </span>
                          {classItem.isPrimary && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Primary
                            </span>
                          )}
                        </div>
                      </div>

                      {classItem.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {classItem.description}
                        </p>
                      )}

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(classItem.startDate)} - {formatDate(classItem.endDate)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {classItem.memberCount} students enrolled
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          {classItem.sessionCount} sessions
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {classItem.timezone}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/teacher/classes/${classItem.id}`}
                          className="flex-1 text-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/teacher/classes/${classItem.id}/sessions`}
                          className="flex-1 text-center px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                        >
                          Sessions
                        </Link>
                        <Link
                          href={`/teacher/classes/${classItem.id}/students`}
                          className="flex-1 text-center px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                        >
                          Students
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {classes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classes assigned</h3>
            <p className="text-gray-600 mb-4">You haven&apos;t been assigned to any classes yet.</p>
            <p className="text-sm text-gray-500">Please contact your administrator to be assigned to classes.</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">About Your Classes</h3>
          <p className="text-orange-800 mb-3">
            As a teacher, you can manage sessions, upload materials, and organize peer coaching for your assigned classes.
            You cannot create or delete classes - these actions must be performed by an administrator.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-orange-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-orange-900">Manage Sessions</p>
                <p className="text-sm text-orange-700">Create and schedule class sessions</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-orange-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-orange-900">Upload Materials</p>
                <p className="text-sm text-orange-700">Share documents and recordings</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-orange-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-orange-900">Peer Coaching</p>
                <p className="text-sm text-orange-700">Organize student peer sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
