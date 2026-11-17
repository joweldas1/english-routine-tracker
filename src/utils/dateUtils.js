/**
 * Date and Week calculation utilities for English Routine Tracker
 */

export const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDayOfWeek = (dateStr = null) => {
  const d = dateStr ? new Date(dateStr) : new Date();
  return d.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
};

export const getDayInfo = (dateStr = null) => {
  const d = dateStr ? new Date(dateStr) : new Date();
  const dayIndex = d.getDay();

  const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysBn = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

  return {
    dayIndex,
    nameEn: daysEn[dayIndex],
    nameBn: daysBn[dayIndex],
    isWeekday: dayIndex >= 1 && dayIndex <= 5, // Mon-Fri
    isSaturday: dayIndex === 6,
    isSunday: dayIndex === 0
  };
};

/**
 * Computes current week (1-4) based on a startDate (YYYY-MM-DD).
 * Clamped between 1 and 4.
 */
export const calculateCurrentWeek = (startDateStr) => {
  if (!startDateStr) return 1;

  const start = new Date(startDateStr);
  const today = new Date(getTodayDateString());

  // Difference in milliseconds
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 1; // before start date

  const weekNum = Math.floor(diffDays / 7) + 1;
  return Math.min(4, Math.max(1, weekNum));
};

/**
 * Returns formatted display date: e.g. "Tuesday, 17 Nov"
 */
export const formatDisplayDate = (dateStr = null) => {
  const d = dateStr ? new Date(dateStr) : new Date();
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Calculates current streak given a completedDates map or array.
 * A day is considered completed if marked completed for that date.
 */
export const calculateStreak = (dailyLog) => {
  if (!dailyLog || typeof dailyLog !== 'object') return 0;

  const todayStr = getTodayDateString();
  const today = new Date(todayStr);

  let streak = 0;
  let checkDate = new Date(today);

  // Check if today is completed; if not, check from yesterday
  const isTodayDone = dailyLog[todayStr]?.isDayComplete;
  if (!isTodayDone) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const y = checkDate.getFullYear();
    const m = String(checkDate.getMonth() + 1).padStart(2, '0');
    const d = String(checkDate.getDate()).padStart(2, '0');
    const dateKey = `${y}-${m}-${d}`;

    const dayRecord = dailyLog[dateKey];
    if (dayRecord && dayRecord.isDayComplete) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Calculates how many days were completed in the current week (Monday to Friday, out of 5)
 */
export const getDaysCompletedThisWeek = (dailyLog, startDateStr) => {
  if (!dailyLog) return 0;

  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday...

  // Find Monday of the current week
  // If today is Sunday (0), distance to last Monday is 6 days. Otherwise currentDay - 1.
  const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - distanceToMonday);

  let count = 0;
  // Check Monday through Friday (5 days)
  for (let i = 0; i < 5; i++) {
    const checkDate = new Date(monday);
    checkDate.setDate(monday.getDate() + i);

    const y = checkDate.getFullYear();
    const m = String(checkDate.getMonth() + 1).padStart(2, '0');
    const d = String(checkDate.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${d}`;

    if (dailyLog[key]?.isDayComplete) {
      count++;
    }
  }

  return count;
};
