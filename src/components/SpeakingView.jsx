import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Shuffle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Circle,
  Volume2,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../data/routine';

export default function SpeakingView({
  interviewData,
  onUpdateInterviewAnswer,
  onTogglePracticed
}) {
  const [selectedQuestionId, setSelectedQuestionId] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showStarDetails, setShowStarDetails] = useState(true);

  // Speech Recognition state
  const [isSpeechRecording, setIsSpeechRecording] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const recognitionRef = useRef(null);

  const selectedQuestion =
    INTERVIEW_QUESTIONS.find((q) => q.id === selectedQuestionId) || INTERVIEW_QUESTIONS[0];

  // Load existing answers or empty defaults
  const currentAnswer = interviewData[selectedQuestionId] || {
    practiced: false,
    notes: '',
    star: { s: '', t: '', a: '', r: '' }
  };

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            // Play audio chime
            try {
              const AudioCtx = window.AudioContext || window.webkitAudioContext;
              if (AudioCtx) {
                const ctx = new AudioCtx();
                const osc = ctx.createOscillator();
                osc.connect(ctx.destination);
                osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                osc.start();
                osc.stop(ctx.currentTime + 0.4);
              }
            } catch (e) {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript + ' ';
        }
        setSpeechTranscript(text);
      };

      rec.onerror = () => setIsSpeechRecording(false);
      rec.onend = () => setIsSpeechRecording(false);
      recognitionRef.current = rec;
    }
  }, []);

  const toggleSpeechRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported on this browser. Recommended: Google Chrome or Microsoft Edge.');
      return;
    }

    if (isSpeechRecording) {
      recognitionRef.current.stop();
      setIsSpeechRecording(false);
    } else {
      setSpeechTranscript('');
      try {
        recognitionRef.current.start();
        setIsSpeechRecording(true);
      } catch (e) {}
    }
  };

  const speakQuestion = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'en-US';
      utt.rate = 0.9;
      window.speechSynthesis.speak(utt);
    }
  };

  const handlePickRandom = () => {
    const randomIdx = Math.floor(Math.random() * INTERVIEW_QUESTIONS.length);
    setSelectedQuestionId(INTERVIEW_QUESTIONS[randomIdx].id);
    setTimerSeconds(180);
    setIsTimerRunning(false);
    setSpeechTranscript('');
  };

  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setTimerSeconds(180);
  };

  const handleStarChange = (field, value) => {
    const updatedStar = {
      ...currentAnswer.star,
      [field]: value
    };
    onUpdateInterviewAnswer(selectedQuestionId, {
      ...currentAnswer,
      star: updatedStar
    });
  };

  const handleNotesChange = (value) => {
    onUpdateInterviewAnswer(selectedQuestionId, {
      ...currentAnswer,
      notes: value
    });
  };

  const timerMin = Math.floor(timerSeconds / 60);
  const timerSec = timerSeconds % 60;
  const formattedTimer = `${String(timerMin).padStart(2, '0')}:${String(timerSec).padStart(2, '0')}`;

  const practicedCount = INTERVIEW_QUESTIONS.filter(
    (q) => interviewData[q.id]?.practiced
  ).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Banner */}
      <div className="card">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h2 className="card-title">
              <span>ইন্টারভিউ ও স্পিকিং প্র্যাকটিস (Speaking & STAR)</span>
            </h2>
            <div className="card-subtitle" style={{ marginBottom: 0 }}>
              ৮টি প্রফেশনাল প্রশ্ন, ২-৩ মিনিটের স্পিকিং টাইমার ও STAR ফ্রেমওয়ার্ক
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pill-badge pill-week">
              {practicedCount}/৮ অনুশীলিত
            </span>
            <button onClick={handlePickRandom} className="btn btn-primary">
              <Shuffle size={14} />
              <span>র‍্যান্ডম প্রশ্ন (Random)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Question Selector Carousel / Badges */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {INTERVIEW_QUESTIONS.map((q) => {
          const isSelected = q.id === selectedQuestionId;
          const isDone = !!interviewData[q.id]?.practiced;

          return (
            <button
              key={q.id}
              onClick={() => {
                setSelectedQuestionId(q.id);
                setTimerSeconds(180);
                setIsTimerRunning(false);
                setSpeechTranscript('');
              }}
              className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {isDone ? <CheckCircle2 size={13} color="var(--success)" /> : <span>#{q.id}</span>}
              <span>প্রশ্ন {q.id}</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Question Card */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-badge">প্রশ্ন ০{selectedQuestion.id} • {selectedQuestion.category}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{selectedQuestion.suggestedDuration}</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px', lineHeight: 1.4 }}>
              "{selectedQuestion.question}"
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {selectedQuestion.banglaTitle}
            </div>
          </div>

          <button
            onClick={() => speakQuestion(selectedQuestion.question)}
            className="btn-icon"
            style={{ flexShrink: 0, background: 'var(--accent-soft)', color: 'var(--accent)' }}
            title="Listen to question pronunciation"
          >
            <Volume2 size={16} />
          </button>
        </div>

        {/* Key Talking Points */}
        <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '6px' }}>
            মূল কথাগুলো যা উত্তরে থাকা উচিত (Key Points to Cover):
          </div>
          <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {selectedQuestion.keyPoints.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>

        {/* Practiced Checkbox */}
        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onTogglePracticed(selectedQuestionId)}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
          >
            {currentAnswer.practiced ? (
              <>
                <CheckCircle2 size={16} color="var(--success)" />
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>অনুশীলন সম্পন্ন (Practiced)</span>
              </>
            ) : (
              <>
                <Circle size={16} />
                <span>অনুশীলন সম্পন্ন হিসেবে মার্ক করুন (Mark as Practiced)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2-3 Minute Speaking / Recording Timer Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--bg-secondary))' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="var(--accent)" />
              <span>২-৩ মিনিটের স্পিকিং টাইমার ও ভয়েস রেকর্ডার</span>
            </h4>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              টাইমার চালু করে না থেমে উচ্চস্বরে উত্তর দিন
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>
              {formattedTimer}
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`btn ${isTimerRunning ? 'btn-secondary' : 'btn-primary'}`}
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
              </button>

              <button onClick={handleTimerReset} className="btn btn-secondary" title="Reset timer">
                <RotateCcw size={14} />
              </button>

              {/* Optional live speech recognition toggle */}
              <button
                onClick={toggleSpeechRecording}
                className={`btn ${isSpeechRecording ? 'btn-danger' : 'btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                title="Transcribe speech in real-time"
              >
                {isSpeechRecording ? <MicOff size={14} /> : <Mic size={14} />}
                <span>{isSpeechRecording ? 'Stop Mic' : 'Live Mic'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live speech transcription */}
        {speechTranscript && (
          <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', border: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ব্রাউজার যা শুনছে (Live Transcribed):</div>
            <em>"{speechTranscript}"</em>
          </div>
        )}
      </div>

      {/* STAR Framework Template & Notes Card */}
      <div className="card">
        <div
          onClick={() => setShowStarDetails(!showStarDetails)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '10px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              STAR মেথড ড্রাফট (Situation, Task, Action, Result)
            </h3>
          </div>
          <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
            {showStarDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {showStarDetails && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: 'var(--accent)' }}>
                S — Situation (প্রেক্ষাপট ও পরিস্থিতি)
              </label>
              <textarea
                rows={2}
                placeholder="প্রজেক্ট বা সমস্যার প্রেক্ষাপট কী ছিল? (e.g. During an e-commerce project with tight deadline...)"
                value={currentAnswer.star?.s || ''}
                onChange={(e) => handleStarChange('s', e.target.value)}
                className="form-textarea"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: 'var(--warning)' }}>
                T — Task (আপনার নির্দিষ্ট দায়িত্ব)
              </label>
              <textarea
                rows={2}
                placeholder="সেই পরিস্থিতিতে আপনার সুনির্দিষ্ট দায়িত্ব কী ছিল? (e.g. My task was to diagnose the performance drop...)"
                value={currentAnswer.star?.t || ''}
                onChange={(e) => handleStarChange('t', e.target.value)}
                className="form-textarea"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: 'var(--accent)' }}>
                A — Action (আপনার নেওয়া কার্যকরী পদক্ষেপ)
              </label>
              <textarea
                rows={2}
                placeholder="সমস্যা সমাধানে আপনি কী কী পদক্ষেপ নিয়েছিলেন? (e.g. I refactored queries and optimized assets...)"
                value={currentAnswer.star?.a || ''}
                onChange={(e) => handleStarChange('a', e.target.value)}
                className="form-textarea"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: 'var(--success)' }}>
                R — Result (ফলাফল ও ইতিবাচক প্রভাব)
              </label>
              <textarea
                rows={2}
                placeholder="চূড়ান্ত ফলাফল কী হয়েছিল? (e.g. Page speed increased by 45% and client was satisfied...)"
                value={currentAnswer.star?.r || ''}
                onChange={(e) => handleStarChange('r', e.target.value)}
                className="form-textarea"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0, marginTop: '6px' }}>
              <label className="form-label">
                Additional Speaking Notes (অতিরিক্ত নোট বা পয়েন্ট)
              </label>
              <textarea
                rows={3}
                placeholder="আপনার উত্তরের অতিরিক্ত পয়েন্ট বা শব্দ লিখে রাখুন..."
                value={currentAnswer.notes || ''}
                onChange={(e) => handleNotesChange(e.target.value)}
                className="form-textarea"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
