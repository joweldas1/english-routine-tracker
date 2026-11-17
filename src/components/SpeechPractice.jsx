import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, RefreshCw, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { speakText, getSpeechRecognition } from '../utils/speech';
import { DAILY_TONGUE_TWISTERS } from '../data/initialData';

const PRACTICE_SENTENCES = [
  "Consistency and daily speaking practice will dramatically boost my confidence.",
  "Could you please explain that from a different perspective?",
  "I am actively improving my English communication skills every single day.",
  "Never hesitate to speak up, because making mistakes is the best way to learn.",
  "In my opinion, continuous learning is essential for professional growth."
];

export default function SpeechPractice() {
  const [selectedText, setSelectedText] = useState(PRACTICE_SENTENCES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchScore, setMatchScore] = useState(null);
  const [twisterIndex, setTwisterIndex] = useState(0);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const recognition = getSpeechRecognition();
    if (recognition) {
      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        calculateAccuracy(currentTranscript, selectedText);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedText]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported on this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      setMatchScore(null);
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Recognition already started', err);
      }
    }
  };

  const calculateAccuracy = (spoken, target) => {
    if (!spoken || !target) return;
    const clean = (str) => str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim().split(/\s+/);
    const spokenWords = clean(spoken);
    const targetWords = clean(target);

    let matchCount = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) {
        matchCount++;
      }
    });

    const score = Math.round((matchCount / targetWords.length) * 100);
    setMatchScore(Math.min(100, score));
  };

  const nextSentence = () => {
    const random = PRACTICE_SENTENCES[Math.floor(Math.random() * PRACTICE_SENTENCES.length)];
    setSelectedText(random);
    setTranscript('');
    setMatchScore(null);
  };

  const nextTwister = () => {
    const nextIdx = (twisterIndex + 1) % DAILY_TONGUE_TWISTERS.length;
    setTwisterIndex(nextIdx);
    setSelectedText(DAILY_TONGUE_TWISTERS[nextIdx]);
    setTranscript('');
    setMatchScore(null);
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🎙️ Speech & Pronunciation Studio</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Interactive Voice AI
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            বাক্যটি শুনুন (Listen), মুখে বলুন (Speak) এবং আপনার উচ্চারণ একুরেসি যাচাই করুন
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={nextSentence}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 cursor-pointer transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Random Sentence</span>
          </button>
          <button
            onClick={nextTwister}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 text-xs font-medium border border-pink-500/30 cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tongue Twister</span>
          </button>
        </div>
      </div>

      {/* Main Speaking Practice Card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
          Target Sentence to Speak:
        </div>

        {/* Target Sentence Box */}
        <div className="text-xl sm:text-2xl font-bold text-white leading-relaxed p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span>"{selectedText}"</span>
          <button
            onClick={() => speakText(selectedText)}
            title="Listen to native pronunciation"
            className="self-end sm:self-center flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen Voice</span>
          </button>
        </div>

        {/* Record & Speak Section */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden">
          {/* Big Mic Button */}
          <button
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xl relative z-10 ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/30 shadow-rose-500/50'
                : 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white hover:scale-105 shadow-indigo-500/40 ring-4 ring-indigo-500/20'
            }`}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>

          <div className="mt-4 text-sm font-semibold text-white">
            {isRecording ? 'Listening... Speak now!' : 'Click Microphone & Speak'}
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            {isRecording
              ? 'আপনার স্পষ্ট ইংরেজিতে বাক্যটি সম্পূর্ণ পড়ুন'
              : 'মাইক্রোফোনে চাপ দিয়ে উপরের বাক্যটি জোরে জোরে পড়ুন'}
          </p>

          {/* Transcript / Spoken Output */}
          {transcript && (
            <div className="mt-6 w-full max-w-xl text-left bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>What we heard (Transcribed):</span>
                {matchScore !== null && (
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                      matchScore >= 80
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : matchScore >= 50
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    Match: {matchScore}%
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-200 italic">
                "{transcript}"
              </p>

              {matchScore !== null && (
                <div className="mt-3 text-xs flex items-center gap-1.5">
                  {matchScore >= 80 ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Excellent pronunciation! Keep this pace!
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> Good try! Click "Listen Voice" again and repeat.
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
