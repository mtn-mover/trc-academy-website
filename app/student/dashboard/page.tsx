'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  
  // Mock student data - in a real app, this would come from authentication/API
  const studentName = "Sarah Mitchell";
  const currentProgram = "PCC Program - Cohort 2024";
  const progress = 65;

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-bold text-trc-gray-900">
                Student Dashboard
              </h1>
              <p className="text-trc-gray-600">Welcome back, {studentName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-trc-gray-600 hover:text-trc-gray-900 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <p className="text-trc-gray-600">Started: January 2024</p>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-trc-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-trc-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <Link
                href="#"
                className="inline-block px-4 py-2 bg-trc-blue-600 text-white rounded-lg hover:bg-trc-blue-700 transition-colors"
              >
                Continue Learning
              </Link>
            </div>

            {/* Recent Modules */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Recent Modules
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-trc-blue-600 pl-4">
                  <h3 className="font-semibold text-trc-gray-900">Module 7: Advanced Questioning Techniques</h3>
                  <p className="text-trc-gray-600 text-sm">Completed on March 15, 2024</p>
                </div>
                <div className="border-l-4 border-trc-warm-600 pl-4">
                  <h3 className="font-semibold text-trc-gray-900">Module 8: Creating Coaching Agreements</h3>
                  <p className="text-trc-gray-600 text-sm">In Progress - 75% Complete</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h3 className="font-semibold text-trc-gray-900">Module 9: Ethics in Coaching</h3>
                  <p className="text-trc-gray-600 text-sm">Starting March 25, 2024</p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Resources & Materials
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <a href="#" className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-8 h-8 text-trc-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div>
                    <p className="font-semibold text-trc-gray-900">Course Materials</p>
                    <p className="text-sm text-trc-gray-600">PDFs, Videos, Guides</p>
                  </div>
                </a>
                <a href="#" className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-8 h-8 text-trc-warm-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-trc-gray-900">Recorded Sessions</p>
                    <p className="text-sm text-trc-gray-600">Past lectures & workshops</p>
                  </div>
                </a>
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
              <div className="space-y-3">
                <div className="border-l-4 border-trc-blue-600 pl-3">
                  <p className="font-semibold text-trc-gray-900 text-sm">Live Coaching Practice</p>
                  <p className="text-xs text-trc-gray-600">March 22, 2024 - 2:00 PM MST</p>
                </div>
                <div className="border-l-4 border-trc-warm-600 pl-3">
                  <p className="font-semibold text-trc-gray-900 text-sm">Mentor Coaching Group</p>
                  <p className="text-xs text-trc-gray-600">March 24, 2024 - 10:00 AM MST</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-3">
                  <p className="font-semibold text-trc-gray-900 text-sm">Q&A with Karen</p>
                  <p className="text-xs text-trc-gray-600">March 28, 2024 - 4:00 PM MST</p>
                </div>
              </div>
              <Link
                href="#"
                className="block mt-4 text-center text-trc-blue-600 hover:underline text-sm font-medium"
              >
                View Full Calendar
              </Link>
            </div>

            {/* Community */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Community
              </h2>
              <div className="space-y-3">
                <a href="#" className="flex items-center text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Discussion Forum
                </a>
                <a href="#" className="flex items-center text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Peer Support Group
                </a>
                <a href="#" className="flex items-center text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Find a Practice Partner
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900 mb-4">
                Quick Links
              </h2>
              <div className="space-y-2">
                <a href="#" className="block text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  ICF Core Competencies</a>
                <a href="#" className="block text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  Code of Ethics</a>
                <a href="#" className="block text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  Certification Requirements</a>
                <a href="#" className="block text-trc-gray-700 hover:text-trc-blue-600 transition-colors">
                  Technical Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}