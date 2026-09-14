import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { BerandaMisiHub } from './components/BerandaMisiHub';
import { GamePilahSampah } from './components/GamePilahSampah';
import { BankSampahSimulasi } from './components/BankSampahSimulasi';
import { KomposTakakura } from './components/KomposTakakura';
import { ChecklistHarian } from './components/ChecklistHarian';
import { sounds } from './soundEffects';
import { speechAssistant } from './speechAssistant';
import { MF_LOGO_DATA_URL } from './assets/logoBase64';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Coins,
  Sprout, 
  CalendarCheck, 
  User, 
  School, 
  Rocket, 
  ArrowLeft 
} from 'lucide-react';
import './index.css';

export type AppTab = 'beranda' | 'pilah' | 'banksampah' | 'kompos' | 'checklist';

export const App: React.FC = () => {
  // Default to URL param or 'beranda' (Mission Hub Dashboard)
  const [activeTab, setActiveTab] = useState<AppTab>(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as AppTab;
    if (tabParam && ['beranda', 'pilah', 'banksampah', 'kompos', 'checklist'].includes(tabParam)) {
      return tabParam;
    }
    return 'beranda';
  });

  // Profile states with localStorage persistence (Only Nama Lengkap and Sekolah)
  const [userName, setUserName] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const u = params.get('user');
    if (u) {
      localStorage.setItem('pahlawan_nama', u);
      return u;
    }
    return localStorage.getItem('pahlawan_nama') || '';
  });
  const [userSchool, setUserSchool] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('school');
    if (s) {
      localStorage.setItem('pahlawan_sekolah', s);
      return s;
    }
    return localStorage.getItem('pahlawan_sekolah') || '';
  });
  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('user') && params.get('school')) return true;
    const savedName = localStorage.getItem('pahlawan_nama');
    const savedSchool = localStorage.getItem('pahlawan_sekolah');
    return Boolean(savedName && savedName.trim() && savedSchool && savedSchool.trim());
  });

  // Onboarding input states
  const [regName, setRegName] = useState<string>('');
  const [regSchool, setRegSchool] = useState<string>('');

  const [points, setPoints] = useState<number>(140);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('pahlawan_sound');
    return saved !== null ? saved === 'true' : true;
  });
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    return localStorage.getItem('pahlawan_voice') === 'true';
  });

  // Level calculation: 100 points per level up to Level 5
  const currentLevel = Math.min(5, Math.floor(points / 100) + 1);
  const maxLevelPoints = currentLevel * 100;

  // Track previous level for level-up celebration
  const [prevLevel, setPrevLevel] = useState<number>(currentLevel);

  useEffect(() => {
    // Initialize sound and speech states
    sounds.setSoundEnabled(soundEnabled);
    speechAssistant.setVoiceEnabled(voiceEnabled);
    if (!voiceEnabled) {
      speechAssistant.stop();
    }
  }, [soundEnabled, voiceEnabled]);

  useEffect(() => {
    if (currentLevel > prevLevel) {
      if (soundEnabled) sounds.playLevelUp();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
      if (voiceEnabled) {
        speechAssistant.speak(`Selamat ${userName}! Pohon Kebaikanmu bertumbuh mekar ke Level ${currentLevel}! Teruslah berbuat kebaikan untuk bumi!`);
      }
      setPrevLevel(currentLevel);
    }
  }, [currentLevel, prevLevel, userName, soundEnabled, voiceEnabled]);

  const handleAddPoints = (amount: number) => {
    setPoints(prev => Math.max(0, prev + amount));
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setSoundEnabled(next);
    localStorage.setItem('pahlawan_sound', String(next));
    if (next) {
      sounds.initOnGesture();
      sounds.playChime();
    }
  };

  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    speechAssistant.setVoiceEnabled(next);
    localStorage.setItem('pahlawan_voice', String(next));
    if (next) {
      speechAssistant.speak('Panduan suara ceria aktif. Selamat datang, pahlawan cilik siaga lingkungan!');
    }
  };

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
    if (soundEnabled) sounds.playClick();
    if (voiceEnabled) {
      const tabSpeechMap: Record<AppTab, string> = {
        beranda: 'Pusat Misi Pahlawan Cilik. Pilih petualanganmu hari ini!',
        pilah: 'Menu Misi Pilah Sampah. Ayo pilih tong warna yang tepat!',
        banksampah: 'Menu Bank Sampah Pahlawan Cilik. Timbang sampahmu dan kumpulkan koin tabungan!',
        kompos: 'Menu Laboratorium Kompos Takakura dan Biopori.',
        checklist: 'Menu Pelacak Kebiasaan Tiga R harian.'
      };
      speechAssistant.speak(tabSpeechMap[tab]);
    }
  };

  const handleUpdateProfile = (name: string, school: string) => {
    const cleanName = name.trim();
    const cleanSchool = school.trim();
    setUserName(cleanName);
    setUserSchool(cleanSchool);
    localStorage.setItem('pahlawan_nama', cleanName);
    localStorage.setItem('pahlawan_sekolah', cleanSchool);
  };

  const handleStartOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regSchool.trim()) return;

    const cleanName = regName.trim();
    const cleanSchool = regSchool.trim();
    setUserName(cleanName);
    setUserSchool(cleanSchool);
    setIsProfileCompleted(true);
    localStorage.setItem('pahlawan_nama', cleanName);
    localStorage.setItem('pahlawan_sekolah', cleanSchool);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getTabTitle = (tab: AppTab) => {
    switch (tab) {
      case 'pilah': return 'Misi #1: Pilah Sampah 4 Tong';
      case 'banksampah': return 'Misi #2: Bank Sampah & Celengan Impian';
      case 'kompos': return 'Misi #3: Kompos Takakura & Biopori';
      case 'checklist': return 'Misi #4: Pelacak Kebiasaan 3R Harian';
      default: return 'Pusat Petualangan Misi';
    }
  };

  return (
    <div className="app-layout" id="app-root-layout">
      {/* Top Navigation & Profile Bar */}
      <Header
        userName={userName || 'Calon Pahlawan'}
        userSchool={userSchool || 'Belum Terdaftar'}
        points={points}
        level={currentLevel}
        maxLevelPoints={maxLevelPoints}
        soundEnabled={soundEnabled}
        voiceEnabled={voiceEnabled}
        onToggleSound={handleToggleSound}
        onToggleVoice={handleToggleVoice}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Main Navigation Bar */}
      <nav className="main-nav-bar" id="primary-navigation">
        <div className="nav-container">
          <button
            id="tab-beranda"
            type="button"
            className={`nav-tab-btn ${activeTab === 'beranda' ? 'active' : ''}`}
            onClick={() => handleTabChange('beranda')}
          >
            <LayoutDashboard size={17} />
            <span>Beranda</span>
          </button>

          <button
            id="tab-pilah"
            type="button"
            className={`nav-tab-btn ${activeTab === 'pilah' ? 'active' : ''}`}
            onClick={() => handleTabChange('pilah')}
          >
            <Gamepad2 size={17} />
            <span>1. Pilah Sampah</span>
          </button>

          <button
            id="tab-banksampah"
            type="button"
            className={`nav-tab-btn ${activeTab === 'banksampah' ? 'active' : ''}`}
            onClick={() => handleTabChange('banksampah')}
          >
            <Coins size={17} />
            <span>2. Bank Sampah</span>
          </button>

          <button
            id="tab-kompos"
            type="button"
            className={`nav-tab-btn ${activeTab === 'kompos' ? 'active' : ''}`}
            onClick={() => handleTabChange('kompos')}
          >
            <Sprout size={17} />
            <span>3. Kompos & Biopori</span>
          </button>

          <button
            id="tab-checklist"
            type="button"
            className={`nav-tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => handleTabChange('checklist')}
          >
            <CalendarCheck size={17} />
            <span>4. Checklist 3R</span>
          </button>
        </div>
      </nav>

      {/* Content Body */}
      <main className="main-content-area" id="main-content">
        {/* Return to Hub Banner when inside any specific mission */}
        {activeTab !== 'beranda' && (
          <div className="back-hub-banner" id="back-hub-bar">
            <button
              id="btn-back-to-hub"
              type="button"
              className="btn-back-hub-action"
              onClick={() => handleTabChange('beranda')}
            >
              <ArrowLeft size={16} /> Kembali ke Pusat Pilihan Misi (Beranda)
            </button>
            <span className="mission-active-indicator">
              Sedang Menjelajah: <strong>{getTabTitle(activeTab)}</strong>
            </span>
          </div>
        )}

        {/* Dynamic Module Routing */}
        {activeTab === 'beranda' && (
          <BerandaMisiHub
            userName={userName || 'Pahlawan Cilik'}
            userSchool={userSchool || 'Sekolah Bersih'}
            points={points}
            level={currentLevel}
            onSelectTab={(tab) => handleTabChange(tab)}
          />
        )}
        {activeTab === 'pilah' && (
          <GamePilahSampah
            userName={userName || 'Pahlawan Cilik'}
            userSchool={userSchool || 'Sekolah Bersih'}
            onAddPoints={handleAddPoints}
            onNavigateHome={() => handleTabChange('beranda')}
          />
        )}
        {activeTab === 'banksampah' && (
          <BankSampahSimulasi
            userName={userName || 'Pahlawan Cilik'}
            userSchool={userSchool || 'Sekolah Bersih'}
            onAddPoints={handleAddPoints}
          />
        )}
        {activeTab === 'kompos' && <KomposTakakura onAddPoints={handleAddPoints} />}
        {activeTab === 'checklist' && <ChecklistHarian onAddPoints={handleAddPoints} />}
      </main>

      {/* Mandatory Onboarding Modal (Must fill NAMA LENGKAP and SEKOLAH before playing) */}
      {!isProfileCompleted && (
        <div className="modal-overlay mandatory-gate" role="dialog" aria-modal="true" aria-labelledby="onboarding-modal-title">
          <div className="modal-card onboarding-card">
            <div className="onboarding-header">
              <div className="onboarding-logo-badge">
                <img src={MF_LOGO_DATA_URL} alt="Logo Mario Fahmi" className="onboarding-mf-logo" />
              </div>
              <h2 id="onboarding-modal-title" className="onboarding-title">
                Pendaftaran Pahlawan Cilik
              </h2>
              <p className="onboarding-subtitle">
                Halo Calon Pahlawan! Sebelum mulai menjelajahi arena misi dan aksi peduli lingkungan, silakan lengkapi profilmu terlebih dahulu:
              </p>
            </div>

            <form onSubmit={handleStartOnboarding} className="onboarding-form" id="form-onboarding-profile">
              <div className="form-group">
                <label htmlFor="onboarding-name">
                  <User size={16} className="inline-icon" /> NAMA LENGKAP:
                </label>
                <input
                  id="onboarding-name"
                  type="text"
                  required
                  autoFocus
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ketik nama lengkapmu..."
                  className="onboarding-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="onboarding-school">
                  <School size={16} className="inline-icon" /> SEKOLAH:
                </label>
                <input
                  id="onboarding-school"
                  type="text"
                  required
                  value={regSchool}
                  onChange={(e) => setRegSchool(e.target.value)}
                  placeholder="Ketik nama sekolah / TK / PAUD..."
                  className="onboarding-input"
                />
              </div>

              <button
                id="btn-start-game-onboarding"
                type="submit"
                className="btn-primary full-width onboarding-submit-btn"
                disabled={!regName.trim() || !regSchool.trim()}
              >
                <Rocket size={20} /> Mulai Masuk ke Pusat Petualangan!
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer with Educational Citation */}
      <footer className="app-footer" id="app-footer">
        <div className="footer-inner">
          <img src={MF_LOGO_DATA_URL} alt="Logo Mario Fahmi" className="footer-mf-logo" />
          <p>
            🌱 <strong>Pahlawan Cilik Siaga Lingkungan</strong> • Perancang: <strong>Mario Fahmi Syahrial</strong> • Berdasarkan buku panduan:
            <em> "Dari Tempat Sampah ke Tabungan: Mengelola Sampah Rumah Tangga Menjadi Peluang Ekonomi"</em>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
