export interface TakakuraMaterialItem {
  name: string;
  icon: string;
  desc: string;
}

export interface TakakuraMetrics {
  tempText: string;
  tempPercent: number;
  moistureText: string;
  moisturePercent: number;
  odorText: string;
  odorStatus: 'optimal' | 'alert';
  microbesText: string;
  microbesActivity: string;
}

export interface TakakuraAction {
  actionId: string;
  label: string;
  icon: string;
  soundType: 'pop' | 'chime' | 'boop';
  speech: string;
  feedback: string;
  bonusPoints: number;
}

export interface TakakuraLayer {
  level: number;
  name: string;
  scientificTag: string;
  material: string;
  materialsList: TakakuraMaterialItem[];
  functionDesc: string;
  icon: string;
  color: string;
  accentColor: string;
  gradient: string;
  thickness: string;
  depthRange: string;
  checkHint: string;
  metrics: TakakuraMetrics;
  interactiveAction: TakakuraAction;
}

export const TAKAKURA_LAYERS: TakakuraLayer[] = [
  {
    level: 5,
    name: 'Bantal Sekam Atas & Kain Berpori',
    scientificTag: 'BIO-FILTER & KAIN BERPORI (PENGHALAU LALAT)',
    material: 'Kain kasa katun berpori + bantalan sekam penutup',
    materialsList: [
      { name: 'Kain Kasa Katun Berpori', icon: '🧵', desc: 'Sirkulasi udara lancar tanpa celah bagi serangga' },
      { name: 'Bantal Sekam Jahitan Rapi', icon: '🌾', desc: 'Isolasi panas alami dan penahan kelembaban' },
      { name: 'Tali Karet Pengencang', icon: '🪢', desc: 'Mengunci bibir keranjang agar bebas lalat 100%' }
    ],
    functionDesc: 'Menjaga kelembaban optimal, membiarkan oksigen leluasa masuk, serta melindungi komposter dari serangga dan lalat buah.',
    icon: '🛡️',
    color: '#0284c7',
    accentColor: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
    thickness: 'Tutup Rapat (Atas)',
    depthRange: '35 - 40 cm',
    checkHint: 'Rahasia komposter Surabaya bebas lalat dan tanpa bau!',
    metrics: {
      tempText: '30°C - 35°C (Suhu Udara Luar)',
      tempPercent: 32,
      moistureText: 'Kering & Bernapas (25%)',
      moisturePercent: 25,
      odorText: '0% (Wanginya Kain Bersih)',
      odorStatus: 'optimal',
      microbesText: 'Penjaga Penghalang Fisik',
      microbesActivity: 'Penahan Kontaminan Eksternal'
    },
    interactiveAction: {
      actionId: 'seal_lid',
      label: '🛡️ Pasang & Rapatkan Kain Berpori',
      icon: '🛡️',
      soundType: 'chime',
      speech: 'Kain berpori dan bantal sekam atas terpasang rapat! Lalat buah dan serangga dijamin tidak bisa masuk.',
      feedback: 'Hebat! Penutup terpasang rapat dan tetap bernapas. Bebas lalat 100% tanpa pengap!',
      bonusPoints: 10
    }
  },
  {
    level: 4,
    name: 'Lapisan Coklat (Karbon)',
    scientificTag: 'RESERVOIR KARBON & PENYERAP BAU (C:N 60:1)',
    material: 'Sekam padi kering, serbuk gergaji, atau daun kering remas',
    materialsList: [
      { name: 'Sekam Padi Kering', icon: '🌾', desc: 'Kaya serat karbon dan berongga aerasi mikro' },
      { name: 'Serbuk Kayu Gergaji', icon: '🪵', desc: 'Menyerap kelebihan uap air dan bau menyengat' },
      { name: 'Remasan Daun Kering', icon: '🍂', desc: 'Bahan karbon alami yang mudah terurai perlahan' },
      { name: 'Potongan Kardus Coklat', icon: '📦', desc: 'Kardus tanpa tinta kaya selulosa makanan mikroba' }
    ],
    functionDesc: 'Menyerap bau tak sedap seketika, mengikat kelebihan air, dan menyuplai karbon sebagai sumber energi utama mikroba.',
    icon: '🍂',
    color: '#9a3412',
    accentColor: '#ea580c',
    gradient: 'linear-gradient(135deg, #9a3412, #c2410c)',
    thickness: '5 - 8 cm',
    depthRange: '25 - 35 cm',
    checkHint: 'Selalu tutup sisa makanan dengan lapisan coklat ini!',
    metrics: {
      tempText: '40°C - 48°C (Zona Isolasi Hangat)',
      tempPercent: 62,
      moistureText: 'Sedang Menyerap (35%)',
      moisturePercent: 35,
      odorText: '0% (Aroma Khas Kayu & Sekam Kering)',
      odorStatus: 'optimal',
      microbesText: 'Fungi & Jamur Selulolitik',
      microbesActivity: 'Pengurai Serat Kasar & Pelindung'
    },
    interactiveAction: {
      actionId: 'add_carbon',
      label: '🍂 Taburkan Sekam Karbon Kering',
      icon: '🍂',
      soundType: 'pop',
      speech: 'Sekam karbon berhasil ditaburkan! Bau menyengat langsung terperangkap dan rasio C N kembali seimbang.',
      feedback: 'Mantap! Bahan coklat mengunci aroma tak sedap dan menyerap rembesan air berlebih.',
      bonusPoints: 10
    }
  },
  {
    level: 3,
    name: 'Lapisan Hijau (Nitrogen)',
    scientificTag: 'ZONA BIO-REAKTOR TERMOFILIK (C:N 15:1)',
    material: 'Sisa sayuran mentah, kulit buah, serbuk kopi, ampas teh',
    materialsList: [
      { name: 'Sisa Sayur & Kulit Buah', icon: '🥬', desc: 'Kaya air, nitrogen, dan glukosa cepat saji mikroba' },
      { name: 'Ampas Kopi & Teh Celup', icon: '☕', desc: 'Disukai fauna tanah dan menetralisir aroma' },
      { name: 'Sisa Nasi & Kulit Telur', icon: '🍚', desc: 'Kalsium dan pati penguat struktur kompos' },
      { name: 'Cacahan Halus (2-3 cm)', icon: '✂️', desc: 'Mempercepat penguraian hingga 3x lipat' }
    ],
    functionDesc: 'Bahan baku utama yang dicerna mikroorganisme menjadi nutrisi pupuk alami kaya nitrogen untuk kesuburan tanaman.',
    icon: '🥬',
    color: '#15803d',
    accentColor: '#22c55e',
    gradient: 'linear-gradient(135deg, #15803d, #16a34a)',
    thickness: '3 - 5 cm',
    depthRange: '15 - 25 cm',
    checkHint: 'Potong kecil-kecil terlebih dahulu agar cepat membusuk!',
    metrics: {
      tempText: '50°C - 60°C (Puncak Termofilik Panas!)',
      tempPercent: 88,
      moistureText: 'Optimal 50% - 60% (Lembab Seperti Spons)',
      moisturePercent: 55,
      odorText: '0% (Hangat Fermentasi Segar)',
      odorStatus: 'optimal',
      microbesText: 'Bakteri Termofilik Super Aktif',
      microbesActivity: 'Pencerna Cepat Biomassa Dapur'
    },
    interactiveAction: {
      actionId: 'chop_and_mix',
      label: '🥄 Aduk & Cacah Sampah Hijau',
      icon: '🥄',
      soundType: 'chime',
      speech: 'Sampah hijau diaduk dan dicacah rata! Oksigen masuk, mikroba berpesta dan suhu naik ke zona optimal!',
      feedback: 'Luar biasa! Cacahan kecil mempercepat pembusukan higienis dan suplai oksigen maksimal.',
      bonusPoints: 15
    }
  },
  {
    level: 2,
    name: 'Starter Mikroba Aktif',
    scientificTag: 'INOKULAN BIO-AKTIVATOR MIKROORGANISME',
    material: 'Kompos matang berkualitas atau tanah humus gembur',
    materialsList: [
      { name: 'Kompos Matang Berkualitas', icon: '🌱', desc: 'Rumah bagi koloni jutaan bakteri pengurai' },
      { name: 'Tanah Humus Hutan Gembur', icon: '🪴', desc: 'Kaya enzim alami pencerna bahan organik' },
      { name: 'Larutan EM4 / Bioaktivator', icon: '🧪', desc: 'Kultur mikroba pengurai Lactobacillus & Yeast' },
      { name: 'Dedak / Biakan Ragi', icon: '🌾', desc: 'Suplemen nutrisi penumbuh populasi mikroba' }
    ],
    functionDesc: 'Menyuntikkan triliunan bakteri pengurai alami (EM4/Actinomycetes) yang siap bekerja mengolah sampah tanpa busuk.',
    icon: '🦠',
    color: '#713f12',
    accentColor: '#a16207',
    gradient: 'linear-gradient(135deg, #713f12, #854d0e)',
    thickness: '2 - 3 cm',
    depthRange: '8 - 15 cm',
    checkHint: 'Starter ini mempercepat pembusukan higienis tanpa fermentasi anaerob.',
    metrics: {
      tempText: '45°C - 52°C (Zona Inkubasi Hangat)',
      tempPercent: 72,
      moistureText: 'Lembab Stabil (50%)',
      moisturePercent: 50,
      odorText: '0% (Aroma Tanah Hutan Segar - Geosmin)',
      odorStatus: 'optimal',
      microbesText: 'Triliunan Bakteri EM4 & Actinomycetes',
      microbesActivity: 'Bio-Katalis Pengurai Super Cepat'
    },
    interactiveAction: {
      actionId: 'spray_em4',
      label: '🧪 Semprotkan Bioaktivator EM4',
      icon: '🧪',
      soundType: 'chime',
      speech: 'Starter mikroba disemprotkan! Triliunan bakteri baik bangkit dan siap memproses sampah dapur.',
      feedback: 'Keren! Pasukan bakteri baik bertambah triliunan, pembusukan berlangsung bersih dan harum humus.',
      bonusPoints: 10
    }
  },
  {
    level: 1,
    name: 'Bantalan Drainase Dasar',
    scientificTag: 'AERASI LANTAI DASAR & DRAINASE RESAPAN',
    material: 'Bantal sekam padi atau kardus berpori tebal di dasar keranjang',
    materialsList: [
      { name: 'Bantalan Sekam Bawah Jahitan', icon: '🌾', desc: 'Menampung rembesan air tanpa menjadi becek' },
      { name: 'Kardus Berpori Tebal', icon: '📦', desc: 'Isolasi penahan dingin lantai dan pelindung pori' },
      { name: 'Keranjang Anyaman Bawah', icon: '🧺', desc: 'Anyaman berlubang mengalirkan oksigen dari bawah' },
      { name: 'Kaki Penyangga Keranjang', icon: '🪵', desc: 'Mengangkat keranjang 5-10 cm untuk sirkulasi udara' }
    ],
    functionDesc: 'Menampung kelebihan air rembesan (lindi) dan menyediakan sirkulasi udara kontinu dari celah bawah keranjang.',
    icon: '🧺',
    color: '#b45309',
    accentColor: '#d97706',
    gradient: 'linear-gradient(135deg, #b45309, #d97706)',
    thickness: 'Alas 5 cm',
    depthRange: '0 - 8 cm',
    checkHint: 'Keranjang anyaman plastik berlubang memberikan aerasi udara terbaik.',
    metrics: {
      tempText: '28°C - 32°C (Sirkulasi Udara Dingin Segar Bawah)',
      tempPercent: 28,
      moistureText: 'Drainase Bebas Becek (40%)',
      moisturePercent: 40,
      odorText: '0% (Tanpa Genangan Air Busuk)',
      odorStatus: 'optimal',
      microbesText: 'Konektor Aerobik Bawah',
      microbesActivity: 'Suplai Oksigen Alami dari Bawah'
    },
    interactiveAction: {
      actionId: 'check_aeration',
      label: '💨 Periksa Sirkulasi Udara Bawah',
      icon: '💨',
      soundType: 'chime',
      speech: 'Sirkulasi udara bawah dicek! Lubang anyaman dan kaki penyangga bebas sumbatan, pasokan oksigen mengalir lancar.',
      feedback: 'Sempurna! Udara segar masuk dari bawah mencegah bakteri anaerob pembawa bau busuk.',
      bonusPoints: 10
    }
  }
];

