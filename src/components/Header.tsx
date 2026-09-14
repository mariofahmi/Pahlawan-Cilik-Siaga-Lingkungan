import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Star, Award, User, Sparkles, Edit3, School, X, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../soundEffects';
import { speechAssistant } from '../speechAssistant';

const AVATAR_OPTIONS = [
  { emoji: '🦸', label: 'Pahlawan Cilik' },
  { emoji: '🦸‍♀️', label: 'Pahlawan Putri' },
  { emoji: '🦁', label: 'Singa Berani' },
  { emoji: '🦊', label: 'Rubah Cerdas' },
  { emoji: '🐬', label: 'Lumba Lestari' },
  { emoji: '🐼', label: 'Panda Hijau' }
];

interface HeaderProps {
  userName: string;
  userSchool: string;
  points: number;
  level: number;
  maxLevelPoints: number;
  soundEnabled: boolean;
  voiceEnabled?: boolean;
  onToggleSound: () => void;
  onToggleVoice?: () => void;
  onUpdateProfile: (name: string, school: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  userSchool,
  points,
  level,
  maxLevelPoints,
  soundEnabled,
  voiceEnabled,
  onToggleSound,
  onToggleVoice,
  onUpdateProfile
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempSchool, setTempSchool] = useState(userSchool);
  const [userAvatar, setUserAvatar] = useState<string>(() => {
    return localStorage.getItem('pahlawan_avatar') || '🦸';
  });
  const [tempAvatar, setTempAvatar] = useState<string>(userAvatar);

  const levelTitles = [
    'Tunas Kebersihan',
    'Sahabat Daun Tiga',
    'Pohon Muda Rindang',
    'Pejuang Bunga Harum',
    'Pahlawan Emas Berkah'
  ];

  const levelIcons = ['🌱', '🌿', '🪴', '🌸', '🌳👑'];
  const currentTitle = levelTitles[Math.min(level - 1, levelTitles.length - 1)];
  const currentTreeIcon = levelIcons[Math.min(level - 1, levelIcons.length - 1)];

