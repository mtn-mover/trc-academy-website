'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export interface ClassEnrollment {
  id: string;
  userId: string;
  classId: string;
  role: string;
  joinedAt: string;
  class: {
    id: string;
    name: string;
    description: string | null;
    timezone: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    teachers: Array<{
      teacher: {
        id: string;
        name: string;
        email: string;
      };
    }>;
  };
}

export interface Session {
  id: string;
  classId: string;
  title: string;
  description: string | null;
  date: string;
  startTime: string;
  duration: number;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  materialsVisible: boolean;
  documents: Array<{
    id: string;
    title: string;
    fileName: string;
    fileUrl: string;
    isVisible: boolean;
  }>;
  recordings: Array<{
    id: string;
    title: string;
    videoUrl: string;
    isVisible: boolean;
  }>;
}

export interface Upload {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadType: string;
  relatedId: string | null;
  isVisible: boolean;
  createdAt: string;
  uploadedByUser: {
    id: string;
    name: string;
    email: string;
  };
}

export function useStudentEnrollments() {
  const { data: session } = useSession();
  const [enrollments, setEnrollments] = useState<ClassEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) {
      setLoading(false);
      return;
    }

    async function fetchEnrollments() {
      try {
        const response = await fetch('/api/student/enrollments');
        if (!response.ok) {
          throw new Error('Failed to fetch enrollments');
        }
        const data = await response.json();
        setEnrollments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, [session]);

  return { enrollments, loading, error };
}

export function useClassSessions(classId: string | null) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!classId) {
      setLoading(false);
      return;
    }

    async function fetchSessions() {
      try {
        const response = await fetch(`/api/classes/${classId}/sessions`);
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, [classId]);

  return { sessions, loading, error };
}

export function useStudentUploads(filters?: {
  uploadType?: string;
  relatedId?: string;
}) {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUploads() {
      try {
        const params = new URLSearchParams();
        if (filters?.uploadType) params.append('uploadType', filters.uploadType);
        if (filters?.relatedId) params.append('relatedId', filters.relatedId);

        const response = await fetch(`/api/uploads?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch uploads');
        }
        const data = await response.json();
        setUploads(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchUploads();
  }, [filters?.uploadType, filters?.relatedId]);

  return { uploads, loading, error };
}

// Helper function to calculate student progress
export function calculateProgress(sessions: Session[]): number {
  if (sessions.length === 0) return 0;

  const completedSessions = sessions.filter(s => s.status === 'COMPLETED').length;
  return Math.round((completedSessions / sessions.length) * 100);
}

// Helper function to get upcoming sessions
export function getUpcomingSessions(sessions: Session[], limit: number = 5): Session[] {
  const now = new Date();

  return sessions
    .filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate >= now && s.status !== 'CANCELLED';
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

// Helper function to get recent completed sessions
export function getRecentSessions(sessions: Session[], limit: number = 3): Session[] {
  return sessions
    .filter(s => s.status === 'COMPLETED')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
