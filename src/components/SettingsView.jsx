import React, { useRef, useState } from 'react';
import {
  Settings,
  Calendar,
  Sun,
  Moon,
  Laptop,
  Download,
  Upload,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  User,
  Shield,
  Trash2,
  Cpu,
  Database
} from 'lucide-react';
import { USER_NAME } from '../data/routine';

export default function SettingsView({
  startDate,
  onUpdateStartDate,
  theme,
  onUpdateTheme,
  onExportJSON,
  onImportJSON,
  onOpenTotalReset
}) {
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await onImportJSON(file);
      setImportStatus({ success: true, message: 'ডাটা সফলভাবে রিস্টোর হয়েছে!' });
      setTimeout(() => setImportStatus(null), 3000);
    } catch (err) {
      setImportStatus({ success: false, message: 'ইমপোর্ট ব্যর্থ: ' + err.message });
      setTimeout(() => setImportStatus(null), 4000);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div className="card">
        <h2 className="card-title">
          <span>সেটিংস ও কন্ট্রোল প্যানেল (Control Center)</span>
        </h2>
        <div className="card-subtitle">
          শুরুর তারিখ, থিম মোড এবং সম্পূর্ণ ডাটা ব্যাকআপ, রিস্টোর ও টোটাল রিসেট সুবিধা
        </div>
      </div>

      {/* 1. Start Date Setting */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Calendar size={18} color="var(--accent)" />
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            রুটিন শুরুর তারিখ (Routine Start Date)
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          এই তারিখের ওপর ভিত্তি করে অ্যাপটি স্বয়ংক্রিয়ভাবে চলতি সপ্তাহ (সপ্তাহ ১ থেকে ৪) গণনা করে।
        </p>

        <div style={{ maxWidth: '280px' }}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onUpdateStartDate(e.target.value)}
            className="form-input"
            style={{ fontFamily: 'var(--font-mono)' }}
          />
        </div>
      </div>

      {/* 2. Theme Mode Setting */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sun size={18} color="var(--warning)" />
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            ইন্টারফেস থিম (Futuristic Appearance)
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          আপনার পছন্দমতো সাইবার ডার্ক, লাইট ল্যাব অথবা সিস্টেম প্রিফারেন্স নির্বাচন করুন।
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onUpdateTheme('dark')}
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Moon size={15} />
            <span>Cyber Dark</span>
          </button>

          <button
            onClick={() => onUpdateTheme('light')}
            className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Sun size={15} />
            <span>Clean Light</span>
          </button>

          <button
            onClick={() => onUpdateTheme('system')}
            className={`btn ${theme === 'system' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Laptop size={15} />
            <span>System Auto</span>
          </button>
        </div>
      </div>

      {/* 3. Backup & Restore (JSON Export / Import) */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Database size={18} color="var(--cyan)" />
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            ডাটা ব্যাকআপ ও রিস্টোর (JSON Sync)
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          ১০০% লোকাল স্টোরেজ। আপনার সমস্ত ডাটা একটি JSON ফাইলে সেভ করে রাখতে পারেন এবং যেকোনো সময় যেকোনো ব্রাউজারে রিস্টোর করতে পারেন।
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={onExportJSON} className="btn btn-primary">
            <Download size={15} />
            <span>JSON ব্যাকআপ ডাউনলোড করুন</span>
          </button>

          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="btn btn-secondary"
          >
            <Upload size={15} />
            <span>JSON ব্যাকআপ রিস্টোর করুন</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {importStatus && (
          <div
            style={{
              marginTop: '12px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: importStatus.success ? 'var(--success-soft)' : 'var(--danger-soft)',
              color: importStatus.success ? 'var(--success-text)' : 'var(--danger-text)'
            }}
          >
            {importStatus.message}
          </div>
        )}
      </div>

      {/* 4. Total Factory Reset (DANGER ZONE) */}
      <div
        className="card"
        style={{
          border: '1px solid rgba(239, 68, 68, 0.3)',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), var(--bg-card))'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <AlertTriangle size={18} color="var(--danger)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--danger)', letterSpacing: '-0.01em' }}>
            সম্পূর্ণ ফ্যাক্টরি রিসেট (Total Factory Reset)
          </h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
          আপনার সব শব্দভাণ্ডার, ভুলের লগ, স্ট্রিক ও প্রগ্রেস ডাটা সম্পূর্ণ রিসেট করে একদম নতুন করে শুরু করতে চান?
        </p>

        <button
          onClick={onOpenTotalReset}
          className="btn btn-danger"
          style={{ padding: '9px 18px', fontWeight: 700 }}
        >
          <RotateCcw size={16} />
          <span>টোটাল রিসেট কনসোল খুলুন (Open Reset Console)</span>
        </button>
      </div>

      {/* Profile & Machine Spec */}
      <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <Cpu size={16} color="var(--accent)" />
            <span>সিস্টেম ইউজার: <strong>{USER_NAME}</strong> • English Routine Tracker v2.0 (Futuristic Edition)</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            LOCAL_STORAGE_PERSISTED: TRUE
          </span>
        </div>
      </div>
    </div>
  );
}
