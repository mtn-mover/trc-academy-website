'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/src/components/layouts/DashboardLayout';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface ClassData {
  id: string;
  name: string;
  description: string | null;
}


export default function AdminEnrollStudentsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [enrolledStudentIds, setEnrolledStudentIds] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      // Fetch class details
      const classResponse = await fetch(`/api/classes/${params.id}`);
      if (!classResponse.ok) {
        throw new Error('Failed to fetch class details');
      }
      const classData = await classResponse.json();
      setClassData(classData);

      // Get currently enrolled student IDs
      const enrolledIds = classData.members.map((e: { userId: string }) => e.userId);
      setEnrolledStudentIds(enrolledIds);

      // Fetch all students
      const studentsResponse = await fetch('/api/students');
      if (!studentsResponse.ok) {
        throw new Error('Failed to fetch students');
      }
      const studentsData = await studentsResponse.json();
      setAllStudents(studentsData);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSelectAll = () => {
    const availableStudents = allStudents
      .filter(s => !enrolledStudentIds.includes(s.id))
      .map(s => s.id);
    setSelectedStudents(availableStudents);
  };

  const handleDeselectAll = () => {
    setSelectedStudents([]);
  };

  const handleEnroll = async () => {
    if (selectedStudents.length === 0) {
      setError('Please select at least one student to enroll');
      return;
    }

    setEnrolling(true);
    setError('');

    try {
      const response = await fetch(`/api/classes/${params.id}/enrollments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentIds: selectedStudents,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enroll students');
      }

      // Redirect back to class details
      router.push(`/admin/classes/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setEnrolling(false);
    }
  };

  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableStudents = filteredStudents.filter(
    s => !enrolledStudentIds.includes(s.id)
  );

  const alreadyEnrolledStudents = filteredStudents.filter(
    s => enrolledStudentIds.includes(s.id)
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!classData) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            Class not found
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/admin/classes/${params.id}`}
            className="text-purple-600 hover:text-purple-700 text-sm mb-4 inline-block"
          >
            ← Back to Class Details
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Enroll Students</h1>
          <p className="text-gray-600 mt-2">
            Add students to {classData.name}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Available Students */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Available Students ({availableStudents.length})
              </h2>
              {availableStudents.length > 0 && (
                <div className="space-x-2">
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Select All
                  </button>
                  <span className="text-gray-400">|</span>
                  <button
                    onClick={handleDeselectAll}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Deselect All
                  </button>
                </div>
              )}
            </div>

            {availableStudents.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableStudents.map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentToggle(student.id)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">
                {searchTerm
                  ? 'No available students match your search'
                  : 'All students are already enrolled in this class'}
              </p>
            )}
          </div>
        </div>

        {/* Already Enrolled */}
        {alreadyEnrolledStudents.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Already Enrolled ({alreadyEnrolledStudents.length})
            </h3>
            <div className="space-y-2">
              {alreadyEnrolledStudents.map((student) => (
                <div key={student.id} className="flex items-center p-2">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {selectedStudents.length > 0 && (
              <span>{selectedStudents.length} student(s) selected</span>
            )}
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/classes/${params.id}`}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleEnroll}
              disabled={enrolling || selectedStudents.length === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enrolling ? 'Enrolling...' : `Enroll ${selectedStudents.length} Student(s)`}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}