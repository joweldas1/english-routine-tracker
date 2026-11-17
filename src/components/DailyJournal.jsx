import React, { useState } from 'react';
import { PenTool, Copy, Check, Sparkles, Trash2, Calendar, FileCheck } from 'lucide-react';

export default function DailyJournal({ entries, onSaveEntry, onDeleteEntry }) {
  const [text, setText] = useState('');
  const [topicPrompt, setTopicPrompt] = useState('What was the most interesting part of your day?');
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleSave = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      content: text.trim(),
      wordCount
    };

    onSaveEntry(newEntry);
    setText('');
  };

  const handleCopyForAiReview = () => {
    if (!text.trim()) {
      alert('Please write something in your journal first!');
      return;
    }

    const prompt = `Hey! I wrote this daily English journal reflection. Please review it carefully:
1. Identify any grammatical, spelling, or punctuation mistakes.
2. Highlight any phrasing that sounds awkward to a native speaker.
3. Suggest a natural, polished version with advanced vocabulary.

My Journal Entry:
"${text.trim()}"`;

    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>✍️ Daily English Journal & Grammar Check</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Writing Practice
          </span>
        </h3>
        <p className="text-xs text-slate-400">
          প্রতিদিন ইংরেজিতে ৩-৫ টি বাক্য লিখুন। AI গ্রামার চেক প্রম্পটের মাধ্যমে সরাসরি ভুল শুধরে নিন
        </p>
      </div>

      {/* Write Box Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="text-slate-300 font-medium">Prompt Idea: {topicPrompt}</span>
          <span>{wordCount} Words</span>
        </div>

        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write in English here... (e.g. Today I started practicing English consistently. I learned new vocabulary and spoke using the speech tool...)"
          className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-600 resize-none leading-relaxed"
        />

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyForAiReview}
            disabled={!text.trim()}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 disabled:opacity-40'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied AI Grammar Review Prompt!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Copy for AI Grammar Check</span>
              </>
            )}
          </button>

          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            Save to Journal
          </button>
        </div>
      </div>

      {/* Past Journal Entries */}
      {entries.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-400" />
            <span>Saved Journal Entries ({entries.length})</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {entry.date}
                    </span>
                    <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                      {entry.wordCount} words
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {entry.content}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex justify-end">
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    title="Delete entry"
                    className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
