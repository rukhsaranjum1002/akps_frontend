export const API_CONFIG = {
  academicSession: '2018-19',
  publicHolidayPath: '/api/v1/public/holidays',
  baseUrl: (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, ''),
  fallbackBaseUrls: [
    'https://akps-backend-py.onrender.com',
    typeof window !== 'undefined' ? window.location.origin : '',
  ].filter(Boolean),
} as const;

export const getHolidayEndpoints = (session = API_CONFIG.academicSession) =>
  Array.from(new Set([API_CONFIG.baseUrl, ...API_CONFIG.fallbackBaseUrls]))
    .filter(Boolean)
    .map((base) => `${base.replace(/\/$/, '')}${API_CONFIG.publicHolidayPath}?session=${session}`);
