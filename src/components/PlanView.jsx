import React from 'react';
import { Award, CheckCircle, BookOpen, Mic, Compass } from 'lucide-react';
import { WEEKS_PLAN } from '../data/routine';

export default function PlanView({ currentWeek }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="card">
        <h2 className="card-title">
          <span>৪-সপ্তাহের ইংলিশ রোডম্যাপ (4-Week English Mastery Plan)</span>
        </h2>
        <div className="card-subtitle">
          প্রতি সপ্তাহে ব্যাকরণ, বিশেষ শব্দভাণ্ডার এবং স্পিকিং লক্ষ্যের সুনির্দিষ্ট বণ্টন (Table 3)
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {WEEKS_PLAN.map((item) => {
          const isCurrent = item.week === currentWeek;

          return (
            <div
              key={item.week}
              className="card"
              style={{
                border: isCurrent ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: isCurrent
                  ? 'linear-gradient(135deg, var(--bg-card), var(--bg-secondary))'
                  : 'var(--bg-card)',
                boxShadow: isCurrent ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                position: 'relative'
              }}
            >
              {/* Current week indicator badge */}
              {isCurrent && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'var(--accent)',
                    color: '#fff',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  <Award size={13} />
                  <span>চলতি সপ্তাহ (Current Week)</span>
                </div>
              )}

              <div style={{ marginBottom: '12px', paddingRight: isCurrent ? '130px' : '0' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isCurrent ? 'var(--accent)' : 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  WEEK 0{item.week}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {item.banglaTitle}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {item.title}
                </div>
              </div>

              {/* 3 Pillars Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {/* 1. Grammar */}
                <div
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <BookOpen size={15} color="var(--accent)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                      Grammar Focus
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.grammarFocus}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {item.grammarFocusBn}
                  </div>
                </div>

                {/* 2. Vocabulary */}
                <div
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Compass size={15} color="var(--warning)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase' }}>
                      Vocabulary Theme
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.vocabTheme}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {item.vocabThemeBn}
                  </div>
                </div>

                {/* 3. Speaking Goal */}
                <div
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Mic size={15} color="var(--success)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase' }}>
                      Speaking Goal
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.speakingGoal}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {item.speakingGoalBn}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
