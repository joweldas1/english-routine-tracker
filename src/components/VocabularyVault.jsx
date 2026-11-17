import React, { useState } from 'react';
import { BookOpen, Search, Volume2, CheckCircle2, Circle, Plus, Trash2, Tag } from 'lucide-react';
import { speakText } from '../utils/speech';

export default function VocabularyVault({ words, onToggleMastered, onAddWord, onDeleteWord }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // New word state
  const [newWord, setNewWord] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newBangla, setNewBangla] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newCat, setNewCat] = useState('Speaking');

  const categories = ['All', ...new Set(words.map((w) => w.category))];

  const filteredWords = words.filter((w) => {
    const matchesSearch =
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.bangla.toLowerCase().includes(search.toLowerCase()) ||
      w.meaning.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || w.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateWord = (e) => {
    e.preventDefault();
    if (!newWord.trim() || !newBangla.trim()) return;

    const item = {
      id: Date.now(),
      word: newWord.trim(),
      phonetic: newPhonetic.trim() || '/.../',
      bangla: newBangla.trim(),
      meaning: newMeaning.trim() || 'Custom vocabulary word',
      example: newExample.trim() || `I practiced using the word "${newWord}" in a sentence.`,
      category: newCat,
      mastered: false,
      isCustom: true
    };

    onAddWord(item);
    setNewWord('');
    setNewPhonetic('');
    setNewBangla('');
    setNewMeaning('');
    setNewExample('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📚 Daily Vocabulary Vault</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {words.filter(w => w.mastered).length}/{words.length} Mastered
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            নতুন শব্দ, উচ্চারণ ও বাংলা অর্থ শিখুন এবং স্পিকার আইকনে ক্লিক করে শুনুন
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 cursor-pointer transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Word</span>
        </button>
      </div>

      {/* Add Word Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreateWord}
          className="rounded-xl bg-slate-900 border border-indigo-500/30 p-5 space-y-3 shadow-xl"
        >
          <div className="text-sm font-bold text-white mb-2">নতুন শব্দ যোগ করুন</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">English Word</label>
              <input
                type="text"
                required
                placeholder="e.g. Resilient"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">বাংলা অর্থ</label>
              <input
                type="text"
                required
                placeholder="e.g. ঘুরে দাঁড়াতে সক্ষম"
                value={newBangla}
                onChange={(e) => setNewBangla(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Category</label>
              <select
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Speaking">Speaking</option>
                <option value="Communication">Communication</option>
                <option value="Fluency">Fluency</option>
                <option value="Mindset">Mindset</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Example Sentence</label>
            <input
              type="text"
              placeholder="e.g. He is resilient in the face of difficulties."
              value={newExample}
              onChange={(e) => setNewExample(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-md"
            >
              Save Word
            </button>
          </div>
        </form>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search word, meaning, bangla..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 placeholder-slate-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredWords.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
              item.mastered
                ? 'bg-slate-900/50 border-emerald-500/30'
                : 'bg-slate-900 hover:bg-slate-850 border-slate-800 shadow-md'
            }`}
          >
            <div>
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white tracking-wide">
                      {item.word}
                    </h4>
                    <button
                      onClick={() => speakText(item.word)}
                      title="Pronounce word"
                      className="p-1 rounded-md text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 cursor-pointer transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {item.phonetic}
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700/60 font-medium">
                  {item.category}
                </span>
              </div>

              {/* Bangla translation */}
              <div className="mt-2.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                বাংলা: {item.bangla}
              </div>

              {/* English Meaning */}
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {item.meaning}
              </p>

              {/* Example sentence */}
              {item.example && (
                <div className="mt-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 italic">
                  "{item.example}"
                </div>
              )}
            </div>

            {/* Bottom action */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
              <button
                onClick={() => onToggleMastered(item.id)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-all cursor-pointer ${
                  item.mastered
                    ? 'text-emerald-400 hover:text-emerald-300'
                    : 'text-slate-400 hover:text-indigo-400'
                }`}
              >
                {item.mastered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 fill-emerald-400/20" />
                    <span>Mastered</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Mark as Mastered</span>
                  </>
                )}
              </button>

              {item.isCustom && (
                <button
                  onClick={() => onDeleteWord(item.id)}
                  title="Delete word"
                  className="text-slate-500 hover:text-rose-400 text-xs p-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
