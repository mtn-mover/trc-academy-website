'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SelectRolePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleRoleSelection = (role: string) => {
    switch (role) {
      case 'ADMIN':
        router.push('/admin/dashboard');
        break;
      case 'TEACHER':
        router.push('/teacher/dashboard');
        break;
      case 'STUDENT':
        router.push('/student/dashboard');
        break;
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trc-blue-600"></div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const availableRoles = [];

  if (user.isAdmin) availableRoles.push({ id: 'ADMIN', label: 'Administrator', color: 'purple', icon: '🛡️' });
  if (user.isTeacher) availableRoles.push({ id: 'TEACHER', label: 'Teacher', color: 'orange', icon: '📚' });
  if (user.isStudent) availableRoles.push({ id: 'STUDENT', label: 'Student', color: 'blue', icon: '🎓' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-trc-blue-50 via-white to-trc-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-trc-gray-900 mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600">
            You have multiple roles. Please select how you want to continue:
          </p>
        </div>

        <div className="space-y-4">
          {availableRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelection(role.id)}
              className={`w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 hover:border-opacity-50 ${
                role.color === 'purple'
                  ? 'border-purple-200 hover:border-purple-500'
                  : role.color === 'orange'
                  ? 'border-orange-200 hover:border-orange-500'
                  : 'border-blue-200 hover:border-blue-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{role.icon}</span>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Continue as {role.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Access {role.label.toLowerCase()} features and dashboard
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              router.push('/api/auth/signout');
            }}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}