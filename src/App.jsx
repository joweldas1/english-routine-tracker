import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import TodayView from './components/TodayView';
import PlanView from './components/PlanView';
import VocabularyView from './components/VocabularyView';
import ErrorLogView from './components/ErrorLogView';
import SpeakingView from './components/SpeakingView';
import ProgressView from './components/ProgressView';
import SettingsView from './components/SettingsView';

import {
  loadInitialState,
  saveStateToLocalStorage,
  exportDataAsJSON,
  importDataFromJSON,
  clearAllData
} from './utils/storage';
import {
  calculateCurrentWeek,
  calculateStreak,
  getDaysCompletedThisWeek,
  getTodayDateString
} from './utils/dateUtils';
import {
  DAILY_TASKS,
  INITIAL_VOCABULARY,
  INITIAL_ERROR_LOG,
  INITIAL_PROGRESS_TRACKER
} from './data/routine';

export default function App() {
  const [appState, setAppState] = useState(() => loadInitialState());
  const [activeTab, setActiveTab] = useState('today');

  const {
    startDate,
    theme,
    dailyLog,
    vocabulary,
    errorLog,
    interviewData,
    progressTracker
  } = appState;

  // Sync state changes to localStorage
  useEffect(() => {
    saveStateToLocalStorage(appState);
  }, [appState]);

  // Apply Theme to document.documentElement
  useEffect(() => {
    const applyTheme = (themeMode) => {
      if (themeMode === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      } else {
        document.documentElement.setAttribute('data-theme', themeMode);
      }
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e) => {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  // Computed values
  const todayStr = getTodayDateString();
  const currentWeek = calculateCurrentWeek(startDate);
  const streak = calculateStreak(dailyLog);
  const daysDoneThisWeek = getDaysCompletedThisWeek(dailyLog, startDate);

  // Handlers for Today's Routine
  const handleToggleTask = (dateKey, taskId, duration) => {
    setAppState((prev) => {
      const currentDay = prev.dailyLog[dateKey] || {
        tasks: {},
        minutesDone: 0,
        isDayComplete: false
      };

      const updatedTasks = {
        ...currentDay.tasks,
        [taskId]: !currentDay.tasks[taskId]
      };

      // Recalculate minutes completed
      let totalMin = 0;
      DAILY_TASKS.forEach((t) => {
        if (updatedTasks[t.id]) totalMin += t.duration;
      });

      // Mark complete if 5 or all tasks completed
      const doneCount = Object.values(updatedTasks).filter(Boolean).length;
      const isComplete = doneCount >= 5;

      return {
        ...prev,
        dailyLog: {
          ...prev.dailyLog,
          [dateKey]: {
            tasks: updatedTasks,
            minutesDone: totalMin,
            isDayComplete: isComplete
          }
        }
      };
    });
  };

  const handleResetToday = () => {
    if (window.confirm('আজকের সমস্ত টাস্ক রিসেট করতে চান?')) {
      setAppState((prev) => ({
        ...prev,
        dailyLog: {
          ...prev.dailyLog,
          [todayStr]: {
            tasks: {},
            minutesDone: 0,
            isDayComplete: false
          }
        }
      }));
    }
  };

  // Vocabulary Handlers
  const handleAddWord = (newWord) => {
    setAppState((prev) => ({
      ...prev,
      vocabulary: [newWord, ...prev.vocabulary]
    }));
  };

  const handleToggleReviewed = (id) => {
    setAppState((prev) => ({
      ...prev,
      vocabulary: prev.vocabulary.map((w) =>
        w.id === id ? { ...w, reviewed: !w.reviewed } : w
      )
    }));
  };

  const handleDeleteWord = (id) => {
    if (window.confirm('এই শব্দটি মুছে ফেলতে চান?')) {
      setAppState((prev) => ({
        ...prev,
        vocabulary: prev.vocabulary.filter((w) => w.id !== id)
      }));
    }
  };

  // Error Log Handlers
  const handleAddError = (newError) => {
    setAppState((prev) => ({
      ...prev,
      errorLog: [newError, ...prev.errorLog]
    }));
  };

  const handleEditError = (id, updatedFields) => {
    setAppState((prev) => ({
      ...prev,
      errorLog: prev.errorLog.map((err) =>
        err.id === id ? { ...err, ...updatedFields } : err
      )
    }));
  };

  const handleDeleteError = (id) => {
    if (window.confirm('এই ভুলের রেকর্ডটি মুছে ফেলতে চান?')) {
      setAppState((prev) => ({
        ...prev,
        errorLog: prev.errorLog.filter((err) => err.id !== id)
      }));
    }
  };

  // Speaking & Interview Handlers
  const handleUpdateInterviewAnswer = (questionId, data) => {
    setAppState((prev) => ({
      ...prev,
      interviewData: {
        ...prev.interviewData,
        [questionId]: data
      }
    }));
  };

  const handleTogglePracticed = (questionId) => {
    setAppState((prev) => {
      const current = prev.interviewData[questionId] || {
        practiced: false,
        notes: '',
        star: { s: '', t: '', a: '', r: '' }
      };

      return {
        ...prev,
        interviewData: {
          ...prev.interviewData,
          [questionId]: {
            ...current,
            practiced: !current.practiced
          }
        }
      };
    });
  };

  // Progress Tracker Handlers
  const handleUpdateProgressTracker = (updatedTracker) => {
    setAppState((prev) => ({
      ...prev,
      progressTracker: updatedTracker
    }));
  };

  // Settings Handlers
  const handleUpdateStartDate = (newDate) => {
    setAppState((prev) => ({ ...prev, startDate: newDate }));
  };

  const handleUpdateTheme = (newTheme) => {
    setAppState((prev) => ({ ...prev, theme: newTheme }));
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    handleUpdateTheme(nextTheme);
  };

  const handleExportJSON = () => {
    exportDataAsJSON(appState);
  };

  const handleImportJSON = async (file) => {
    const data = await importDataFromJSON(file);
    setAppState((prev) => ({
      ...prev,
      ...data
    }));
  };

  const handleResetAllData = () => {
    clearAllData();
    setAppState({
      startDate: getTodayDateString(),
      theme: 'system',
      dailyLog: {},
      vocabulary: INITIAL_VOCABULARY,
      errorLog: INITIAL_ERROR_LOG,
      interviewData: {},
      progressTracker: INITIAL_PROGRESS_TRACKER
    });
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        currentWeek={currentWeek}
        streak={streak}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        daysDoneThisWeek={daysDoneThisWeek}
      />

      {/* Navigation (Tabs on desktop top / mobile bottom) */}
      <BottomNav activeTab={activeTab} onSelectTab={(tab) => setActiveTab(tab)} />

      {/* Main Content Area */}
      <main className="main-content" role="main">
        {activeTab === 'today' && (
          <TodayView
            currentWeek={currentWeek}
            dailyLog={dailyLog}
            todayStr={todayStr}
            onToggleTask={handleToggleTask}
            onResetToday={handleResetToday}
            streak={streak}
            daysDoneThisWeek={daysDoneThisWeek}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'plan' && <PlanView currentWeek={currentWeek} />}

        {activeTab === 'vocab' && (
          <VocabularyView
            vocabulary={vocabulary}
            onAddWord={handleAddWord}
            onToggleReviewed={handleToggleReviewed}
            onDeleteWord={handleDeleteWord}
          />
        )}

        {activeTab === 'error' && (
          <ErrorLogView
            errorLog={errorLog}
            currentWeek={currentWeek}
            onAddError={handleAddError}
            onEditError={handleEditError}
            onDeleteError={handleDeleteError}
          />
        )}

        {activeTab === 'speaking' && (
          <SpeakingView
            interviewData={interviewData}
            onUpdateInterviewAnswer={handleUpdateInterviewAnswer}
            onTogglePracticed={handleTogglePracticed}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            progressTracker={progressTracker}
            vocabulary={vocabulary}
            dailyLog={dailyLog}
            errorLog={errorLog}
            onUpdateProgressTracker={handleUpdateProgressTracker}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            startDate={startDate}
            onUpdateStartDate={handleUpdateStartDate}
            theme={theme}
            onUpdateTheme={handleUpdateTheme}
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>
    </div>
  );
}
