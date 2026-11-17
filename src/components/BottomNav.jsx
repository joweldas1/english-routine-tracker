import React from 'react';
import {
  CheckSquare,
  Compass,
  BookOpen,
  AlertCircle,
  Mic,
  BarChart2,
  Settings
} from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const navItems = [
    { id: 'today', labelEn: 'Today', labelBn: 'আজকের রুটিন', icon: CheckSquare },
    { id: 'plan', labelEn: '4-Week Plan', labelBn: '৪-সপ্তাহের প্ল্যান', icon: Compass },
    { id: 'vocab', labelEn: 'Vocabulary', labelBn: 'শব্দভাণ্ডার', icon: BookOpen },
    { id: 'error', labelEn: 'Error Log', labelBn: 'ভুলের লগ', icon: AlertCircle },
    { id: 'speaking', labelEn: 'Speaking', labelBn: 'স্পিকিং ও STAR', icon: Mic },
    { id: 'progress', labelEn: 'Progress', labelBn: 'অগ্রগতি', icon: BarChart2 },
    { id: 'settings', labelEn: 'Settings', labelBn: 'সেটিংস', icon: Settings }
  ];

  return (
    <nav className="bottom-nav" aria-label="Main Navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="nav-icon" />
            <span>{item.labelEn}</span>
          </button>
        );
      })}
    </nav>
  );
}
