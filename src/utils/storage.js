/**
 * LocalStorage persistence and JSON Export/Import management
 */

import {
  INITIAL_VOCABULARY,
  INITIAL_ERROR_LOG,
  INITIAL_PROGRESS_TRACKER
} from '../data/routine';
import { getTodayDateString } from './dateUtils';

const STORAGE_KEYS = {
  START_DATE: 'ert_start_date',
  THEME: 'ert_theme',
  DAILY_LOG: 'ert_daily_log',
  VOCABULARY: 'ert_vocabulary',
  ERROR_LOG: 'ert_error_log',
  INTERVIEW_DATA: 'ert_interview_data',
  PROGRESS_TRACKER: 'ert_progress_tracker'
};

export const loadInitialState = () => {
  try {
    const today = getTodayDateString();

    const startDate = localStorage.getItem(STORAGE_KEYS.START_DATE) || today;
    const theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'system';

    const savedDailyLog = localStorage.getItem(STORAGE_KEYS.DAILY_LOG);
    const dailyLog = savedDailyLog ? JSON.parse(savedDailyLog) : {
      [today]: {
        tasks: {},
        minutesDone: 0,
        isDayComplete: false
      }
    };

    const savedVocab = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
    const vocabulary = savedVocab ? JSON.parse(savedVocab) : INITIAL_VOCABULARY;

    const savedErrors = localStorage.getItem(STORAGE_KEYS.ERROR_LOG);
    const errorLog = savedErrors ? JSON.parse(savedErrors) : INITIAL_ERROR_LOG;

    const savedInterviews = localStorage.getItem(STORAGE_KEYS.INTERVIEW_DATA);
    const interviewData = savedInterviews ? JSON.parse(savedInterviews) : {};

    const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS_TRACKER);
    const progressTracker = savedProgress ? JSON.parse(savedProgress) : INITIAL_PROGRESS_TRACKER;

    return {
      startDate,
      theme,
      dailyLog,
      vocabulary,
      errorLog,
      interviewData,
      progressTracker
    };
  } catch (err) {
    console.error('Error loading initial state from localStorage:', err);
    return {
      startDate: getTodayDateString(),
      theme: 'system',
      dailyLog: {},
      vocabulary: INITIAL_VOCABULARY,
      errorLog: INITIAL_ERROR_LOG,
      interviewData: {},
      progressTracker: INITIAL_PROGRESS_TRACKER
    };
  }
};

export const saveStateToLocalStorage = (state) => {
  try {
    if (state.startDate) localStorage.setItem(STORAGE_KEYS.START_DATE, state.startDate);
    if (state.theme) localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    if (state.dailyLog) localStorage.setItem(STORAGE_KEYS.DAILY_LOG, JSON.stringify(state.dailyLog));
    if (state.vocabulary) localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(state.vocabulary));
    if (state.errorLog) localStorage.setItem(STORAGE_KEYS.ERROR_LOG, JSON.stringify(state.errorLog));
    if (state.interviewData) localStorage.setItem(STORAGE_KEYS.INTERVIEW_DATA, JSON.stringify(state.interviewData));
    if (state.progressTracker) localStorage.setItem(STORAGE_KEYS.PROGRESS_TRACKER, JSON.stringify(state.progressTracker));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};

/**
 * Exports all data as a formatted JSON file download
 */
export const exportDataAsJSON = (state) => {
  const exportPayload = {
    appName: "English Routine Tracker",
    user: "Jowel",
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    data: state
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(exportPayload, null, 2)
  )}`;

  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  const dateStr = getTodayDateString();
  downloadAnchor.setAttribute('download', `english-routine-tracker-backup-${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

/**
 * Validates and imports JSON file data
 */
export const importDataFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);

        // Basic payload validation
        const incomingData = parsed.data || parsed;
        if (!incomingData || typeof incomingData !== 'object') {
          throw new Error('Invalid JSON structure: missing data object.');
        }

        resolve(incomingData);
      } catch (err) {
        reject(new Error('Failed to parse file: ' + err.message));
      }
    };

    reader.onerror = () => {
      reject(new Error('File reading error.'));
    };

    reader.readAsText(file);
  });
};

/**
 * Clear all localStorage data
 */
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};
