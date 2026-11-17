import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, Clock } from 'lucide-react';

export default function CountdownTimer({ initialMinutes = 10, onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Play subtle web audio tone on timer completion
  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.warn('Audio feedback error', e);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            playBeep();
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, onComplete]);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(initialMinutes * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-secondary"
        style={{ padding: '3px 8px', fontSize: '0.72rem', height: '26px' }}
        title="Open countdown timer for this task"
      >
        <Clock size={12} />
        <span>টাইমার ({initialMinutes}m)</span>
      </button>
    );
  }

  return (
    <div className="task-timer-box">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="timer-digits">{formattedTime}</span>
        {secondsLeft === 0 && (
          <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
            সময় শেষ! (Done!)
          </span>
        )}
      </div>

      <div className="timer-controls">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'}`}
          style={{ padding: '3px 9px', fontSize: '0.72rem', height: '26px' }}
        >
          {isRunning ? <Pause size={12} /> : <Play size={12} />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button
          onClick={handleReset}
          className="btn btn-secondary"
          style={{ padding: '3px 8px', fontSize: '0.72rem', height: '26px' }}
          title="Reset timer"
        >
          <RotateCcw size={12} />
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setIsOpen(false);
          }}
          className="btn-icon"
          style={{ width: '26px', height: '26px', fontSize: '0.7rem' }}
          title="Close timer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
