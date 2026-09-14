export type WasteCategory = 'organik' | 'daur-ulang' | 'e-waste' | 'residu';

export interface WasteItem {
  id: string;
  name: string;
  emoji: string;
  category: WasteCategory;
  categoryLabel: string;
  colorTheme: string;
  description: string;
  reason: string;
  bookReference: string;
  tip: string;
  points: number;
}

export const WASTE_BINS: {
  category: WasteCategory;
  name: string;
  colorName: string;
  hex: string;
  icon: string;
  destination: string;
  badge: string;
  rule: string;
}[] = [
  {
    category: 'organik',
    name: 'Sampah Organik',
    colorName: 'Hijau',
    hex: '#22c55e',
    icon: '🌱',
    destination: 'Komposter Takakura / Lubang Biopori',
    badge: '🟢 HIJAU',
    rule: 'Material alami mudah membusuk. JANGAN disetor ke Bank Sampah!'
  },
  {
    category: 'daur-ulang',
    name: 'Daur Ulang (Anorganik)',
    colorName: 'Biru',
    hex: '#3b82f6',
    icon: '♻️',
    destination: 'Bank Sampah / Pabrik Daur Ulang',
    badge: '🔵 BIRU',
    rule: 'Bersih & kering (botol PET, kaleng, kardus). Menghasilkan uang tabungan!'
  },
  {
    category: 'e-waste',
    name: 'E-Waste & B3 Berbahaya',
    colorName: 'Merah',
    hex: '#ef4444',
    icon: '⚠️',
    destination: 'Drop Point Khusus B3 / Gerai Resmi',
    badge: '🔴 MERAH',
    rule: 'Mengandung racun merkuri/timbal. Pisahkan rapat dan jauhkan dari api!'
  },
  {
    category: 'residu',
    name: 'Residu (TPA Terkendali)',
    colorName: 'Abu-abu/Hitam',
    hex: '#475569',
    icon: '🗑️',
    destination: 'Truk Sampah Dinas Kebersihan / TPA',
    badge: '⚫ HITAM',
    rule: 'Sampah yang tidak bisa didaur ulang maupun dikompos (popok, styrofoam).'
  }
];

