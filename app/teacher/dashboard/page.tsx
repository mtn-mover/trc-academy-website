'use client';

import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function TeacherDashboard() {
  const { data: session } = useSession();
  const teacherName = session?.user?.name || session?.user?.email || "Teacher";

  return (
    <DashboardLayout>
      <div>
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-trc-gray-900">Welcome back, {teacherName}!</h1>
          <p className="text-trc-gray-600 mt-2">Here&apos;s an overview of your teaching activities</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-trc-gray-900 mb-2">Active Students</h3>
            <p className="text-3xl font-bold text-trc-blue-600">24</p>
            <p className="text-sm text-trc-gray-600 mt-2">Across 3 cohorts</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-trc-gray-900 mb-2">Upcoming Sessions</h3>
            <p className="text-3xl font-bold text-trc-gold-600">5</p>
            <p className="text-sm text-trc-gray-600 mt-2">This week</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-trc-gray-900 mb-2">Assignments to Review</h3>
            <p className="text-3xl font-bold text-red-600">12</p>
            <p className="text-sm text-trc-gray-600 mt-2">Pending review</p>
          </div>
        </div>

        {/* Content Management */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-trc-gray-900 mb-4">Course Management</h2>
            <div className="space-y-3">
              <Link href="#" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-trc-gray-900">PCC Program - October 2025</h3>
                <p className="text-sm text-trc-gray-600">8 students enrolled</p>
              </Link>
              <Link href="#" className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-trc-gray-900">Advanced Coaching Techniques</h3>
                <p className="text-sm text-trc-gray-600">12 students enrolled</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-trc-gray-900 mb-4">Recent Student Activity</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-trc-blue-100 rounded-full p-2 mr-3">
                  <svg className="w-4 h-4 text-trc-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-trc-gray-900">Sarah M. completed Module 7</p>
                  <p className="text-xs text-trc-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-trc-gold-100 rounded-full p-2 mr-3">
                  <svg className="w-4 h-4 text-trc-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-trc-gray-900">New discussion post in Cohort 2024</p>
                  <p className="text-xs text-trc-gray-600">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}