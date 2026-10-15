export type HolidayItem = {
  id: number;
  start_date: string;
  end_date: string;
  occasion: string;
  session: string;
  moon_dep: string;
  type: string;
};

export type HolidayCalendarMonth = {
  month: string;
  events: string[];
};
