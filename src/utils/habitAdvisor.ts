/**
 * Habit Advisor & Recommendation Engine
 * Generates personalized pedagogical advice based on 3R daily checklist responses.
 * Grounded in Mario Fahmi Syahrial's Guidebook:
 * "Dari Tempat Sampah ke Tabungan: Mengelola Sampah Rumah Tangga Menjadi Peluang Ekonomi"
 */

import { CHECKLIST_TASKS, DAYS_OF_WEEK } from '../data/checklistData';

export interface HabitAdviceItem {
  taskId: string;
  taskTitle: string;
  category: string;
  emoji: string;
  tagColor: string;
  isDone: boolean;
  message: string;
  bookRef: string;
}

export interface HabitEvaluation {
  dayKey: string;
  dayLabel: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
  earnedPoints: number;
  badgeTitle: string;
  badgeEmoji: string;
  badgeClass: 'perfect' | 'great' | 'good' | 'start';
  mainEvaluation: string;
  actionAdvice: string;
  bookQuote: string;
  detailedItems: HabitAdviceItem[];
  doneItems: HabitAdviceItem[];
  todoItems: HabitAdviceItem[];
}

const TASK_SPECIFIC_ADVICE: Record<string, { done: string; todo: string; ref: string }> = {
  't-1': {
    done: 'Hebat! Pemilahan sisa organik di dapur adalah kunci utama agar 60% sampah rumah tangga tidak membusuk di TPA.',
    todo: 'Saran Praktis: Sediakan wadah kecil bertutup di dekat bak cuci piring khusus sisa sayur dan buah sebelum terlanjur tercampur plastik.',
    ref: 'Buku Panduan Hal. 24 & Tabel 5: Standar Wadah Hijau Organik'
  },
  't-2': {
    done: 'Keren! Membawa tas kain & tumbler langsung menghentikan timbulan sampah plastik baru dari sumbernya (Prinsip Reduce).',
    todo: 'Saran Praktis: Selipkan satu kantong belanja lipat di dalam tas sekolah malam ini agar selalu siap saat jajan di minimarket.',
    ref: 'Buku Panduan Bab 2.1: Hierarki Pengurangan Sampah dari Sumber'
  },
  't-3': {
    done: 'Mantap! Botol & kaleng yang bersih serta kering memiliki nilai jual tertinggi di Bank Sampah dan tidak mengundang lalat.',
    todo: 'Saran Praktis: Bilas sebentar dengan sisa air cucian piring, lalu remas/injak botol hingga pipih sebelum masuk karung pilah.',
    ref: 'Buku Panduan Bab 4.2: Standar Mutu Penyetoran Bank Sampah'
  },
  't-4': {
    done: 'Luar biasa! Lapisan coklat (karbon) menjaga komposter Takakura bekerja optimal tanpa bau busuk menyengat.',
    todo: 'Saran Praktis: Siapkan toples/karung kecil berisi sekam padi atau daun kering. Taburkan 1 genggam setiap memasukkan sisa makanan.',
    ref: 'Buku Panduan Bab 5.1 & Tabel 6: Resep Komposter Takakura'
  },
  't-5': {
    done: 'Sangat bijak! Air cucian beras mengandung vitamin B1 dan mineral alami yang menyuburkan mikroba tanah tanaman.',
    todo: 'Saran Praktis: Jangan langsung buang air bilasan beras ke wastafel; tampung di gayung lalu siramkan ke pot tanaman bunga di teras.',
    ref: 'Buku Panduan Bab 5.3: Pemanfaatan Limbah Cair Organik Domestik'
  },
  't-6': {
    done: 'Aksi pahlawan sejati! Logam berat berbahaya (merkuri, timbal, kadmium) berhasil dicegah dari mencemari air tanah warga.',
    todo: 'Saran Khusus (PENTING): Jangan pernah membuang baterai bekas ke tempat sampah biasa! Simpan di toples kaca berlabel B3 (Wadah Merah).',
    ref: 'Buku Panduan Bab 2.4 & Lampiran 4: Standar Penanganan Limbah B3 E-Waste'
  },
  't-7': {
    done: 'Bagus sekali! Pengadukan menjaga komposter tetap aerob dan suhunya hangat, tanda bakteri baik aktif mendaur ulang sampah.',
    todo: 'Saran Praktis: Luangkan 30 detik setiap pagi untuk mengaduk perlahan tumpukan komposter dengan sekop kecil agar aerasi lancar.',
    ref: 'Buku Panduan Bab 5.1: Perawatan Harian Komposter Takakura'
  }
};

/**
 * Generates structured pedagogical evaluation and tailored suggestions
 * for a specific day's habit checklist.
 */
