import React, { useState } from 'react';
import { Bot, Copy, Check, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { CONVERSATION_SCENARIOS } from '../data/initialData';

export default function AiPracticeCards() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyPrompt = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>🤖 AI Conversation Scenarios</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
            Practice With AI
          </span>
        </h3>
        <p className="text-xs text-slate-400">
          যেকোনো সিনারিওর প্রম্পট এক ক্লিকে কপি করে আপনার AI চ্যাটে পেস্ট করুন এবং রিয়েল-টাইম কনভারসেশন প্র্যাকটিস শুরু করুন
        </p>
      </div>

      {/* Grid of scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONVERSATION_SCENARIOS.map((scenario) => {
          const isCopied = copiedId === scenario.id;

          return (
            <div
              key={scenario.id}
              className="rounded-xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-violet-400" />
                    <span>{scenario.title}</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium">
                    {scenario.level}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  <span className="text-slate-400">Topic: </span>
                  {scenario.topic}
                </p>

                {/* Example sample questions */}
                <div className="mt-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Discussion Questions:
                  </div>
                  <ul className="space-y-1">
                    {scenario.questions.map((q, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-violet-400">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Ready-to-use Prompt Template
                </span>

                <button
                  onClick={() => handleCopyPrompt(scenario.id, scenario.promptTemplate)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/25'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy AI Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
