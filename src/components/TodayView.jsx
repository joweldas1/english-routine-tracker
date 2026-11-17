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
  RotateCcw,
  Zap,
  Clock
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
  const [showRules, setShowRules] = useState(false);

  const activeDayInfo = getDayInfo();
  const currentWeekPlan = WEEKS_PLAN.find((w) => w.week === currentWeek) || WEEKS_PLAN[0];

  // Today's record
  const dayRecord = dailyLog[todayStr] || { tasks: {}, minutesDone: 0, isDayComplete: false };
  const completedTasks = dayRecord.tasks || {};

  // Calculate actual minutes completed today and dynamic target
  let minutesDone = 0;
  let totalDailyTarget = TOTAL_DAILY_MINUTES;

  if (activeDayInfo.isSaturday) {
    totalDailyTarget = WEEKEND_ROUTINE.saturday.totalMinutes;
    WEEKEND_ROUTINE.saturday.tasks.forEach((t) => {
      if (completedTasks[t.id]) minutesDone += t.duration;
    });
  } else if (activeDayInfo.isSunday) {
    totalDailyTarget = WEEKEND_ROUTINE.sunday.totalMinutes;
    WEEKEND_ROUTINE.sunday.tasks.forEach((t) => {
      if (completedTasks[t.id]) minutesDone += t.duration;
    });
  } else {
    totalDailyTarget = TOTAL_DAILY_MINUTES;
    DAILY_TASKS.forEach((t) => {
      if (completedTasks[t.id]) minutesDone += t.duration;
    });
  }

  const handleTaskCheck = (taskId, duration) => {
    const wasCompleted = !!completedTasks[taskId];
    const willBeCompleted = !wasCompleted;

    const currentTasksList = activeDayInfo.isSaturday
      ? WEEKEND_ROUTINE.saturday.tasks
      : activeDayInfo.isSunday
      ? WEEKEND_ROUTINE.sunday.tasks
      : DAILY_TASKS;

    const otherTasksCount = currentTasksList.filter(
      (t) => t.id !== taskId && completedTasks[t.id]
    ).length;

    if (willBeCompleted && otherTasksCount === currentTasksList.length - 1) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    onToggleTask(todayStr, taskId, duration);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Banner: Date, Day, Current Week & Status */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={18} color="var(--cyan)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {activeDayInfo.nameBn} <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>({activeDayInfo.nameEn})</span>
              </h2>
              <span className="pill-badge pill-week">
                WEEK 0{currentWeek}
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px', fontFamily: 'var(--font-mono)' }}>
              {formatDisplayDate()} • TARGET: {totalDailyTarget} MIN / DAY
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="week-stat-pill">
              <Check size={14} color="var(--success)" />
              {daysDoneThisWeek}/5 দিন সম্পন্ন
            </span>
            <span className="pill-badge pill-streak">
              <Flame size={14} />
              {streak}d
            </span>
          </div>
        </div>
      </div>

      {/* This Week's Focus Banner (Table 3) */}
      <div
        className="card"
        style={{
          borderLeft: '4px solid var(--accent)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), var(--bg-card))'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color="var(--accent)" />
            <span>সপ্তাহ ০{currentWeek}-এর মূল ফোকাস (Weekly Blueprint)</span>
          </h3>
          <button
            onClick={() => onNavigateTab('plan')}
            className="btn btn-secondary"
            style={{ padding: '3px 10px', fontSize: '0.72rem', height: '26px' }}
          >
            ৪ সপ্তাহের প্ল্যান <ChevronRight size={12} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              // GRAMMAR FOCUS
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginTop: '4px', fontWeight: 700 }}>
              {currentWeekPlan.grammarFocus}
            </div>
          </div>

          <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              // VOCABULARY THEME
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginTop: '4px', fontWeight: 700 }}>
              {currentWeekPlan.vocabTheme}
            </div>
          </div>

          <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              // SPEAKING GOAL
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginTop: '4px', fontWeight: 700 }}>
              {currentWeekPlan.speakingGoal}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Ring Card */}
      <div className="progress-ring-container">
        <ProgressRing
          minutesDone={minutesDone}
          totalMinutes={totalDailyTarget}
        />
        <div className="progress-info">
          <h3>
            {activeDayInfo.isWeekday && 'আজকের রুটিন অগ্রগতি (Daily Routine)'}
            {activeDayInfo.isSaturday && 'শনিবারের রিভিউ অগ্রগতি (Saturday Review)'}
            {activeDayInfo.isSunday && 'রবিবারের হালকা লিসেনিং ও রিলাক্স (Sunday Rest)'}
          </h3>
          <p>
            {activeDayInfo.isWeekday && `দৈনিক ${totalDailyTarget} মিনিটের মধ্যে ${minutesDone} মিনিট সম্পন্ন হয়েছে।`}
            {activeDayInfo.isSaturday && `শনিবারের মোট ${totalDailyTarget} মিনিটের মধ্যে ${minutesDone} মিনিট সম্পন্ন হয়েছে।`}
            {activeDayInfo.isSunday && `রবিবারের ${totalDailyTarget} মিনিটের মধ্যে ${minutesDone} মিনিট সম্পন্ন হয়েছে।`}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="week-stat-pill">
              <Check size={14} color="var(--success)" />
              {daysDoneThisWeek}/5 দিন রুটিন সম্পন্ন
            </span>
            <span className="pill-badge pill-streak">
              <Flame size={14} />
              {streak} দিনের স্ট্রিক
            </span>
          </div>
        </div>
      </div>

      {/* Mon-Fri: 6 Daily Tasks Checklist */}
      {activeDayInfo.isWeekday && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
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
              style={{ padding: '5px 12px', fontSize: '0.75rem', height: '30px' }}
              title="Reset today's checks"
            >
              <RotateCcw size={13} />
              <span>আজকের টিক রিসেট</span>
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
                          {task.duration} MIN
                        </span>
                        {isDone && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                            [✓ COMPLETED]
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
          <div style={{ marginBottom: '16px' }}>
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
                        <span className="task-duration-badge">{task.duration} MIN</span>
                      </div>
                      <div className="task-method">{task.descriptionBn}</div>

                      {task.id === 'sat-error-log' && (
                        <button
                          onClick={() => onNavigateTab('error')}
                          className="btn btn-secondary"
                          style={{ marginTop: '8px', padding: '4px 12px', fontSize: '0.75rem' }}
                        >
                          Error Log খুলুন →
                        </button>
                      )}
                      {task.id === 'sat-vocab-review' && (
                        <button
                          onClick={() => onNavigateTab('vocab')}
                          className="btn btn-secondary"
                          style={{ marginTop: '8px', padding: '4px 12px', fontSize: '0.75rem' }}
                        >
                          শব্দভাণ্ডার রিভিশন করুন →
                        </button>
                      )}
                      {task.id === 'sat-mock-interview' && (
                        <button
                          onClick={() => onNavigateTab('speaking')}
                          className="btn btn-primary"
                          style={{ marginTop: '8px', padding: '4px 12px', fontSize: '0.75rem' }}
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
          <div style={{ marginBottom: '16px' }}>
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
                          <span className="task-duration-badge">{task.duration} MIN</span>
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
            <ShieldCheck size={18} color="var(--cyan)" />
            <h3 style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ৫টি মূল নিয়ম (5 Core Rules for Spoken English)
            </h3>
          </div>
          <button className="btn btn-secondary" style={{ padding: '3px 10px', fontSize: '0.72rem', height: '26px' }}>
            {showRules ? 'লুকান' : 'নিয়মগুলো দেখুন'}
          </button>
        </div>

        {showRules && (
          <div className="rules-grid" style={{ marginTop: '16px' }}>
            {CORE_RULES.map((rule) => (
              <div key={rule.number} className="rule-card">
                <div className="rule-number">// RULE 0{rule.number}</div>
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
