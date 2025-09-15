'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';

export default function NewStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    email: string;
    password: string;
    name: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    generatePassword: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Student name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email address is required');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.generatePassword && !formData.password) {
      setError('Password is required when not auto-generating');
      return false;
    }

    if (!formData.generatePassword && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const requestData: Record<string, string> = {
        name: formData.name,
        email: formData.email,
      };

      if (!formData.generatePassword) {
        requestData.password = formData.password;
      }

      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create student');
      }

      // If password was generated, show it to the teacher
      if (data.generatedPassword) {
        setGeneratedCredentials({
          email: data.email,
          password: data.generatedPassword,
          name: data.name,
        });
        setShowCredentials(true);
      } else {
        // Redirect to students page
        router.push('/teacher/students');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCredentials = () => {
    if (generatedCredentials) {
      const text = `Student Login Credentials:\n\nName: ${generatedCredentials.name}\nEmail: ${generatedCredentials.email}\nPassword: ${generatedCredentials.password}\n\nLogin URL: ${window.location.origin}/login`;
      navigator.clipboard.writeText(text);
      alert('Credentials copied to clipboard!');
    }
  };

  if (showCredentials && generatedCredentials) {
    return (
      <DashboardLayout role="TEACHER">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-trc-gray-900 mb-2">
                Student Created Successfully!
              </h2>
              <p className="text-trc-gray-600">
                Please save these login credentials and share them with the student.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Login Credentials</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-blue-700">Name:</span>
                  <p className="font-mono text-blue-900">{generatedCredentials.name}</p>
                </div>
                <div>
                  <span className="text-sm text-blue-700">Email:</span>
                  <p className="font-mono text-blue-900">{generatedCredentials.email}</p>
                </div>
                <div>
                  <span className="text-sm text-blue-700">Password:</span>
                  <p className="font-mono text-blue-900 bg-white px-2 py-1 rounded inline-block">
                    {generatedCredentials.password}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-blue-700">Login URL:</span>
                  <p className="font-mono text-blue-900">{window.location.origin}/login</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> This password will not be shown again. Make sure to save it before leaving this page.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyCredentials}
                className="px-4 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700 transition-colors"
              >
                Copy Credentials
              </button>
              <Link
                href="/teacher/students/new"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Add Another Student
              </Link>
              <Link
                href="/teacher/students"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                View All Students
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="TEACHER">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/teacher/students"
            className="text-trc-blue-600 hover:text-trc-blue-700 text-sm mb-4 inline-block"
          >
            ← Back to Students
          </Link>
          <h1 className="text-3xl font-bold text-trc-gray-900">Add New Student</h1>
          <p className="text-trc-gray-600 mt-2">Create a new student account</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-trc-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trc-blue-500 focus:border-trc-blue-500"
                placeholder="e.g., John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-trc-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trc-blue-500 focus:border-trc-blue-500"
                placeholder="student@example.com"
              />
              <p className="mt-1 text-sm text-gray-500">
                The student will use this email to log in
              </p>
            </div>

            {/* Password Options */}
            <div>
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="generatePassword"
                  name="generatePassword"
                  checked={formData.generatePassword}
                  onChange={handleChange}
                  className="h-4 w-4 text-trc-blue-600 focus:ring-trc-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="generatePassword" className="ml-2 block text-sm text-trc-gray-700">
                  Auto-generate secure password
                </label>
              </div>

              {!formData.generatePassword && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-trc-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trc-blue-500 focus:border-trc-blue-500"
                    placeholder="Enter password (min. 6 characters)"
                  />
                </div>
              )}
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
                href="/teacher/students"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-trc-blue-600 text-white rounded-md hover:bg-trc-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Student'}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">About student accounts:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Students can log in using their email and password</li>
            <li>• Auto-generated passwords are secure and random</li>
            <li>• You&apos;ll see the password only once after creation</li>
            <li>• Students can be enrolled in classes after account creation</li>
            <li>• Students can change their password after first login</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}