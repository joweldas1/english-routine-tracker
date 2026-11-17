import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsBanner from './components/StatsBanner';
import DailyRoutine from './components/DailyRoutine';
import SpeechPractice from './components/SpeechPractice';
import VocabularyVault from './components/VocabularyVault';
import AiPracticeCards from './components/AiPracticeCards';
import DailyJournal from './components/DailyJournal';
import { INITIAL_ROUTINE, VOCABULARY_LIST } from './data/initialData';
import { CheckSquare, Mic, BookOpen, Bot, PenTool, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('routine'); // 'routine', 'speech', 'vocab', 'ai', 'journal'

  // Routine state
  const [routine, setRoutine] = useState(() => {
    const saved = localStorage.getItem('fluent_routine');
    return saved ? JSON.parse(saved) : INITIAL_ROUTINE;
  });

  // Vocabulary state
  const [words, setWords] = useState(() => {
    const saved = localStorage.getItem('fluent_vocab');
    return saved ? JSON.parse(saved) : VOCABULARY_LIST;
  });

  // Journal entries state
  const [journalEntries, setJournalEntries] = useState(() => {
    const saved = localStorage.getItem('fluent_journal');
    return saved ? JSON.parse(saved) : [];
  });

  // Streak state
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('fluent_streak');
    return saved ? parseInt(saved, 10) : 1;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fluent_routine', JSON.stringify(routine));
  }, [routine]);

  useEffect(() => {
    localStorage.setItem('fluent_vocab', JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    localStorage.setItem('fluent_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('fluent_streak', streak.toString());
  }, [streak]);

  // Routine Handlers
  const handleToggleTask = (id) => {
    setRoutine((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask) => {
    setRoutine((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id) => {
    setRoutine((prev) => prev.filter((t) => t.id !== id));
  };

  const handleResetRoutine = () => {
    if (window.confirm('Reset today’s routine checklist to start fresh?')) {
      setRoutine((prev) => prev.map((t) => ({ ...t, completed: false })));
    }
  };

  // Vocab Handlers
  const handleToggleMastered = (id) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, mastered: !w.mastered } : w))
    );
  };

  const handleAddWord = (newWord) => {
    setWords((prev) => [newWord, ...prev]);
  };

  const handleDeleteWord = (id) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
  };

  // Journal Handlers
  const handleSaveJournal = (entry) => {
    setJournalEntries((prev) => [entry, ...prev]);
    // Also mark journal task in routine as complete if exists
    setRoutine((prev) =>
      prev.map((t) => (t.id === 'journal' ? { ...t, completed: true } : t))
    );
  };

  const handleDeleteJournal = (id) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const completedCount = routine.filter((t) => t.completed).length;
  const masteredWordsCount = words.filter((w) => w.mastered).length;

  const tabs = [
    { id: 'routine', label: 'Daily Routine', icon: CheckSquare },
    { id: 'speech', label: 'Voice & Speech', icon: Mic },
    { id: 'vocab', label: 'Vocabulary', icon: BookOpen },
    { id: 'ai', label: 'AI Scenarios', icon: Bot },
    { id: 'journal', label: 'Journal', icon: PenTool }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        streak={streak}
        onResetRoutine={handleResetRoutine}
        completedCount={completedCount}
        totalCount={routine.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Banner with Stats */}
        <StatsBanner
          streak={streak}
          completedCount={completedCount}
          totalCount={routine.length}
          masteredWordsCount={masteredWordsCount}
        />

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Views */}
        <div className="pt-2">
          {activeTab === 'routine' && (
            <DailyRoutine
              routine={routine}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'speech' && <SpeechPractice />}

          {activeTab === 'vocab' && (
            <VocabularyVault
              words={words}
              onToggleMastered={handleToggleMastered}
              onAddWord={handleAddWord}
              onDeleteWord={handleDeleteWord}
            />
          )}

          {activeTab === 'ai' && <AiPracticeCards />}

          {activeTab === 'journal' && (
            <DailyJournal
              entries={journalEntries}
              onSaveEntry={handleSaveJournal}
              onDeleteEntry={handleDeleteJournal}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 FluentHabit • English Routine & Speaking Practice Web App</p>
          <div className="flex items-center gap-1.5 text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice with AI Tutor Daily</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
