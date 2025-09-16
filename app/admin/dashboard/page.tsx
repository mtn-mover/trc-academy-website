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
          <p className="text-gray-600 mt-1">As an Admin, you can create and manage users (teachers and students), create and edit classes, and assign users to their respective classes.</p>
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
            <p className="text-3xl font-bold text-gray-900">{stats.totalTeachers}</p>
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
      </div>
    </DashboardLayout>
  );
}