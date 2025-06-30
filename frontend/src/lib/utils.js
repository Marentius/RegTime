export function getWeek(dateStr) {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

export function getMonth(dateStr) {
  return new Date(dateStr).getMonth() + 1;
}

export function getYear(dateStr) {
  return new Date(dateStr).getFullYear();
}

export function sumBy(arr, keyFn) {
  const sums = {};
  arr.forEach(entry => {
    const key = keyFn(entry);
    sums[key] = (sums[key] || 0) + Number(entry.hours);
  });
  return sums;
}

export function unique(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a - b);
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(month, year) {
  // Justerer for at getDay() gir 0 for søndag, men vi vil kanskje ha mandag som 0 eller 1.
  // Her antar vi uken starter på søndag (0).
  return new Date(year, month, 1).getDay();
} 