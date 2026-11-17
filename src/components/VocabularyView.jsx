import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  Circle,
  Volume2,
  Trash2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { getTodayDateString } from '../utils/dateUtils';

export default function VocabularyView({
  vocabulary,
  onAddWord,
  onToggleReviewed,
  onDeleteWord
}) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, reviewed
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [sentence, setSentence] = useState('');

  const todayStr = getTodayDateString();

  // Daily count of new words added today
  const wordsAddedToday = vocabulary.filter((w) => w.date === todayStr).length;
  const reviewedCount = vocabulary.filter((w) => w.reviewed).length;

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCreateWord = (e) => {
    e.preventDefault();
    if (!word.trim() || !meaning.trim()) return;

    const newEntry = {
      id: Date.now(),
      word: word.trim(),
      meaning: meaning.trim(),
      sentence: sentence.trim() || `I practiced using the word "${word.trim()}" in daily conversation.`,
      date: todayStr,
      reviewed: false
    };

    onAddWord(newEntry);
    setWord('');
    setMeaning('');
    setSentence('');
    setShowAddModal(false);
  };

  const filteredWords = vocabulary.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(search.toLowerCase()) ||
      item.meaning.toLowerCase().includes(search.toLowerCase()) ||
      item.sentence.toLowerCase().includes(search.toLowerCase());

    if (filter === 'pending') return matchesSearch && !item.reviewed;
    if (filter === 'reviewed') return matchesSearch && item.reviewed;
    return matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Header Card */}
      <div className="card">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h2 className="card-title">
              <span>শব্দভাণ্ডার (Vocabulary Vault)</span>
            </h2>
            <div className="card-subtitle" style={{ marginBottom: 0 }}>
              প্রাসঙ্গিক শব্দ শিখুন, নিজের বাক্য তৈরি করুন এবং উচ্চারণ শুনুন
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>নতুন শব্দ যোগ করুন</span>
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginTop: '16px' }}>
          <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>আজকের নতুন শব্দ (Today)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>{wordsAddedToday} টি</div>
          </div>

          <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>মোট শব্দ (Total Words)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{vocabulary.length} টি</div>
          </div>

          <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>রিভিউ সম্পন্ন (Reviewed)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success)' }}>{reviewedCount} টি</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="শব্দ বা অর্থ খুঁজুন (Search vocabulary)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '34px' }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          {['all', 'pending', 'reviewed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '4px 10px', fontSize: '0.75rem', height: '28px', border: 'none' }}
            >
              {f === 'all' && 'সবগুলো'}
              {f === 'pending' && 'রিভিউ বাকি'}
              {f === 'reviewed' && 'রিভিউড'}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
        {filteredWords.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: item.reviewed ? '4px solid var(--success)' : '4px solid var(--warning)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.word}
                    </h3>
                    <button
                      onClick={() => handleSpeak(item.word)}
                      className="btn-icon"
                      style={{ width: '26px', height: '26px', border: 'none', background: 'var(--accent-soft)', color: 'var(--accent)' }}
                      title="Pronounce with audio"
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Calendar size={11} />
                    <span>{item.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteWord(item.id)}
                  className="btn-icon"
                  style={{ width: '26px', height: '26px', border: 'none', color: 'var(--text-muted)' }}
                  title="Delete word"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Meaning */}
              <div style={{ marginTop: '10px', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong>অর্থ:</strong> {item.meaning}
              </div>

              {/* Sentence */}
              {item.sentence && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    fontStyle: 'italic'
                  }}
                >
                  "{item.sentence}"
                </div>
              )}
            </div>

            {/* Reviewed Toggle Action */}
            <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={() => onToggleReviewed(item.id)}
                className="btn btn-secondary"
                style={{ padding: '3px 8px', fontSize: '0.72rem', height: '26px', color: item.reviewed ? 'var(--success)' : 'var(--text-muted)' }}
              >
                {item.reviewed ? (
                  <>
                    <CheckCircle2 size={14} color="var(--success)" />
                    <span>রিভিউ সম্পন্ন (Reviewed)</span>
                  </>
                ) : (
                  <>
                    <Circle size={14} />
                    <span>রিভিউ বাকি (Mark Reviewed)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
          কোনো শব্দ খুঁজে পাওয়া যায়নি। নতুন শব্দ যুক্ত করতে উপরের বাটনে চাপুন।
        </div>
      )}

      {/* Add Word Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div className="card" style={{ maxWidth: '440px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              নতুন শব্দ যোগ করুন (Add Vocabulary)
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              আজকের শেখা নতুন ইংরেজি শব্দ, এর অর্থ এবং নিজের ভাষায় একটি বাক্য লিখুন
            </p>

            <form onSubmit={handleCreateWord}>
              <div className="form-group">
                <label className="form-label">English Word *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scrutinize"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  className="form-input"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">বাংলা অর্থ ও ইংরেজি ডেফিনিশন *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. খুব খুঁটিয়ে বা গভীরভাবে পরীক্ষা করা (examine closely)"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">My Own Sentence (নিজের তৈরি বাক্য)</label>
                <textarea
                  rows={3}
                  placeholder="e.g. The client scrutinized our code before deployment."
                  value={sentence}
                  onChange={(e) => setSentence(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary">
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
