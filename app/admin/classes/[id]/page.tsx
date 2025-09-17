'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';

interface ClassMember {
  id: string;
  joinedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ClassData {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  members: ClassMember[];
}

export default function AdminClassDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [unenrollModalOpen, setUnenrollModalOpen] = useState(false);
  const [studentToUnenroll, setStudentToUnenroll] = useState<ClassMember | null>(null);

  useEffect(() => {
    fetchClassDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchClassDetails = async () => {
    try {
      const response = await fetch(`/api/classes/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch class details');
      }
      const data = await response.json();
      setClassData(data);
    } catch (err) {
      setError('Failed to load class details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/classes/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete class');
      }

      router.push('/admin/classes');
    } catch (err) {
      console.error('Error deleting class:', err);
      alert('Failed to delete class');
    }
  };

  const handleUnenroll = async () => {
    if (!studentToUnenroll) return;

    try {
      const response = await fetch(`/api/enrollments/${studentToUnenroll.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to unenroll student');
      }

      // Update local state
      if (classData) {
        setClassData({
          ...classData,
          members: classData.members.filter(e => e.id !== studentToUnenroll.id),
        });
      }
      setUnenrollModalOpen(false);
      setStudentToUnenroll(null);
    } catch (err) {
      console.error('Error unenrolling student:', err);
      alert('Failed to unenroll student');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !classData) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error || 'Class not found'}
          </div>
          <Link
            href="/admin/classes"
            className="mt-4 inline-block text-purple-600 hover:text-purple-700"
          >
            ← Back to Classes
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const status = getClassStatus(classData.startDate, classData.endDate);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/classes"
            className="text-purple-600 hover:text-purple-700 text-sm mb-4 inline-block"
          >
            ← Back to Classes
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{classData.name}</h1>
              {classData.description && (
                <p className="text-gray-600 mt-2">{classData.description}</p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
              {status.text}
            </span>
          </div>
        </div>

        {/* Class Information Card */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Class Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium text-gray-900">{formatDate(classData.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">End Date</p>
                <p className="font-medium text-gray-900">{formatDate(classData.endDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-medium text-gray-900">{formatDate(classData.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="font-medium text-gray-900">{classData.members.length}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t">
              <Link
                href={`/admin/classes/${classData.id}/edit`}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Edit Class
              </Link>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
              >
                Delete Class
              </button>
            </div>
          </div>
        </div>

        {/* Enrolled Students */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Enrolled Students ({classData.members.length})
              </h2>
              <Link
                href={`/admin/classes/${classData.id}/enroll`}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
              >
                Enroll Students
              </Link>
            </div>

            {classData.members.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrolled Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classData.members.map((enrollment) => (
                      <tr key={enrollment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {enrollment.user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {enrollment.user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {formatDateTime(enrollment.joinedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setStudentToUnenroll(enrollment);
                              setUnenrollModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-gray-600">No students enrolled yet</p>
                <p className="text-sm text-gray-500 mt-1">Add students to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Delete Class Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Class
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete &quot;{classData.name}&quot;? This action cannot be undone.
                All student enrollments will also be removed.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteModalOpen(false)}
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

        {/* Unenroll Student Modal */}
        {unenrollModalOpen && studentToUnenroll && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Remove Student
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove {studentToUnenroll.user.name} from this class?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setUnenrollModalOpen(false);
                    setStudentToUnenroll(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnenroll}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Remove Student
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}