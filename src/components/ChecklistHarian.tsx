import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CHECKLIST_TASKS, DAYS_OF_WEEK } from '../data/checklistData';
import { sounds } from '../soundEffects';
import { speechAssistant } from '../speechAssistant';
import { generateHabitEvaluation, HabitEvaluation } from '../utils/habitAdvisor';
import { MF_LOGO_DATA_URL } from '../assets/logoBase64';
import {
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Flame,
  Award,
  Lightbulb,
  BookOpen,
  Edit3,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ChecklistHarianProps {
  onAddPoints: (pts: number) => void;
}

export const ChecklistHarian: React.FC<ChecklistHarianProps> = ({ onAddPoints }) => {
  const [selectedDay, setSelectedDay] = useState<string>('sen');

  // Completed task IDs per day
  const [completedMap, setCompletedMap] = useState<Record<string, string[]>>({
    sen: ['t-1', 't-2', 't-3'],
    sel: ['t-1', 't-2'],
    rab: ['t-1'],
    kam: [],
    jum: [],
    sab: [],
    min: []
  });

  // Track confirmation state per day
  const [confirmedDays, setConfirmedDays] = useState<Record<string, boolean>>({
    sen: false,
    sel: false,
    rab: false,
    kam: false,
    jum: false,
    sab: false,
    min: false
  });

  // Track points already claimed per day to avoid duplicate awards
  const [claimedPointsMap, setClaimedPointsMap] = useState<Record<string, number>>({});

  // Modal & Drawer visibility
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showDetailedTips, setShowDetailedTips] = useState<boolean>(false);

  const dayCompleted = completedMap[selectedDay] || [];
  const isDayConfirmed = Boolean(confirmedDays[selectedDay]);
  const dailyProgress = Math.round((dayCompleted.length / CHECKLIST_TASKS.length) * 100);

  // Total weekly completed count
  const totalWeeklyCompleted = Object.values(completedMap).reduce((acc, curr) => acc + curr.length, 0);
  const totalPossible = CHECKLIST_TASKS.length * 7;
  const weeklyProgress = Math.round((totalWeeklyCompleted / totalPossible) * 100);

  // Generate real-time pedagogical evaluation for the selected day
  const currentEvaluation: HabitEvaluation = generateHabitEvaluation(selectedDay, dayCompleted);

  /**
   * Toggles task completion for the current active day.
   */
  const handleToggleTask = (taskId: string) => {
    const isCurrentlyDone = dayCompleted.includes(taskId);
    let updatedTasks: string[];

    if (isCurrentlyDone) {
      updatedTasks = dayCompleted.filter((id) => id !== taskId);
      sounds.playClick();
    } else {
      updatedTasks = [...dayCompleted, taskId];
      sounds.playChime();
    }

    setCompletedMap({
      ...completedMap,
      [selectedDay]: updatedTasks
    });

    // If user changes a previously confirmed day, mark as unconfirmed so they re-evaluate
    if (isDayConfirmed) {
      setConfirmedDays((prev) => ({
        ...prev,
        [selectedDay]: false
      }));
    }
  };

  /**
   * User explicitly confirms their habit checklist for the day.
   * Awards bonus points, triggers celebratory feedback, and saves confirmed state.
   */
  const handleConfirmSave = () => {
    const previousClaimed = claimedPointsMap[selectedDay] || 0;
    const currentEarned = currentEvaluation.earnedPoints;
    const netPoints = Math.max(0, currentEarned - previousClaimed);

    if (netPoints > 0) {
      onAddPoints(netPoints);
    }

    setClaimedPointsMap((prev) => ({
      ...prev,
      [selectedDay]: currentEarned
    }));

    setConfirmedDays((prev) => ({
      ...prev,
      [selectedDay]: true
    }));

    setShowConfirmModal(false);
    sounds.playSuccess();

    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.65 }
    });

    speechAssistant.speak(
      `Hebat! Catatan kebiasaan hari ${currentEvaluation.dayLabel} telah resmi kamu konfirmasi. ${currentEvaluation.mainEvaluation}`
    );
  };

  const handleEditAgain = () => {
    setConfirmedDays((prev) => ({
      ...prev,
      [selectedDay]: false
    }));
    sounds.playClick();
  };

  return (
    <div id="checklist-section" className="module-container">
      {/* Header */}
      <div className="module-header">
        <div>
          <h2 className="module-title" id="checklist-title">
            <span className="title-icon">📋</span> Pelacak Kebiasaan 3R Harian
          </h2>
          <p className="module-subtitle">
            Berdasarkan Tabel 7: <em>"Jangan sempurnakan, konsistenkan. Lebih baik memilah 70% konsisten daripada 95% hanya sebulan."</em> (James Clear, 2018)
          </p>
        </div>
      </div>

      {/* Week Day Selector Tabs */}
      <div className="day-selector-strip" id="day-selector-bar">
        {DAYS_OF_WEEK.map((d) => {
          const count = (completedMap[d.key] || []).length;
          const isAllDone = count === CHECKLIST_TASKS.length;
          const isConfirmed = Boolean(confirmedDays[d.key]);

          return (
            <button
              key={d.key}
              id={`day-btn-${d.key}`}
              type="button"
              className={`day-tab-pill ${selectedDay === d.key ? 'active' : ''} ${isAllDone ? 'all-done' : ''} ${isConfirmed ? 'is-confirmed' : ''}`}
              onClick={() => {
                setSelectedDay(d.key);
                sounds.playClick();
              }}
            >
              <span className="day-name">{d.label}</span>
              <span className="day-count-badge">
                {count}/{CHECKLIST_TASKS.length}
              </span>
              {isConfirmed && (
                <span className="day-tab-confirmed-badge" title="Telah dikonfirmasi">
                  ✓ Yakin
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2-Column Dashboard Layout: Left = Tasks & Daily Progress; Right = Official Kartu Hasil Evaluasi 3R */}
      <div className="checklist-dashboard-grid" id="checklist-dashboard">
        {/* Left Column: Target & Checklist Tasks */}
        <div className="checklist-col-tasks">
          {/* Daily Progress Overview */}
          <div className="checklist-progress-card">
            <div className="progress-info-col">
              <div className="progress-title-row">
                <h4>
                  Target Hari {currentEvaluation.dayLabel}: {dayCompleted.length} dari {CHECKLIST_TASKS.length} Kebiasaan
                </h4>
                <span className="progress-percentage-label">{dailyProgress}%</span>
              </div>
              <div className="progress-track-bg">
                <div className="progress-track-fill" style={{ width: `${dailyProgress}%` }} />
              </div>
            </div>

            <div className="weekly-streak-badge">
              <Flame size={18} color="#f97316" />
              <div>
                <strong>{totalWeeklyCompleted} Aksi</strong>
                <small>Minggu Ini ({weeklyProgress}%)</small>
              </div>
            </div>
          </div>

          {/* Checklist Tasks List */}
          <div className="checklist-tasks-grid" id="tasks-list-container">
            {CHECKLIST_TASKS.map((task) => {
              const isDone = dayCompleted.includes(task.id);
              return (
                <div
                  key={task.id}
                  id={`task-card-${task.id}`}
                  className={`task-row-card ${isDone ? 'task-done' : ''}`}
                  onClick={() => handleToggleTask(task.id)}
                >
                  <button
                    type="button"
                    className={`task-checkbox-circle ${isDone ? 'checked' : ''}`}
                    aria-label={`Tandai ${task.title}`}
                  >
                    {isDone ? <CheckCircle2 size={20} color="#16a34a" /> : <div className="checkbox-empty" />}
                  </button>

                  <div className="task-body">
                    <div className="task-meta-top">
                      <span className="task-category-badge" style={{ backgroundColor: task.tagColor }}>
                        {task.emoji} {task.category}
                      </span>
                      <span className="task-point-reward">+{task.points} Bintang</span>
                    </div>
                    <h4 className="task-title-text">{task.title}</h4>
                    <p className="task-desc-text">{task.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: KARTU HASIL PELACAK KEBIASAAN 3R HARIAN (Always Visible & Live!) */}
        <div className="checklist-col-result" id="checklist-result-card-col">
          <div className={`habit-result-card ${isDayConfirmed ? 'result-confirmed' : 'result-live'}`} id="habit-result-card">
            {/* Header Result Card */}
            <div className="result-card-header">
              <div className="result-header-badge-row">
                <span className="result-author-tag">
                  <img src={MF_LOGO_DATA_URL} alt="MF Logo" className="result-mf-mini" /> Panduan Mario Fahmi Syahrial
                </span>
                <span className={`result-status-pill ${isDayConfirmed ? 'status-confirmed' : 'status-draft'}`}>
                  {isDayConfirmed ? '✓ Terkonfirmasi & Disimpan' : '⏳ Menunggu Konfirmasi'}
                </span>
              </div>
              <h3 className="result-card-title">
                🏆 Kartu Hasil Evaluasi Hari {currentEvaluation.dayLabel}
              </h3>
            </div>

            {/* Achievement & Stars Summary */}
            <div className="result-achievement-banner">
              <div className="result-badge-avatar">
                <span className="result-badge-emoji">{currentEvaluation.badgeEmoji}</span>
              </div>
              <div className="result-badge-info">
                <span className="result-badge-label">Gelar Capaian Hari Ini:</span>
                <h4 className="result-badge-name">{currentEvaluation.badgeTitle}</h4>
                <div className="result-stats-row">
                  <span className="result-stat-chip chip-stars">⭐ +{currentEvaluation.earnedPoints} Bintang</span>
                  <span className="result-stat-chip chip-consistency">📈 {currentEvaluation.percentage}% Konsisten</span>
                  <span className="result-stat-chip chip-done">✅ {currentEvaluation.completedCount}/{currentEvaluation.totalCount} Aksi</span>
                </div>
              </div>
            </div>

            {/* Main Evaluation & Pedagogical Feedback */}
            <div className="result-eval-body">
              <div className="result-eval-text-box">
                <span className="eval-sub-title">🎯 Catatan Evaluasi Ilmiah:</span>
                <p className="result-eval-paragraph">{currentEvaluation.mainEvaluation}</p>
              </div>

              {/* Action Advice for Tomorrow */}
              <div className="result-recommendation-box">
                <div className="recommendation-header">
                  <Lightbulb size={16} className="text-amber-500" />
                  <strong>Rekomendasi Aksi Esok Hari:</strong>
                </div>
                <p>{currentEvaluation.actionAdvice}</p>
              </div>

              {/* Book Quote */}
              <div className="result-book-quote">
                <BookOpen size={14} className="flex-shrink-0" />
                <span>{currentEvaluation.bookQuote}</span>
              </div>
            </div>

            {/* Action Buttons in Result Card */}
            <div className="result-card-footer">
              {!isDayConfirmed ? (
                <button
                  type="button"
                  id="btn-confirm-from-result-card"
                  className="btn-result-confirm"
                  onClick={() => {
                    sounds.playClick();
                    setShowConfirmModal(true);
                  }}
                >
                  <HelpCircle size={18} /> Apakah Sudah Yakin? Konfirmasi (+{currentEvaluation.earnedPoints} ⭐)
                </button>
              ) : (
                <div className="result-confirmed-actions-row">
                  <button
                    type="button"
                    className="btn-result-view-detail"
                    onClick={() => {
                      sounds.playClick();
                      setShowConfirmModal(true);
                    }}
                  >
                    <Sparkles size={16} /> Buka Rincian Saran Per Tugas
                  </button>
                  <button
                    type="button"
                    className="btn-result-edit"
                    onClick={handleEditAgain}
                    title="Ubah centang kebiasaan hari ini"
                  >
                    <Edit3 size={15} /> Ubah
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation & Advice Modal Dialog */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div
            className="habit-eval-modal-card"
            onClick={(e) => e.stopPropagation()}
            id="modal-confirm-habit"
          >
            {/* Modal Top Bar */}
            <div className="modal-card-top-bar">
              <span className="eval-top-badge">
                🌱 Evaluasi & Konfirmasi Hari {currentEvaluation.dayLabel}
              </span>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowConfirmModal(false)}
                aria-label="Tutup modal"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="eval-modal-title">
              <HelpCircle size={26} color="#059669" /> Apakah Kamu Sudah Yakin dengan Jawabanmu?
            </h3>
            <p className="eval-modal-desc">
              Periksa kembali kebiasaan 3R yang telah kamu jalankan hari ini. Kejujuran dan konsistensi adalah kunci utama menjadi Pahlawan Cilik Lingkungan!
            </p>

            {/* Score & Consistency Stat Counters */}
            <div className="eval-stats-grid">
              <div className="eval-stat-box">
                <span className="eval-stat-val green">
                  {currentEvaluation.completedCount} / {currentEvaluation.totalCount}
                </span>
                <span className="eval-stat-lbl">Tugas Terlaksana</span>
              </div>
              <div className="eval-stat-box">
                <span className="eval-stat-val blue">{currentEvaluation.percentage}%</span>
                <span className="eval-stat-lbl">Tingkat Konsistensi</span>
              </div>
              <div className="eval-stat-box">
                <span className="eval-stat-val gold">+{currentEvaluation.earnedPoints}</span>
                <span className="eval-stat-lbl">Bonus Bintang</span>
              </div>
            </div>

            {/* Tasks Breakdown Chips */}
            <div className="eval-section-heading">
              <h4>
                <CheckCircle2 size={18} color="#10b981" /> Rincian Pilihan Hari Ini:
              </h4>
              <span className="eval-section-badge" style={{ background: '#ecfdf5', color: '#047857' }}>
                {currentEvaluation.doneItems.length} Selesai • {currentEvaluation.todoItems.length} Belum
              </span>
            </div>

            <div className="eval-task-chips-grid">
              {currentEvaluation.detailedItems.map((item) => (
                <div key={item.taskId} className={`eval-task-row ${item.isDone ? 'done' : 'todo'}`}>
                  <div className="eval-task-left">
                    <span>{item.emoji}</span>
                    <strong>{item.taskTitle}</strong>
                  </div>
                  <div className="eval-task-status-tag">
                    {item.isDone ? (
                      <>
                        <CheckCircle2 size={16} color="#16a34a" /> Terlaksana
                      </>
                    ) : (
                      <>
                        <Clock size={16} color="#d97706" /> Belum
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Personalized Advice Card */}
            <div className={`eval-advice-card ${currentEvaluation.badgeClass}`}>
              <div className="eval-advice-header">
                <h3>
                  <span>{currentEvaluation.badgeEmoji}</span> {currentEvaluation.badgeTitle}
                </h3>
              </div>

              <p className="eval-main-text">{currentEvaluation.mainEvaluation}</p>

              <div className="eval-action-recommendation">
                <strong>
                  <Lightbulb size={18} /> Saran Edukasi & Rekomendasi Prioritas:
                </strong>
                <p>{currentEvaluation.actionAdvice}</p>
              </div>

              <div className="eval-quote-strip">
                <BookOpen size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{currentEvaluation.bookQuote}</span>
              </div>
            </div>

            {/* Toggle Detailed Tips per Task */}
            <div style={{ marginBottom: '1.25rem' }}>
              <button
                type="button"
                className="btn-recheck-trigger"
                onClick={() => setShowDetailedTips(!showDetailedTips)}
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} color="#059669" />
                  <strong>Lihat Saran Khusus Tiap Tugas Berdasarkan Buku Panduan</strong>
                </span>
                {showDetailedTips ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>

            {/* Detailed Tips List */}
            {showDetailedTips && (
              <div className="eval-tips-detail-grid">
                {currentEvaluation.detailedItems.map((item) => (
                  <div key={item.taskId} className="eval-tip-card">
                    <span className="eval-tip-icon">{item.emoji}</span>
                    <div className="eval-tip-content">
                      <div className="eval-tip-title-row">
                        <span className="eval-tip-title">{item.taskTitle}</span>
                        <span
                          className="eval-tip-badge"
                          style={{
                            background: item.isDone ? '#dcfce7' : '#fef3c7',
                            color: item.isDone ? '#166534' : '#92400e'
                          }}
                        >
                          {item.isDone ? 'Sudah Dijalankan' : 'Saran Praktis'}
                        </span>
                      </div>
                      <p className="eval-tip-msg">{item.message}</p>
                      <span className="eval-tip-ref">📖 {item.bookRef}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Actions */}
            <div className="eval-modal-actions">
              <button
                id="btn-eval-edit-return"
                type="button"
                className="btn-eval-cancel-edit"
                onClick={() => {
                  sounds.playClick();
                  setShowConfirmModal(false);
                }}
              >
                <Edit3 size={17} /> Belum Yakin, Mau Ubah Pilihan
              </button>

              <button
                id="btn-eval-confirm-final"
                type="button"
                className="btn-eval-confirm-yes"
                onClick={handleConfirmSave}
              >
                <CheckCircle2 size={20} /> Ya, Saya Sudah Yakin! Simpan & Klaim Bintang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
