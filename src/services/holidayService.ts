import { API_CONFIG, getHolidayEndpoints } from '../config/api';
import type { HolidayCalendarMonth, HolidayItem } from '../types/holiday';

export const parseYMD = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
};

export const getHolidayLabel = (holiday: HolidayItem): string => {
  const start = holiday.start_date;
  const end = holiday.end_date;
  const sameDay = start === end;
  const formattedDate = sameDay
    ? new Date(parseYMD(start)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : `${new Date(parseYMD(start)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - ${new Date(parseYMD(end)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;

  const label = holiday.type === 'vacation' ? `${holiday.occasion} (Vacation)` : holiday.occasion;
  return `${label} • ${formattedDate}`;
};

export const buildHolidayCalendar = (holidays: HolidayItem[]): HolidayCalendarMonth[] => {
  if (!holidays.length) {
    return [];
  }

  const groups: Record<string, string[]> = {};
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = new Map(months.map((month, index) => [month, index]));

  holidays
    .slice()
    .sort((a, b) => parseYMD(a.start_date).getTime() - parseYMD(b.start_date).getTime())
    .forEach((holiday) => {
      const month = parseYMD(holiday.start_date).toLocaleString('en-US', { month: 'long' });
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(getHolidayLabel(holiday));
    });

  return Object.entries(groups)
    .sort(([a], [b]) => (monthIndex.get(a) ?? 0) - (monthIndex.get(b) ?? 0))
    .map(([month, events]) => ({ month, events }));
};

export const fetchHolidayItems = async (session = API_CONFIG.academicSession): Promise<HolidayItem[]> => {
  const endpoints = getHolidayEndpoints(session);
  let lastError: unknown = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Holiday API error: ${response.status}`);
      }

      const data = (await response.json()) as HolidayItem[];
      return Array.isArray(data) ? data : [];
    } catch (error) {
      lastError = error;
    }
  }

  console.error('Failed to load holidays from all configured endpoints:', lastError);
  return [];
};
