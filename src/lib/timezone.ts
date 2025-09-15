import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { addMinutes, parseISO } from 'date-fns';

// Common timezone groups for easy selection
export const TIMEZONE_GROUPS = {
  Americas: [
    { value: 'America/New_York', label: 'Eastern Time (New York)', offset: -5 },
    { value: 'America/Chicago', label: 'Central Time (Chicago)', offset: -6 },
    { value: 'America/Denver', label: 'Mountain Time (Denver)', offset: -7 },
    { value: 'America/Los_Angeles', label: 'Pacific Time (Los Angeles)', offset: -8 },
    { value: 'America/Toronto', label: 'Toronto', offset: -5 },
    { value: 'America/Mexico_City', label: 'Mexico City', offset: -6 },
    { value: 'America/Sao_Paulo', label: 'São Paulo', offset: -3 },
    { value: 'America/Buenos_Aires', label: 'Buenos Aires', offset: -3 },
  ],
  Europe: [
    { value: 'Europe/London', label: 'London (GMT)', offset: 0 },
    { value: 'Europe/Paris', label: 'Paris (CET)', offset: 1 },
    { value: 'Europe/Berlin', label: 'Berlin', offset: 1 },
    { value: 'Europe/Zurich', label: 'Zurich', offset: 1 },
    { value: 'Europe/Rome', label: 'Rome', offset: 1 },
    { value: 'Europe/Madrid', label: 'Madrid', offset: 1 },
    { value: 'Europe/Amsterdam', label: 'Amsterdam', offset: 1 },
    { value: 'Europe/Stockholm', label: 'Stockholm', offset: 1 },
    { value: 'Europe/Athens', label: 'Athens', offset: 2 },
    { value: 'Europe/Moscow', label: 'Moscow', offset: 3 },
  ],
  Asia: [
    { value: 'Asia/Dubai', label: 'Dubai', offset: 4 },
    { value: 'Asia/Karachi', label: 'Karachi', offset: 5 },
    { value: 'Asia/Kolkata', label: 'Mumbai/Delhi', offset: 5.5 },
    { value: 'Asia/Bangkok', label: 'Bangkok', offset: 7 },
    { value: 'Asia/Singapore', label: 'Singapore', offset: 8 },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong', offset: 8 },
    { value: 'Asia/Shanghai', label: 'Shanghai/Beijing', offset: 8 },
    { value: 'Asia/Tokyo', label: 'Tokyo', offset: 9 },
    { value: 'Asia/Seoul', label: 'Seoul', offset: 9 },
  ],
  'Africa & Oceania': [
    { value: 'Africa/Cairo', label: 'Cairo', offset: 2 },
    { value: 'Africa/Johannesburg', label: 'Johannesburg', offset: 2 },
    { value: 'Africa/Lagos', label: 'Lagos', offset: 1 },
    { value: 'Africa/Nairobi', label: 'Nairobi', offset: 3 },
    { value: 'Australia/Sydney', label: 'Sydney', offset: 11 },
    { value: 'Australia/Melbourne', label: 'Melbourne', offset: 11 },
    { value: 'Australia/Perth', label: 'Perth', offset: 8 },
    { value: 'Pacific/Auckland', label: 'Auckland', offset: 13 },
  ],
};

// Flatten all timezones for easy access
export const ALL_TIMEZONES = Object.values(TIMEZONE_GROUPS).flat();

/**
 * Get the user's browser timezone
 */
export function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

/**
 * Convert a date from one timezone to another
 */
export function convertTimezone(
  date: Date | string,
  fromTimezone: string,
  toTimezone: string
): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  // Convert from source timezone to UTC
  const utcDate = fromZonedTime(dateObj, fromTimezone);

  // Convert from UTC to target timezone
  return toZonedTime(utcDate, toTimezone);
}

/**
 * Format a date in a specific timezone
 */
export function formatInTimezone(
  date: Date | string,
  timezone: string,
  formatString: string = 'yyyy-MM-dd HH:mm:ss zzz'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(toZonedTime(dateObj, timezone), formatString, { timeZone: timezone });
}

/**
 * Get the current time in a specific timezone
 */
export function getCurrentTimeInTimezone(timezone: string): Date {
  return toZonedTime(new Date(), timezone);
}

/**
 * Calculate timezone offset from UTC in hours
 */
export function getTimezoneOffset(timezone: string): number {
  const now = new Date();
  const tzDate = toZonedTime(now, timezone);
  const utcDate = toZonedTime(now, 'UTC');

  const diff = tzDate.getTime() - utcDate.getTime();
  return Math.round(diff / (1000 * 60 * 60));
}

/**
 * Format time for dual display (user timezone and course timezone)
 */
export function formatDualTime(
  date: Date | string,
  userTimezone: string,
  courseTimezone: string,
  formatString: string = 'h:mm a'
): {
  userTime: string;
  courseTime: string;
  userTimeZone: string;
  courseTimeZone: string;
} {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  const userTime = formatInTimezone(dateObj, userTimezone, formatString);
  const courseTime = formatInTimezone(dateObj, courseTimezone, formatString);

  const userTimeZone = formatInTimezone(dateObj, userTimezone, 'zzz');
  const courseTimeZone = formatInTimezone(dateObj, courseTimezone, 'zzz');

  return {
    userTime,
    courseTime,
    userTimeZone,
    courseTimeZone,
  };
}

/**
 * Check if a date is in the past for a specific timezone
 */
export function isPastInTimezone(date: Date | string, timezone: string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = getCurrentTimeInTimezone(timezone);
  return dateObj < now;
}

/**
 * Check if a student's access has expired
 */
export function hasAccessExpired(expiryDate: Date | string | null, timezone: string): boolean {
  if (!expiryDate) return false;
  return isPastInTimezone(expiryDate, timezone);
}

/**
 * Get a list of common timezones with current time preview
 */
export function getTimezonesWithPreview(): Array<{
  value: string;
  label: string;
  currentTime: string;
  offset: string;
}> {
  const now = new Date();

  return ALL_TIMEZONES.map(tz => {
    const currentTime = formatInTimezone(now, tz.value, 'h:mm a');
    const offset = getTimezoneOffset(tz.value);
    const offsetStr = offset >= 0 ? `+${offset}` : `${offset}`;

    return {
      value: tz.value,
      label: tz.label,
      currentTime,
      offset: `UTC${offsetStr}`,
    };
  });
}

/**
 * Parse a time string (HH:MM) and create a Date object in a specific timezone
 */
export function parseTimeInTimezone(
  timeStr: string,
  date: Date,
  timezone: string
): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const tzDate = toZonedTime(date, timezone);
  tzDate.setHours(hours, minutes, 0, 0);
  return fromZonedTime(tzDate, timezone);
}

/**
 * Get day of week name
 */
export function getDayName(dayIndex: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
}

/**
 * Calculate next occurrence of a weekly class
 */
export function getNextClassOccurrence(
  dayOfWeek: number,
  timeStr: string,
  timezone: string
): Date {
  const now = getCurrentTimeInTimezone(timezone);
  const currentDay = now.getDay();

  let daysUntilNext = dayOfWeek - currentDay;
  if (daysUntilNext < 0) {
    daysUntilNext += 7;
  } else if (daysUntilNext === 0) {
    // If it's today, check if the time has passed
    const classTime = parseTimeInTimezone(timeStr, now, timezone);
    if (classTime <= now) {
      daysUntilNext = 7; // Next week
    }
  }

  const nextDate = new Date(now);
  nextDate.setDate(nextDate.getDate() + daysUntilNext);

  return parseTimeInTimezone(timeStr, nextDate, timezone);
}