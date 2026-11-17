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
import TotalResetModal from './components/TotalResetModal';

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
import confetti from 'canvas-confetti';

export default function App() {
  const [appState, setAppState] = useState(() => loadInitialState());
  const [activeTab, setActiveTab] = useState('today');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
      showToast('আজকের চেকলিস্ট রিসেট করা হয়েছে!');
    }
  };

  // Vocabulary Handlers
  const handleAddWord = (newWord) => {
    setAppState((prev) => ({
      ...prev,
      vocabulary: [newWord, ...prev.vocabulary]
    }));
    showToast(`নতুন শব্দ "${newWord.word}" যুক্ত হয়েছে!`);
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
    showToast('নতুন ভুলের রেকর্ড সংরক্ষিত হয়েছে!');
  };

  const handleEditError = (id, updatedFields) => {
    setAppState((prev) => ({
      ...prev,
      errorLog: prev.errorLog.map((err) =>
        err.id === id ? { ...err, ...updatedFields } : err
      )
    }));
    showToast('ভুলের রেকর্ড আপডেট করা হয়েছে!');
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

      const willBePracticed = !current.practiced;
      if (willBePracticed) {
        confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
      }

      return {
        ...prev,
        interviewData: {
          ...prev.interviewData,
          [questionId]: {
            ...current,
            practiced: willBePracticed
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
    showToast('শুরুর তারিখ আপডেট করা হয়েছে!');
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
    showToast('JSON ব্যাকআপ ডাউনলোড সম্পন্ন হয়েছে!');
  };

  const handleImportJSON = async (file) => {
    const data = await importDataFromJSON(file);
    setAppState((prev) => ({
      ...prev,
      ...data
    }));
    showToast('ব্যাকআপ সফলভাবে রিস্টোর হয়েছে!');
  };

  // TOTAL FACTORY RESET
  const handleTotalReset = (resetType = 'clean') => {
    clearAllData();

    // Play subtle audio tone
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {}

    if (resetType === 'clean') {
      const emptyState = {
        startDate: getTodayDateString(),
        theme: 'dark',
        dailyLog: {},
        vocabulary: [],
        errorLog: [],
        interviewData: {},
        progressTracker: INITIAL_PROGRESS_TRACKER.map((r) => ({
          ...r,
          newWords: 0,
          speakingMinutes: 0,
          completedDays: 0,
          repeatedMistakes: 0,
          notes: ''
        }))
      };
      setAppState(emptyState);
      saveStateToLocalStorage(emptyState);
      showToast('টোটাল ফ্যাক্টরি রিসেট সম্পন্ন! সবকিছু শূন্য থেকে ফ্রেশ শুরু হলো।');
    } else {
      const templateState = {
        startDate: getTodayDateString(),
        theme: 'dark',
        dailyLog: {},
        vocabulary: INITIAL_VOCABULARY,
        errorLog: INITIAL_ERROR_LOG,
        interviewData: {},
        progressTracker: INITIAL_PROGRESS_TRACKER
      };
      setAppState(templateState);
      saveStateToLocalStorage(templateState);
      showToast('ডিফল্ট টেমপ্লেট সহ অ্যাপটি রিস্টার্ট হলো!');
    }
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
        onOpenTotalReset={() => setIsResetModalOpen(true)}
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
            onOpenTotalReset={() => setIsResetModalOpen(true)}
          />
        )}
      </main>

      {/* Dedicated Futuristic Total Reset Modal */}
      <TotalResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleTotalReset}
      />

      {/* Futuristic Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '75px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 90,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--accent)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(99, 102, 241, 0.35)',
            color: '#ffffff',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.25s ease-out',
            pointerEvents: 'none'
          }}
        >
          <span className="pill-pulse-dot" style={{ color: 'var(--accent)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
