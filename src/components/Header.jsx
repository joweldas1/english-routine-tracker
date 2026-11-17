import React from 'react';
import { Flame, Moon, Sun, Award } from 'lucide-react';
import { USER_NAME } from '../data/routine';

export default function Header({ currentWeek, streak, theme, onToggleTheme, daysDoneThisWeek }) {
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
            ৪-সপ্তাহের প্রফেশনাল স্পোকেন ইংলিশ রুটিন
          </div>
        </div>
      </div>

      <div className="header-actions">
        {/* Streak badge */}
        <div className="pill-badge pill-streak" title="Daily Routine Streak">
          <Flame size={14} />
          <span>{streak} দিন স্ট্রিক</span>
        </div>

        {/* Current week badge */}
        <div className="pill-badge pill-week" title="Current Week">
          <Award size={14} />
          <span>সপ্তাহ {currentWeek}/৪</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="btn-icon"
          title={`Switch theme (Current: ${theme})`}
          aria-label="Toggle light or dark theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
