# 🌱 Pahlawan Cilik Siaga Lingkungan (Gamifikasi 3R & Bank Sampah)

Aplikasi web interaktif gamifikasi edukasi lingkungan hidup, pemilahan sampah 4 kategori warna resmi, simulasi perbankan sampah cilik, laboratorium kompos Takakura Surabaya, dan pembiasaan etika 3R (*Reduce, Reuse, Recycle*) harian bagi anak dan keluarga.

---

## 👨‍💻 Profil Perancang & Landasan Kurikulum

- **Perancang Inovasi**: **Mario Fahmi Syahrial**
- **Institusi**: Universitas PGRI Ronggolawe (UNIROW) Tuban
- **Landasan Buku**: *"Dari Tempat Sampah ke Tabungan: Mengelola Sampah Rumah Tangga Menjadi Peluang Ekonomi"* (Mario Fahmi Syahrial)
- **Pedoman Nasional**: Standar SIMBA KLHK, SNI 19-3964-1994, & Riset Psikologi Konsistensi James Clear (2018).

---

## 🎮 Fitur & 4 Arena Misi Utama

### 1. 🗑️ Misi #1: Game Pilah Sampah 4 Tong Warna
- Pemilahan 12 jenis sampah nyata ke dalam 4 tong resmi sesuai standar nasional:
  - 🟢 **Hijau (Organik)**: Sisa makanan, daun, kulit buah.
  - 🟡 **Kuning (Daur Ulang)**: Botol plastik PET, kaleng, kardus.
  - 🔴 **Merah (B3 & E-Waste)**: Baterai bekas, lampu neon, kemasan insektisida.
  - 🔘 **Abu-abu (Residu)**: Popok sekali pakai, tisu kotor, puntung rokok.
- Tantangan refleks berbatas waktu, animasi drag-and-drop, serta sertifikat kelulusan pahlawan berstempel emas resmi MF.

### 2. 🏦 Misi #2: Bank Sampah & Celengan Impian
- **Stasiun Timbangan Digital Interaktif**: Layar digital LED hijau bersinar neon, piringan timbangan dengan animasi lentur (*spring bounce*), dan tombol beban cepat (`+0.5 kg`, `+1.0 kg`, `+2.5 kg`, `+5.0 kg`).
- **6 Komoditas Sampah Daur Ulang**: Plastik PET, Kardus, Kertas HVS, Kaleng Besi, Botol Kaca, dan Minyak Jelantah dengan harga pasar terintegrasi.
- **Buku Tabungan Pahlawan Cilik 3D**: Buku rekening fisik berlogo resmi MF, nomor rekening terdata, tabel riwayat transaksi, dan fitur cetak tiket struk kasir bank.
- **Toko Celengan Cita-Cita & Hadiah**: Anak dapat menabung dan menukarkan koin sampah dengan bibit bunga matahari, krayon daur ulang, pot gantung karakter, atau adopsi pohon sekolah.
- **Maskot Teller Rubah Cerdik 🦊**: Memberikan panduan suara audio dan balon dialog ramah anak.

### 3. 🌱 Misi #3: Laboratorium Kompos Takakura & Biopori
- **Penampang Keranjang Anyaman 3D**: Membedah 5 lapisan keranjang Takakura legendaris Surabaya (bantal sekam, starter mikroorganisme EM4, sampah organik cacah, sekam karbon, penutup kain kasa berpori).
- **HUD 4 Parameter Sains**: Monitoring suhu termofilik (30–60°C), kelembaban (50–60%), status bau (0% aroma tanah hutan), dan bio-aktivitas mikroba.
- **Simulasi Aerasi Udara**: Visualisasi hembusan oksigen naik dari dasar keranjang anyaman.
- **Mini-Game Dokter Kompos**: Mendiagnosis dan menyembuhkan komposter warga yang berbau atau berulat.

### 4. 📋 Misi #4: Pelacak Kebiasaan 3R Harian
- Tantangan konsistensi 7 hari (Senin–Minggu) membangun kebiasaan membawa botol minum, mematikan lampu, mengumpulkan sampah anorganik, hingga menghabiskan makanan.
- Dialog evaluasi mandiri *"Apakah Kamu Sudah Yakin?"*.
- Mesin saran pedagogis cerdas (*Pedagogical Advice Engine*) dengan kutipan motivasi dan saran perbaikan spesifik berbasis rujukan bab buku.

---

## 🚀 Teknologi yang Digunakan

- **Frontend Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS modern (*Single-screen no-scroll dashboard, Glassmorphism, Micro-animations, Radial Eco-glow*)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio & SFX**: Synthesized Web Audio API (Coin chimes, pop sounds, level-up fanfares) + Web Speech Synthesis (TTS Bahasa Indonesia)
- **Partikel & Perayaan**: Canvas Confetti

---

## 💻 Cara Menjalankan Secara Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/USERNAME/NAMA-REPO.git
   cd NAMA-REPO
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:5173/`.

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 📜 Lisensi & Hak Cipta

Hak Cipta © 2026 **Mario Fahmi Syahrial**. Seluruh hak cipta dilindungi undang-undang.
Dirancang untuk kemajuan pendidikan lingkungan hidup dan pemberdayaan generasi muda Indonesia.
