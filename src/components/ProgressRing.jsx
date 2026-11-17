import React from 'react';

export default function ProgressRing({
  minutesDone = 0,
  totalMinutes = 80,
  size = 100,
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
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        {/* Animated Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.4s ease'
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
