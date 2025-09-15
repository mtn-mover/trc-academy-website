'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserHeader() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [switchingRole, setSwitchingRole] = useState(false);

  if (!session?.user) return null;

  const handleRoleSwitch = async (newRole: 'student' | 'teacher' | 'admin') => {
    setSwitchingRole(true);
    try {
      const response = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        // Update the session with the new current role
        await update({ currentRole: newRole });

        // Redirect to appropriate dashboard
        switch (newRole) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'teacher':
            router.push('/teacher/dashboard');
            break;
          case 'student':
            router.push('/student/dashboard');
            break;
        }
      }
    } catch (error) {
      console.error('Failed to switch role:', error);
    } finally {
      setSwitchingRole(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  // Determine available roles
  const availableRoles = [];
  if (session.user.isStudent) availableRoles.push('student');
  if (session.user.isTeacher) availableRoles.push('teacher');
  if (session.user.isAdmin) availableRoles.push('admin');

  // Determine current active role
  const currentRole = session.user.currentRole ||
    (session.user.isAdmin ? 'admin' :
     session.user.isTeacher ? 'teacher' :
     'student');


  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Welcome */}
          <div className="flex items-center">
            <span className="text-base text-gray-600">
              Welcome: <span className="font-medium text-gray-900">{session.user.name}</span>
              <span className="text-gray-500 ml-1">({session.user.email})</span>
            </span>
          </div>

          {/* Right side - Role Switcher and Logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-base text-gray-600 mr-2">Role:</span>
              {availableRoles.length === 1 ? (
                <span className="text-base font-medium text-orange-600 capitalize">{availableRoles[0]}</span>
              ) : (
                <div className="flex items-center">
                  {availableRoles.map((role, index) => (
                    <span key={role} className="flex items-center">
                      {index > 0 && <span className="mx-2 text-gray-400">|</span>}
                      {role === currentRole ? (
                        <span className="text-base font-bold text-orange-600 capitalize">{role}</span>
                      ) : (
                        <button
                          onClick={() => handleRoleSwitch(role as 'student' | 'teacher' | 'admin')}
                          disabled={switchingRole}
                          className="text-base text-gray-600 hover:text-blue-600 capitalize hover:underline disabled:opacity-50"
                        >
                          {role}
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-base text-red-600 hover:text-red-800 underline cursor-pointer font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}