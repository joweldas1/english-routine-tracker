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
  Shield
} from 'lucide-react';
import { USER_NAME } from '../data/routine';

export default function SettingsView({
  startDate,
  onUpdateStartDate,
  theme,
  onUpdateTheme,
  onExportJSON,
  onImportJSON,
  onResetAllData
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

    // Reset input value
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResetClick = () => {
    const confirmText = window.confirm(
      'আপনি কি নিশ্চিত যে সমস্ত ডাটা রিসেট করতে চান? আপনার সংরক্ষিত শব্দভাণ্ডার, ভুলের লগ এবং রুটিন অগ্রগতি মুছে যাবে।'
    );
    if (confirmText) {
      onResetAllData();
      alert('সকল ডাটা সফলভাবে রিসেট করা হয়েছে।');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div className="card">
        <h2 className="card-title">
          <span>সেটিংস ও ব্যাকআপ (Settings & Backup)</span>
        </h2>
        <div className="card-subtitle">
          শুরুর তারিখ, থিম মোড এবং সম্পূর্ণ ডাটা ব্যাকআপ বা রিস্টোর করার সুবিধা
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
          এই তারিখের ওপর ভিত্তি করে অ্যাপটি স্বয়ংক্রিয়ভাবে চলতি সপ্তাহ (সপ্তাহ ১ থেকে ৪) গণনা করবে।
        </p>

        <div style={{ maxWidth: '280px' }}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onUpdateStartDate(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {/* 2. Theme Mode Setting */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sun size={18} color="var(--warning)" />
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            অ্যাপের থিম মোড (App Theme)
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          আপনার পছন্দমতো লাইট, ডার্ক অথবা সিস্টেম প্রেফারেন্স নির্বাচন করুন।
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onUpdateTheme('light')}
            className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Sun size={15} />
            <span>Light Theme</span>
          </button>

          <button
            onClick={() => onUpdateTheme('dark')}
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Moon size={15} />
            <span>Dark Theme</span>
          </button>

          <button
            onClick={() => onUpdateTheme('system')}
            className={`btn ${theme === 'system' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Laptop size={15} />
            <span>System Default</span>
          </button>
        </div>
      </div>

      {/* 3. Backup & Restore (JSON Export / Import) */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Download size={18} color="var(--success)" />
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            ডাটা ব্যাকআপ ও রিস্টোর (Export / Import JSON)
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          কোনো সার্ভার বা লগইনের প্রয়োজন নেই। আপনার সমস্ত ডাটা একটি JSON ফাইলে ডাউনলোড করে রাখতে পারেন এবং যেকোনো ডিভাইসে আপলোড করে রিস্টোর করতে পারেন।
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

      {/* 4. Danger Zone: Reset Data */}
      <div className="card" style={{ border: '1px solid var(--danger-soft)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <AlertTriangle size={18} color="var(--danger)" />
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--danger)' }}>
            ডাটা রিসেট (Danger Zone)
          </h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          সব ডাটা মুছে ফেলে অ্যাপটিকে প্রারম্ভিক অবস্থায় ফিরিয়ে নিতে চান? (এই কাজ অপরিবর্তনীয়)
        </p>

        <button onClick={handleResetClick} className="btn btn-danger">
          <RotateCcw size={15} />
          <span>সকল ডাটা রিসেট করুন (Reset Data)</span>
        </button>
      </div>

      {/* Profile & Routine Meta */}
      <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <User size={15} />
          <span>ব্যবহারকারী: <strong>{USER_NAME}</strong> (Front End / WordPress Developer)</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          English Routine Tracker • 4-Week Comprehensive Spoken English Routine
        </div>
      </div>
    </div>
  );
}
