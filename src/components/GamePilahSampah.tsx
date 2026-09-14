import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { WASTE_ITEMS, WASTE_BINS, WasteCategory, WasteItem } from '../data/wasteItems';
import { sounds } from '../soundEffects';
import { speechAssistant } from '../speechAssistant';
import { Sparkles, HelpCircle, CheckCircle, RotateCcw, ArrowRight, BookOpen, Home, Flame, Download, FileText, Image as ImageIcon } from 'lucide-react';
import { downloadScoreAsPNG, downloadScoreAsPDF } from '../utils/scoreExporter';
import { MF_LOGO_DATA_URL } from '../assets/logoBase64';

const QUESTIONS_PER_ROUND = 10;

/**
 * Generates an array of exactly 10 randomized waste items from the master pool.
 */
const getRandomDeck = (): WasteItem[] => {
  const shuffled = [...WASTE_ITEMS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, QUESTIONS_PER_ROUND);
};

interface GamePilahSampahProps {
  userName?: string;
  userSchool?: string;
  onAddPoints: (pts: number) => void;
  onNavigateHome?: () => void;
}

export const GamePilahSampah: React.FC<GamePilahSampahProps> = ({
  userName = 'Pahlawan Cilik',
  userSchool = 'Sekolah Bersih',
  onAddPoints,
  onNavigateHome
}) => {
  // 10 Randomized Questions
  const [deck, setDeck] = useState<WasteItem[]>(() => getRandomDeck());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // Round stats & scoring: Benar +10, Salah -5
  const [roundScore, setRoundScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);

  // Current Question Answer State
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const [lastResult, setLastResult] = useState<{
    success: boolean;
    pointsChange: number;
    itemName: string;
    selectedCategory: WasteCategory;
    correctCategory: WasteCategory;
    reason: string;
    tip: string;
    ref: string;
  } | null>(null);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showCatalog, setShowCatalog] = useState<boolean>(false);

  const currentItem = deck[currentIndex];

  /**
   * Handle player clicking/dropping item into a bin.
   * Benar: +10 poin
   * Salah: -5 poin
   */
  const handleSort = (chosenCategory: WasteCategory) => {
    if (!currentItem || isCompleted || isAnswered) return;

    const isCorrect = chosenCategory === currentItem.category;
    setIsAnswered(true);
    setSelectedCategory(chosenCategory);

    const correctBin = WASTE_BINS.find(b => b.category === currentItem.category);

    if (isCorrect) {
      sounds.playChime();
      const pointsEarned = 10;
      onAddPoints(pointsEarned);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setCorrectCount(prev => prev + 1);
      setRoundScore(prev => prev + pointsEarned);

      setLastResult({
        success: true,
        pointsChange: 10,
        itemName: currentItem.name,
        selectedCategory: chosenCategory,
        correctCategory: currentItem.category,
        reason: currentItem.reason,
        tip: currentItem.tip,
        ref: currentItem.bookReference
      });

      speechAssistant.speak(`Hebat! ${currentItem.name} tepat masuk tong ${currentItem.categoryLabel}. Kamu dapat 10 bintang!`);

      if (nextStreak % 3 === 0) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      sounds.playBoop();
      const pointsDeducted = -5;
      onAddPoints(pointsDeducted);
      setStreak(0);
      setWrongCount(prev => prev + 1);
      setRoundScore(prev => prev + pointsDeducted);

      setLastResult({
        success: false,
        pointsChange: -5,
        itemName: currentItem.name,
        selectedCategory: chosenCategory,
        correctCategory: currentItem.category,
        reason: `Kurang tepat. ${currentItem.name} seharusnya masuk ke tong ${correctBin?.name || ''} (${correctBin?.colorName || ''}).`,
        tip: currentItem.tip,
        ref: currentItem.bookReference
      });

      speechAssistant.speak(`Kurang tepat. ${currentItem.name} seharusnya masuk ke tong ${correctBin?.colorName || ''}!`);
    }
  };

  /**
   * Advance to next question or complete 10-question round.
   */
  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentIndex + 1 >= deck.length) {
      setIsCompleted(true);
      sounds.playFanfare();
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 }
      });
      speechAssistant.speak('Selamat! Kamu telah menyelesaikan 10 soal pilah sampah dengan gigih!');
    } else {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedCategory(null);
      setLastResult(null);
    }
  };

  /**
   * Restart with a completely new set of 10 randomized questions.
   */
  const handleRestart = () => {
    const newDeck = getRandomDeck();
    setDeck(newDeck);
    setCurrentIndex(0);
    setStreak(0);
    setRoundScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsAnswered(false);
    setSelectedCategory(null);
    setLastResult(null);
    setIsCompleted(false);
    sounds.playClick();
    speechAssistant.speak('Ayo mulai ronde baru dengan 10 soal acak! Pilah sampah ke tong warna yang tepat.');
  };

  return (
    <div id="game-pilah-section" className="module-container">
      {/* Module Title Bar */}
      <div className="module-header">
        <div>
          <h2 className="module-title" id="game-title">
            <span className="title-icon">🎮</span> Misi Pilah Sampah 4 Tong
          </h2>
          <p className="module-subtitle">
            Uji ketangkasanmu memilah 10 sampah acak ke tong kode warna resmi. Benar +10 Poin, Salah -5 Poin!
          </p>
        </div>
        <div className="module-top-actions">
          <button
            id="btn-toggle-catalog"
            type="button"
            className="btn-outline-pill"
            onClick={() => {
              setShowCatalog(!showCatalog);
              sounds.playClick();
            }}
          >
            <BookOpen size={16} /> {showCatalog ? 'Kembali ke Game' : 'Buka Ensiklopedia 4 Tong'}
          </button>
        </div>
      </div>

      {!showCatalog ? (
        <>
          {/* Game Arena */}
          {!isCompleted ? (
            <div className="game-arena">
              {/* Progress & Live Scoring Header */}
              <div className="game-stats-bar">
                <div className="progress-badge" id="game-progress-badge">
                  <span>🎯 <strong>Soal {currentIndex + 1}</strong> dari {deck.length}</span>
                </div>
                <div className="game-round-score-pill">
                  <span>Skor Ronde: <strong>{roundScore >= 0 ? `+${roundScore}` : roundScore} Poin</strong></span>
                </div>
                <div className="game-answer-counters">
                  <span className="count-tag correct">✅ {correctCount} Benar (+10)</span>
                  <span className="count-tag wrong">❌ {wrongCount} Salah (-5)</span>
                </div>
                {streak >= 2 && (
                  <div className="streak-badge" id="game-streak-badge">
                    <Flame size={16} color="#f59e0b" />
                    <span>Streak: <strong>{streak}x</strong></span>
                  </div>
                )}
              </div>

              {/* Visual Progress Bar (10 Steps) */}
              <div className="quiz-progress-track">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / deck.length) * 100}%` }}
                />
              </div>

              {/* Current Question Card - Compact Horizontal Layout */}
              {currentItem && (
                <div className="current-card-wrapper">
                  <div
                    id={`waste-card-${currentItem.id}`}
                    className="waste-hero-card compact-waste-card"
                    draggable={!isAnswered}
                    onDragStart={(e) => {
                      if (!isAnswered) {
                        e.dataTransfer.setData('text/plain', currentItem.category);
                      }
                    }}
                  >
                    <div className="card-badge-top">Soal #{currentIndex + 1} dari {deck.length}</div>
                    <div className="compact-card-inner">
                      <div className="compact-waste-emoji">{currentItem.emoji}</div>
                      <div className="compact-waste-text">
                        <h3 className="waste-item-name">{currentItem.name}</h3>
                        <p className="waste-item-desc">{currentItem.description}</p>
                        <div className="card-drag-hint">
                          <span>
                            {isAnswered
                              ? '✅ Pilihan tercatat! Klik tombol Lanjut di bawah untuk soal berikutnya.'
                              : '💡 Klik salah satu tong di bawah yang paling tepat untuk sampah ini!'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4 Interactive Waste Bins - All Direct Clickable */}
              <div className="bins-grid" id="waste-bins-container">
                {WASTE_BINS.map((bin) => {
                  const isSelected = selectedCategory === bin.category;
                  const isCorrect = currentItem?.category === bin.category;

                  let statusClass = '';
                  let feedbackBadge = null;

                  if (isAnswered) {
                    if (isSelected && isCorrect) {
                      statusClass = 'bin-card-correct';
                      feedbackBadge = (
                        <div className="bin-feedback-pill bin-feedback-ok">
                          ✅ Jawabanmu Tepat (+10)
                        </div>
                      );
                    } else if (isSelected && !isCorrect) {
                      statusClass = 'bin-card-wrong';
                      feedbackBadge = (
                        <div className="bin-feedback-pill bin-feedback-err">
                          ❌ Pilihanmu (-5)
                        </div>
                      );
                    } else if (!isSelected && isCorrect) {
                      statusClass = 'bin-card-revealed-correct';
                      feedbackBadge = (
                        <div className="bin-feedback-pill bin-feedback-guide">
                          ⭐ Tong yang Benar
                        </div>
                      );
                    }
                  }

                  return (
                    <button
                      key={bin.category}
                      id={`bin-${bin.category}`}
                      type="button"
                      disabled={isAnswered}
                      className={`bin-card bin-${bin.category} ${statusClass}`}
                      onClick={() => handleSort(bin.category)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (!isAnswered) handleSort(bin.category);
                      }}
                      style={{ borderColor: bin.hex }}
                      aria-label={`Pilih ${bin.name} (${bin.colorName})`}
                    >
                      {feedbackBadge}
                      <div className="bin-badge" style={{ backgroundColor: bin.hex }}>
                        {bin.badge}
                      </div>
                      <div className="bin-icon">{bin.icon}</div>
                      <strong className="bin-name">{bin.name}</strong>
                      <span className="bin-destination">{bin.destination}</span>
                      <p className="bin-rule-text">{bin.rule}</p>
                      <div className="bin-action-pill-wrapper">
                        <span className="bin-action-pill">
                          {isAnswered
                            ? (isSelected ? 'Dipilih' : 'Tong Ini')
                            : 'Pilih Tong Ini 👉'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Educational Explanation Drawer & Next Question Button */}
              {lastResult && (
                <div
                  id="result-feedback-box"
                  className={`feedback-box compact-feedback-box ${lastResult.success ? 'feedback-success' : 'feedback-error'}`}
                >
                  <div className="feedback-header">
                    <div className="feedback-header-left">
                      {lastResult.success ? (
                        <>
                          <CheckCircle size={28} className="feedback-icon-ok" />
                          <div>
                            <strong className="feedback-title">Hebat Sekali! Pilihanmu Tepat!</strong>
                            <span className="score-delta-badge plus">+10 Poin</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <HelpCircle size={28} className="feedback-icon-fail" />
                          <div>
                            <strong className="feedback-title">Kurang Tepat, Ayo Pelajari!</strong>
                            <span className="score-delta-badge minus">-5 Poin</span>
                          </div>
                        </>
                      )}
                    </div>

                    <button
                      id="btn-next-question"
                      type="button"
                      className="btn-next-step"
                      onClick={handleNextQuestion}
                      autoFocus
                    >
                      {currentIndex + 1 < deck.length ? (
                        <>
                          Lanjut Soal #{currentIndex + 2} <ArrowRight size={18} />
                        </>
                      ) : (
                        <>
                          Lihat Hasil Akhir (10 Soal) 🏆
                        </>
                      )}
                    </button>
                  </div>

                  <p className="feedback-reason">{lastResult.reason}</p>
                  <div className="feedback-meta">
                    <span className="feedback-tip">💡 <strong>Tips Pahlawan:</strong> {lastResult.tip}</span>
                    <span className="feedback-ref">📖 <em>Referensi: {lastResult.ref}</em></span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Round Completed Screen (10 Questions Summary) */
            <div className="completion-card" id="game-completed-screen">
              <div className="celebration-trophy">
                {roundScore >= 80 ? '🏆🌟' : roundScore >= 50 ? '🥈🌿' : '🥉📖'}
              </div>
              <h3 className="completion-title">
                {roundScore >= 80
                  ? 'Luar Biasa! Ahli Pemilahan Sampah Teladan!'
                  : roundScore >= 50
                  ? 'Bagus Sekali! Pahlawan Cilik Peduli Lingkungan!'
                  : 'Tetap Semangat! Terus Belajar & Berlatih!'}
              </h3>
              <p className="completion-desc">
                Kamu telah menyelesaikan 10 soal acak pemilahan sampah. Setiap sampah yang kamu pilah dengan benar menyelamatkan bumi dan mendukung bank sampah!
              </p>

              {/* Score Breakdown Card */}
              <div className="quiz-final-score-box">
                <div className="final-score-main">
                  <span className="final-score-label">Skor Akhir Ronde Ini</span>
                  <span className={`final-score-num ${roundScore >= 70 ? 'high' : roundScore >= 40 ? 'mid' : 'low'}`}>
                    {roundScore} Poin
                  </span>
                  <div className="final-stars">
                    {roundScore >= 80 ? '⭐⭐⭐ Sempurna!' : roundScore >= 50 ? '⭐⭐ Bagus!' : '⭐ Ayo Terus Berlatih!'}
                  </div>
                </div>

                <div className="final-score-grid">
                  <div className="final-stat-card">
                    <span className="final-stat-val correct">✅ {correctCount} Soal</span>
                    <span className="final-stat-sub">+{correctCount * 10} Poin</span>
                  </div>
                  <div className="final-stat-card">
                    <span className="final-stat-val wrong">❌ {wrongCount} Soal</span>
                    <span className="final-stat-sub">-{wrongCount * 5} Poin</span>
                  </div>
                  <div className="final-stat-card">
                    <span className="final-stat-val">📊 {Math.round((correctCount / deck.length) * 100)}%</span>
                    <span className="final-stat-sub">Tingkat Akurasi</span>
                  </div>
                </div>
              </div>

              {/* Download Score Certificate Buttons (PNG & PDF) */}
              <div className="download-score-box" id="download-score-panel">
                <div className="download-score-header">
                  <Download size={20} className="download-icon" />
                  <strong>Simpan Hasil Skor & Sertifikat:</strong>
                </div>

                {/* Official Certification Author Stamp */}
                <div className="cert-creator-preview">
                  <div className="cert-creator-logo-badge">
                    <img src={MF_LOGO_DATA_URL} alt="Logo Mario Fahmi" className="cert-creator-logo-img" />
                  </div>
                  <div className="cert-creator-info">
                    <span className="cert-creator-badge-tag">Sertifikasi Prestasi Resmi MF</span>
                    <strong className="cert-creator-name">Perancang: Mario Fahmi Syahrial</strong>
                    <small className="cert-creator-note">Logo resmi otomatis tercetak pada sertifikat PNG & PDF</small>
                  </div>
                </div>

                <div className="download-actions-row">
                  <button
                    id="btn-download-score-png"
                    type="button"
                    className="btn-download-action png"
                    onClick={() => {
                      sounds.playClick();
                      downloadScoreAsPNG({
                        userName,
                        userSchool,
                        roundScore,
                        correctCount,
                        wrongCount,
                        totalQuestions: deck.length
                      });
                    }}
                    title="Unduh sertifikat gambar format PNG resolusi tinggi"
                  >
                    <ImageIcon size={18} /> Unduh Gambar (PNG)
                  </button>
                  <button
                    id="btn-download-score-pdf"
                    type="button"
                    className="btn-download-action pdf"
                    onClick={() => {
                      sounds.playClick();
                      downloadScoreAsPDF({
                        userName,
                        userSchool,
                        roundScore,
                        correctCount,
                        wrongCount,
                        totalQuestions: deck.length
                      });
                    }}
                    title="Unduh sertifikat dokumen resmi format PDF cetak A4"
                  >
                    <FileText size={18} /> Unduh Dokumen (PDF)
                  </button>
                </div>
              </div>

              {/* Completion Action Buttons */}
              <div className="completion-actions">
                <button
                  id="btn-restart-game"
                  type="button"
                  className="btn-primary"
                  onClick={handleRestart}
                >
                  <RotateCcw size={18} /> Mainkan Lagi (10 Soal Acak Baru)
                </button>
                <button
                  id="btn-catalog-from-complete"
                  type="button"
                  className="btn-outline-pill"
                  onClick={() => setShowCatalog(true)}
                >
                  <BookOpen size={18} /> Pelajari Ensiklopedia 4 Tong
                </button>
                {onNavigateHome && (
                  <button
                    id="btn-home-from-complete"
                    type="button"
                    className="btn-secondary-pill"
                    onClick={onNavigateHome}
                  >
                    <Home size={18} /> Kembali ke Menu Utama
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Reference Catalog / Encyclopedia View */
        <div className="catalog-view" id="waste-encyclopedia-view">
          <div className="catalog-intro-box">
            <h3 className="catalog-title">
              📚 Ensiklopedia 4 Kode Warna Sampah (Tabel 5 & Lampiran 4)
            </h3>
            <p className="catalog-desc">
              Sistem kode warna adalah standar pemilahan resmi untuk membedakan sampah organik, barang bernilai Bank Sampah, limbah B3 berbahaya, dan residu TPA.
            </p>
          </div>

          <div className="catalog-grid">
            {WASTE_ITEMS.map((item) => {
              const bin = WASTE_BINS.find(b => b.category === item.category);
              return (
                <div key={item.id} className="catalog-card" style={{ borderTop: `4px solid ${bin?.hex}` }}>
                  <div className="catalog-card-header">
                    <span className="catalog-emoji">{item.emoji}</span>
                    <div>
                      <span className="catalog-cat-badge" style={{ backgroundColor: bin?.hex }}>
                        {bin?.badge}
                      </span>
                      <h4 className="catalog-item-title">{item.name}</h4>
                    </div>
                  </div>
                  <p className="catalog-desc-text">{item.description}</p>
                  <div className="catalog-detail">
                    <strong>Mengapa di sini?</strong>
                    <p>{item.reason}</p>
                  </div>
                  <div className="catalog-tip">
                    <span>💡 <strong>Tips Praktis:</strong> {item.tip}</span>
                  </div>
                  <div className="catalog-source">
                    <small>📖 {item.bookReference}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
