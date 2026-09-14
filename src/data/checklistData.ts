export interface DailyTask {
  id: string;
  title: string;
  category: 'Reduce' | 'Reuse' | 'Recycle' | 'Organik' | 'Residu';
  tagColor: string;
  emoji: string;
  description: string;
  points: number;
}

export const CHECKLIST_TASKS: DailyTask[] = [
  {
    id: 't-1',
    title: 'Pilah Sampah Dapur (Organik vs Anorganik)',
    category: 'Organik',
    tagColor: '#16a34a',
    emoji: '🟢',
    description: 'Pisahkan sisa sayur, buah, dan nasi ke wadah organik; jauhkan dari kantong plastik.',
    points: 10
  },
  {
    id: 't-2',
    title: 'Bawa Tumbler & Tas Kain Belanja Sendiri',
    category: 'Reduce',
    tagColor: '#0284c7',
    emoji: '🛍️',
    description: 'Tolak kantong kresek sekali pakai saat belanja di minimarket atau warung tetangga.',
    points: 10
  },
  {
    id: 't-3',
    title: 'Bilas & Keringkan Botol Plastik / Kaleng',
    category: 'Recycle',
    tagColor: '#2563eb',
    emoji: '🧴',
    description: 'Bersihkan sisa minuman manis agar tidak dikerubungi semut sebelum disimpan di karung pilah.',
    points: 10
  },
  {
    id: 't-4',
    title: 'Beri Lapisan Coklat pada Komposter Takakura',
    category: 'Organik',
    tagColor: '#b45309',
    emoji: '🍂',
    description: 'Tutup sisa makanan baru dengan sekam padi atau daun kering agar komposter tidak bau.',
    points: 15
  },
  {
    id: 't-5',
    title: 'Manfaatkan Air Cucian Beras untuk Tanaman',
    category: 'Reuse',
    tagColor: '#8b5cf6',
    emoji: '🌾',
    description: 'Siramkan air bilasan beras ke tanaman hias depan rumah sebagai pupuk alami kaya vitamin B.',
    points: 10
  },
  {
    id: 't-6',
    title: 'Periksa & Amankan Baterai Bekas (E-Waste)',
    category: 'Recycle',
    tagColor: '#ef4444',
    emoji: '🔋',
    description: 'Jangan campur baterai bekas ke tempat sampah biasa; simpan di kotak kecil khusus B3.',
    points: 15
  },
  {
    id: 't-7',
    title: 'Aduk Komposter Takakura untuk Sirkulasi Udara',
    category: 'Organik',
    tagColor: '#d97706',
    emoji: '🥄',
    description: 'Aduk tumpukan kompos perlahan dengan sekop kecil agar bakteri mendapat oksigen segar.',
    points: 10
  }
];

export const DAYS_OF_WEEK = [
  { key: 'sen', label: 'Senin' },
  { key: 'sel', label: 'Selasa' },
  { key: 'rab', label: 'Rabu' },
  { key: 'kam', label: 'Kamis' },
  { key: 'jum', label: 'Jumat' },
  { key: 'sab', label: 'Sabtu' },
  { key: 'min', label: 'Minggu' }
];
