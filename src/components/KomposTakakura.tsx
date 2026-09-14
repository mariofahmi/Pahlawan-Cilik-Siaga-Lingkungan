import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TAKAKURA_LAYERS, KOMPOS_DIAGNOSES, TakakuraLayer } from '../data/takakuraData';
import { sounds } from '../soundEffects';
import { speechAssistant } from '../speechAssistant';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Stethoscope, 
  Droplets, 
  ShieldCheck, 
  Thermometer, 
  Wind, 
  Volume2, 
  Award, 
  Flame,
  Check,
  Zap,
  Info
} from 'lucide-react';

interface KomposTakakuraProps {
  onAddPoints: (pts: number) => void;
}

export const KomposTakakura: React.FC<KomposTakakuraProps> = ({ onAddPoints }) => {
  const [activeTab, setActiveTab] = useState<'takakura' | 'dokter' | 'biopori'>('takakura');
  const [selectedLayerLevel, setSelectedLayerLevel] = useState<number>(3); // Default to green layer
  const [exploredLayers, setExploredLayers] = useState<number[]>([3]);
  const [hasClaimedExplorerReward, setHasClaimedExplorerReward] = useState<boolean>(false);
  const [isAerationActive, setIsAerationActive] = useState<boolean>(true);
  const [testedActionLayers, setTestedActionLayers] = useState<number[]>([]);
  const [actionFeedback, setActionFeedback] = useState<{ layerLevel: number; message: string; points: number } | null>(null);

  // Dokter Kompos mini-game state
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);

  const currentCase = KOMPOS_DIAGNOSES[activeCaseIndex];
  const activeLayer = TAKAKURA_LAYERS.find(l => l.level === selectedLayerLevel) || TAKAKURA_LAYERS[0];

  const handleSelectLayer = (level: number) => {
    setSelectedLayerLevel(level);
    sounds.playClick();
    const l = TAKAKURA_LAYERS.find(item => item.level === level);
    if (l) {
      speechAssistant.speak(`Lapisan ${l.level}: ${l.name}. ${l.thickness}. ${l.functionDesc}`);
    }

    if (!exploredLayers.includes(level)) {
      const next = [...exploredLayers, level];
      setExploredLayers(next);
      if (next.length === 5 && !hasClaimedExplorerReward) {
        setHasClaimedExplorerReward(true);
        sounds.playChime();
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 }
        });
        onAddPoints(50);
        setTimeout(() => {
          speechAssistant.speak('Luar biasa! Kamu telah meneliti seluruh 5 lapisan Keranjang Takakura dan meraih gelar Ahli Takakura Cilik!');
        }, 1200);
      }
    }
  };

  const handleExecuteLayerAction = () => {
    const action = activeLayer.interactiveAction;
    sounds.playChime();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 }
    });
    speechAssistant.speak(action.speech);

    const isFirstTime = !testedActionLayers.includes(activeLayer.level);
    const pts = isFirstTime ? action.bonusPoints : 5;
    onAddPoints(pts);
    if (isFirstTime) {
      setTestedActionLayers([...testedActionLayers, activeLayer.level]);
    }

    setActionFeedback({
      layerLevel: activeLayer.level,
      message: action.feedback,
      points: pts
    });

    setTimeout(() => {
      setActionFeedback(prev => (prev?.layerLevel === activeLayer.level ? null : prev));
    }, 6000);
  };

  const handleSpeakActiveLayer = () => {
    sounds.playClick();
    speechAssistant.speak(
      `Lapisan ke ${activeLayer.level}: ${activeLayer.name}. Ketebalan ${activeLayer.thickness}. Bahan: ${activeLayer.material}. Fungsi ilmiah: ${activeLayer.functionDesc}. Tips: ${activeLayer.checkHint}`
    );
  };

  const handleSelectAnswer = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
    sounds.playClick();
  };

  const handleVerifyAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const chosen = currentCase.options[selectedAnswer];

    if (chosen.isCorrect) {
      sounds.playChime();
      onAddPoints(25);
      if (!solvedCases.includes(currentCase.id)) {
        setSolvedCases([...solvedCases, currentCase.id]);
      }
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      speechAssistant.speak(`Hebat, Dokter Kompos cilik! Resep solusimu benar. ${chosen.explanation}`);
    } else {
      sounds.playBoop();
      speechAssistant.speak(`Kurang tepat. Jangan berkecil hati, mari periksa penjelasan resepnya.`);
    }
  };

  const handleNextCase = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setActiveCaseIndex((prev) => (prev + 1) % KOMPOS_DIAGNOSES.length);
    sounds.playClick();
  };

  return (
    <div id="kompos-section" className="module-container">
      {/* Module Header */}
      <div className="module-header">
        <div>
          <h2 className="module-title" id="kompos-title">
            <span className="title-icon">🌱</span> Laboratorium Kompos & Biopori Cilik
          </h2>
          <p className="module-subtitle">
            Pelajari metode legendaris Kompos Takakura Surabaya dan jadilah Dokter Kompos pemecah masalah (Bab 3 & Tabel 6).
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="sub-tab-group" id="kompos-subtabs">
          <button
            type="button"
            className={`sub-tab-btn ${activeTab === 'takakura' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('takakura');
              sounds.playClick();
            }}
          >
            <Layers size={16} /> 5 Lapisan Takakura
          </button>
          <button
            type="button"
            className={`sub-tab-btn ${activeTab === 'dokter' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('dokter');
              sounds.playClick();
            }}
          >
            <Stethoscope size={16} /> Mini Game Dokter Kompos
          </button>
          <button
            type="button"
            className={`sub-tab-btn ${activeTab === 'biopori' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('biopori');
              sounds.playClick();
            }}
          >
            <Droplets size={16} /> Rahasia Biopori IPB
          </button>
        </div>
      </div>

      {/* Tab 1: 5 Layers Takakura */}
      {activeTab === 'takakura' && (
        <div className="takakura-container">
          {/* Mission Progress HUD */}
          <div className="takakura-quest-banner">
            <div className="quest-info">
              <div className="quest-badge-icon">
                <Award size={22} className="text-amber-500" />
              </div>
              <div>
                <h4 className="quest-title">🎯 Misi Penjelajah Takakura Cilik</h4>
                <p className="quest-desc">
                  Teliti seluruh 5 irisan lapisan keranjang untuk memahami rahasia fermentasi aerobik bebas lalat dan tanpa bau!
                </p>
              </div>
            </div>
            <div className="quest-progress-col">
              <div className="quest-progress-header">
                <span className="quest-status-text">
                  {exploredLayers.length === 5 ? '🏆 Ahli Takakura Terbuka!' : `Progres: ${exploredLayers.length} dari 5 Lapisan`}
                </span>
                {exploredLayers.length === 5 && (
                  <span className="bonus-pill">+50 Bintang Diklaim!</span>
                )}
              </div>
              <div className="quest-steps-row">
                {[1, 2, 3, 4, 5].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    className={`quest-step-dot ${exploredLayers.includes(lvl) ? 'completed' : ''} ${selectedLayerLevel === lvl ? 'current' : ''}`}
                    onClick={() => handleSelectLayer(lvl)}
                    title={`Lihat Lapisan ${lvl}`}
                  >
                    {exploredLayers.includes(lvl) ? <Check size={12} /> : lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="takakura-grid" id="takakura-layers-view">
            {/* Left: 3D Woven Basket Visualizer */}
            <div className="takakura-visual-box">
              <div className="takakura-barrel-header">
                <div className="barrel-title-group">
                  <span className="barrel-label">🧺 Keranjang Takakura 3D</span>
                  <span className="barrel-sub">Irisan Penampang Melintang</span>
                </div>
                <div className="barrel-actions-group">
                  <button
                    type="button"
                    className={`aeration-toggle-btn ${isAerationActive ? 'active' : ''}`}
                    onClick={() => {
                      setIsAerationActive(!isAerationActive);
                      sounds.playClick();
                    }}
                    title="Simulasi Sirkulasi Udara Masuk & Keluar"
                  >
                    <Wind size={14} className={isAerationActive ? 'aeration-spin' : ''} />
                    <span>{isAerationActive ? 'Aerasi Aktif' : 'Nyalakan Udara'}</span>
                  </button>
                  <span className="barrel-badge">✨ Bebas Bau & Bebas Lalat</span>
                </div>
              </div>

              {/* Real 3D Woven Basket Vessel */}
              <div className="takakura-basket-frame">
                {/* Wicker basket handles */}
                <div className="basket-ear-handle handle-left"></div>
                <div className="basket-ear-handle handle-right"></div>

                {/* Top Wicker Rim */}
                <div className="basket-top-rim">
                  <span className="wicker-texture-label">Anyaman Bambu Berpori</span>
                  <span className="basket-breath-pill">Sirkulasi O2 Lancar</span>
                </div>

                {/* Top Breathable Cloth Cushion */}
                <div className="basket-cloth-cover">
                  <div className="cloth-pattern"></div>
                  <span className="cloth-label">🧵 Penutup Kain Kasa Katun & Bantalan Sekam</span>
                  {isAerationActive && (
                    <div className="aeration-air-particle particle-top">💨</div>
                  )}
                </div>

                {/* Main 5 Layers Cutaway Section with Depth Ruler */}
                <div className="basket-cutaway-body">
                  {/* Left Scientific Depth Ruler */}
                  <div className="basket-depth-ruler">
                    <span className="ruler-mark mark-40">40cm</span>
                    <div className="ruler-tick"></div>
                    <span className="ruler-mark mark-35">35cm</span>
                    <div className="ruler-tick"></div>
                    <span className="ruler-mark mark-25">25cm</span>
                    <div className="ruler-tick"></div>
                    <span className="ruler-mark mark-15">15cm</span>
                    <div className="ruler-tick"></div>
                    <span className="ruler-mark mark-8">8cm</span>
                    <div className="ruler-tick"></div>
                    <span className="ruler-mark mark-0">0cm</span>
                  </div>

                  {/* 5 Stacked Interactive Layers */}
                  <div className="layers-stack">
                    {TAKAKURA_LAYERS.map((layer) => {
                      const isSelected = selectedLayerLevel === layer.level;
                      const isExplored = exploredLayers.includes(layer.level);
                      return (
                        <button
                          key={layer.level}
                          id={`layer-btn-${layer.level}`}
                          type="button"
                          className={`layer-slice layer-lvl-${layer.level} ${isSelected ? 'active-layer' : ''}`}
                          style={{
                            background: layer.gradient,
                            borderColor: isSelected ? '#ffffff' : 'rgba(255,255,255,0.25)'
                          }}
                          onClick={() => handleSelectLayer(layer.level)}
                        >
                          {/* Steam micro-animation for hot bio-reacting layers */}
                          {layer.level === 3 && (
                            <div className="layer-steam-fx" title="Suhu Hangat Termofilik 50-60°C">
                              <span className="steam-icon s1">♨️</span>
                              <span className="steam-icon s2">♨️</span>
                            </div>
                          )}

                          {/* Microbe micro-animation for starter layer */}
                          {layer.level === 2 && (
                            <div className="layer-microbe-fx" title="Bakteri Pengurai EM4 Aktif">
                              <span className="microbe-sparkle m1">✨</span>
                              <span className="microbe-sparkle m2">🦠</span>
                            </div>
                          )}

                          {/* Aeration breeze indicators for bottom layer */}
                          {layer.level === 1 && isAerationActive && (
                            <div className="layer-aeration-fx" title="Udara Segar dari Bawah">
                              <span className="air-stream a1">💨</span>
                              <span className="air-stream a2">🫧</span>
                            </div>
                          )}

                          <div className="layer-left-info">
                            <span className="layer-level-pill">
                              Tingkat {layer.level}
                            </span>
                            <span className="layer-icon-title">
                              <span className="layer-emoji-icon">{layer.icon}</span>
                              <span className="layer-name-text">{layer.name}</span>
                            </span>
                          </div>

                          <div className="layer-right-info">
                            <span className="layer-thick-tag">{layer.thickness}</span>
                            {isExplored && (
                              <span className="layer-explored-badge" title="Telah diteliti">
                                <Check size={12} />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Aeration Slats & Stand */}
                <div className="basket-bottom-stand">
                  <div className="aeration-vents-row">
                    <span className="vent-slot"></span>
                    <span className="vent-slot"></span>
                    <span className="vent-slot"></span>
                    <span className="vent-slot"></span>
                    <span className="vent-slot"></span>
                    <span className="vent-slot"></span>
                  </div>
                  <div className="stand-label-row">
                    <span>🪵 Kaki Penyangga Aerasi Udara Bawah (Alas Terangkat 5-10 cm)</span>
                  </div>
                </div>
              </div>

              <div className="basket-footer-tip">
                <Info size={14} />
                <span>Klik tiap lapisan untuk memeriksa parameter sains, suhu mikrobiologi, dan bahan materialnya.</span>
              </div>
            </div>

            {/* Right: Layer Scientific Laboratory Dossier */}
            <div className="layer-inspect-box">
              {/* Dossier Header */}
              <div 
                className="inspect-header"
                style={{ 
                  background: `linear-gradient(135deg, ${activeLayer.color}15, ${activeLayer.accentColor}08)`,
                  borderLeft: `6px solid ${activeLayer.color}` 
                }}
              >
                <div className="inspect-icon-huge-wrap" style={{ background: `${activeLayer.color}20` }}>
                  <span className="inspect-icon-huge">{activeLayer.icon}</span>
                  <span className="inspect-level-circle" style={{ background: activeLayer.color }}>
                    {activeLayer.level}
                  </span>
                </div>

                <div className="inspect-header-content">
                  <div className="inspect-tag-row">
                    <span className="inspect-badge">Tingkat {activeLayer.level} dari 5</span>
                    <span className="inspect-sci-pill" style={{ color: activeLayer.color, borderColor: `${activeLayer.color}40` }}>
                      {activeLayer.scientificTag}
                    </span>
                  </div>
                  <h3 className="inspect-title">{activeLayer.name}</h3>
                  <div className="inspect-meta-row">
                    <span className="inspect-thickness">
                      Ketebalan: <strong>{activeLayer.thickness}</strong>
                    </span>
                    <span className="inspect-depth">
                      Posisi: <strong>{activeLayer.depthRange}</strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="inspect-audio-btn"
                  onClick={handleSpeakActiveLayer}
                  title="Dengarkan Suara Penjelasan"
                >
                  <Volume2 size={18} />
                  <span>Suara</span>
                </button>
              </div>

              <div className="inspect-body">
                {/* Live Science Parameter HUD (4 Metrics) */}
                <div className="science-hud-grid">
                  {/* Metric 1: Temperature */}
                  <div className="hud-metric-card">
                    <div className="hud-metric-top">
                      <span className="hud-metric-label">
                        <Thermometer size={15} className="text-red-500" /> Suhu Kerja
                      </span>
                      <span className="hud-metric-val">{activeLayer.metrics.tempText.split(' ')[0]}</span>
                    </div>
                    <div className="hud-meter-track">
                      <div 
                        className="hud-meter-fill fill-temp"
                        style={{ width: `${activeLayer.metrics.tempPercent}%` }}
                      ></div>
                    </div>
                    <span className="hud-metric-sub">{activeLayer.metrics.tempText}</span>
                  </div>

                  {/* Metric 2: Moisture */}
                  <div className="hud-metric-card">
                    <div className="hud-metric-top">
                      <span className="hud-metric-label">
                        <Droplets size={15} className="text-sky-500" /> Kelembaban
                      </span>
                      <span className="hud-metric-val">{activeLayer.metrics.moistureText.split(' ')[0]}</span>
                    </div>
                    <div className="hud-meter-track">
                      <div 
                        className="hud-meter-fill fill-moist"
                        style={{ width: `${activeLayer.metrics.moisturePercent}%` }}
                      ></div>
                    </div>
                    <span className="hud-metric-sub">{activeLayer.metrics.moistureText}</span>
                  </div>

                  {/* Metric 3: Odor Index */}
                  <div className="hud-metric-card">
                    <div className="hud-metric-top">
                      <span className="hud-metric-label">
                        <ShieldCheck size={15} className="text-emerald-500" /> Status Bau
                      </span>
                      <span className="hud-metric-val tag-safe">0% Bebas Bau</span>
                    </div>
                    <div className="hud-meter-track">
                      <div className="hud-meter-fill fill-odor" style={{ width: '100%' }}></div>
                    </div>
                    <span className="hud-metric-sub">{activeLayer.metrics.odorText}</span>
                  </div>

                  {/* Metric 4: Microbe Vitality */}
                  <div className="hud-metric-card">
                    <div className="hud-metric-top">
                      <span className="hud-metric-label">
                        <Sparkles size={15} className="text-amber-500" /> Bio-Aktivitas
                      </span>
                      <span className="hud-metric-val text-amber-600">Aktif Aerob</span>
                    </div>
                    <div className="hud-meter-track">
                      <div className="hud-meter-fill fill-bio" style={{ width: '92%' }}></div>
                    </div>
                    <span className="hud-metric-sub">{activeLayer.metrics.microbesText}</span>
                  </div>
                </div>

                {/* Visual Material Chips Section */}
                <div className="inspect-section materials-section">
                  <div className="section-title-row">
                    <h4>🧪 Bahan Material yang Digunakan:</h4>
                    <span className="section-sub-hint">Komposisi Resmi Takakura</span>
                  </div>
                  <div className="materials-chips-grid">
                    {activeLayer.materialsList.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="material-chip-item"
                        onClick={() => {
                          sounds.playPop();
                          speechAssistant.speak(`${item.name}. ${item.desc}`);
                        }}
                        title={`${item.desc} (Klik untuk dengar)`}
                      >
                        <span className="material-chip-icon">{item.icon}</span>
                        <div className="material-chip-texts">
                          <strong className="material-chip-name">{item.name}</strong>
                          <span className="material-chip-desc">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scientific Function Section */}
                <div className="inspect-section">
                  <h4>🎯 Fungsi & Cara Kerja Ilmiah:</h4>
                  <div className="function-card-box">
                    <p>{activeLayer.functionDesc}</p>
                  </div>
                </div>

                {/* Interactive Action Simulator Button */}
                <div className="layer-action-trigger-box">
                  <div className="action-trigger-info">
                    <span className="action-trigger-badge">🔬 Simulasi Perawatan Lapisan</span>
                    <p className="action-trigger-lead">
                      Uji coba tindakan perawatan pada lapisan ini untuk mengoptimalkan mikroba pengurai:
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-interactive-action"
                    style={{ background: activeLayer.gradient }}
                    onClick={handleExecuteLayerAction}
                  >
                    <span className="action-btn-icon">{activeLayer.interactiveAction.icon}</span>
                    <span className="action-btn-text">{activeLayer.interactiveAction.label}</span>
                    <span className="action-btn-bonus">
                      +{testedActionLayers.includes(activeLayer.level) ? 5 : activeLayer.interactiveAction.bonusPoints} ⭐
                    </span>
                  </button>

                  {/* Feedback Toast upon action */}
                  {actionFeedback && actionFeedback.layerLevel === activeLayer.level && (
                    <div className="action-toast-banner">
                      <Sparkles size={20} className="toast-sparkle text-amber-500" />
                      <div className="toast-text-col">
                        <strong>Simulasi Sukses (+{actionFeedback.points} Bintang Lingkungan)!</strong>
                        <p>{actionFeedback.message}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hero Tip Card */}
                <div className="inspect-hint-card">
                  <div className="hint-icon-badge">
                    <ShieldCheck size={22} color="#15803d" />
                  </div>
                  <div className="hint-text-col">
                    <strong>Tips Pahlawan Cilik:</strong>
                    <p>{activeLayer.checkHint}</p>
                  </div>
                </div>

                {/* Surabaya 2005 Eco-Heritage Fact Note */}
                <div className="surabaya-history-note">
                  <div className="history-note-badge">
                    <span>🇮🇩 ARSIP INOVASI SURABAYA</span>
                  </div>
                  <p>
                    <strong>Fakta Sejarah (Buku Bab 3.7):</strong> Sejak 2005 di Surabaya, metode Takakura hasil rancangan Mr. Koji Takakura (Kitakyushu, Jepang) bersama Pemkot Surabaya dan fasilitator lingkungan berhasil melatih lebih dari <strong>28.000 pemimpin komunitas</strong> dan <strong>400 fasilitator</strong>, memangkas puluhan ribu ton sampah organik dapur per tahun tanpa bau sama sekali!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Dokter Kompos Diagnostic Game */}
      {activeTab === 'dokter' && (
        <div className="dokter-game-container" id="dokter-kompos-view">
          <div className="clinic-header">
            <div className="clinic-avatar">🩺🧑‍⚕️</div>
            <div>
              <h3 className="clinic-title">Klinik Dokter Kompos (Tabel 6 Pemecahan Masalah)</h3>
              <p className="clinic-desc">
                Pasien komposter warga sedang bermasalah! Analisa gejalanya dan berikan solusi perawatan yang tepat.
              </p>
            </div>
            <div className="solved-badge">
              Kasus Selesai: {solvedCases.length} / {KOMPOS_DIAGNOSES.length}
            </div>
          </div>

          <div className="patient-case-card">
            <div className="patient-symptom-tag">
              <span className="symptom-emoji">{currentCase.symptomEmoji}</span>
              <h4>{currentCase.symptomTitle}</h4>
            </div>

            <p className="patient-desc">{currentCase.description}</p>

            <h4 className="options-prompt">Pilih Resep Penanganan Paling Tepat:</h4>

            <div className="options-list">
              {currentCase.options.map((opt, i) => (
                <button
                  key={i}
                  id={`opt-btn-${i}`}
                  type="button"
                  className={`option-card ${selectedAnswer === i ? 'selected' : ''} ${
                    isAnswerSubmitted && opt.isCorrect ? 'correct' : ''
                  } ${isAnswerSubmitted && selectedAnswer === i && !opt.isCorrect ? 'wrong' : ''}`}
                  onClick={() => handleSelectAnswer(i)}
                  disabled={isAnswerSubmitted}
                >
                  <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="opt-text">{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Verification Button & Feedback */}
            {!isAnswerSubmitted ? (
              <button
                id="btn-verify-prescription"
                type="button"
                className="btn-primary"
                disabled={selectedAnswer === null}
                onClick={handleVerifyAnswer}
              >
                <Sparkles size={18} /> Berikan Resep Solusi (+25 Bintang)
              </button>
            ) : (
              <div className="prescription-feedback">
                <div className={`feedback-banner ${currentCase.options[selectedAnswer || 0].isCorrect ? 'banner-ok' : 'banner-err'}`}>
                  {currentCase.options[selectedAnswer || 0].isCorrect ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <HelpCircle size={24} />
                  )}
                  <div>
                    <strong>{currentCase.options[selectedAnswer || 0].isCorrect ? 'Diagnosa Tepat!' : 'Periksa Kembali!'}</strong>
                    <p>{currentCase.options[selectedAnswer || 0].explanation}</p>
                  </div>
                </div>

                <button
                  id="btn-next-case"
                  type="button"
                  className="btn-primary"
                  onClick={handleNextCase}
                >
                  Kasus Pasien Berikutnya ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Rahasia Biopori IPB */}
      {activeTab === 'biopori' && (
        <div className="biopori-view" id="biopori-guide-view">
          <div className="biopori-hero-card">
            <div className="biopori-diagram-col">
              <div className="biopori-illustration">
                <div className="biopori-cap">Penutup Berlubang Resapan Air 🌧️</div>
                <div className="biopori-tube">
                  <div className="tube-label">Pipa Silinder Biopori (80 - 100 cm)</div>
                  <div className="organic-feed-anim">🍂 🍌 🥕 Sampah Organik Masuk</div>
                  <div className="worm-anim">🪱 Mikroba Tanah & Cacing Mengurai</div>
                </div>
                <div className="biopori-ground">Lapisan Air Tanah Subur 💧</div>
              </div>
            </div>

            <div className="biopori-info-col">
              <span className="badge-pill">Inovasi Indonesia: Dr. Kamir Raziudin Brata (IPB)</span>
              <h3>Mengapa Lubang Biopori Begitu Sakti?</h3>
              <p>
                Berdasarkan Bab 3.8.2 buku, biopori adalah teknologi sederhana namun dahsyat untuk rumah dengan lahan pekarangan sempit:
              </p>

              <ul className="biopori-benefits-list">
                <li>
                  <strong>Mencegah Genangan & Banjir:</strong> Lubang vertikal mempercepat penyerapan air hujan langsung ke cadangan air tanah.
                </li>
                <li>
                  <strong>Membuat Kompos Alami Otomatis:</strong> Sampah dapur yang dimasukkan ke dalam lubang diurai secara alami oleh fauna tanah tanpa perlu diaduk manual.
                </li>
                <li>
                  <strong>Mengurangi Sampah Organik Hingga 20%:</strong> Menuntaskan sampah dapur langsung di halaman rumah sendiri tanpa membebani truk sampah kota.
                </li>
              </ul>

              <div className="biopori-steps-box">
                <h4>7 Langkah Cepat Pasang Biopori:</h4>
                <ol>
                  <li>Pilih lokasi tanah becek / dekat pohon (jauhkan 1 meter dari pondasi).</li>
                  <li>Siapkan bor tanah biopori dan pipa PVC berlubang.</li>
                  <li>Bor tanah tegak sedalam 80-100 cm dengan diameter 10-30 cm.</li>
                  <li>Masukkan pipa PVC dan isi dengan sampah organik sampai 3/4 penuh.</li>
                  <li>Pasang penutup atas berlubang agar udara dan hujan masuk.</li>
                  <li>Isi ulang setiap minggu saat sampah menyusut.</li>
                  <li>Panen kompos matang setiap 2-3 bulan sekali!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