export const WASTE_ITEMS: WasteItem[] = [
  {
    id: 'w-1',
    name: 'Botol Plastik Air Mineral (PET)',
    emoji: '🧴',
    category: 'daur-ulang',
    categoryLabel: 'Daur Ulang (Bank Sampah)',
    colorTheme: '#3b82f6',
    description: 'Botol plastik bening minuman ringan tanpa air.',
    reason: 'Plastik PET adalah bahan daur ulang paling dicari pabrik tekstil dan biji plastik.',
    bookReference: 'Bab 2.3 & Tabel 3 (Harga: Rp 4.000 - Rp 8.000 / kg)',
    tip: 'Lepas tutup botol, injak hingga pipih, dan pastikan sudah dibilas bersih!',
    points: 10
  },
  {
    id: 'w-2',
    name: 'Kulit Pisang & Sisa Buah',
    emoji: '🍌',
    category: 'organik',
    categoryLabel: 'Organik (Kompos / Biopori)',
    colorTheme: '#22c55e',
    description: 'Sisa makanan kulit buah-buahan segar setelah dimakan.',
    reason: 'Kaya akan kalium dan unsur hara mikro yang sangat baik untuk pupuk kompos tanaman.',
    bookReference: 'Bab 2.2 & Bab 3.7 (Komposisi sampah nasional 41.4% sampah makanan)',
    tip: 'Potong kecil-kecil agar cepat hancur dimakan mikroba komposter Takakura!',
    points: 10
  },
  {
    id: 'w-3',
    name: 'Baterai Remote Bekas',
    emoji: '🔋',
    category: 'e-waste',
    categoryLabel: 'E-Waste & B3 Berbahaya',
    colorTheme: '#ef4444',
    description: 'Baterai kering AA atau AAA yang sudah habis daya.',
    reason: 'Mengandung logam berat beracun kadmium dan merkuri yang mencemari air tanah.',
    bookReference: 'Bab 2.4 & PP No. 101/2014 Pengelolaan Limbah B3',
    tip: 'Simpan di kotak kardus bertutup khusus B3, jangan pernah dibakar!',
    points: 15
  },
  {
    id: 'w-4',
    name: 'Kardus Paket Belanja Bekas',
    emoji: '📦',
    category: 'daur-ulang',
    categoryLabel: 'Daur Ulang (Bank Sampah)',
    colorTheme: '#3b82f6',
    description: 'Kardus coklat bersih bekas kiriman barang.',
    reason: 'Karton coklat bernilai tinggi dan bisa langsung dicacah kembali menjadi kertas karton baru.',
    bookReference: 'Bab 2.3 & Tabel 3 (Harga: Rp 1.000 - Rp 2.500 / kg)',
    tip: 'Lipat kardus hingga pipih dan ikat rapi agar hemat tempat.',
    points: 10
  },
  {
    id: 'w-5',
    name: 'Sisa Nasi & Sayur Sop',
    emoji: '🍚',
    category: 'organik',
    categoryLabel: 'Organik (Kompos / Biopori)',
    colorTheme: '#22c55e',
    description: 'Sisa makanan dapur yang tidak habis dimakan.',
    reason: 'Sampah nitrogen hijau yang sangat subur untuk proses pengomposan biologis.',
    bookReference: 'Bab 3.8.1 (Langkah pembuatan kompos lapisan hijau)',
    tip: 'Tiriskan air kuahnya sebelum dimasukkan ke komposter agar tidak menimbulkan bau asam!',
    points: 10
  },
  {
    id: 'w-6',
    name: 'Kaleng Minuman Soda (Aluminium)',
    emoji: '🥫',
    category: 'daur-ulang',
    categoryLabel: 'Daur Ulang (Bank Sampah)',
    colorTheme: '#3b82f6',
    description: 'Kaleng minuman berbahan aluminium tipis ringan.',
    reason: 'Primadona bank sampah! Logam aluminium memiliki harga jual per kg tertinggi.',
    bookReference: 'Bab 2.3 & Tabel 3 (Harga: Rp 10.000 - Rp 15.000 / kg)',
    tip: 'Injak kaleng hingga pipih agar muat banyak di kantong setor.',
    points: 15
  },
  {
    id: 'w-7',
    name: 'Popok Bayi Sekali Pakai (Diaper)',
    emoji: '🚼',
    category: 'residu',
    categoryLabel: 'Residu TPA',
    colorTheme: '#475569',
    description: 'Popok bayi yang mengandung gel polimer dan kotoran.',
    reason: 'Mengandung bakteri dan polimer superabsorben yang tidak bisa didaur ulang umum.',
    bookReference: 'Bab 2.1 & Tabel 5 Panduan Residu',
    tip: 'Bungkus rapat dan buang ke tong residu untuk diangkut ke TPA terkontrol.',
    points: 10
  },
  {
    id: 'w-8',
    name: 'Bohlam Lampu LED Rusak',
    emoji: '💡',
    category: 'e-waste',
    categoryLabel: 'E-Waste & B3 Berbahaya',
    colorTheme: '#ef4444',
    description: 'Lampu hemat energi / bohlam yang putus.',
    reason: 'Memiliki komponen sirkuit elektronik dan kaca beracun jika pecah.',
    bookReference: 'Bab 2.4 & Gambar 8 Ancaman E-Waste',
    tip: 'Bungkus pelindung agar tidak pecah lalu antar ke dropbox e-waste di mal atau DLH.',
    points: 15
  },
  {
    id: 'w-9',
    name: 'Toples Kaca Bekas Selai',
    emoji: '🫙',
    category: 'daur-ulang',
    categoryLabel: 'Daur Ulang (Bank Sampah)',
    colorTheme: '#3b82f6',
    description: 'Wadah toples kaca bening tebal utuh.',
    reason: 'Kaca dapat dilebur ulang 100% tanpa penurunan kualitas, atau di-upcycle jadi lentera hias.',
    bookReference: 'Bab 4.1.3 & Tabel 8 (Proyek Upcycling Lentera Kaca)',
    tip: 'Cuci bersih hingga wangi, simpan tanpa tutup logamnya.',
    points: 10
  },
  {
    id: 'w-10',
    name: 'Daun Kering Pekarangan',
    emoji: '🍂',
    category: 'organik',
    categoryLabel: 'Organik (Kompos / Biopori)',
    colorTheme: '#22c55e',
    description: 'Daun gugur dan ranting kecil dari halaman rumah.',
    reason: 'Bahan coklat sumber Karbon tinggi yang menyeimbangkan nitrogen sampah dapur.',
    bookReference: 'Bab 3.8.1 (Perbandingan 3 bagian bahan coklat : 1 bagian bahan hijau)',
    tip: 'Gunakan sebagai lapisan penutup komposter untuk mencegah bau busuk!',
    points: 10
  },
  {
    id: 'w-11',
    name: 'Mangkuk Styrofoam Mie Instan',
    emoji: '🥣',
    category: 'residu',
    categoryLabel: 'Residu TPA',
    colorTheme: '#475569',
    description: 'Kemasan busa polistirena bekas makanan berkuah.',
    reason: 'Styrofoam sangat sulit terurai (ratusan tahun) dan berbahaya bagi rantai makanan laut.',
    bookReference: 'Bab 2.5 & Pergub Bali No. 97/2018 (Pelarangan Styrofoam)',
    tip: 'Gunakan prinsip Reduce: hindari memakai styrofoam saat jajan makanan!',
    points: 10
  },
  {
    id: 'w-12',
    name: 'Kabel Charger Handphone Putus',
    emoji: '🔌',
    category: 'e-waste',
    categoryLabel: 'E-Waste & B3 Berbahaya',
    colorTheme: '#ef4444',
    description: 'Kabel tembaga berlapis plastik PVC rusak.',
    reason: 'Mengandung kawat tembaga dan insulator plastik sintetis yang berbahaya jika dibakar.',
    bookReference: 'Bab 3.8.3 (Kabel bekas dihargai Rp 3.000 - Rp 8.000 / kg)',
    tip: 'Kumpulkan dalam wadah kardus E-Waste bersama barang elektronik bekas lainnya.',
    points: 10
  },
  {
    id: 'w-13',
    name: 'Cangkang Telur Ayam',
    emoji: '🥚',
    category: 'organik',
    categoryLabel: 'Organik (Kompos / Biopori)',
    colorTheme: '#22c55e',
    description: 'Kulit cangkang telur dapur setelah memasak.',
    reason: 'Kaya kalsium karbonat alami untuk menyuburkan tanah dan membantu mikroba komposter.',
    bookReference: 'Bab 2.2 & Panduan Kompos Dapur',
    tip: 'Remas cangkang telur hingga hancur berkeping kecil sebelum dicampur ke komposter!',
    points: 10
  },
  {
    id: 'w-14',
    name: 'Kertas Buku Tulis / HVS Bekas',
    emoji: '📄',
    category: 'daur-ulang',
    categoryLabel: 'Daur Ulang (Bank Sampah)',
    colorTheme: '#3b82f6',
    description: 'Lembaran kertas putih bekas coretan sekolah atau kantor.',
    reason: 'Kertas arsip/HVS bernilai ekonomi tinggi di bank sampah untuk dilebur jadi bubur pulp baru.',
    bookReference: 'Bab 2.3 & Tabel 3 (Harga: Rp 2.500 - Rp 4.000 / kg)',
    tip: 'Jaga kertas tetap kering, bebas minyak, dan kumpulkan terikat rapi!',
    points: 10
  },
  {
    id: 'w-15',
    name: 'Termometer Air Raksa Rusak',
    emoji: '🌡️',
    category: 'e-waste',
    categoryLabel: 'E-Waste & B3 Berbahaya',
    colorTheme: '#ef4444',
    description: 'Alat ukur suhu kaca yang mengandung air raksa beracun.',
    reason: 'Uap air raksa (merkuri) merusak sistem saraf dan ginjal jika terhirup atau mencemari air.',
    bookReference: 'Bab 2.4 & PP No. 101/2014 Limbah B3',
    tip: 'Jangan sentuh langsung jika pecah, wadahi rapat dan bawa ke dropbox B3 puskesmas/DLH!',
    points: 10
  },
  {
    id: 'w-16',
    name: 'Bungkus Snack Sachet Multilayer',
    emoji: '🥨',
    category: 'residu',
    categoryLabel: 'Residu TPA',
    colorTheme: '#475569',
    description: 'Bungkus plastik keripik berlapis foil mengkilap perak di dalamnya.',
    reason: 'Lapisan plastik dan aluminium menyatu rapat sehingga tidak bisa didaur ulang mesin biasa.',
    bookReference: 'Bab 2.1 & Tabel 5 Panduan Residu TPA',
    tip: 'Bisa dibuat ecobrick atau dibuang ke tong residu untuk diangkut petugas!',
    points: 10
  },
  {
    id: 'w-17',
    name: 'Ampas Kopi & Daun Teh Basah',
    emoji: '☕',
    category: 'organik',
    categoryLabel: 'Organik (Kompos / Biopori)',
    colorTheme: '#22c55e',
    description: 'Sisa bubuk kopi seduh dan kantung daun teh.',
    reason: 'Menyediakan nitrogen tinggi dan mengundang cacing tanah penyubur ke dalam biopori.',
    bookReference: 'Bab 3.7 & Formula Nutrisi Kompos',
    tip: 'Lepas klip kawat kantong teh celup sebelum memasukkannya ke komposter Takakura!',
    points: 10
  },
  {
    id: 'w-18',
    name: 'Cup Plastik Minuman Dingin (PP)',
    emoji: '🥤',
    category: 'daur-ulang',
    categoryLabel: 'Daur Ulang (Bank Sampah)',
    colorTheme: '#3b82f6',
    description: 'Gelas plastik bening bekas es teh / boba berlabel PP.',
    reason: 'Plastik jenis Polypropylene (PP) laku dijual di Bank Sampah untuk didaur ulang.',
    bookReference: 'Bab 2.3 & Tabel 3 Klasifikasi Plastik',
    tip: 'Bilas sisa manisannya, tumpuk rapi gelasnya agar hemat tempat penyimpanan!',
    points: 10
  },
  {
    id: 'w-19',
    name: 'Kaleng Semprot Aerosol Nyamuk',
    emoji: '🧯',
    category: 'e-waste',
    categoryLabel: 'E-Waste & B3 Berbahaya',
    colorTheme: '#ef4444',
    description: 'Tabung kaleng bertekanan bekas obat pembasmi serangga.',
    reason: 'Sangat mudah meledak jika terkena panas dan sisa zat kimianya beracun mematikan.',
    bookReference: 'Bab 2.4 & SOP Limbah Berbahaya',
    tip: 'Jangan pernah menusuk kaleng bertekanan, serahkan ke penanganan B3 terpisah!',
    points: 10
  },
  {
    id: 'w-20',
    name: 'Tisu Basah & Kapas Pembersih',
    emoji: '🧻',
    category: 'residu',
    categoryLabel: 'Residu TPA',
    colorTheme: '#475569',
    description: 'Tisu bekas pakai pembersih wajah dan kotoran.',
    reason: 'Mengandung serat sintetis dan kuman penyakit yang tidak higienis untuk didaur ulang.',
    bookReference: 'Bab 2.5 Standar Higienitas Sampah',
    tip: 'Jangan buang tisu basah ke kloset karena menyumbat pipa, buang ke tong residu!',
    points: 10
  }
];

