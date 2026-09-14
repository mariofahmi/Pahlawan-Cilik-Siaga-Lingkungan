/**
 * Score & Certificate Exporter for Pahlawan Cilik Kebersihan
 * Exports high-resolution Certificate & Report Card as PNG and PDF
 * 100% Client-side, embedded Mario Fahmi (MF) official logo.
 */

import { MF_LOGO_DATA_URL } from '../assets/logoBase64';

export interface ScoreExportData {
  userName: string;
  userSchool: string;
  roundScore: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  dateStr?: string;
}

// Preload official logo image
let cachedLogoImg: HTMLImageElement | null = null;

export function getLoadedLogoImage(): Promise<HTMLImageElement | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);

  if (cachedLogoImg && cachedLogoImg.complete && cachedLogoImg.naturalWidth > 0) {
    return Promise.resolve(cachedLogoImg);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      cachedLogoImg = img;
      resolve(img);
    };
    img.onerror = () => {
      // Fallback: try public URL
      const fb = new Image();
      fb.onload = () => {
        cachedLogoImg = fb;
        resolve(fb);
      };
      fb.onerror = () => resolve(null);
      fb.src = '/logo-mf.png';
    };
    img.src = MF_LOGO_DATA_URL;
  });
}

// Start preloading immediately on load
if (typeof window !== 'undefined') {
  getLoadedLogoImage();
}

/**
 * Creates a high-resolution Canvas (1200 x 850, 2x retina) rendering an official
 * Certificate of Achievement with prominent Mario Fahmi (MF) logo branding.
 */
