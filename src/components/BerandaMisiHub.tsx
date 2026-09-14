import React from 'react';
import { AppTab } from '../App';
import { sounds } from '../soundEffects';
import { MF_LOGO_DATA_URL } from '../assets/logoBase64';
import { 
  Gamepad2, 
  Sprout, 
  CalendarCheck, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Award, 
  TreePine, 
  CheckCircle, 
  Compass,
  Info,
  Coins
} from 'lucide-react';

interface BerandaMisiHubProps {
  userName: string;
  userSchool: string;
  points: number;
  level: number;
  onSelectTab: (tab: AppTab) => void;
}

interface MissionCard {
  id: AppTab;
  number: number;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  badgeColor: string;
  iconEmoji: string;
  themeColor: string;
  gradientBg: string;
  rewardStars: number;
  bookChapter: string;
  features: string[];
}

export const BerandaMisiHub: React.FC<BerandaMisiHubProps> = ({
  userName,
  userSchool,
  points,
  level,
  onSelectTab
}) => {
  const missions: MissionCard[] = [
    {
      id: 'pilah',
      number: 1,
      title: 'Pilah 4 Tong Warna',
      tagline: 'Refleks Pemilahan Standar',
      description: 'Pilah 12 jenis sampah ke 4 tong resmi (Organik, Daur Ulang, B3, Residu) sebelum waktu habis!',
      badge: 'Game Edukasi',
      badgeColor: '#10b981',
      iconEmoji: '🎮🗑️',
      themeColor: '#059669',
      gradientBg: 'linear-gradient(145deg, #ecfdf5 0%, #f0fdf4 100%)',
      rewardStars: 50,
      bookChapter: 'Bab 2 & Tabel 5',
      features: ['4 Kode Warna Resmi', 'Drag & Drop Interaktif']
    },
    {
      id: 'banksampah',
      number: 2,
      title: 'Bank Sampah Cilik',
      tagline: 'Timbangan Digital & Koin',
      description: 'Timbang botol & kardus dengan timbangan digital LED. Kumpulkan koin emas dan raih hadiah impian!',
      badge: 'Simulasi Finansial 3R',
      badgeColor: '#f59e0b',
      iconEmoji: '🏦🪙',
      themeColor: '#d97706',
      gradientBg: 'linear-gradient(145deg, #fefce8 0%, #fffbeb 100%)',
      rewardStars: 60,
      bookChapter: 'Bab 5 & Simpanan Cilik',
      features: ['Timbangan Digital LED', 'Buku Tabungan & Hadiah']
    },
    {
      id: 'kompos',
      number: 3,
      title: 'Kompos Takakura',
      tagline: 'Laboratorium Biologi Bebas Bau',
      description: 'Pelajari rahasia 5 lapisan keranjang Takakura Surabaya & sembuhkan komposter di Klinik Dokter Kompos.',
      badge: 'Sains & Praktik',
      badgeColor: '#16a34a',
      iconEmoji: '🌱🪱',
      themeColor: '#15803d',
      gradientBg: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)',
      rewardStars: 55,
      bookChapter: 'Bab 3.7 & Tabel 6',
      features: ['5 Lapisan Anyaman 3D', 'Klinik Dokter Kompos']
    },
    {
      id: 'checklist',
      number: 4,
      title: 'Pelacak Kebiasaan 3R',
      tagline: 'Tantangan Konsistensi 7 Hari',
      description: 'Terapkan Reduce, Reuse, & Recycle setiap hari di rumah. Bangun streak konsisten dari Senin ke Minggu!',
      badge: 'Tantangan 7 Hari',
      badgeColor: '#ea580c',
      iconEmoji: '📋🌟',
      themeColor: '#c2410c',
      gradientBg: 'linear-gradient(145deg, #fff7ed 0%, #ffedd5 100%)',
      rewardStars: 70,
      bookChapter: 'Bab 3.9 & James Clear',
      features: ['Checklist 7 Hari', 'Streak Kebiasaan Nyata']
    }
  ];

  const levelNames = [
    'Tunas Kebersihan',
    'Sahabat Daun Tiga',
    'Pohon Muda Rindang',
    'Pejuang Bunga Harum',
    'Pahlawan Emas Berkah'
  ];

  return (
    <div id="beranda-misi-hub" className="hub-container single-screen-hub">
      {/* Compact Hero Welcome Banner */}
      <section className="hub-hero-banner compact-hero">
        <div className="hero-content">
          <div className="hero-badge-pill">
            <Sparkles size={14} /> Pusat Petualangan Belajar & Aksi Nyata
          </div>
          <h2 className="hero-headline">
            Selamat Datang, <span className="hero-highlight">{userName}</span>!
          </h2>
          <p className="hero-school-tag">
            🏫 <strong>{userSchool}</strong> • Jelajahi 4 Misi Sejajar di bawah untuk menjaga bumi dan raih bintang tabungan!
          </p>
        </div>

        {/* Quick Hero Stat Highlights */}
        <div className="hero-stat-cards compact-stat-cards">
          <div className="hero-stat-box stat-tree compact-stat-box">
            <div className="stat-icon-circle">🌳</div>
            <div>
              <span className="stat-sub">Pohon Kebaikan</span>
              <strong className="stat-main">Level {level}</strong>
              <small className="stat-desc">{levelNames[Math.min(level - 1, levelNames.length - 1)]}</small>
            </div>
          </div>

          <div className="hero-stat-box stat-points compact-stat-box">
            <div className="stat-icon-circle">⭐</div>
            <div>
              <span className="stat-sub">Total Tabungan</span>
              <strong className="stat-main">{points} Bintang</strong>
              <small className="stat-desc">Siap Belanja Hadiah</small>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of 4 Side-by-Side Missions (Sejajar Tanpa Scroll) */}
      <section className="hub-missions-section">
        <div className="section-title-row compact-title-row">
          <div className="section-title-wrapper">
            <h3 className="section-heading compact-heading">
              <Compass size={20} className="inline-icon" color="#10b981" /> 4 Arena Petualangan Pahlawan Cilik (Sejajar & Terpadu)
            </h3>
            <p className="section-subtitle compact-subtitle">
              Pilih misi petualanganmu hari ini. Setiap aksi nyata menghasilkan bintang prestasi dan koin tabungan!
            </p>
          </div>
        </div>

        <div className="missions-cards-grid four-columns-aligned" id="missions-grid-container">
          {missions.map((m) => (
            <div 
              key={m.id}
              id={`mission-card-${m.id}`}
              className="mission-interactive-card compact-card"
              style={{ background: m.gradientBg, borderColor: `${m.badgeColor}40` }}
              onClick={() => {
                sounds.playClick();
                onSelectTab(m.id);
              }}
            >
              {/* Card Header */}
              <div className="card-top-row">
                <span className="mission-number-tag" style={{ backgroundColor: m.themeColor }}>
                  Misi #{m.number}
                </span>
                <span className="mission-type-pill" style={{ backgroundColor: `${m.badgeColor}25`, color: m.themeColor }}>
                  {m.badge}
                </span>
              </div>

              {/* Emoji Icon & Titles */}
              <div className="card-body-content">
                <div className="card-emoji-visual">{m.iconEmoji}</div>
                <h4 className="card-mission-title" style={{ color: m.themeColor }}>
                  {m.title}
                </h4>
                <span className="card-tagline">{m.tagline}</span>
                <p className="card-desc">{m.description}</p>
              </div>

              {/* Key Features Pill List */}
              <div className="card-features-chips">
                {m.features.map((f, idx) => (
                  <span key={idx} className="feature-chip">
                    <CheckCircle size={11} color={m.themeColor} /> {f}
                  </span>
                ))}
              </div>

              {/* Action Bottom Bar */}
              <div className="card-bottom-bar" style={{ borderTopColor: `${m.badgeColor}25` }}>
                <div className="star-reward-preview">
                  <Star size={15} fill="#f59e0b" color="#f59e0b" />
                  <span>+{m.rewardStars} ⭐</span>
                </div>
                <button
                  id={`btn-open-mission-${m.id}`}
                  type="button"
                  className="mission-enter-btn"
                  style={{ backgroundColor: m.themeColor }}
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                    onSelectTab(m.id);
                  }}
                >
                  <span>Masuk Misi</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slim Educational Fact Callout Footer */}
      <section className="hub-curriculum-banner compact-curriculum">
        <div className="banner-icon-side mf-curriculum-badge" title="Logo Resmi Mario Fahmi">
          <img src={MF_LOGO_DATA_URL} alt="Logo Mario Fahmi" className="curriculum-mf-logo" />
        </div>
        <div className="banner-text-side">
          <h4>Landasan Kurikulum Edukasi 3R • Perancang: Mario Fahmi Syahrial</h4>
          <p>
            Buku panduan: <em>"Dari Tempat Sampah ke Tabungan: Mengelola Sampah Rumah Tangga Menjadi Peluang Ekonomi"</em>.
            Mengintegrasikan etika 3R, 4 kode warna tong sampah, sains komposter Takakura, dan pengelolaan Bank Sampah cilik.
          </p>
        </div>
      </section>
    </div>
  );
};
