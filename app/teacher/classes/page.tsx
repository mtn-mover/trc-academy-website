'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';

interface Class {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  _count: {
    members: number;
  };
}

export default function TeacherClassesPage() {
  useRouter(); // Router available if needed
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<Class | null>(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/classes');
      if (!response.ok) {
        throw new Error('Failed to fetch classes');
      }
      const data = await response.json();
      setClasses(data);
    } catch (err) {
      setError('Failed to load classes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!classToDelete) return;

    try {
      const response = await fetch(`/api/classes/${classToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete class');
      }

      setClasses(classes.filter(c => c.id !== classToDelete.id));
      setDeleteModalOpen(false);
      setClassToDelete(null);
    } catch (err) {
      console.error('Error deleting class:', err);
      alert('Failed to delete class');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getClassStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return { text: 'Upcoming', color: 'bg-yellow-100 text-yellow-800' };
    if (now > end) return { text: 'Completed', color: 'bg-gray-100 text-gray-800' };
    return { text: 'Active', color: 'bg-green-100 text-green-800' };
  };

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-trc-gray-900">My Classes</h1>
            <p className="text-trc-gray-600 mt-2">Manage your coaching classes</p>
          </div>
          <Link
            href="/teacher/classes/new"
            className="px-4 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700 transition-colors"
          >
            Create New Class
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-trc-blue-600"></div>
            <p className="mt-2 text-trc-gray-600">Loading classes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Classes Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => {
              const status = getClassStatus(classItem.startDate, classItem.endDate);
              return (
                <div key={classItem.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-trc-gray-900">
                        {classItem.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </div>

                    {classItem.description && (
                      <p className="text-trc-gray-600 mb-4 line-clamp-2">
                        {classItem.description}
                      </p>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-trc-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(classItem.startDate)} - {formatDate(classItem.endDate)}
                      </div>
                      <div className="flex items-center text-sm text-trc-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {classItem._count.members} students enrolled
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/teacher/classes/${classItem.id}`}
                        className="flex-1 text-center px-3 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700 transition-colors text-sm"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/teacher/classes/${classItem.id}/edit`}
                        className="flex-1 text-center px-3 py-2 border border-trc-gray-300 text-trc-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setClassToDelete(classItem);
                          setDeleteModalOpen(true);
                        }}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {classes.length === 0 && (
              <div className="col-span-full text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-lg font-medium text-trc-gray-900 mb-2">No classes yet</h3>
                <p className="text-trc-gray-600 mb-4">Get started by creating your first class</p>
                <Link
                  href="/teacher/classes/new"
                  className="inline-block px-4 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700 transition-colors"
                >
                  Create New Class
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && classToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-trc-gray-900 mb-4">
                Delete Class
              </h3>
              <p className="text-trc-gray-600 mb-6">
                Are you sure you want to delete &quot;{classToDelete.name}&quot;? This action cannot be undone.
                All student enrollments will also be removed.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setClassToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Class
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}