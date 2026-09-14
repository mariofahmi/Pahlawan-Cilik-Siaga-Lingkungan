import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UPCYCLING_PROJECTS, UpcyclingProject } from '../data/upcyclingData';
import { sounds } from '../soundEffects';
import { speechAssistant } from '../speechAssistant';
import { Palette, Calculator, Sparkles, Clock, DollarSign, Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';

interface StudioUpcyclingProps {
  onAddPoints: (pts: number) => void;
}

export const StudioUpcycling: React.FC<StudioUpcyclingProps> = ({ onAddPoints }) => {
  const [selectedProject, setSelectedProject] = useState<UpcyclingProject>(UPCYCLING_PROJECTS[0]);
  const [customMaterialCost, setCustomMaterialCost] = useState<number>(selectedProject.baseMaterialCost);
  const [customOverheadCost, setCustomOverheadCost] = useState<number>(selectedProject.overheadCost);
  const [productionMinutes, setProductionMinutes] = useState<number>(selectedProject.estimatedTimeMinutes);
  const [hourlyWage, setHourlyWage] = useState<number>(10000); // Rp 10.000/jam standard buku
  const [marginPercent, setMarginPercent] = useState<number>(40); // 40% margin

  // Update calculator inputs when changing project
  const handleSelectProject = (p: UpcyclingProject) => {
    setSelectedProject(p);
    setCustomMaterialCost(p.baseMaterialCost);
    setCustomOverheadCost(p.overheadCost);
    setProductionMinutes(p.estimatedTimeMinutes);
    sounds.playClick();
    speechAssistant.speak(`Proyek ${p.title}. Yuk pelajari cara membuat kreasi ini dari barang bekas!`);
  };

  // Calculation based on Bab 4.2.2 formula
  const laborCost = Math.round((productionMinutes / 60) * hourlyWage);
  const totalCost = customMaterialCost + customOverheadCost + laborCost;
  const marginMultiplier = 1 + (marginPercent / 100);
  const calculatedSellingPrice = Math.round(totalCost * marginMultiplier);
  const roundedBazaarPrice = Math.ceil(calculatedSellingPrice / 1000) * 1000;
  const profit = roundedBazaarPrice - (customMaterialCost + customOverheadCost); // Gross profit without own labor or net profit

  const handleSimulateFinish = () => {
    sounds.playChime();
    onAddPoints(30);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    speechAssistant.speak(`Selamat! Rencana produk kreasi upcycling ${selectedProject.title} siap diproduksi dan dijual!`);
  };

  return (
    <div id="upcycling-section" className="module-container">
      {/* Header */}
      <div className="module-header">
        <div>
          <h2 className="module-title" id="upcycling-title">
            <span className="title-icon">🎨</span> Studio Upcycling & Kreasi Cuan
          </h2>
          <p className="module-subtitle">
            Ubah limbah anorganik menjadi produk bernilai estetis dan rupiah tinggi (Bab 4 & Tabel 8).
          </p>
        </div>
      </div>

      {/* 4 Projects Selector Cards */}
      <div className="projects-grid-selector" id="upcycling-projects-catalog">
        {UPCYCLING_PROJECTS.map((p) => (
          <button
            key={p.id}
            id={`project-card-${p.id}`}
            type="button"
            className={`project-pill-card ${selectedProject.id === p.id ? 'active-project' : ''}`}
            onClick={() => handleSelectProject(p)}
          >
            <span className="project-emoji">{p.imageEmoji}</span>
            <div className="project-brief">
              <span className="project-category">{p.category}</span>
              <strong className="project-name">{p.title}</strong>
              <span className="project-price-tag">Target: Rp {p.suggestedSellPrice.toLocaleString('id-ID')}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Studio Work Area */}
      <div className="studio-main-grid">
        {/* Left: Step by Step Crafting Guide */}
        <div className="craft-guide-panel">
          <div className="project-hero-badge" style={{ borderLeft: `6px solid ${selectedProject.color}` }}>
            <div className="hero-emoji-circle">{selectedProject.imageEmoji}</div>
            <div>
              <span className="badge-pill">{selectedProject.difficulty} • {selectedProject.estimatedTimeMinutes} Menit</span>
              <h3 className="project-hero-title">{selectedProject.title}</h3>
              <p className="waste-origin-note">Sumber Limbah: <strong>{selectedProject.wasteSource}</strong></p>
            </div>
          </div>

          <div className="craft-prerequisites-grid">
            <div className="prereq-box">
              <h4>📦 Bahan yang Diperlukan:</h4>
              <ul>
                {selectedProject.materialsNeeded.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
            <div className="prereq-box">
              <h4>✂️ Alat Kerja (Didampingi Ortu/Guru):</h4>
              <ul>
                {selectedProject.toolsNeeded.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step list */}
          <div className="craft-steps-list">
            <h4>🛠️ Panduan Langkah Pembuatan:</h4>
            {selectedProject.steps.map((s) => (
              <div key={s.stepNo} className="craft-step-card">
                <div className="step-badge-num">{s.stepNo}</div>
                <div className="step-content">
                  <h5 className="step-heading">{s.title}</h5>
                  <p className="step-description">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="eco-impact-box">
            <Lightbulb size={20} color="#eab308" />
            <div>
              <strong>Dampak Ekologis:</strong>
              <p>{selectedProject.ecoImpact}</p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Pricing & Profit Calculator (Bab 4.2.2) */}
        <div className="pricing-calculator-panel" id="pricing-calculator">
          <div className="calc-header">
            <Calculator size={22} color="#16a34a" />
            <h3>Kalkulator Rumus Harga Jual (Bab 4.2.2)</h3>
          </div>
          <p className="calc-formula-desc">
            <code>Harga = (Bahan + Tambahan + Waktu x Upah) x Margin</code>
          </p>

          <div className="calc-form-container">
            <div className="form-group">
              <label htmlFor="input-material-cost">1. Biaya Bahan Baku Tambahan (Cat/Hiasan):</label>
              <div className="input-prefix-wrapper">
                <span className="prefix">Rp</span>
                <input
                  id="input-material-cost"
                  type="number"
                  step="500"
                  value={customMaterialCost}
                  onChange={(e) => setCustomMaterialCost(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-overhead-cost">2. Biaya Listrik, Lem & Penyusutan:</label>
              <div className="input-prefix-wrapper">
                <span className="prefix">Rp</span>
                <input
                  id="input-overhead-cost"
                  type="number"
                  step="500"
                  value={customOverheadCost}
                  onChange={(e) => setCustomOverheadCost(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-production-time">3. Waktu Pengerjaan (Menit):</label>
              <div className="slider-row">
                <input
                  id="input-production-time"
                  type="range"
                  min="15"
                  max="180"
                  step="5"
                  value={productionMinutes}
                  onChange={(e) => setProductionMinutes(parseInt(e.target.value) || 15)}
                />
                <span className="slider-val">{productionMinutes} menit</span>
              </div>
              <small className="cost-breakdown-note">
                Upah Waktu: ({productionMinutes} mnt / 60) x Rp {hourlyWage.toLocaleString('id-ID')} = <strong>Rp {laborCost.toLocaleString('id-ID')}</strong>
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="input-margin-pct">4. Target Margin Keuntungan (%):</label>
              <div className="slider-row">
                <input
                  id="input-margin-pct"
                  type="range"
                  min="20"
                  max="70"
                  step="5"
                  value={marginPercent}
                  onChange={(e) => setMarginPercent(parseInt(e.target.value) || 40)}
                />
                <span className="slider-val">{marginPercent}%</span>
              </div>
            </div>

            {/* Calculations Result Output */}
            <div className="calculated-summary-box">
              <div className="summary-row">
                <span>Total Modal Produksi:</span>
                <strong>Rp {totalCost.toLocaleString('id-ID')}</strong>
              </div>
              <div className="summary-row">
                <span>Harga Hitungan Rumus:</span>
                <span>Rp {calculatedSellingPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="calc-divider" />
              <div className="summary-row highlight-row">
                <span>Rekomendasi Harga Jual:</span>
                <strong className="final-price">Rp {roundedBazaarPrice.toLocaleString('id-ID')}</strong>
              </div>
              <div className="summary-row profit-row">
                <span>Potensi Keuntungan Bersih:</span>
                <strong className="text-green">+Rp {profit.toLocaleString('id-ID')} / buah</strong>
              </div>
            </div>

            <div className="marketing-tip-box">
              <span>💡 <strong>Tips Pemasaran Online:</strong> {selectedProject.marketingTip}</span>
            </div>

            <button
              id="btn-simulate-upcycling"
              type="button"
              className="btn-primary full-width"
              onClick={handleSimulateFinish}
            >
              <Sparkles size={18} /> Rencanakan Kreasi Ini (+30 Bintang)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
