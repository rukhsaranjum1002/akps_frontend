import { describe, expect, it } from 'vitest';

import { buildHolidayCalendar } from './holidayService';
import type { HolidayItem } from '../types/holiday';

describe('holidayService', () => {
  it('builds a month-wise holiday calendar from raw holiday items', () => {
    const holidays: HolidayItem[] = [
      {
        id: 2,
        start_date: '2025-04-10',
        end_date: '2025-04-10',
        occasion: 'School Reopens',
        session: '2018-19',
        moon_dep: '0',
        type: 'holiday',
      },
      {
        id: 1,
        start_date: '2025-03-31',
        end_date: '2025-04-05',
        occasion: 'Summer Vacation',
        session: '2018-19',
        moon_dep: '0',
        type: 'vacation',
      },
    ];

    const result = buildHolidayCalendar(holidays);

    expect(result[0]?.month).toBe('March');
    expect(result[0]?.events[0]).toContain('Summer Vacation');
    expect(result[1]?.month).toBe('April');
    expect(result[1]?.events[0]).toContain('School Reopens');
  });
});
