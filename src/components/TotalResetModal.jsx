import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, ShieldAlert } from 'lucide-react';

export default function TotalResetModal({ isOpen, onClose, onConfirmReset }) {
  const [confirmInput, setConfirmInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const isConfirmed = confirmInput.trim().toUpperCase() === 'RESET';

  const handleExecute = () => {
    if (!isConfirmed) return;
    setIsProcessing(true);
    setTimeout(() => {
      onConfirmReset('clean');
      setIsProcessing(false);
      setConfirmInput('');
      onClose();
    }, 300);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(5, 8, 16, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '460px',
          width: '100%',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          background: 'linear-gradient(145deg, var(--bg-card), var(--bg-secondary))',
          boxShadow: '0 20px 50px -10px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(239, 68, 68, 0.2)',
          position: 'relative',
          padding: '24px',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        {/* Glow ambient circle */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--danger)',
                boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)'
              }}
            >
              <ShieldAlert size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--danger)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
                // DANGER ZONE • FACTORY RESET
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                টোটাল ফ্যাক্টরি রিসেট (Total Reset)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)' }}
            title="বাতিল করুন"
          >
            <X size={16} />
          </button>
        </div>

        {/* Warning Body */}
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
          আপনার সমস্ত স্ট্রিক, টাস্ক ট্র্যাকিং, শব্দভাণ্ডার ও ভুলের লগ সম্পূর্ণ মুছে একদম শূন্য (0) থেকে ফ্রেশ শুরু হবে। কোনো ডামি ডাটা থাকবে না।
        </p>

        {/* Confirmation Input Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
            নিশ্চিত করতে নিচে <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--danger)', fontWeight: 800 }}>RESET</span> টাইপ করুন:
          </label>
          <input
            type="text"
            placeholder="RESET"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            className="form-input"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderColor: isConfirmed ? 'var(--danger)' : 'var(--border)',
              boxShadow: isConfirmed ? '0 0 10px rgba(239, 68, 68, 0.25)' : 'none'
            }}
            autoFocus
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            বাতিল
          </button>

          <button
            type="button"
            disabled={!isConfirmed || isProcessing}
            onClick={handleExecute}
            className="btn btn-danger"
            style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              fontWeight: 700,
              opacity: isConfirmed ? 1 : 0.45,
              cursor: isConfirmed ? 'pointer' : 'not-allowed',
              boxShadow: isConfirmed ? '0 0 16px rgba(239, 68, 68, 0.4)' : 'none'
            }}
          >
            {isProcessing ? 'রিসেট হচ্ছে...' : 'হ্যাঁ, সম্পূর্ণ রিসেট করুন'}
          </button>
        </div>
      </div>
    </div>
  );
}
