'use client';

import UserHeader from '@/src/components/common/UserHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      {/* Main content with padding for fixed header */}
      <main className="pt-20 px-4 py-8 mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}