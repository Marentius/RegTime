/**
 * Henter antall dager i en gitt måned og år.
 * @param {number} month - Måneden (0-indeksert, 0 for januar).
 * @param {number} year - Året.
 * @returns {number} Antall dager i måneden.
 */
export const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Finner ukedagen for den første dagen i en gitt måned.
 * @param {number} month - Måneden (0-indeksert).
 * @param {number} year - Året.
 * @returns {number} Ukedag (0 for søndag, 1 for mandag, osv.).
 */
export const getFirstDayOfWeek = (month, year) => {
  return new Date(year, month, 1).getDay();
};

/**
 * Henter ukenummeret for en gitt dato.
 * @param {string | Date} date - Datoen.
 * @returns {number} Ukenummeret.
 */
export const getWeek = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  // January 4 is always in week 1.
  const week1 = new Date(d.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

/**
 * Henter måneden for en gitt dato (1-indeksert).
 * @param {string | Date} date - Datoen.
 * @returns {number} Måneden (1-12).
 */
export const getMonth = (date) => {
    return new Date(date).getMonth() + 1;
};
  
/**
 * Henter året for en gitt dato.
 * @param {string | Date} date - Datoen.
 * @returns {number} Året.
 */
export const getYear = (date) => {
    return new Date(date).getFullYear();
};
