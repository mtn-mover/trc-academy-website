'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    activeClasses: 0,
    expiredAccess: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session && !session.user.isAdmin) {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!session?.user.isAdmin) {
    return null;
  }

  return (
    <DashboardLayout>
      <div>
        {/* Welcome Section - matching teacher/student layout */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session.user.name}!</h1>
          <p className="text-gray-600 mt-2">Here&apos;s an overview of your system administration</p>
        </div>

        {/* Stats Grid - clickable cards matching teacher layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Link
            href="/admin/users"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
            <p className="text-sm text-gray-600 mt-2">All system users</p>
          </Link>

          <Link
            href="/admin/users?filter=students"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalStudents}</p>
            <p className="text-sm text-gray-600 mt-2">Enrolled students</p>
          </Link>

          <Link
            href="/admin/users?filter=teachers"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Teachers</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.totalTeachers}</p>
            <p className="text-sm text-gray-600 mt-2">Active instructors</p>
          </Link>
        </div>

        {/* Second row of stats */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <Link
            href="/admin/classes"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Classes</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalClasses}</p>
            <p className="text-sm text-gray-600 mt-2">All classes</p>
          </Link>

          <Link
            href="/admin/classes?filter=active"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Classes</h3>
            <p className="text-3xl font-bold text-teal-600">{stats.activeClasses}</p>
            <p className="text-sm text-gray-600 mt-2">Currently running</p>
          </Link>

          <Link
            href="/admin/users?filter=expired"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expired Access</h3>
            <p className="text-3xl font-bold text-red-600">{stats.expiredAccess}</p>
            <p className="text-sm text-gray-600 mt-2">Needs renewal</p>
          </Link>
        </div>

        {/* Content Management Section - matching teacher layout */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/users/new"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-purple-100 rounded-full mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Add New User</h3>
                  <p className="text-sm text-gray-600">Create student or teacher account</p>
                </div>
              </Link>

              <Link
                href="/admin/classes/new"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Create New Class</h3>
                  <p className="text-sm text-gray-600">Set up a new course</p>
                </div>
              </Link>

              <Link
                href="/admin/audit"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-full mr-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">View Audit Log</h3>
                  <p className="text-sm text-gray-600">System activity history</p>
                </div>
              </Link>
            </div>
          </div>

          {/* System Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">System Management</h2>
            <div className="space-y-3">
              <Link
                href="/admin/users"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage All Users</h3>
                  <p className="text-sm text-gray-600">View and edit user accounts</p>
                </div>
              </Link>

              <Link
                href="/admin/classes"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-teal-100 rounded-full mr-3">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage All Classes</h3>
                  <p className="text-sm text-gray-600">View and edit courses</p>
                </div>
              </Link>

              <Link
                href="/admin/access"
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-red-100 rounded-full mr-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Access</h3>
                  <p className="text-sm text-gray-600">Handle expired accounts</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent System Activity</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New user registered</p>
                <p className="text-xs text-gray-600">John Doe joined as a student - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Class started</p>
                <p className="text-xs text-gray-600">PCC October 2025 is now active - 1 day ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Teacher assigned</p>
                <p className="text-xs text-gray-600">Karen Wahlstrom assigned to new class - 2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}