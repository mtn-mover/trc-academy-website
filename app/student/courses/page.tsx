'use client';

import DashboardLayout from '@/src/components/layouts/DashboardLayout';

export default function StudentCoursesPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-trc-gray-900">My Courses</h1>
          <p className="text-trc-gray-600 mt-2">Access your enrolled courses and materials</p>
        </div>

        {/* Current Course */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-trc-gray-900">
                  Professional Coach Certification Program
                </h2>
                <p className="text-trc-gray-600 mt-1">October 2025 Cohort</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-trc-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-trc-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            {/* Course Modules */}
            <div className="space-y-3">
              <h3 className="font-semibold text-trc-gray-900 mb-3">Course Modules</h3>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-trc-gray-900">Module 1: Foundation of Coaching</p>
                      <p className="text-sm text-trc-gray-600">Completed</p>
                    </div>
                  </div>
                  <button className="text-trc-blue-600 hover:text-trc-blue-700 text-sm font-medium">
                    Review
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold">75%</span>
                    </div>
                    <div>
                      <p className="font-medium text-trc-gray-900">Module 2: Coaching Techniques</p>
                      <p className="text-sm text-trc-gray-600">In Progress</p>
                    </div>
                  </div>
                  <button className="text-trc-blue-600 hover:text-trc-blue-700 text-sm font-medium">
                    Continue
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 opacity-60">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-trc-gray-900">Module 3: Advanced Strategies</p>
                      <p className="text-sm text-trc-gray-600">Locked - Complete Module 2 first</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="px-6 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700">
                Continue Learning
              </button>
              <button className="px-6 py-2 border border-trc-gray-300 text-trc-gray-700 rounded-md hover:bg-gray-50">
                View Resources
              </button>
            </div>
          </div>
        </div>

        {/* Available Courses */}
        <div>
          <h3 className="text-xl font-bold text-trc-gray-900 mb-4">Available Courses</h3>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold text-trc-gray-900 mb-2">Advanced Coaching Techniques</h4>
              <p className="text-sm text-trc-gray-600 mb-3">Enhance your coaching skills with advanced methodologies</p>
              <button className="text-trc-blue-600 hover:text-trc-blue-700 text-sm font-medium">
                Learn More →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold text-trc-gray-900 mb-2">Soul-Centered Coaching</h4>
              <p className="text-sm text-trc-gray-600 mb-3">Connect with deeper purpose in your coaching practice</p>
              <button className="text-trc-blue-600 hover:text-trc-blue-700 text-sm font-medium">
                Learn More →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold text-trc-gray-900 mb-2">Business Building for Coaches</h4>
              <p className="text-sm text-trc-gray-600 mb-3">Build a sustainable coaching practice</p>
              <button className="text-trc-blue-600 hover:text-trc-blue-700 text-sm font-medium">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}