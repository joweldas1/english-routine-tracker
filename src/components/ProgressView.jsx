import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  RefreshCw,
  Save,
  CheckCircle,
  Award,
  Sparkles
} from 'lucide-react';
import { TOTAL_DAILY_MINUTES } from '../data/routine';

export default function ProgressView({
  progressTracker,
  vocabulary,
  dailyLog,
  errorLog,
  onUpdateProgressTracker
}) {
  const [trackerData, setTrackerData] = useState(progressTracker);
  const [saveNotification, setSaveNotification] = useState(false);

  // Auto-fill computation based on live app data
  const handleAutoFill = () => {
    // Count vocabulary total
    const totalVocab = vocabulary.length;

    // Approximate days completed across weeks
    const completedDates = Object.entries(dailyLog).filter(
      ([_, rec]) => rec && rec.isDayComplete
    ).length;

    const totalErrors = errorLog.length;

    const updated = trackerData.map((row) => {
      // For week 1 or active week
      if (row.week === 1) {
        return {
          ...row,
          newWords: totalVocab > 0 ? totalVocab : 15,
          speakingMinutes: Math.max(row.speakingMinutes, completedDates * 15),
          completedDays: Math.min(5, Math.max(row.completedDays, completedDates)),
          repeatedMistakes: totalErrors
        };
      }
      return row;
    });

    setTrackerData(updated);
    onUpdateProgressTracker(updated);
    showNotice();
  };

  const handleCellChange = (weekNum, field, value) => {
    const updated = trackerData.map((row) => {
      if (row.week === weekNum) {
        return {
          ...row,
          [field]: field === 'notes' ? value : Number(value) || 0
        };
      }
      return row;
    });
    setTrackerData(updated);
  };

  const handleSaveAll = () => {
    onUpdateProgressTracker(trackerData);
    showNotice();
  };

  const showNotice = () => {
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2500);
  };

  // SVG Chart Dimensions
  const chartHeight = 160;
  const chartWidth = 320;
  const maxDays = 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Banner */}
      <div className="card">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h2 className="card-title">
              <span>সাপ্তাহিক অগ্রগতি ট্র্যাকার (Section 8 Progress Tracker)</span>
            </h2>
            <div className="card-subtitle" style={{ marginBottom: 0 }}>
              প্রতি সপ্তাহের নতুন শব্দ, স্পিকিং সময়, সম্পন্ন দিন ও ভুলের পরিসংখ্যান
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleAutoFill}
              className="btn btn-secondary"
              title="Auto-fill numbers from app activity"
            >
              <RefreshCw size={14} />
              <span>ডাটা থেকে অটো-ফিল</span>
            </button>
            <button
              onClick={handleSaveAll}
              className="btn btn-primary"
            >
              <Save size={14} />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>

        {saveNotification && (
          <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} />
            <span>অগ্রগতির তথ্য সফলভাবে সংরক্ষিত হয়েছে!</span>
          </div>
        )}
      </div>

      {/* Editable Table */}
      <div className="tracker-table-container">
        <table className="tracker-table">
          <thead>
            <tr>
              <th>সপ্তাহ (Week)</th>
              <th>নতুন শব্দ (Words)</th>
              <th>স্পিকিং মিনিট (Speaking Min)</th>
              <th>রুটিন সম্পন্ন দিন (/৫)</th>
              <th>পুনরাবৃত্ত ভুল (Mistakes)</th>
              <th>মন্তব্য ও প্রতিফলন (Notes)</th>
            </tr>
          </thead>
          <tbody>
            {trackerData.map((row) => (
              <tr key={row.week}>
                <td style={{ fontWeight: 700, color: 'var(--accent)' }}>
                  সপ্তাহ 0{row.week}
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={row.newWords}
                    onChange={(e) => handleCellChange(row.week, 'newWords', e.target.value)}
                    className="form-input"
                    style={{ width: '75px', padding: '4px 8px', fontSize: '0.82rem' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={row.speakingMinutes}
                    onChange={(e) => handleCellChange(row.week, 'speakingMinutes', e.target.value)}
                    className="form-input"
                    style={{ width: '85px', padding: '4px 8px', fontSize: '0.82rem' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={row.completedDays}
                    onChange={(e) => handleCellChange(row.week, 'completedDays', e.target.value)}
                    className="form-input"
                    style={{ width: '65px', padding: '4px 8px', fontSize: '0.82rem' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={row.repeatedMistakes}
                    onChange={(e) => handleCellChange(row.week, 'repeatedMistakes', e.target.value)}
                    className="form-input"
                    style={{ width: '70px', padding: '4px 8px', fontSize: '0.82rem' }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.notes || ''}
                    placeholder="সপ্তাহের অভিজ্ঞতা..."
                    onChange={(e) => handleCellChange(row.week, 'notes', e.target.value)}
                    className="form-input"
                    style={{ minWidth: '160px', padding: '4px 8px', fontSize: '0.82rem' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pure SVG Charts (No heavy chart library) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {/* Chart 1: Routine Days Completed (Out of 5) */}
        <div className="card chart-card">
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={16} color="var(--accent)" />
            <span>সাপ্তাহিক রুটিন সম্পন্ন দিন (Days Completed / 5)</span>
          </h4>

          <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: '10px', borderBottom: '2px solid var(--border)' }}>
            {trackerData.map((d) => {
              const heightPercent = Math.min(100, Math.round((d.completedDays / 5) * 100));

              return (
                <div key={d.week} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)' }}>
                    {d.completedDays} দিন
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: `${Math.max(10, heightPercent)}%`,
                      backgroundColor: 'var(--accent)',
                      borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                      transition: 'height 0.3s ease'
                    }}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    সপ্তাহ {d.week}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Speaking Minutes */}
        <div className="card chart-card">
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} color="var(--success)" />
            <span>সাপ্তাহিক স্পিকিং মিনিট (Speaking Minutes)</span>
          </h4>

          <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: '10px', borderBottom: '2px solid var(--border)' }}>
            {trackerData.map((d) => {
              // Assume 75 min is 100% target for the week
              const target = 75;
              const heightPercent = Math.min(100, Math.round((d.speakingMinutes / target) * 100));

              return (
                <div key={d.week} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--success)' }}>
                    {d.speakingMinutes}m
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: `${Math.max(10, heightPercent)}%`,
                      backgroundColor: 'var(--success)',
                      borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                      transition: 'height 0.3s ease'
                    }}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    সপ্তাহ {d.week}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
