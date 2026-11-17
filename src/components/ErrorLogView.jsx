import React, { useState } from 'react';
import {
  AlertCircle,
  Plus,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Calendar,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';
import { getTodayDateString } from '../utils/dateUtils';

export default function ErrorLogView({
  errorLog,
  currentWeek,
  onAddError,
  onEditError,
  onDeleteError
}) {
  const [selectedWeek, setSelectedWeek] = useState('all'); // 'all', 1, 2, 3, 4
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [date, setDate] = useState(getTodayDateString());
  const [week, setWeek] = useState(currentWeek);
  const [wrongSentence, setWrongSentence] = useState('');
  const [correctSentence, setCorrectSentence] = useState('');
  const [rule, setRule] = useState('');

  const openAddModal = () => {
    setEditingId(null);
    setDate(getTodayDateString());
    setWeek(currentWeek);
    setWrongSentence('');
    setCorrectSentence('');
    setRule('');
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setDate(item.date);
    setWeek(item.week);
    setWrongSentence(item.wrongSentence);
    setCorrectSentence(item.correctSentence);
    setRule(item.rule);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wrongSentence.trim() || !correctSentence.trim()) return;

    if (editingId) {
      onEditError(editingId, {
        date,
        week: Number(week),
        wrongSentence: wrongSentence.trim(),
        correctSentence: correctSentence.trim(),
        rule: rule.trim()
      });
    } else {
      const newEntry = {
        id: Date.now(),
        date,
        week: Number(week),
        wrongSentence: wrongSentence.trim(),
        correctSentence: correctSentence.trim(),
        rule: rule.trim()
      };
      onAddError(newEntry);
    }

    setShowModal(false);
  };

  const filteredErrors = errorLog.filter((item) => {
    const matchesWeek = selectedWeek === 'all' || item.week === Number(selectedWeek);
    const matchesSearch =
      item.wrongSentence.toLowerCase().includes(search.toLowerCase()) ||
      item.correctSentence.toLowerCase().includes(search.toLowerCase()) ||
      item.rule.toLowerCase().includes(search.toLowerCase());
    return matchesWeek && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Header Card */}
      <div className="card">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h2 className="card-title">
              <span>ভুলের লগ (Daily Error Log)</span>
            </h2>
            <div className="card-subtitle" style={{ marginBottom: 0 }}>
              স্পিকিং ও রাইটিংয়ের ভুলগুলো লিখে রাখুন এবং শনিবারের রিভিউতে স্থায়ীভাবে দূর করুন
            </div>
          </div>

          <button onClick={openAddModal} className="btn btn-primary">
            <Plus size={16} />
            <span>নতুন ভুল যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="ভুল বা ব্যাকরণ নিয়ম খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '34px' }}
          />
        </div>

        {/* Week Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <button
            onClick={() => setSelectedWeek('all')}
            className={`btn ${selectedWeek === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '4px 10px', fontSize: '0.75rem', height: '28px', border: 'none' }}
          >
            সব ({errorLog.length})
          </button>
          {[1, 2, 3, 4].map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w)}
              className={`btn ${selectedWeek === w ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '4px 10px', fontSize: '0.75rem', height: '28px', border: 'none' }}
            >
              সপ্তাহ {w}
            </button>
          ))}
        </div>
      </div>

      {/* Error Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredErrors.map((item) => (
          <div key={item.id} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pill-badge pill-week">
                  সপ্তাহ {item.week}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  {item.date}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={() => openEditModal(item)}
                  className="btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  title="Edit entry"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => onDeleteError(item.id)}
                  className="btn-icon"
                  style={{ width: '28px', height: '28px', color: 'var(--danger)' }}
                  title="Delete entry"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Wrong Sentence Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--danger-soft)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                marginBottom: '8px'
              }}
            >
              <XCircle size={16} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--danger-text)', textTransform: 'uppercase' }}>
                  Wrong (ভুল বাক্য):
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textDecoration: 'line-through' }}>
                  "{item.wrongSentence}"
                </div>
              </div>
            </div>

            {/* Correct Sentence Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--success-soft)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                marginBottom: '10px'
              }}
            >
              <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--success-text)', textTransform: 'uppercase' }}>
                  Correct (সঠিক বাক্য):
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  "{item.correctSentence}"
                </div>
              </div>
            </div>

            {/* Rule / Explanation */}
            {item.rule && (
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                  paddingTop: '6px',
                  borderTop: '1px dashed var(--border)'
                }}
              >
                <BookOpen size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>ব্যাকরণ নিয়ম:</strong> {item.rule}
                </span>
              </div>
            )}
          </div>
        ))}

        {filteredErrors.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
            এই ফিল্টারে কোনো ভুলের রেকর্ড পাওয়া যায়নি।
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
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
          <div className="card" style={{ maxWidth: '460px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {editingId ? 'ভুলের রেকর্ড সম্পাদনা করুন' : 'নতুন ভুলের রেকর্ড যোগ করুন'}
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              সঠিক ব্যাকরণ নিয়মটি লিখে রাখলে পরবর্তীতে একই ভুল এড়ানো সহজ হবে
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label className="form-label">তারিখ (Date)</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">সপ্তাহ (Week)</label>
                  <select
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="form-select"
                  >
                    <option value={1}>সপ্তাহ ১</option>
                    <option value={2}>সপ্তাহ ২</option>
                    <option value={3}>সপ্তাহ ৩</option>
                    <option value={4}>সপ্তাহ ৪</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Wrong Sentence (যা আপনি ভুল বলেছিলেন বা লিখেছিলেন) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. I am agree with you."
                  value={wrongSentence}
                  onChange={(e) => setWrongSentence(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Correct Sentence (সঠিক বাক্য) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. I agree with you."
                  value={correctSentence}
                  onChange={(e) => setCorrectSentence(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Grammar Rule / Note (ব্যাকরণ নিয়ম)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 'Agree' is a verb itself, no auxiliary 'am' needed."
                  value={rule}
                  onChange={(e) => setRule(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
