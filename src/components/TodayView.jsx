import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  Check,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import ProgressRing from './ProgressRing';
import CountdownTimer from './CountdownTimer';
import {
  DAILY_TASKS,
  TOTAL_DAILY_MINUTES,
  WEEKEND_ROUTINE,
  WEEKS_PLAN,
  CORE_RULES,
  USER_NAME
} from '../data/routine';
import { getDayInfo, formatDisplayDate } from '../utils/dateUtils';
import confetti from 'canvas-confetti';

export default function TodayView({
  currentWeek,
  dailyLog,
  todayStr,
  onToggleTask,
  onResetToday,
  streak,
  daysDoneThisWeek,
  onNavigateTab
}) {
  const [dayOverride, setDayOverride] = useState(null); // Allows previewing Saturday or Sunday view
  const [showRules, setShowRules] = useState(false);

  const activeDayInfo = dayOverride ? getDayInfo(dayOverride) : getDayInfo();
  const currentWeekPlan = WEEKS_PLAN.find((w) => w.week === currentWeek) || WEEKS_PLAN[0];

  // Today's record
  const dayRecord = dailyLog[todayStr] || { tasks: {}, minutesDone: 0, isDayComplete: false };
  const completedTasks = dayRecord.tasks || {};

  // Calculate minutes completed today
  let minutesDone = 0;
  DAILY_TASKS.forEach((t) => {
    if (completedTasks[t.id]) {
      minutesDone += t.duration;
    }
  });

  const handleTaskCheck = (taskId, duration) => {
    const wasCompleted = !!completedTasks[taskId];
    const willBeCompleted = !wasCompleted;

    // Check if this action will complete all 6 tasks
    const otherTasksCount = DAILY_TASKS.filter(
      (t) => t.id !== taskId && completedTasks[t.id]
    ).length;

    if (willBeCompleted && otherTasksCount === DAILY_TASKS.length - 1) {
      // Confetti burst for full daily routine completion!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    onToggleTask(todayStr, taskId, duration);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Banner: Date, Day, Current Week & Streaks */}
      <div className="card" style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} color="var(--accent)" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeDayInfo.nameBn} ({activeDayInfo.nameEn})
              </h2>
              <span className="pill-badge pill-week">
                সপ্তাহ {currentWeek}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {formatDisplayDate()} • স্বাগত, {USER_NAME}!
            </div>
          </div>

          {/* Quick Day Mode Switcher (Today / Sat / Sun preview) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>দিন দেখুন:</span>
            <button
              onClick={() => setDayOverride(null)}
              className={`btn ${!dayOverride ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '3px 8px', fontSize: '0.72rem', height: '26px' }}
            >
              আজ
            </button>
            <button
              onClick={() => setDayOverride('2026-11-21')} // Saturday
              className={`btn ${dayOverride === '2026-11-21' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '3px 8px', fontSize: '0.72rem', height: '26px' }}
            >
              শনিবার
            </button>
            <button
              onClick={() => setDayOverride('2026-11-22')} // Sunday
              className={`btn ${dayOverride === '2026-11-22' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '3px 8px', fontSize: '0.72rem', height: '26px' }}
            >
              রবিবার
            </button>
          </div>
        </div>
      </div>

      {/* This Week's Focus Banner (Table 3 from document) */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent)', background: 'linear-gradient(to right, var(--bg-card), var(--bg-secondary))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} color="var(--accent)" />
            <span>সপ্তাহ {currentWeek}-এর মূল ফোকাস (Weekly Focus)</span>
          </h3>
          <button
            onClick={() => onNavigateTab('plan')}
            className="btn btn-secondary"
            style={{ padding: '2px 8px', fontSize: '0.7rem', height: '24px' }}
          >
            ৪ সপ্তাহের প্ল্যান দেখুন <ChevronRight size={12} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
              Grammar Focus (ব্যাকরণ)
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '2px', fontWeight: 600 }}>
              {currentWeekPlan.grammarFocus}
            </div>
          </div>

          <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase' }}>
              Vocabulary Theme (শব্দভাণ্ডার)
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '2px', fontWeight: 600 }}>
              {currentWeekPlan.vocabTheme}
            </div>
          </div>

          <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase' }}>
              Speaking Goal (স্পিকিং লক্ষ্য)
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '2px', fontWeight: 600 }}>
              {currentWeekPlan.speakingGoal}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Ring Card */}
      <div className="progress-ring-container">
        <ProgressRing
          minutesDone={activeDayInfo.isSaturday ? 45 : minutesDone}
          totalMinutes={activeDayInfo.isSaturday ? WEEKEND_ROUTINE.saturday.totalMinutes : TOTAL_DAILY_MINUTES}
        />
        <div className="progress-info">
          <h3>
            {activeDayInfo.isWeekday && 'আজকের রুটিন অগ্রগতি (Today’s Progress)'}
            {activeDayInfo.isSaturday && 'শনিবারের রিভিউ অগ্রগতি (Saturday Review)'}
            {activeDayInfo.isSunday && 'রবিবারের হালকা লিসেনিং ও বিশ্রাম (Sunday Rest)'}
          </h3>
          <p>
            {activeDayInfo.isWeekday && `দৈনিক ৮০ মিনিটের মধ্যে ${minutesDone} মিনিট সম্পন্ন হয়েছে।`}
            {activeDayInfo.isSaturday && 'ভুল পর্যালোচনা, শব্দ রিভিশন ও ৪৫ মিনিটের মক ইন্টারভিউ।'}
            {activeDayInfo.isSunday && 'কোনো মানসিক চাপ ছাড়া হালকা লিসেনিং উপভোগ করুন।'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="week-stat-pill">
              <Check size={13} />
              এই সপ্তাহে {daysDoneThisWeek}/৫ দিন রুটিন সম্পন্ন
            </span>
            <span className="pill-badge pill-streak">
              <Flame size={13} />
              {streak} দিনের ধারাবাহিক স্ট্রিক
            </span>
          </div>
        </div>
      </div>

      {/* Mon-Fri: 6 Daily Tasks Checklist */}
      {activeDayInfo.isWeekday && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 className="card-title">
                <span>আজকের ৬টি রুটিন কাজ (Daily 6 Tasks)</span>
              </h3>
              <div className="card-subtitle" style={{ marginBottom: 0 }}>
                পদ্ধতি এবং টুলস মেনে প্রতিটি টাস্ক সম্পন্ন করে টিক দিন
              </div>
            </div>

            <button
              onClick={onResetToday}
              className="btn btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem', height: '28px' }}
              title="Reset today's checks"
            >
              <RotateCcw size={12} />
              <span>রিসেট</span>
            </button>
          </div>

          <div className="task-list">
            {DAILY_TASKS.map((task) => {
              const isDone = !!completedTasks[task.id];

              return (
                <div key={task.id} className={`task-item ${isDone ? 'completed' : ''}`}>
                  <div className="task-header">
                    <button
                      onClick={() => handleTaskCheck(task.id, task.duration)}
                      className="task-checkbox-btn"
                      aria-label={`Mark ${task.name} as ${isDone ? 'incomplete' : 'complete'}`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={24} color="var(--success)" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>

                    <div className="task-content">
                      <div className="task-title-row">
                        <span className="task-title">
                          {task.banglaName} ({task.name})
                        </span>
                        <span className="task-duration-badge">
                          {task.duration} মিনিট
                        </span>
                        {isDone && (
                          <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 600 }}>
                            ✓ সম্পন্ন
                          </span>
                        )}
                      </div>

                      <div className="task-method">
                        <strong>পদ্ধতি:</strong> {task.methodBn}
                      </div>

                      <div className="task-tools">
                        <strong>টুলস:</strong> {task.tools}
                      </div>

                      {/* Optional Countdown Timer */}
                      <CountdownTimer
                        initialMinutes={task.duration}
                        onComplete={() => {
                          if (!isDone) {
                            handleTaskCheck(task.id, task.duration);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Saturday Review View */}
      {activeDayInfo.isSaturday && (
        <div className="card">
          <div style={{ marginBottom: '14px' }}>
            <h3 className="card-title">
              <span>{WEEKEND_ROUTINE.saturday.banglaTitle}</span>
            </h3>
            <div className="card-subtitle" style={{ marginBottom: 0 }}>
              {WEEKEND_ROUTINE.saturday.title} (মোট ৭৫ মিনিট)
            </div>
          </div>

          <div className="task-list">
            {WEEKEND_ROUTINE.saturday.tasks.map((task) => {
              const isDone = !!completedTasks[task.id];

              return (
                <div key={task.id} className={`task-item ${isDone ? 'completed' : ''}`}>
                  <div className="task-header">
                    <button
                      onClick={() => handleTaskCheck(task.id, task.duration)}
                      className="task-checkbox-btn"
                    >
                      {isDone ? (
                        <CheckCircle2 size={24} color="var(--success)" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>

                    <div className="task-content">
                      <div className="task-title-row">
                        <span className="task-title">{task.banglaTitle}</span>
                        <span className="task-duration-badge">{task.duration} মিনিট</span>
                      </div>
                      <div className="task-method">{task.descriptionBn}</div>

                      {task.id === 'sat-error-log' && (
                        <button
                          onClick={() => onNavigateTab('error')}
                          className="btn btn-secondary"
                          style={{ marginTop: '8px', padding: '3px 10px', fontSize: '0.75rem' }}
                        >
                          Error Log খুলুন →
                        </button>
                      )}
                      {task.id === 'sat-vocab-review' && (
                        <button
                          onClick={() => onNavigateTab('vocab')}
                          className="btn btn-secondary"
                          style={{ marginTop: '8px', padding: '3px 10px', fontSize: '0.75rem' }}
                        >
                          শব্দভাণ্ডার রিভিশন করুন →
                        </button>
                      )}
                      {task.id === 'sat-mock-interview' && (
                        <button
                          onClick={() => onNavigateTab('speaking')}
                          className="btn btn-primary"
                          style={{ marginTop: '8px', padding: '3px 10px', fontSize: '0.75rem' }}
                        >
                          মক ইন্টারভিউ প্র্যাকটিস শুরু করুন →
                        </button>
                      )}

                      <CountdownTimer initialMinutes={task.duration} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sunday Light Listening View */}
      {activeDayInfo.isSunday && (
        <div className="card">
          <div style={{ marginBottom: '14px' }}>
            <h3 className="card-title">
              <span>{WEEKEND_ROUTINE.sunday.banglaTitle}</span>
            </h3>
            <div className="card-subtitle" style={{ marginBottom: 0 }}>
              {WEEKEND_ROUTINE.sunday.title}
            </div>
          </div>

          <div className="task-list">
            {WEEKEND_ROUTINE.sunday.tasks.map((task) => {
              const isDone = !!completedTasks[task.id];

              return (
                <div key={task.id} className={`task-item ${isDone ? 'completed' : ''}`}>
                  <div className="task-header">
                    <button
                      onClick={() => handleTaskCheck(task.id, task.duration)}
                      className="task-checkbox-btn"
                    >
                      {isDone ? (
                        <CheckCircle2 size={24} color="var(--success)" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>

                    <div className="task-content">
                      <div className="task-title-row">
                        <span className="task-title">{task.banglaTitle}</span>
                        {task.duration > 0 && (
                          <span className="task-duration-badge">{task.duration} মিনিট</span>
                        )}
                      </div>
                      <div className="task-method">{task.descriptionBn}</div>

                      {task.duration > 0 && <CountdownTimer initialMinutes={task.duration} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5 Core Rules Collapsible Section */}
      <div className="card">
        <div
          onClick={() => setShowRules(!showRules)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="var(--accent)" />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ৫টি মূল নিয়ম (5 Core Rules for Spoken English)
            </h3>
          </div>
          <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.7rem', height: '24px' }}>
            {showRules ? 'লুকান' : 'নিয়মগুলো দেখুন'}
          </button>
        </div>

        {showRules && (
          <div className="rules-grid" style={{ marginTop: '14px' }}>
            {CORE_RULES.map((rule) => (
              <div key={rule.number} className="rule-card">
                <div className="rule-number">নিয়ম ০{rule.number}</div>
                <div className="rule-title">{rule.banglaTitle}</div>
                <div className="rule-desc">{rule.descriptionBn}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