  const currentLevelBasePoints = (level - 1) * 100;
  const currentLevelProgress = Math.min(100, Math.max(0, ((points - currentLevelBasePoints) / (maxLevelPoints - currentLevelBasePoints)) * 100));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserAvatar(tempAvatar);
    localStorage.setItem('pahlawan_avatar', tempAvatar);
    onUpdateProfile(tempName, tempSchool);
    setIsEditingProfile(false);
    if (soundEnabled) sounds.playChime();
    if (voiceEnabled) {
      speechAssistant.speak(`Halo ${tempName}, profil pahlawan cilikmu berhasil diperbarui! Semangat menjaga bumi!`);
    }
  };

  return (
    <header id="main-header" className="pahlawan-header">
      <div className="header-container">
        {/* Logo & Title */}
        <div className="brand-section">
          <div className="logo-badge mf-logo-badge" id="app-logo" title="Logo Resmi Mario Fahmi">
            <img src="/logo-mf.png" alt="Logo Mario Fahmi" className="brand-mf-logo" />
          </div>
          <div>
            <div className="badge-pill">
              <Sparkles size={14} className="sparkle-icon" /> Gamifikasi Bank Sampah & 3R
            </div>
            <h1 id="app-heading" className="brand-title">
              Pahlawan Cilik Siaga Lingkungan
            </h1>
            <p className="brand-subtitle">
              <img src="/logo-mf.png" alt="MF Logo" className="author-tag-logo" />
              Perancang: <strong>Mario Fahmi Syahrial</strong>
            </p>
          </div>
        </div>

        {/* Header Right Cluster: Pohon Kebaikan, SFX ON & Profil Pahlawan (Sejajar dalam 1 Baris!) */}
        <div className="header-right-cluster" id="header-right-cluster">
          {/* Tree of Kindness Status, Points & Audio Controls */}
          <div className="stats-section" id="tree-status-card">
            <div className="tree-level-info">
              <div className="tree-avatar" title={`Level ${level}: ${currentTitle}`}>
                <span className="tree-emoji-large">{currentTreeIcon}</span>
                <span className="level-number-badge">Lv {level}</span>
              </div>
              <div className="tree-text">
                <span className="tree-label">Pohon Kebaikan:</span>
                <strong className="tree-title-name" id="tree-level-title">{currentTitle}</strong>
                <div className="progress-bar-bg" title={`${points} / ${maxLevelPoints} Bintang`}>
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${currentLevelProgress}%` }}
                  />
                </div>
                <span className="points-summary">
                  {points} / {maxLevelPoints} Bintang Menuju Lv {Math.min(5, level + 1)}
                </span>
              </div>
            </div>

            <div className="stars-counter-badge" id="stars-counter">
              <Star className="star-bounce" size={20} fill="#f59e0b" color="#f59e0b" />
              <span className="stars-count-val">{points}</span>
              <span className="stars-unit">Poin</span>
            </div>

            {/* Audio Controls Strip - Sejajar dengan Pohon Kebaikan & Profil Pahlawan */}
            <div className="header-audio-strip" id="header-audio-controls">
              {/* SFX Toggle Button */}
              <button
                id="btn-toggle-sound"
                type="button"
                className={`tool-button sound-tool-btn ${soundEnabled ? 'active' : 'muted'}`}
                onClick={() => {
                  sounds.initOnGesture();
                  onToggleSound();
                }}
                title={soundEnabled ? 'Efek Suara Aktif (Klik untuk Mematikan)' : 'Efek Suara Mati (Klik untuk Menyalakan)'}
                aria-label="Pengaturan Efek Suara"
              >
                {soundEnabled ? (
                  <span className="sfx-active-visual">
                    <Volume2 size={15} color="#059669" />
                    <span className="sound-wave-bars">
                      <span className="sound-bar bar-1" />
                      <span className="sound-bar bar-2" />
                      <span className="sound-bar bar-3" />
                    </span>
                  </span>
                ) : (
                  <VolumeX size={15} color="#94a3b8" />
                )}
                <span className="tool-btn-label">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
              </button>
            </div>
          </div>

          {/* Action Controls: Profile Hero Card (Sejajar dengan SFX ON!) */}
          <div className="controls-section" id="header-controls">
            <button
              id="profile-badge-btn"
              type="button"
              className="profile-hero-card"
              onClick={() => {
                setTempName(userName);
                setTempSchool(userSchool);
                setIsEditingProfile(true);
                if (soundEnabled) sounds.playClick();
              }}
              title="Klik untuk Mengubah Profil Pahlawan Cilik"
            >
              <div className="hero-avatar-wrapper">
                <div className="avatar-hero-glow">
                  <span className="avatar-hero-emoji">{userAvatar}</span>
                </div>
                <div className="hero-avatar-edit-icon" title="Ubah Profil & Avatar">
                  <Edit3 size={10} />
                </div>
              </div>
              <div className="profile-identity-col">
                <div className="profile-role-row">
                  <span className="profile-role-pill">🌟 Pahlawan Cilik</span>
                  <span className="profile-edit-chip"><Edit3 size={10} /> Ubah</span>
                </div>
                <strong className="profile-user-name" id="hero-user-name">{userName}</strong>
                <span className="profile-user-school" id="hero-user-school">
                  <School size={12} className="inline-icon" /> {userSchool}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal (rendered via createPortal directly into document.body) */}
      {isEditingProfile && typeof document !== 'undefined' && createPortal(
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-profile-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditingProfile(false);
          }}
        >
          <div className="modal-card profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 id="modal-profile-title" className="modal-title">
                <Award className="inline-icon" size={24} color="#16a34a" /> Kartu Anggota Pahlawan Cilik
              </h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setIsEditingProfile(false)}
                title="Tutup Modal"
                aria-label="Tutup modal profil"
              >
                <X size={20} />
              </button>
            </div>

            {/* Official Creator & Innovation Badge */}
            <div className="modal-author-badge">
              <img src="/logo-mf.png" alt="Logo Mario Fahmi" className="author-badge-logo" />
              <div>
                <span className="author-badge-subtitle">Perancang Inovasi & Edukasi:</span>
                <strong className="author-badge-title">Mario Fahmi Syahrial</strong>
              </div>
            </div>

            <p className="modal-desc">
              Pilih karakter avatarmu dan lengkapi identitas untuk dicatat pada sertifikat prestasi:
            </p>

            <form onSubmit={handleSaveProfile}>
              {/* Avatar Character Picker */}
              <div className="form-group">
                <label>Pilih Karakter Pahlawanmu:</label>
                <div className="avatar-picker-grid">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.emoji}
                      type="button"
                      className={`avatar-choice-btn ${tempAvatar === av.emoji ? 'selected' : ''}`}
                      onClick={() => setTempAvatar(av.emoji)}
                      title={av.label}
                    >
                      <span className="choice-emoji">{av.emoji}</span>
                      <small className="choice-label">{av.label}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="input-profile-name">
                  <User size={16} className="inline-icon" /> Nama Lengkap Pahlawan:
                </label>
                <input
                  id="input-profile-name"
                  type="text"
                  required
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-profile-school">
                  <School size={16} className="inline-icon" /> Sekolah / TK / PAUD:
                </label>
                <input
                  id="input-profile-school"
                  type="text"
                  required
                  value={tempSchool}
                  onChange={(e) => setTempSchool(e.target.value)}
                  placeholder="Contoh: SD Negeri 01 Bersih / TK Kartika"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  id="cancel-profile-btn"
                  className="btn-secondary"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  id="save-profile-btn"
                  className="btn-primary"
                >
                  Simpan Profil Baru
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
