'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminClassMembersPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main class details page which has the members section
    router.replace(`/admin/classes/${params.id}`);
  }, [params.id, router]);

  return null;
}