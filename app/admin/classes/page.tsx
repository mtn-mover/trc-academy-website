'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import Link from 'next/link';

interface Teacher {
  id: string;
  teacherId: string;
  isPrimary: boolean;
  teacher: {
    id: string;
    name: string;
    email: string;
  };
}

interface Class {
  id: string;
  name: string;
  description: string | null;
  timezone: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  teachers: Teacher[];
  _count: {
    members: number;
  };
}

export default function ManageClassesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session && !session.user.isAdmin) {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user.isAdmin) {
      fetchClasses();
    }
  }, [session]);

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/admin/classes');
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleClassStatus = async (classId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/classes/${classId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (response.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error('Failed to update class status:', error);
    }
  };

  const deleteClass = async (classId: string) => {
    if (!confirm('Are you sure you want to delete this class? All enrollments will be removed.')) return;

    try {
      const response = await fetch(`/api/admin/classes/${classId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error('Failed to delete class:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isClassActive = (startDate: string, endDate: string) => {
    const now = new Date();
    return new Date(startDate) <= now && new Date(endDate) >= now;
  };

  const filteredClasses = classes.filter(cls => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && cls.isActive && isClassActive(cls.startDate, cls.endDate)) ||
      (filter === 'inactive' && !cls.isActive) ||
      (filter === 'upcoming' && new Date(cls.startDate) > new Date()) ||
      (filter === 'past' && new Date(cls.endDate) < new Date());

    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teachers.some(t =>
        t.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  if (status === 'loading' || loading) {
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
      <div className="p-6">
        {/* Back Link */}
        <Link
          href="/admin/dashboard"
          className="text-purple-600 hover:text-purple-700 text-sm mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>

        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Classes</h1>
            <p className="text-gray-600 mt-1">View and manage all system classes</p>
          </div>
          <Link
            href="/admin/classes/new"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Class
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search by class name or teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Classes Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timezone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClasses.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{cls.name}</div>
                      <div className="text-sm text-gray-500">{cls.description || 'No description'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {cls.teachers
                        .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
                        .map((teacher) => (
                          <div key={teacher.id} className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {teacher.teacher.name}
                                {teacher.isPrimary && (
                                  <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{teacher.teacher.email}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(cls.startDate)} - {formatDate(cls.endDate)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {isClassActive(cls.startDate, cls.endDate) ? (
                        <span className="text-green-600">In Progress</span>
                      ) : new Date(cls.startDate) > new Date() ? (
                        <span className="text-blue-600">Upcoming</span>
                      ) : (
                        <span className="text-gray-500">Completed</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cls.timezone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {cls._count.members} students
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleClassStatus(cls.id, cls.isActive)}
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        cls.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {cls.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/classes/${cls.id}`}
                      className="text-purple-600 hover:text-purple-900 mr-2"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/classes/${cls.id}/edit`}
                      className="text-purple-600 hover:text-purple-900 mr-2"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/classes/${cls.id}/members`}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Members
                    </Link>
                    <button
                      onClick={() => deleteClass(cls.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredClasses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No classes found matching your criteria
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}