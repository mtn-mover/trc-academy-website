'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface SelectedTeacher {
  id: string;
  isPrimary: boolean;
}

export default function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<SelectedTeacher[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    timezone: 'Europe/Zurich',
    isActive: true,
  });

  useEffect(() => {
    fetchClassAndTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchClassAndTeachers = async () => {
    try {
      // Fetch class details
      const classResponse = await fetch(`/api/admin/classes/${resolvedParams.id}`);
      if (!classResponse.ok) {
        throw new Error('Failed to fetch class');
      }
      const classData = await classResponse.json();

      // Fetch available teachers
      const teachersResponse = await fetch('/api/admin/teachers');
      if (!teachersResponse.ok) {
        throw new Error('Failed to fetch teachers');
      }
      const teachersData = await teachersResponse.json();
      setTeachers(teachersData);

      // Format dates for input fields
      const startDate = new Date(classData.startDate).toISOString().split('T')[0];
      const endDate = new Date(classData.endDate).toISOString().split('T')[0];

      // Get existing teachers
      interface TeacherRelation {
        teacher?: { id: string };
        teacherId?: string;
        isPrimary?: boolean;
      }

      const existingTeachers: SelectedTeacher[] = classData.teachers?.map((t: TeacherRelation) => ({
        id: t.teacher?.id || t.teacherId || '',
        isPrimary: t.isPrimary || false
      })) || [];

      setSelectedTeachers(existingTeachers.length > 0 ? existingTeachers : []);

      setFormData({
        name: classData.name,
        description: classData.description || '',
        startDate,
        endDate,
        timezone: classData.timezone || 'Europe/Zurich',
        isActive: classData.isActive !== false,
      });
    } catch (err) {
      setError('Failed to load class details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTeacher = () => {
    const newTeacher: SelectedTeacher = {
      id: '',
      isPrimary: selectedTeachers.length === 0
    };
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Class name is required');
      return false;
    }

    if (!formData.startDate) {
      setError('Start date is required');
      return false;
    }

    if (!formData.endDate) {
      setError('End date is required');
      return false;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start >= end) {
      setError('End date must be after start date');
      return false;
    }

    // Validate teachers if any are added
    if (selectedTeachers.length > 0) {
      const validTeachers = selectedTeachers.filter(t => t.id);
      if (validTeachers.length === 0) {
        setError('Please select teachers from the dropdown or remove empty entries');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Filter out empty teacher selections
      const validTeachers = selectedTeachers.filter(t => t.id);

      const response = await fetch(`/api/admin/classes/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          timezone: formData.timezone,
          isActive: formData.isActive,
          teachers: validTeachers
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update class');
      }

      // Redirect to classes page on success
      router.push('/admin/classes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
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

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/classes"
            className="text-purple-600 hover:text-purple-700 text-sm mb-4 inline-block"
          >
            ← Back to Classes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Class</h1>
          <p className="text-gray-600 mt-2">Update class information and assignments</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Class Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Class Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., Professional Coach Certification - October 2025"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Provide a brief description of the class..."
              />
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
                      {selectedTeacher.isPrimary ? 'Primary' : 'Secondary'}
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
                    The primary teacher will be the main contact for this class. Secondary teachers can also manage the class.
                  </p>
                )}
              </div>
            </div>

            {/* Date Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Timezone and Active Status */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="Europe/Zurich">Europe/Zurich</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="America/New_York">America/New York</option>
                  <option value="America/Chicago">America/Chicago</option>
                  <option value="America/Denver">America/Denver</option>
                  <option value="America/Los_Angeles">America/Los Angeles</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  <option value="Asia/Shanghai">Asia/Shanghai</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                  <option value="Australia/Sydney">Australia/Sydney</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Class is active</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 justify-end pt-4">
              <Link
                href="/admin/classes"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}