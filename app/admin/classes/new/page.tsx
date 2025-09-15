'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import Link from 'next/link';
import { TIMEZONE_GROUPS, getBrowserTimezone } from '@/src/lib/timezone';

export default function NewClassPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    timezone: getBrowserTimezone(),
    startDate: '',
    endDate: '',
    isActive: true,
  });
  const [selectedTeachers, setSelectedTeachers] = useState<Array<{ id: string; isPrimary: boolean }>>([]);
  const [teachers, setTeachers] = useState<Array<{ id: string; name: string; email: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session && !session.user.isAdmin) {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user.isAdmin) {
      fetchTeachers();
    }
  }, [session]);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/admin/teachers');
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      }
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };

  const addTeacher = () => {
    const newTeacher = { id: '', isPrimary: selectedTeachers.length === 0 };
    setSelectedTeachers([...selectedTeachers, newTeacher]);
  };

  const updateTeacher = (index: number, teacherId: string) => {
    const updated = [...selectedTeachers];
    updated[index].id = teacherId;
    setSelectedTeachers(updated);
  };

  const removeTeacher = (index: number) => {
    const updated = selectedTeachers.filter((_, i) => i !== index);
    // If removing primary teacher, make first remaining teacher primary
    if (selectedTeachers[index].isPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    setSelectedTeachers(updated);
  };

  const setPrimaryTeacher = (index: number) => {
    const updated = selectedTeachers.map((teacher, i) => ({
      ...teacher,
      isPrimary: i === index
    }));
    setSelectedTeachers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (selectedTeachers.length === 0 || !selectedTeachers.some(t => t.id)) {
      setError('Please add at least one teacher');
      setLoading(false);
      return;
    }

    const validTeachers = selectedTeachers.filter(t => t.id);
    if (validTeachers.length === 0) {
      setError('Please select teachers from the dropdown');
      setLoading(false);
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('End date must be after start date');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          teachers: validTeachers
        }),
      });

      if (response.ok) {
        router.push('/admin/classes');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create class');
      }
    } catch (error) {
      setError('An error occurred while creating the class');
    } finally {
      setLoading(false);
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
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Class</h1>
          <p className="text-gray-600 mt-1">Set up a new class in the system</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Advanced Mathematics"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Brief description of the class..."
                  />
                </div>
              </div>
            </div>

            {/* Teacher Assignment */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Teacher Assignment</h3>
              <div className="space-y-4">
                {selectedTeachers.map((selectedTeacher, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <select
                      value={selectedTeacher.id}
                      onChange={(e) => updateTeacher(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a teacher...</option>
                      {teachers
                        .filter(t => !selectedTeachers.some((st, i) => i !== index && st.id === t.id))
                        .map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name} ({teacher.email})
                          </option>
                        ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setPrimaryTeacher(index)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        selectedTeacher.isPrimary
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      title={selectedTeacher.isPrimary ? 'Primary Teacher' : 'Set as Primary'}
                    >
                      {selectedTeacher.isPrimary ? 'Primary' : 'Set Primary'}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeTeacher(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTeacher}
                  className="flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Teacher
                </button>
                {selectedTeachers.length > 0 && (
                  <p className="text-sm text-gray-500">
                    The primary teacher will be the main contact for this class.
                  </p>
                )}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone *
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Object.entries(TIMEZONE_GROUPS).map(([region, timezones]) => (
                      <optgroup key={region} label={region}>
                        {timezones.map((tz) => (
                          <option key={tz.value} value={tz.value}>
                            {tz.label} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Class Status */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Class Status</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Class is active (students can enroll)
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/classes"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Class'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}