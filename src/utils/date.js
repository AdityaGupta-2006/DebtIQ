const pad2 = (n) => String(n).padStart(2, '0');

export const formatISODateLocal = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
};

export const parseISODateLocal = (iso) => {
  if (!iso || typeof iso !== 'string') return null;
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const daysInMonth = (year, monthIndex) => new Date(year, monthIndex + 1, 0).getDate();

export const clampDayOfMonth = (year, monthIndex, day) => {
  const dim = daysInMonth(year, monthIndex);
  return Math.min(Math.max(1, day), dim);
};

export const monthDiff = (a, b) => (a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth());
