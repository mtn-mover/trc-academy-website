'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';
import Link from 'next/link';
import { TIMEZONE_GROUPS, getBrowserTimezone } from '@/src/lib/timezone';

export default function NewUserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    timezone: getBrowserTimezone(),
    isStudent: false,
    isTeacher: false,
    isAdmin: false,
    accessExpiry: '',
    isActive: true,
  });
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(true);
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
    if (autoGeneratePassword) {
      // Generate a random password
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
      let password = '';
      for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setFormData(prev => ({ ...prev, password }));
    }
  }, [autoGeneratePassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.isStudent && !formData.isTeacher && !formData.isAdmin) {
      setError('Please select at least one role');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        alert(`User created successfully!\n\nEmail: ${newUser.email}\nPassword: ${formData.password}\n\nPlease save these credentials.`);
        router.push('/admin/users');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create user');
      }
    } catch (error) {
      setError('An error occurred while creating the user');
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
          <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
          <p className="text-gray-600 mt-1">Create a new user account</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoGenerate"
                    checked={autoGeneratePassword}
                    onChange={(e) => setAutoGeneratePassword(e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="autoGenerate" className="ml-2 text-sm text-gray-700">
                    Auto-generate password
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={autoGeneratePassword}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Timezone */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Timezone</h3>
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

            {/* Roles */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Roles *</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isStudent"
                    checked={formData.isStudent}
                    onChange={(e) => setFormData({ ...formData, isStudent: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isStudent" className="ml-2 text-sm text-gray-700">
                    Student - Can access student dashboard and enrolled classes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isTeacher"
                    checked={formData.isTeacher}
                    onChange={(e) => setFormData({ ...formData, isTeacher: e.target.checked })}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isTeacher" className="ml-2 text-sm text-gray-700">
                    Teacher - Can create and manage classes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={formData.isAdmin}
                    onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-700">
                    Admin - Full system access
                  </label>
                </div>
              </div>
            </div>

            {/* Access Expiry (for students) */}
            {formData.isStudent && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Student Access</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Access Expiry Date (optional)
                  </label>
                  <input
                    type="date"
                    value={formData.accessExpiry}
                    onChange={(e) => setFormData({ ...formData, accessExpiry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for unlimited access
                  </p>
                </div>
              </div>
            )}

            {/* Account Status */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Status</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Account is active
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
                href="/admin/users"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}