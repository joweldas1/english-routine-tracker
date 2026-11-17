import React from 'react';
import { Flame, Moon, Sun, Award, RotateCcw, ShieldAlert } from 'lucide-react';
import { USER_NAME } from '../data/routine';

export default function Header({
  currentWeek,
  streak,
  theme,
  onToggleTheme,
  daysDoneThisWeek,
  onOpenTotalReset
}) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon">
          <span>E</span>
        </div>
        <div>
          <div className="brand-title">
            <span>English Routine Tracker</span>
            <span className="brand-badge">{USER_NAME}</span>
          </div>
          <div className="brand-sub">
            <span className="pill-pulse-dot" style={{ color: 'var(--success)' }} />
            <span>৪-সপ্তাহের প্রফেশনাল স্পোকেন ইংলিশ রুটিন</span>
          </div>
        </div>
      </div>

      <div className="header-actions">
        {/* Streak badge */}
        <div className="pill-badge pill-streak" title="Daily Routine Streak">
          <Flame size={14} className="streak-icon" />
          <span>{streak}d</span>
        </div>

        {/* Current week badge */}
        <div className="pill-badge pill-week" title="Current Week">
          <Award size={14} />
          <span>W{currentWeek}/4</span>
        </div>

        {/* Total Reset Trigger Button */}
        <button
          onClick={onOpenTotalReset}
          className="btn-icon btn-reset-header"
          title="সম্পূর্ণ ফ্যাক্টরি রিসেট (Total Reset)"
          aria-label="Total Reset"
        >
          <RotateCcw size={16} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="btn-icon"
          title={`Switch theme (Current: ${theme})`}
          aria-label="Toggle light or dark theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
