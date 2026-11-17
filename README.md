# 🎯 English Routine Tracker (for Jowel)

A mobile-first, distraction-free web app designed for **Jowel** to track and master the **4-Week Spoken English Routine** (80 minutes daily).

Built with **React 19 + Vite** and pure **plain CSS** (CSS Variables), zero external UI frameworks, fast and lightweight. Persists 100% locally in `localStorage` with offline capability and JSON Backup/Restore.

---

## 🚀 Live Demo & Deployment
- **Live Vercel URL:** [https://eng-bay.vercel.app](https://eng-bay.vercel.app)
- **Alternate URL:** [https://eng-kfi4baedd-jowel-das-projects.vercel.app](https://eng-kfi4baedd-jowel-das-projects.vercel.app)
- **GitHub Repository:** [https://github.com/joweldas1/english-routine-tracker](https://github.com/joweldas1/english-routine-tracker)

---

## ✨ Features

1. **📅 Today (Home Screen):**
   - Automatically computes current week (Week 1 to 4) based on your custom start date.
   - **Mon–Fri:** Checklist of the 6 daily tasks totaling **80 minutes**:
     - 📖 **Vocabulary (10 min):** Learn 3–5 words in context + create original sentences.
     - ✍️ **Grammar (15 min):** Focused study of weekly grammar topic + 3 practice sentences.
     - 🎧 **Listening (15 min):** Active listening to native tech podcasts / talks.
     - 🗣️ **Shadowing (15 min):** Sentence-by-sentence simultaneous mimicry of native audio.
     - 🎙️ **Speaking (15 min):** 2–3 min impromptu speaking on interview questions.
     - 📝 **Writing (10 min):** Daily 5–8 sentence micro-journal reflection.
   - **Optional Countdown Timers:** Dedicated timer per task with Web Audio completion chime.
   - **SVG Progress Ring:** Shows minutes completed out of 80 with animated circular SVG.
   - **Streak Counter:** Tracks unbroken daily routine streaks and weekly completion (out of 5 days).
   - **Saturday Review View:** Error log inspection, vocabulary review, and 45-min mock interview.
   - **Sunday Rest View:** Light listening (movies/podcasts) and mental recharge.
   - **5 Core Rules:** Built-in guidance for thinking directly in English and consistency.

2. **🗺️ 4-Week Plan (Table 3):**
   - **Week 1:** Tenses Mastery (Present, Past, Present Perfect) • Work & Dev Workflow • Fluency & Self-Intro.
   - **Week 2:** Modal Verbs & Polite Requests • Client Collaboration & Deadlines • Explaining Constraints.
   - **Week 3:** Passive Voice & Complex Connectors • Architecture & Troubleshooting • STAR Method Storytelling.
   - **Week 4:** Conditionals & Business Idioms • Career Goals & Value Proposition • Full 45-min Mock Interview.
   - Highlights the active week based on your start date.

3. **📚 Vocabulary Vault:**
   - Add new words with Bengali meaning and your own sentence.
   - Daily count of words added today.
   - Audio pronunciation via Web Speech API.
   - Mark as reviewed checkbox & search filter.

4. **⚠️ Daily Error Log:**
   - Record mistakes made during speaking or writing.
   - Fields: Date, Week, Wrong Sentence, Correct Sentence, Grammar Rule.
   - Filter by week (Weeks 1–4) or search.

5. **🎙️ Speaking & STAR Interview Practice:**
   - **8 Core Interview Questions:** Tailored for a Web / WordPress Developer.
   - **Random Question Picker:** Shuffle questions for impromptu speaking.
   - **2–3 Minute Countdown Timer:** Practice pacing without pauses.
   - **STAR Method Framework:** Structured fields for Situation, Task, Action, and Result.
   - **Live Voice Mic:** Browser Speech-to-Text transcription.
   - Practiced checkbox per question.

6. **📊 Section 8 Progress Tracker:**
   - Weekly summary table (New words, speaking minutes, completed days, repeated mistakes).
   - Auto-fill from live app activity + full manual editing.
   - Pure SVG visual bar charts (no heavy chart libraries).

7. **⚙️ Settings & Backup:**
   - Customizable start date (auto-recalculates week).
   - Light / Dark / System theme selector.
   - **JSON Export / Import:** Full backup download and instant restore.
   - Reset data button with confirmation.

---

## 🛠️ Tech Stack & Typography
- **Framework:** React 19 + Vite
- **Styling:** Plain CSS with CSS Variables (Responsive, accessible, mobile-first bottom tab bar)
- **Fonts:** Hind Siliguri (Bengali) + Inter (English) loaded via Google Fonts
- **Storage:** Browser `localStorage` (Zero backend, zero tracking)

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🚢 Vercel Deployment Settings
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