export async function renderScoreCertificateCanvas(data: ScoreExportData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 850;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Await official logo loading
  const logo = await getLoadedLogoImage();

  const {
    userName = 'Pahlawan Cilik',
    userSchool = 'Sekolah Bersih',
    roundScore = 0,
    correctCount = 0,
    wrongCount = 0,
    totalQuestions = 10,
    dateStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } = data;

  const accuracy = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);

  // 1. Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#f0fdf4');
  bgGrad.addColorStop(0.5, '#ffffff');
  bgGrad.addColorStop(1, '#ecfdf5');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Decorative Outer Gold & Inner Green Borders
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 14;
  ctx.strokeRect(18, 18, width - 36, height - 36);

  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  // Corner Ornaments
  const drawCornerDeco = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI / 2);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI / 2);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.restore();
  };
  drawCornerDeco(32, 32, 0);
  drawCornerDeco(width - 32, 32, Math.PI / 2);
  drawCornerDeco(width - 32, height - 32, Math.PI);
  drawCornerDeco(32, height - 32, (Math.PI * 3) / 2);

  // 3. Header Ribbon / Badge
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 220, 50, 440, 38, 19);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌱 GAMIFIKASI EDUKASI BANK SAMPAH & 3R', width / 2, 74);

  // 3b. Header Left & Right Official MF Logo Emblems
  if (logo) {
    // Left Emblem
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(62, 44, 52, 52, 10);
    ctx.fill();
    ctx.stroke();
    ctx.drawImage(logo, 66, 48, 44, 44);
    ctx.restore();

    // Right Emblem
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(width - 114, 44, 52, 52, 10);
    ctx.fill();
    ctx.stroke();
    ctx.drawImage(logo, width - 110, 48, 44, 44);
    ctx.restore();
  }

  // 4. Certificate Main Title
  ctx.fillStyle = '#065f46';
  ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SERTIFIKAT HASIL MISI PILAH SAMPAH', width / 2, 132);

  ctx.fillStyle = '#64748b';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Diberikan sebagai bukti pencapaian pemilahan 10 sampah acak ke 4 wadah kode warna resmi', width / 2, 162);

  // 5. Hero Student Info Card
  const cardX = 220;
  const cardY = 188;
  const cardW = width - cardX * 2;
  const cardH = 106;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('DIANUGERAHKAN KEPADA PAHLAWAN CILIK:', width / 2, cardY + 28);

  ctx.fillStyle = '#0f172a';
  ctx.font = '900 34px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(userName.toUpperCase(), width / 2, cardY + 68);

  ctx.fillStyle = '#059669';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`🏫 Asal Sekolah: ${userSchool}`, width / 2, cardY + 94);

  // 6. Score Showcase Box
  const scoreBoxX = 220;
  const scoreBoxY = 312;
  const scoreBoxW = width - scoreBoxX * 2;
  const scoreBoxH = 328;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#86efac';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(scoreBoxX, scoreBoxY, scoreBoxW, scoreBoxH, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SKOR AKHIR RONDE INI', width / 2, scoreBoxY + 36);

  // Score Value (Red/Green depending on score)
  ctx.fillStyle = roundScore >= 70 ? '#15803d' : roundScore >= 40 ? '#d97706' : '#dc2626';
  ctx.font = '900 70px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${roundScore} Poin`, width / 2, scoreBoxY + 115);

  // Motivational badge
  let trophyText = '⭐⭐⭐ LUAR BIASA! JUARA PILAH SEJATI ⭐⭐⭐';
  let trophyColor = '#d97706';
  if (roundScore < 70 && roundScore >= 40) {
    trophyText = '⭐ HEBAT! TERUS TINGKATKAN PRESTASIMU ⭐';
    trophyColor = '#059669';
  } else if (roundScore < 40) {
    trophyText = '⭐ TETAP SEMANGAT (Terus Belajar & Berlatih) ⭐';
    trophyColor = '#b45309';
  }
  ctx.fillStyle = trophyColor;
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(trophyText, width / 2, scoreBoxY + 158);

  // Dashed divider line
  ctx.save();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(scoreBoxX + 40, scoreBoxY + 185);
  ctx.lineTo(scoreBoxX + scoreBoxW - 40, scoreBoxY + 185);
  ctx.stroke();
  ctx.restore();

  // 7. Stat Pillars (Correct, Wrong, Accuracy)
  const pillarW = 210;
  const pillarH = 88;
  const pillarGap = 20;
  const totalPillarsW = pillarW * 3 + pillarGap * 2;
  const pillarStartX = (width - totalPillarsW) / 2;
  const pillarY = scoreBoxY + 208;

  // Pillar 1: Benar
  ctx.fillStyle = '#ecfdf5';
  ctx.strokeStyle = '#86efac';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(pillarStartX, pillarY, pillarW, pillarH, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#15803d';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`✅ ${correctCount} Soal`, pillarStartX + pillarW / 2, pillarY + 40);
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`+${correctCount * 10} Poin`, pillarStartX + pillarW / 2, pillarY + 68);

  // Pillar 2: Salah
  const p2X = pillarStartX + pillarW + pillarGap;
  ctx.fillStyle = '#fef2f2';
  ctx.strokeStyle = '#fca5a5';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(p2X, pillarY, pillarW, pillarH, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`❌ ${wrongCount} Soal`, p2X + pillarW / 2, pillarY + 40);
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`-${wrongCount * 5} Poin`, p2X + pillarW / 2, pillarY + 68);

  // Pillar 3: Akurasi
  const p3X = p2X + pillarW + pillarGap;
  ctx.fillStyle = '#f0fdf4';
  ctx.strokeStyle = '#86efac';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(p3X, pillarY, pillarW, pillarH, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f766e';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`📊 ${accuracy}%`, p3X + pillarW / 2, pillarY + 40);
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Tingkat Akurasi', p3X + pillarW / 2, pillarY + 68);

  // 8. Official Creator & Innovation Seal Box (Bottom-Left with Prominent MF Logo)
  const footerBoxX = 54;
  const footerBoxY = 654;
  const footerBoxW = 760;
  const footerBoxH = 92;

  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#fed7aa';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(footerBoxX, footerBoxY, footerBoxW, footerBoxH, 16);
  ctx.fill();
  ctx.stroke();

  // Draw square frame for MF Logo
  const logoFrameSize = 74;
  const logoFrameX = footerBoxX + 9;
  const logoFrameY = footerBoxY + 9;

  ctx.fillStyle = '#fff7ed';
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(logoFrameX, logoFrameY, logoFrameSize, logoFrameSize, 12);
  ctx.fill();
  ctx.stroke();

  if (logo) {
    ctx.drawImage(logo, logoFrameX + 4, logoFrameY + 4, logoFrameSize - 8, logoFrameSize - 8);
  }

  // Author & Book Citation Details
  const textLeft = logoFrameX + logoFrameSize + 16;
  ctx.textAlign = 'left';

  ctx.fillStyle = '#7c2d12';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Perancang Aplikasi: Mario Fahmi Syahrial', textLeft, footerBoxY + 27);

  ctx.fillStyle = '#334155';
  ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Buku Panduan: "Dari Tempat Sampah ke Tabungan: Mengelola Sampah Rumah Tangga Menjadi Peluang Ekonomi"', textLeft, footerBoxY + 47);

  ctx.fillStyle = '#475569';
  ctx.font = '500 11.5px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Standar Kode Warna: Tabel 5 & Lampiran 4 (Organik: Hijau, Daur Ulang: Biru, B3/E-Waste: Merah, Residu: Hitam)', textLeft, footerBoxY + 65);

  ctx.fillStyle = '#64748b';
  ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Diterbitkan secara digital pada: ${dateStr}`, textLeft, footerBoxY + 82);
  ctx.restore();

  // 9. Official Round Seal Badge on Bottom-Right
  const sealX = width - 180;
  const sealY = 700;

  ctx.save();
  ctx.beginPath();
  ctx.arc(sealX, sealY, 48, 0, Math.PI * 2);
  ctx.fillStyle = '#fffbeb';
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Subtle inner dotted border
  ctx.beginPath();
  ctx.arc(sealX, sealY, 42, 0, Math.PI * 2);
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#92400e';
  ctx.font = 'bold 10px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PAHLAWAN', sealX, sealY - 15);
  ctx.font = '900 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CILIK', sealX, sealY + 4);
  ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('RESMI 3R • MF', sealX, sealY + 22);
  ctx.restore();

  return canvas;
}

/**
 * Downloads the score certificate as a high-resolution PNG image.
 */
export async function downloadScoreAsPNG(data: ScoreExportData): Promise<void> {
  const canvas = await renderScoreCertificateCanvas(data);
  const cleanName = (data.userName || 'Pahlawan-Cilik').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `Sertifikat_Skor_Pilah_${cleanName}.png`;

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

/**
 * Converts canvas to high-quality JPEG Uint8Array.
 */
function canvasToJpegBytes(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          reject(new Error('Canvas toBlob failed'));
          return;
        }
        const buffer = await blob.arrayBuffer();
        resolve(new Uint8Array(buffer));
      },
      'image/jpeg',
      0.96
    );
  });
}

/**
 * Pure client-side PDF generator (PDF 1.4 compliant) embedding the high-resolution certificate.
 */
function createPdfDocument(jpegBytes: Uint8Array, width: number, height: number): Uint8Array {
  // A4 Landscape: 841.89 x 595.28 points
  const pageWidth = 842;
  const pageHeight = 595;

  const margin = 28;
  const availW = pageWidth - margin * 2;
  const availH = pageHeight - margin * 2;
  const scale = Math.min(availW / width, availH / height);
  const imgW = width * scale;
  const imgH = height * scale;
  const imgX = (pageWidth - imgW) / 2;
  const imgY = (pageHeight - imgH) / 2;

  const contentStream = `q\n${imgW.toFixed(2)} 0 0 ${imgH.toFixed(2)} ${imgX.toFixed(2)} ${imgY.toFixed(2)} cm\n/Im1 Do\nQ\n`;
  const contentBytes = new TextEncoder().encode(contentStream);

  const chunks: (string | Uint8Array)[] = [];
  const offsets: number[] = [];

  const addChunk = (chunk: string | Uint8Array) => {
    chunks.push(chunk);
  };

  addChunk('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  const getLength = () => {
    let len = 0;
    for (const c of chunks) {
      if (typeof c === 'string') len += new TextEncoder().encode(c).length;
      else len += c.length;
    }
    return len;
  };

  // 1: Catalog
  offsets[1] = getLength();
  addChunk('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // 2: Pages
  offsets[2] = getLength();
  addChunk('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // 3: Page
  offsets[3] = getLength();
  addChunk(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im1 4 0 R >> /ProcSet [/PDF /ImageC] >> /Contents 5 0 R >>\nendobj\n`
  );

  // 4: Image XObject
  offsets[4] = getLength();
  addChunk(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  addChunk(jpegBytes);
  addChunk('\nendstream\nendobj\n');

  // 5: Contents
  offsets[5] = getLength();
  addChunk(`5 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n`);
  addChunk(contentBytes);
  addChunk('endstream\nendobj\n');

  // Xref
  const startXref = getLength();
  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (let i = 1; i <= 5; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  addChunk(xref);

  const totalLen = getLength();
  const result = new Uint8Array(totalLen);
  let pos = 0;
  for (const c of chunks) {
    if (typeof c === 'string') {
      const b = new TextEncoder().encode(c);
      result.set(b, pos);
      pos += b.length;
    } else {
      result.set(c, pos);
      pos += c.length;
    }
  }

  return result;
}

/**
 * Downloads the score certificate as an official PDF document.
 */
export async function downloadScoreAsPDF(data: ScoreExportData): Promise<void> {
  const canvas = await renderScoreCertificateCanvas(data);
  const cleanName = (data.userName || 'Pahlawan-Cilik').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `Sertifikat_Skor_Pilah_${cleanName}.pdf`;

  const jpegBytes = await canvasToJpegBytes(canvas);
  const pdfBytes = createPdfDocument(jpegBytes, canvas.width, canvas.height);

  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
