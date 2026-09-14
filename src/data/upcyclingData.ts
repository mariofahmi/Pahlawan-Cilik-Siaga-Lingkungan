export interface UpcyclingProject {
  id: string;
  title: string;
  category: string;
  wasteSource: string;
  imageEmoji: string;
  color: string;
  difficulty: 'Sangat Mudah' | 'Mudah' | 'Menengah';
  estimatedTimeMinutes: number;
  baseMaterialCost: number;
  overheadCost: number;
  suggestedSellPrice: number;
  materialsNeeded: string[];
  toolsNeeded: string[];
  steps: {
    stepNo: number;
    title: string;
    description: string;
  }[];
  ecoImpact: string;
  marketingTip: string;
}

export const UPCYCLING_PROJECTS: UpcyclingProject[] = [
  {
    id: 'pot-kucing-botol',
    title: 'Pot Tanaman Hias Karakter Kucing',
    category: 'Dekorasi & Taman',
    wasteSource: 'Botol Plastik Bekas 600ml / 1.5L',
    imageEmoji: '🐱🪴',
    color: '#10b981',
    difficulty: 'Mudah',
    estimatedTimeMinutes: 45,
    baseMaterialCost: 5000,
    overheadCost: 2000,
    suggestedSellPrice: 20000,
    materialsNeeded: [
      '2 botol plastik PET bekas ukuran 600ml atau 1.5L',
      'Cat akrilik aneka warna (putih, pink, hitam)',
      'Tanah subur dan tanaman sukulen mini / sirih gading'
    ],
    toolsNeeded: ['Gunting atau cutter anak (didampingi guru/ortu)', 'Kuas lukis kecil', 'Paku pembuat lubang drainase'],
    steps: [
      {
        stepNo: 1,
        title: 'Potong Membentuk Telinga',
        description: 'Potong botol setinggi 12-15 cm dari dasar. Bentuk dua segitiga melengkung di bagian atas sebagai telinga kucing.'
      },
      {
        stepNo: 2,
        title: 'Cuci & Keringkan',
        description: 'Bilas bersih sisa minuman dan keringkan permukaan dengan kain lap bersih.'
      },
      {
        stepNo: 3,
        title: 'Beri Cat Dasar Putih',
        description: 'Lapisi seluruh bagian luar dengan cat akrilik putih sebagai warna dasar yang cerah. Tunggu hingga kering.'
      },
      {
        stepNo: 4,
        title: 'Lukis Wajah & Kumis Kucing',
        description: 'Gunakan kuas kecil untuk menggambar mata terpejam, hidung pink, kumis, dan bagian dalam telinga.'
      },
      {
        stepNo: 5,
        title: 'Buat Lubang Air & Tanam Sukulen',
        description: 'Buat 2-3 lubang kecil di dasar botol untuk keluarnya air, isi tanah, dan masukkan tanaman hias lucu!'
      }
    ],
    ecoImpact: 'Menyelamatkan 2 botol plastik yang butuh 450 tahun untuk terurai di alam liar.',
    marketingTip: 'Foto di samping jendela berlampu alami pagi hari. Cocok dijual di bazar sekolah dan hadiah teman!'
  },
  {
    id: 'organizer-meja-kardus',
    title: 'Organizer Meja Belajar Kompartemen',
    category: 'Alat Tulis & Rumah',
    wasteSource: 'Kardus Paket Belanja Bekas',
    imageEmoji: '📦✏️',
    color: '#f59e0b',
    difficulty: 'Menengah',
    estimatedTimeMinutes: 70,
    baseMaterialCost: 4000,
    overheadCost: 2000,
    suggestedSellPrice: 25000,
    materialsNeeded: [
      'Kardus bekas kardus sepatu atau paket belanja',
      'Kertas kado bermotif batik/kartun atau kain perca',
      'Pita hias warna-warni'
    ],
    toolsNeeded: ['Lem tembak atau lem fox putih', 'Gunting kardus & penggaris besi', 'Pensil'],
    steps: [
      {
        stepNo: 1,
        title: 'Potong Bagian Dasar & Sisi',
        description: 'Potong lembar dasar ukuran 25x15 cm, dan sisi tegak 25x10 cm untuk membentuk kotak utama.'
      },
      {
        stepNo: 2,
        title: 'Bungkus dengan Kertas Kado',
        description: 'Lapisi semua permukaan kardus dengan kertas kado bermotif rapi menggunakan lem agar terlihat seperti barang toko baru.'
      },
      {
        stepNo: 3,
        title: 'Rakit Sekat Pembatas',
        description: 'Pasang beberapa sekat di bagian dalam untuk memisahkan spidol, penggaris, gunting, dan buku catatan mini.'
      },
      {
        stepNo: 4,
        title: 'Finishing & Sentuhan Pita',
        description: 'Rekatkan pita cantik di tepi kotak untuk menyamarkan sambungan dan mempercantik tampilan.'
      }
    ],
    ecoImpact: 'Mengubah 500 gram limbah karton menjadi perabot fungsional yang tahan bertahun-tahun.',
    marketingTip: 'Tawarkan personalisasi nama di bagian depan untuk pesanan kado ulang tahun!'
  },
  {
    id: 'tempat-pensil-kaleng',
    title: 'Tempat Pensil Karakter Kaleng Susu',
    category: 'Alat Tulis Sekolah',
    wasteSource: 'Kaleng Susu Kental Manis / Kaleng Biskuit',
    imageEmoji: '🥫🎨',
    color: '#6366f1',
    difficulty: 'Sangat Mudah',
    estimatedTimeMinutes: 30,
    baseMaterialCost: 3500,
    overheadCost: 1500,
    suggestedSellPrice: 15000,
    materialsNeeded: [
      'Kaleng susu bekas bersih',
      'Kain flanel aneka warna',
      'Kancing baju bekas / mata boneka googly eyes'
    ],
    toolsNeeded: ['Lem tembak / double tape kuat', 'Gunting kain'],
    steps: [
      {
        stepNo: 1,
        title: 'Amankan Tepi Kaleng',
        description: 'Pastikan pinggiran atas kaleng tumpul dan aman agar tidak melukai jemari anak.'
      },
      {
        stepNo: 2,
        title: 'Lilitkan Kain Flanel',
        description: 'Ukur keliling kaleng, gunting kain flanel, lalu rekatkan melingkari badan kaleng secara mulus.'
      },
      {
        stepNo: 3,
        title: 'Hias Karakter Lucu',
        description: 'Tempelkan mata googly eyes, senyum flanel hitam, dan telinga kelinci/panda yang menggemaskan.'
      }
    ],
    ecoImpact: 'Mencegah kaleng logam berkarat mencemari selokan air di sekitar rumah.',
    marketingTip: 'Harga ramah kantong anak sekolah (Rp 15.000) dengan laba bersih lebih dari Rp 10.000 per kaleng!'
  },
  {
    id: 'lentera-kaca-hias',
    title: 'Lentera Hias Kamar Toples Kaca',
    category: 'Lampu & Suasana',
    wasteSource: 'Toples Kaca Bekas Selai / Kopi',
    imageEmoji: '🫙✨',
    color: '#ec4899',
    difficulty: 'Mudah',
    estimatedTimeMinutes: 40,
    baseMaterialCost: 8000,
    overheadCost: 3000,
    suggestedSellPrice: 35000,
    materialsNeeded: [
      'Toples kaca bening bersih',
      'Tali rami / tali goni alami',
      'Lilin lampu LED baterai mini (aman tanpa api sungguhan)'
    ],
    toolsNeeded: ['Lem tembak', 'Spidol glitter kaca atau renda kain'],
    steps: [
      {
        stepNo: 1,
        title: 'Bersihkan Label Kertas',
        description: 'Rendam toples di air hangat untuk melepas sisa lem stiker hingga kaca berkilau jernih.'
      },
      {
        stepNo: 2,
        title: 'Lilit Tali Rami Alami',
        description: 'Lilitkan tali rami di bagian leher toples dengan simpul pita gaya rustic yang elegan.'
      },
      {
        stepNo: 3,
        title: 'Gambar Bintang Berkilau',
        description: 'Gunakan spidol glitter untuk menggambar siluet rasi bintang, bulan sabit, atau daun tropis di dinding kaca.'
      },
      {
        stepNo: 4,
        title: 'Nyalakan Lampu LED',
        description: 'Letakkan lilin LED mini di dasar toples. Cahayanya akan berpendar hangat di malam hari!'
      }
    ],
    ecoImpact: 'Memperpanjang masa pakai toples kaca tebal tanpa perlu dilebur ulang di pabrik berenergi tinggi.',
    marketingTip: 'Sangat diminati untuk lampu tidur estetik kamar tidur atau dekorasi meja kafe.'
  }
];