export function generateHabitEvaluation(dayKey: string, completedTaskIds: string[]): HabitEvaluation {
  const dayObj = DAYS_OF_WEEK.find((d) => d.key === dayKey);
  const dayLabel = dayObj ? dayObj.label : 'Hari Ini';

  const totalCount = CHECKLIST_TASKS.length;
  const completedCount = completedTaskIds.length;
  const percentage = Math.round((completedCount / Math.max(1, totalCount)) * 100);

  // Calculate earned points from checked tasks
  const earnedPoints = CHECKLIST_TASKS.reduce((acc, t) => {
    return completedTaskIds.includes(t.id) ? acc + t.points : acc;
  }, 0);

  // Prepare detailed task item feedback
  const detailedItems: HabitAdviceItem[] = CHECKLIST_TASKS.map((task) => {
    const isDone = completedTaskIds.includes(task.id);
    const adviceMeta = TASK_SPECIFIC_ADVICE[task.id] || {
      done: 'Aksi hebat untuk kelestarian lingkungan!',
      todo: 'Coba mulai aksi ini secara bertahap.',
      ref: 'Buku Panduan 3R'
    };

    return {
      taskId: task.id,
      taskTitle: task.title,
      category: task.category,
      emoji: task.emoji,
      tagColor: task.tagColor,
      isDone,
      message: isDone ? adviceMeta.done : adviceMeta.todo,
      bookRef: adviceMeta.ref
    };
  });

  const doneItems = detailedItems.filter((i) => i.isDone);
  const todoItems = detailedItems.filter((i) => !i.isDone);

  // Overall evaluation criteria based on percentage
  let badgeTitle = '💪 Tetap Semangat! Langkah Kecil Bermakna';
  let badgeEmoji = '🌱';
  let badgeClass: HabitEvaluation['badgeClass'] = 'start';
  let mainEvaluation = '';
  let actionAdvice = '';
  let bookQuote = '';

  if (percentage === 100) {
    badgeTitle = '🏆 Sempurna! Teladan Pahlawan 3R Sejati';
    badgeEmoji = '👑';
    badgeClass = 'perfect';
    mainEvaluation = `Luar biasa! Seluruh 7 pilar aksi kebiasaan 3R berhasil kamu tuntaskan untuk hari ${dayLabel}. Kamu adalah teladan nyata bagi pahlawan cilik lainnya!`;
    actionAdvice = 'Saran Keberlanjutan: Pertahankan ritme emas ini hingga 21 hari berturut-turut, lalu ajak teman sebangku atau keluargamu untuk meniru kebiasaan hebatmu!';
    bookQuote = '“Konsistensi 100% adalah buah dari kepedulian yang tulus terhadap masa depan bumi.” (Panduan Mario Fahmi Syahrial, Bab 3.1)';
  } else if (percentage >= 70) {
    badgeTitle = '🌟 Sangat Konsisten! Melampaui Target Standar';
    badgeEmoji = '⭐';
    badgeClass = 'great';
    mainEvaluation = `Hebat sekali! Capaian ${percentage}% (${completedCount}/${totalCount} tugas) telah melampaui target konsistensi ideal Tabel 7. Dampak nyata pemilahanmu sudah sangat terasa bagi lingkungan!`;
    actionAdvice = `Saran untuk Esok Hari: Fokuskan perhatianmu pada ${todoItems.length} tugas yang belum sempat terlaksana, khususnya: "${todoItems[0]?.taskTitle || 'kebiasaan berikutnya'}".`;
    bookQuote = '“Jangan sempurnakan, konsistenkan. Lebih baik memilah 70% konsisten daripada 95% hanya sebulan.” (Tabel 7, James Clear, 2018)';
  } else if (percentage >= 40) {
    badgeTitle = '🌿 Langkah Bagus! Terus Bangun Kebiasaan';
    badgeEmoji = '👍';
    badgeClass = 'good';
    mainEvaluation = `Bagus! Kamu sudah berhasil menjalankan ${completedCount} aksi penting hari ini. Membangun kebiasaan baru membutuhkan waktu 21–66 hari, jadi setiap langkah kecilmu sangat berharga.`;
    actionAdvice = `Saran Peningkatan: Pilihlah 1 kebiasaan paling mudah dari daftar yang belum diceklis (misalnya: ${todoItems[0]?.taskTitle}) untuk ditambahkan pada jadwal esok hari.`;
    bookQuote = '“Perubahan besar berawal dari satu kebiasaan kecil yang diulang setiap hari dengan gembira.” (Bab 3.1)';
  } else {
    badgeTitle = '🌱 Awal yang Baik! Mari Mulai dari Hal Mudah';
    badgeEmoji = '💪';
    badgeClass = 'start';
    mainEvaluation = `Tidak apa-apa, yang terpenting adalah kamu sudah mulai mencatat dan menyadari pentingnya memilah sampah pada hari ${dayLabel}.`;
    actionAdvice = `Saran Praktis: Jangan merasa terbebani. Besok pagi, cukup targetkan 2 aksi paling praktis: bawa tumbler minum sendiri dan pisahkan sampah dapur basah.`;
    bookQuote = '“Jangan biarkan hari yang terlewat membuatmu patah arang; yang terpenting adalah bangkit dan memilah lagi esok hari.” (Tabel 7)';
  }

  return {
    dayKey,
    dayLabel,
    completedCount,
    totalCount,
    percentage,
    earnedPoints,
    badgeTitle,
    badgeEmoji,
    badgeClass,
    mainEvaluation,
    actionAdvice,
    bookQuote,
    detailedItems,
    doneItems,
    todoItems
  };
}
