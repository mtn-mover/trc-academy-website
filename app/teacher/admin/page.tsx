'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TeacherAdmin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-trc-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-bold">
                TRC Academy Admin
              </h1>
              <p className="text-trc-gray-300">Welcome, Karen Florence</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-trc-gray-300 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-trc-blue-600 text-trc-blue-600'
                  : 'border-transparent text-trc-gray-500 hover:text-trc-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'students'
                  ? 'border-trc-blue-600 text-trc-blue-600'
                  : 'border-transparent text-trc-gray-500 hover:text-trc-gray-700'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'courses'
                  ? 'border-trc-blue-600 text-trc-blue-600'
                  : 'border-transparent text-trc-gray-500 hover:text-trc-gray-700'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sessions'
                  ? 'border-trc-blue-600 text-trc-blue-600'
                  : 'border-transparent text-trc-gray-500 hover:text-trc-gray-700'
              }`}
            >
              Sessions
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-trc-blue-100 rounded-lg p-3">
                    <svg className="w-6 h-6 text-trc-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-trc-gray-600">Active Students</p>
                    <p className="text-2xl font-bold text-trc-gray-900">127</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-trc-warm-100 rounded-lg p-3">
                    <svg className="w-6 h-6 text-trc-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-trc-gray-600">Active Courses</p>
                    <p className="text-2xl font-bold text-trc-gray-900">8</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-trc-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-trc-gray-900">92%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-trc-gray-600">Upcoming Sessions</p>
                    <p className="text-2xl font-bold text-trc-gray-900">14</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-serif font-bold text-trc-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-trc-blue-600 rounded-full mt-2"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-trc-gray-900">New student enrolled: <span className="font-semibold">John Davidson</span></p>
                      <p className="text-xs text-trc-gray-600">PCC Program - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-trc-gray-900">Module completed by 15 students</p>
                      <p className="text-xs text-trc-gray-600">Module 6: Ethics - 5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-trc-warm-600 rounded-full mt-2"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-trc-gray-900">Upcoming session reminder</p>
                      <p className="text-xs text-trc-gray-600">Live Q&A Session - Tomorrow at 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900">Student Management</h2>
              <button className="px-4 py-2 bg-trc-blue-600 text-white rounded-lg hover:bg-trc-blue-700 transition-colors">
                Add New Student
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-trc-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-trc-gray-500 uppercase tracking-wider">Program</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-trc-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-trc-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-trc-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Sarah Mitchell</td>
                    <td className="px-6 py-4 whitespace-nowrap">PCC Program</td>
                    <td className="px-6 py-4 whitespace-nowrap">65%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-trc-blue-600">
                      <a href="#" className="hover:underline">View Details</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Michael Chen</td>
                    <td className="px-6 py-4 whitespace-nowrap">ACC Program</td>
                    <td className="px-6 py-4 whitespace-nowrap">90%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-trc-blue-600">
                      <a href="#" className="hover:underline">View Details</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-serif font-bold text-trc-gray-900">Course Management</h2>
                <button className="px-4 py-2 bg-trc-blue-600 text-white rounded-lg hover:bg-trc-blue-700 transition-colors">
                  Create New Course
                </button>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-trc-gray-900 mb-2">ACC Program - Spring 2024</h3>
                    <p className="text-sm text-trc-gray-600 mb-3">60-hour ICF Approved Training</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-trc-gray-600">32 Students Enrolled</span>
                      <a href="#" className="text-trc-blue-600 hover:underline">Manage</a>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-trc-gray-900 mb-2">PCC Program - Winter 2024</h3>
                    <p className="text-sm text-trc-gray-600 mb-3">125-hour ICF Approved Training</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-trc-gray-600">28 Students Enrolled</span>
                      <a href="#" className="text-trc-blue-600 hover:underline">Manage</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-trc-gray-900">Upcoming Sessions</h2>
              <button className="px-4 py-2 bg-trc-blue-600 text-white rounded-lg hover:bg-trc-blue-700 transition-colors">
                Schedule New Session
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-trc-blue-600 pl-4 py-2">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-trc-gray-900">Live Coaching Practice</h3>
                      <p className="text-sm text-trc-gray-600">March 22, 2024 - 2:00 PM MST</p>
                      <p className="text-sm text-trc-gray-600">PCC Program - Module 8</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-trc-gray-600">28 Registered</p>
                      <a href="#" className="text-sm text-trc-blue-600 hover:underline">Edit Session</a>
                    </div>
                  </div>
                </div>
                <div className="border-l-4 border-trc-warm-600 pl-4 py-2">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-trc-gray-900">Mentor Coaching Group</h3>
                      <p className="text-sm text-trc-gray-600">March 24, 2024 - 10:00 AM MST</p>
                      <p className="text-sm text-trc-gray-600">ACC Program - Group A</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-trc-gray-600">15 Registered</p>
                      <a href="#" className="text-sm text-trc-blue-600 hover:underline">Edit Session</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}