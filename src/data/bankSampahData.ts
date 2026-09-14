export interface CommodityPrice {
  id: string;
  name: string;
  category: string;
  unit: string;
  pricePerKg: number;
  priceRange: string;
  icon: string;
  color: string;
  description: string;
}

export const COMMODITY_PRICES: CommodityPrice[] = [
  {
    id: 'aluminium',
    name: 'Aluminium (Kaleng Minuman)',
    category: 'Logam Mulia Daur Ulang',
    unit: 'kg',
    pricePerKg: 12000,
    priceRange: 'Rp 10.000 - 15.000',
    icon: '🥤',
    color: '#eab308',
    description: 'Kaleng soda, aluminium foil, tutup botol logam non-karat'
  },
  {
    id: 'pet',
    name: 'Plastik PET (Botol Bening)',
    category: 'Plastik Daur Ulang',
    unit: 'kg',
    pricePerKg: 5000,
    priceRange: 'Rp 4.000 - 8.000',
    icon: '🧴',
    color: '#3b82f6',
    description: 'Botol air mineral transparan bersih, bebas label dan tutup'
  },
  {
    id: 'hdpe',
    name: 'Plastik HDPE (Botol Keras)',
    category: 'Plastik Daur Ulang',
    unit: 'kg',
    pricePerKg: 4500,
    priceRange: 'Rp 3.000 - 6.000',
    icon: '🧴',
    color: '#0284c7',
    description: 'Jerigen minyak, botol sampo, wadah detergen putih susu'
  },
  {
    id: 'kardus',
    name: 'Kardus & Karton Tebal',
    category: 'Kertas & Karton',
    unit: 'kg',
    pricePerKg: 2000,
    priceRange: 'Rp 1.000 - 2.500',
    icon: '📦',
    color: '#d97706',
    description: 'Kardus paket kering bergelombang, dus kemasan mie/makanan'
  },
  {
    id: 'hvs',
    name: 'Kertas HVS & Buku Bekas',
    category: 'Kertas & Karton',
    unit: 'kg',
    pricePerKg: 2500,
    priceRange: 'Rp 1.500 - 3.000',
    icon: '📄',
    color: '#8b5cf6',
    description: 'Buku pelajaran bekas, kertas print putih, majalah'
  },
  {
    id: 'besi',
    name: 'Besi & Kaleng Sarden',
    category: 'Logam',
    unit: 'kg',
    pricePerKg: 4000,
    priceRange: 'Rp 3.000 - 5.000',
    icon: '🥫',
    color: '#64748b',
    description: 'Kaleng biskuit, kaleng susu kental, kaleng kornet bersih'
  },
  {
    id: 'kaca',
    name: 'Botol Kaca & Beling Utuh',
    category: 'Kaca',
    unit: 'kg',
    pricePerKg: 1000,
    priceRange: 'Rp 500 - 2.000',
    icon: '🫙',
    color: '#10b981',
    description: 'Botol sirup marjan, botol kecap, toples selai kaca utuh'
  }
];

export interface SOPStep {
  stepNumber: number;
  title: string;
  instruction: string;
  standard: string;
  tip: string;
  icon: string;
}

export const SOP_STEPS: SOPStep[] = [
  {
    stepNumber: 1,
    title: 'Sambut & Sapa Pahlawan',
    instruction: 'Sambut pahlawan cilik dengan ramah dan senyum hangat. Minta buku tabungan pahlawan.',
    standard: 'Wajib 3S (Senyum, Salam, Sapa)',
    tip: 'Beri apresiasi karena sudah memilah sampah dari rumah!',
    icon: '👋'
  },
  {
    stepNumber: 2,
    title: 'Periksa Kebersihan Sampah',
    instruction: 'Cek kondisi material. Pastikan botol plastik sudah kosong, bersih, dan kering. Tolak jika basah/berbau basi.',
    standard: 'Kering, bersih, tidak tercampur kotoran',
    tip: 'Sampah bersih menjaga gudang tetap wangi dan harga jual tetap tinggi!',
    icon: '🔍'
  },
  {
    stepNumber: 3,
    title: 'Kalibrasi Timbangan ke Nol',
    instruction: 'Pastikan jarum atau layar timbangan digital menunjuk tepat angka 0.00 kg sebelum meletakkan sampah.',
    standard: 'Kondisi awal harus 0.00 kg',
    tip: 'Kejujuran timbangan adalah kunci menjaga kepercayaan seluruh warga.',
    icon: '⚖️'
  },
  {
    stepNumber: 4,
    title: 'Timbang Sampah per Jenis',
    instruction: 'Timbang masing-masing kategori secara terpisah: plastik botol tersendiri, kardus tersendiri, kaleng tersendiri.',
    standard: 'Catat berat hingga 2 angka desimal (cth: 1.25 kg)',
    tip: 'Jangan dicampur agar nilai rupiah per kilogramnya maksimal!',
    icon: '📊'
  },
  {
    stepNumber: 5,
    title: 'Hitung Nilai Rupiah Setoran',
    instruction: 'Kalikan berat riil dengan harga resmi per kilogram yang terpampang di papan harga bank sampah.',
    standard: 'Nilai = Berat (kg) x Harga/kg',
    tip: 'Gunakan kalkulator digital di aplikasi agar hitungan otomatis presisi!',
    icon: '🧮'
  },
  {
    stepNumber: 6,
    title: 'Catat ke Buku Tabungan',
    instruction: 'Tuliskan nomor transaksi, tanggal, jenis sampah, berat, dan jumlah saldo baru yang ditambahkan ke rekening nasabah.',
    standard: 'Pencatatan rapi, jelas, dan transparan',
    tip: 'Tunjukkan saldo bertambah langsung kepada pahlawan cilik agar bersemangat!',
    icon: '📖'
  },
  {
    stepNumber: 7,
    title: 'Tanda Tangan & Konfirmasi',
    instruction: 'Minta paraf/tanda tangan nasabah pada bukti setor transaksi sebagai verifikasi bersama.',
    standard: 'Validasi dua pihak (Teller & Nasabah)',
    tip: 'Sistem ini melatih literasi keuangan dan tanggung jawab sejak dini.',
    icon: '✍️'
  },
  {
    stepNumber: 8,
    title: 'Sortir ke Wadah Karung Rumah',
    instruction: 'Pindahkan sampah yang telah ditimbang ke dalam karung sortir masing-masing kategori, lalu ucapkan terima kasih.',
    standard: 'Area timbang bersih & sampah tertata di karung',
    tip: 'Karung yang penuh siap dikirim langsung ke pabrik daur ulang!',
    icon: '🎒'
  }
];

export interface TransactionRecord {
  id: string;
  date: string;
  commodityId: string;
  commodityName: string;
  weightKg: number;
  pricePerKg: number;
  totalAmount: number;
  balanceAfter: number;
}
