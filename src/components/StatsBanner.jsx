import React from 'react';
import { Trophy, Target, BookOpen, Clock, Zap } from 'lucide-react';

export default function StatsBanner({ streak, completedCount, totalCount, masteredWordsCount }) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Calculate estimated minutes completed
  const minutesEst = completedCount * 12;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left intro & quote */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Daily Spoken English Goal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            "Speak a little every single day."
          </h2>
          <p className="mt-1.5 text-sm text-slate-300">
            প্রতিদিন ২০-৩০ মিনিট নিয়মিত প্র্যাকটিস করলে ৩ মাসের মধ্যে স্বাভাবিক স্পিকিং ফ্লুয়েন্সি চলে আসবে।
          </p>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Today's Routine Progress</span>
              <span className="text-indigo-400 font-semibold">{percent}% Complete</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden ring-1 ring-slate-700/50 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 transition-all duration-500 shadow-sm"
                style={{ width: `${Math.max(5, percent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right 4 mini stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {/* Card 1 */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <Trophy className="w-5 h-5 text-amber-400 mb-1" />
            <div className="text-xl font-bold text-white">{streak}</div>
            <div className="text-[11px] text-slate-400 font-medium">Day Streak</div>
          </div>

          {/* Card 2 */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <Target className="w-5 h-5 text-emerald-400 mb-1" />
            <div className="text-xl font-bold text-white">{completedCount}/{totalCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">Tasks Done</div>
          </div>

          {/* Card 3 */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <Clock className="w-5 h-5 text-indigo-400 mb-1" />
            <div className="text-xl font-bold text-white">~{minutesEst}m</div>
            <div className="text-[11px] text-slate-400 font-medium">Practiced</div>
          </div>

          {/* Card 4 */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <BookOpen className="w-5 h-5 text-pink-400 mb-1" />
            <div className="text-xl font-bold text-white">{masteredWordsCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">Words Mastered</div>
          </div>
        </div>
      </div>
    </div>
  );
}
