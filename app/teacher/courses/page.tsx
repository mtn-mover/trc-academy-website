'use client';

import DashboardLayout from '@/src/components/layouts/DashboardLayout';

export default function TeacherCoursesPage() {
  return (
    <DashboardLayout role="TEACHER">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-trc-gray-900">My Courses</h1>
          <p className="text-trc-gray-600 mt-2">Manage your courses and curriculum</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Course Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-trc-gray-900 mb-2">
              Professional Coach Certification
            </h3>
            <p className="text-trc-gray-600 mb-4">October 2025 Cohort</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-trc-blue-600">8 students enrolled</span>
              <button className="px-4 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700 text-sm">
                Manage Course
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-trc-gray-900 mb-2">
              Advanced Coaching Techniques
            </h3>
            <p className="text-trc-gray-600 mb-4">Ongoing Program</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-trc-blue-600">12 students enrolled</span>
              <button className="px-4 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700 text-sm">
                Manage Course
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-trc-gray-900 mb-2">
              Soul-Centered Coaching
            </h3>
            <p className="text-trc-gray-600 mb-4">January 2025 Cohort</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-trc-gray-600">Starting soon</span>
              <button className="px-4 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700 text-sm">
                Manage Course
              </button>
            </div>
          </div>

          {/* Add New Course Card */}
          <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center">
            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-gray-600 font-medium">Create New Course</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}