export interface KomposQuizCase {
  id: string;
  symptomTitle: string;
  symptomEmoji: string;
  description: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const KOMPOS_DIAGNOSES: KomposQuizCase[] = [
  {
    id: 'case-1',
    symptomTitle: 'Komposter Berbau Busuk Menyengat!',
    symptomEmoji: '🤢',
    description: 'Kotak kompos di dapur mengeluarkan bau asam dan menyengat seperti sampah liar di jalan.',
    options: [
      {
        text: 'Tambah air sabun dan semprotkan parfum ruangan',
        isCorrect: false,
        explanation: 'Salah! Sabun dan parfum akan membunuh bakteri baik di dalam komposter.'
      },
      {
        text: 'Tambahkan bahan coklat (daun kering/sekam) dan aduk agar mendapat udara',
        isCorrect: true,
        explanation: 'Tepat sekali! Bau busuk timbul karena terlalu basah dan kurang oksigen (anaerob). Tambah daun kering & aduk!'
      },
      {
        text: 'Tutup rapat komposter dalam kantong kresek hitam tertutup',
        isCorrect: false,
        explanation: 'Kurang tepat! Tanpa udara segar, bakteri anaerob justru akan semakin menghasilkan gas berbau busuk.'
      }
    ]
  },
  {
    id: 'case-2',
    symptomTitle: 'Banyak Lalat dan Belatung Berkeliaran!',
    symptomEmoji: '🪰',
    description: 'Ketika tutup komposter dibuka, terlihat banyak lalat buah dan serangga kecil berterbangan.',
    options: [
      {
        text: 'Semprot komposter dengan obat nyamuk semprot beracun',
        isCorrect: false,
        explanation: 'Bahaya! Racun serangga akan meracuni kompos sehingga tidak aman bagi sayuran kita.'
      },
      {
        text: 'Tutup sisa makanan dapur dengan lapisan tebal sekam atau daun kering',
        isCorrect: true,
        explanation: 'Hebat! Lalat tertarik karena sisa makanan terbuka di atas. Tutup dengan sekam tebal 5-8 cm agar lalat tidak bisa bertelur.'
      },
      {
        text: 'Buang semua isi komposter ke tong sampah hitam',
        isCorrect: false,
        explanation: 'Jangan dibuang! Masalah lalat sangat mudah diatasi hanya dengan menutupnya pakai bahan coklat.'
      }
    ]
  },
  {
    id: 'case-3',
    symptomTitle: 'Sampah Tidak Terurai Setelah 2 Bulan!',
    symptomEmoji: '⏳',
    description: 'Bentuk daun dan sayuran masih tetap utuh, keras, dan tidak kunjung berubah jadi tanah hitam gembur.',
    options: [
      {
        text: 'Semprot air secukupnya (lembab seperti spons) dan potong sisa makanan lebih kecil',
        isCorrect: true,
        explanation: 'Benar sekali! Mikroba butuh kelembaban sedang dan luas permukaan yang cukup untuk mencerna makanan.'
      },
      {
        text: 'Jemur komposter di bawah sinar matahari terik seharian',
        isCorrect: false,
        explanation: 'Keliru. Panas matahari berlebih justru membuat komposter semakin kering dan mikroba dehidrasi.'
      },
      {
        text: 'Masukkan es batu untuk mendinginkan suhu komposter',
        isCorrect: false,
        explanation: 'Tidak tepat. Suhu komposter secara alami hangat karena mikroba aktif bekerja.'
      }
    ]
  }
];
