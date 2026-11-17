import React from 'react';

export default function ProgressRing({
  minutesDone = 0,
  totalMinutes = 80,
  size = 110,
  strokeWidth = 9
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedMinutes = Math.min(totalMinutes, Math.max(0, minutesDone));
  const percent = totalMinutes > 0 ? Math.round((clampedMinutes / totalMinutes) * 100) : 0;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="ring-visual" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="cyberProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
          <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />

        {/* Active glowing progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#cyberProgressGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter="url(#ringGlow)"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </svg>
      <div className="ring-center-text">
        <span className="ring-number">{clampedMinutes}m</span>
        <span className="ring-label">/{totalMinutes}m</span>
      </div>
    </div>
  );
}
