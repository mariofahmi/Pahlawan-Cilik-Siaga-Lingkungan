import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { COMMODITY_PRICES, CommodityPrice, SOP_STEPS, TransactionRecord } from '../data/bankSampahData';
import { sounds } from '../soundEffects';
import { speechAssistant } from '../speechAssistant';
import { 
  Scale, 
  Wallet, 
  History, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Gift, 
  Coins, 
  TrendingUp, 
  RotateCcw,
  Award,
  BookOpen,
  X,
  Smile,
  Zap,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Receipt
} from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  badge: string;
  badgeColor: string;
  description: string;
}

const WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: 'bibit',
    name: 'Bibit Bunga & Sayur',
    emoji: '🌻',
    targetAmount: 10000,
    badge: 'Kebun Hijau',
    badgeColor: '#10b981',
    description: '1 paket bibit bunga matahari dan benih bayam/kangkung.'
  },
  {
    id: 'krayon',
    name: 'Krayon Daur Ulang',
    emoji: '🎨',
    targetAmount: 20000,
    badge: 'Kreativitas',
    badgeColor: '#3b82f6',
    description: 'Set krayon ramah lingkungan berbahan lilin kedelai daur ulang.'
  },
  {
    id: 'pot',
    name: 'Pot Gantung Karakter',
    emoji: '🪴',
    targetAmount: 35000,
    badge: 'Dekorasi Kelas',
    badgeColor: '#f59e0b',
    description: 'Pot tanaman estetik berbentuk karakter pahlawan cilik.'
  },
  {
    id: 'pohon',
    name: 'Pohon Asuh + Piagam',
    emoji: '🌳',
    targetAmount: 50000,
    badge: 'Prestasi Akbar',
    badgeColor: '#8b5cf6',
    description: 'Sponsori 1 bibit pohon peneduh rindang di sekolah dengan piagam resmi.'
  }
];

interface BankSampahSimulasiProps {
  userName: string;
  userSchool: string;
  onAddPoints: (pts: number) => void;
}

export const BankSampahSimulasi: React.FC<BankSampahSimulasiProps> = ({
  userName,
  userSchool,
  onAddPoints
}) => {
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityPrice>(COMMODITY_PRICES[1]); // Default Botol PET
  const [weightKg, setWeightKg] = useState<number>(2.0);
  const [balance, setBalance] = useState<number>(24000);
  const [isScaleBouncing, setIsScaleBouncing] = useState<boolean>(false);
  const [activeRightTab, setActiveRightTab] = useState<'passbook' | 'wishlist' | 'sop'>('passbook');
  const [selectedWishlistId, setSelectedWishlistId] = useState<string>('krayon');
  const [claimedWishlist, setClaimedWishlist] = useState<WishlistItem | null>(null);

  const [transactions, setTransactions] = useState<TransactionRecord[]>([
    {
      id: 'TRX-001',
      date: '10/09/2026',
      commodityId: 'pet',
      commodityName: 'Plastik PET (Botol Bening)',
      weightKg: 2.0,
      pricePerKg: 5000,
      totalAmount: 10000,
      balanceAfter: 10000
    },
    {
      id: 'TRX-002',
      date: '12/09/2026',
      commodityId: 'kardus',
      commodityName: 'Kardus & Karton Tebal',
      weightKg: 7.0,
      pricePerKg: 2000,
      totalAmount: 14000,
      balanceAfter: 24000
    }
  ]);

  const [currentSopStep, setCurrentSopStep] = useState<number>(1);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(10000);
  const [receiptRecord, setReceiptRecord] = useState<TransactionRecord | null>(null);

  const subtotal = Math.round(weightKg * selectedCommodity.pricePerKg);
  const totalKgDiverted = transactions.reduce((acc, curr) => acc + curr.weightKg, 0);

  const activeWishlist = WISHLIST_ITEMS.find(w => w.id === selectedWishlistId) || WISHLIST_ITEMS[0];
  const wishlistProgress = Math.min(100, Math.round((balance / activeWishlist.targetAmount) * 100));

  const triggerScaleBounce = () => {
    setIsScaleBouncing(true);
    setTimeout(() => setIsScaleBouncing(false), 350);
  };

  const handleSelectCommodity = (commodity: CommodityPrice) => {
    setSelectedCommodity(commodity);
    sounds.playPop();
    triggerScaleBounce();
    speechAssistant.speak(`Memilih ${commodity.name}. Harga Rp ${commodity.pricePerKg.toLocaleString('id-ID')} per kg.`);
  };

  const handleAddWeight = (amount: number) => {
    sounds.playPop();
    triggerScaleBounce();
    setWeightKg(prev => Math.min(50, Math.max(0, Number((prev + amount).toFixed(2)))));
  };

  const handleResetWeight = () => {
    sounds.playClick();
    triggerScaleBounce();
    setWeightKg(0);
    speechAssistant.speak('Timbangan dinolkan kembali.');
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weightKg <= 0) {
      speechAssistant.speak('Berat sampah belum ditimbang. Tambah berat sampah terlebih dahulu ya!');
      return;
    }

    sounds.playCoin();
    triggerScaleBounce();

    const newBalance = balance + subtotal;
    const now = new Date();
    const dateFormatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    const newRecord: TransactionRecord = {
      id: `TRX-00${transactions.length + 1}`,
      date: dateFormatted,
      commodityId: selectedCommodity.id,
      commodityName: selectedCommodity.name,
      weightKg: Number(weightKg.toFixed(2)),
      pricePerKg: selectedCommodity.pricePerKg,
      totalAmount: subtotal,
      balanceAfter: newBalance
    };

    setTransactions(prev => [newRecord, ...prev]);
    setBalance(newBalance);
    onAddPoints(30);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    speechAssistant.speak(`Setoran sukses! Rp ${subtotal.toLocaleString('id-ID')} masuk ke Buku Tabungan Pahlawan.`);
    setReceiptRecord(newRecord);
    setWeightKg(0);
    setActiveRightTab('passbook');
  };

  const handleWithdraw = () => {
    if (withdrawAmount > balance || withdrawAmount <= 0) return;

    sounds.playCoin();
    const newBalance = balance - withdrawAmount;
    setBalance(newBalance);
    setShowWithdrawModal(false);

    speechAssistant.speak(`Penarikan berhasil! Uang tunai tabungan Rp ${withdrawAmount.toLocaleString('id-ID')} siap digunakan.`);
  };

  const handleClaimWishlist = (item: WishlistItem) => {
    if (balance < item.targetAmount) return;

    sounds.playFanfare();
    setBalance(prev => prev - item.targetAmount);
    setClaimedWishlist(item);
    onAddPoints(100);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });

    speechAssistant.speak(`Selamat ${userName}! Kamu berhasil menukarkan koin dengan ${item.name}!`);
  };

  const currentSop = SOP_STEPS.find(s => s.stepNumber === currentSopStep) || SOP_STEPS[0];

  return (
    <div id="bank-sampah-section" className="module-container bank-kid-theme single-screen-bank">
      {/* 1. Ultra-Compact Combined Header & HUD Bar */}
      <div className="bank-header-compact-row">
        <div className="bank-title-brand">
          <span className="title-emoji-mini">🏦</span>
          <div>
            <h3 className="bank-title-text">Bank Sampah Pahlawan Cilik</h3>
            <span className="bank-subtitle-text">Bab 5 Buku Panduan • Mario Fahmi Syahrial</span>
          </div>
          <div className="teller-mini-bubble" title="Teller Ramah Bank Sampah">
            <span className="teller-mini-avatar">🦊</span>
            <span className="teller-mini-msg">
              {weightKg > 0 
                ? `Ada ${weightKg} kg ${selectedCommodity.name}! Klik Setor!` 
                : `Halo ${userName}! Pilih sampah dan timbang ya!`}
            </span>
          </div>
        </div>

        {/* 3 HUD Status Badges */}
        <div className="bank-hud-badges-row">
          <div className="hud-badge-kid saldo-badge">
            <Coins size={16} color="#f59e0b" />
            <div className="hud-badge-info">
              <span className="hud-label">Saldo Koin</span>
              <strong className="hud-val text-gold">Rp {balance.toLocaleString('id-ID')}</strong>
            </div>
            <button
              id="btn-withdraw-modal"
              type="button"
              className="btn-mini-tarik"
              disabled={balance < 5000}
              onClick={() => setShowWithdrawModal(true)}
              title="Tarik saldo tabungan"
            >
              Tarik
            </button>
          </div>

          <div className="hud-badge-kid eco-badge">
            <Scale size={16} color="#10b981" />
            <div className="hud-badge-info">
              <span className="hud-label">Diselamatkan</span>
              <strong className="hud-val text-green">{totalKgDiverted.toFixed(1)} kg</strong>
            </div>
          </div>

          <div 
            className="hud-badge-kid wishlist-badge"
            onClick={() => setActiveRightTab('wishlist')}
            title="Klik untuk melihat Celengan Cita-Cita"
          >
            <span className="hud-gift-icon">{activeWishlist.emoji}</span>
            <div className="hud-badge-info">
              <span className="hud-label">Impian: {activeWishlist.name}</span>
              <div className="hud-mini-progress">
                <div className="hud-progress-fill" style={{ width: `${wishlistProgress}%` }} />
              </div>
            </div>
            <span className="hud-pct-text">{wishlistProgress}%</span>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Balanced Workspace (No-Scroll Fit) */}
      <div className="bank-workspace-2col">
        {/* LEFT COLUMN: Stasiun Penimbangan & Setoran */}
        <div className="bank-col-left">
          {/* Step 1: 6 Compact Commodity Chips */}
          <div className="compact-section-box">
            <div className="box-header-row">
              <span className="box-step-badge">1</span>
              <span className="box-title-label">Pilih Jenis Sampah Daur Ulang:</span>
            </div>
            <div className="commodity-chips-grid">
              {COMMODITY_PRICES.map(c => {
                const isSelected = selectedCommodity.id === c.id;
                return (
                  <button
                    key={c.id}
                    id={`commodity-btn-${c.id}`}
                    type="button"
                    className={`commodity-chip-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectCommodity(c)}
                  >
                    <span className="chip-icon">{c.icon}</span>
                    <span className="chip-name">{c.name}</span>
                    <span className="chip-price">Rp {c.pricePerKg.toLocaleString('id-ID')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Digital Scale Vessel with glowing LED & Bounce */}
          <div className="compact-section-box">
            <div className="box-header-row">
              <span className="box-step-badge">2</span>
              <span className="box-title-label">Timbang di Timbangan Digital:</span>
            </div>

            <div className="scale-container-compact">
              {/* Visual Plate */}
              <div className={`scale-plate-compact ${isScaleBouncing ? 'bouncing' : ''}`}>
                <div className="plate-surface">
                  {weightKg > 0 ? (
                    <div className="waste-pile-compact">
                      <span className="waste-emojis">
                        {selectedCommodity.icon} {selectedCommodity.icon} {selectedCommodity.icon}
                      </span>
                      <span className="waste-label-compact">
                        {selectedCommodity.name} ({weightKg} kg)
                      </span>
                    </div>
                  ) : (
                    <span className="scale-empty-txt">⚖️ Timbangan Kosong (Pilih kantong di bawah)</span>
                  )}
                </div>
              </div>

              {/* LED Base Bar */}
              <div className="scale-base-bar">
                <div className="led-digits-compact" id="scale-led-display">
                  {weightKg.toFixed(2)} <small>KG</small>
                </div>
                <div className="scale-controls-compact">
                  <button
                    type="button"
                    className="btn-scale-step"
                    onClick={() => handleAddWeight(-0.1)}
                    disabled={weightKg <= 0.1}
                    title="Kurangi 0.1 kg"
                  >
                    <Minus size={12} /> 0.1
                  </button>
                  <button
                    type="button"
                    className="btn-scale-step"
                    onClick={() => handleAddWeight(0.1)}
                    title="Tambah 0.1 kg"
                  >
                    <Plus size={12} /> 0.1
                  </button>
                  <button
                    type="button"
                    className="btn-scale-zero-mini"
                    onClick={handleResetWeight}
                    title="Nolkan timbangan"
                  >
                    <RotateCcw size={12} /> Nolkan
                  </button>
                </div>
              </div>

              {/* 4 Bag Preset Chips */}
              <div className="bag-presets-bar">
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => handleAddWeight(0.5)}
                  title="Tambah Kantong Mini 0.5 kg"
                >
                  🛍️ +0.5 kg
                </button>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => handleAddWeight(1.0)}
                  title="Tambah Tas Belanja 1.0 kg"
                >
                  🎒 +1.0 kg
                </button>
                <button
                  type="button"
                  className="preset-chip"
                  onClick={() => handleAddWeight(2.5)}
                  title="Tambah Karung Sedang 2.5 kg"
                >
                  👝 +2.5 kg
                </button>
                <button
                  type="button"
                  className="preset-chip highlight"
                  onClick={() => handleAddWeight(5.0)}
                  title="Tambah Kardus Besar 5.0 kg"
                >
                  📦 +5.0 kg
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Subtotal & Big CTA Button */}
          <form onSubmit={handleDeposit} className="deposit-action-bar">
            <div className="subtotal-display-compact">
              <span className="subtotal-formula">
                ({weightKg.toFixed(2)} kg × Rp {selectedCommodity.pricePerKg.toLocaleString('id-ID')})
              </span>
              <strong className="subtotal-amount" id="calc-subtotal-val">
                Rp {subtotal.toLocaleString('id-ID')}
              </strong>
            </div>

            <button
              id="btn-submit-deposit"
              type="submit"
              className="btn-deposit-super-compact"
              disabled={weightKg <= 0}
            >
              <Coins size={18} />
              <span>SETOR KE BUKU TABUNGAN (+30 ⭐)</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Tabbed Hub (Buku Tabungan / Toko Hadiah / Komik SOP) */}
        <div className="bank-col-right">
          {/* Top Switcher Tabs */}
          <div className="right-panel-tabs">
            <button
              type="button"
              className={`panel-tab-btn ${activeRightTab === 'passbook' ? 'active' : ''}`}
              onClick={() => {
                setActiveRightTab('passbook');
                sounds.playClick();
              }}
            >
              <BookOpen size={15} /> Buku Tabungan & Struk
            </button>
            <button
              type="button"
              className={`panel-tab-btn ${activeRightTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => {
                setActiveRightTab('wishlist');
                sounds.playClick();
              }}
            >
              <Gift size={15} /> Celengan Hadiah ({WISHLIST_ITEMS.length})
            </button>
            <button
              type="button"
              className={`panel-tab-btn ${activeRightTab === 'sop' ? 'active' : ''}`}
              onClick={() => {
                setActiveRightTab('sop');
                sounds.playClick();
              }}
            >
              <Receipt size={15} /> Komik SOP 8 Langkah
            </button>
          </div>

          {/* TAB 1: 3D School Passbook & Receipt */}
          {activeRightTab === 'passbook' && (
            <div className="passbook-compact-card">
              <div className="passbook-header-compact">
                <div className="passbook-mf-brand">
                  <img src="/logo-mf.png" alt="Logo MF" className="passbook-logo-mini" />
                  <div>
                    <h4 className="passbook-main-title">Buku Tabungan Pahlawan Cilik</h4>
                    <span className="passbook-sub-meta">No. Rekening: <strong>PC-2026-042</strong></span>
                  </div>
                </div>
                <div className="passbook-official-seal-mini">
                  ⭐ SAH • BANK SAMPAH CILIK MF
                </div>
              </div>

              <div className="passbook-owner-strip">
                <span>🦸 <strong>{userName}</strong> • 🏫 {userSchool}</span>
                <span className="badge-nasabah-cilik">Pahlawan Lingkungan</span>
              </div>

              {/* Scrollable Transaction Ledger */}
              <div className="passbook-table-scroll">
                <table className="passbook-table-compact" id="passbook-transactions-table">
                  <thead>
                    <tr>
                      <th>Tgl</th>
                      <th>Komoditas Sampah</th>
                      <th>Berat</th>
                      <th>Setoran (Rp)</th>
                      <th>Saldo (Rp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id}>
                        <td><small>{tx.date}</small></td>
                        <td><strong>{tx.commodityName}</strong></td>
                        <td>{tx.weightKg} kg</td>
                        <td className="text-green">+Rp {tx.totalAmount.toLocaleString('id-ID')}</td>
                        <td><strong className="text-gold">Rp {tx.balanceAfter.toLocaleString('id-ID')}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Passbook Bottom Action */}
              <div className="passbook-footer-actions">
                <button
                  type="button"
                  className="btn-print-receipt-mini"
                  onClick={() => setReceiptRecord(transactions[0])}
                >
                  <Printer size={14} /> Cetak Tiket Struk Setoran Terakhir
                </button>
                <small className="passbook-quote-mini">
                  "Dari Tempat Sampah ke Tabungan" • Bab 5
                </small>
              </div>
            </div>
          )}

          {/* TAB 2: Celengan Hadiah & Wishlist Store */}
          {activeRightTab === 'wishlist' && (
            <div className="wishlist-compact-panel">
              <div className="wishlist-intro-strip">
                <span>🎁 Kumpulkan koin tabunganmu dan tukarkan dengan hadiah ramah lingkungan impian:</span>
              </div>

              <div className="wishlist-cards-2x2">
                {WISHLIST_ITEMS.map((item) => {
                  const isSelected = selectedWishlistId === item.id;
                  const canAfford = balance >= item.targetAmount;
                  const itemProgress = Math.min(100, Math.round((balance / item.targetAmount) * 100));

                  return (
                    <div 
                      key={item.id}
                      className={`wishlist-compact-item ${isSelected ? 'active' : ''} ${canAfford ? 'can-afford' : ''}`}
                      onClick={() => {
                        setSelectedWishlistId(item.id);
                        sounds.playClick();
                      }}
                    >
                      <div className="item-top-row">
                        <span className="item-emoji">{item.emoji}</span>
                        <span className="item-badge" style={{ backgroundColor: `${item.badgeColor}22`, color: item.badgeColor }}>
                          {item.badge}
                        </span>
                      </div>

                      <strong className="item-title">{item.name}</strong>
                      <span className="item-price">Rp {item.targetAmount.toLocaleString('id-ID')}</span>

                      <div className="item-progress-mini">
                        <div className="item-progress-fill" style={{ width: `${itemProgress}%` }} />
                      </div>

                      <div className="item-action-row">
                        {canAfford ? (
                          <button
                            type="button"
                            className="btn-claim-compact"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClaimWishlist(item);
                            }}
                          >
                            🎉 Tukarkan Sekarang!
                          </button>
                        ) : (
                          <span className="item-progress-txt">
                            Menabung ({itemProgress}%)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Komik SOP 8 Langkah */}
          {activeRightTab === 'sop' && (
            <div className="sop-compact-panel">
              <div className="sop-card-compact">
                <div className="sop-header-row">
                  <span className="sop-badge-pill">Langkah {currentSop.stepNumber} dari {SOP_STEPS.length}</span>
                  <span className="sop-role-tag">Standar: <strong>{currentSop.standard}</strong></span>
                </div>

                <div className="sop-body-compact">
                  <div className="sop-emoji-visual">{currentSop.icon}</div>
                  <h4 className="sop-step-title">{currentSop.title}</h4>
                  <p className="sop-step-desc">{currentSop.instruction}</p>
                </div>

                <div className="sop-nav-row">
                  <button
                    type="button"
                    className="btn-sop-nav"
                    disabled={currentSopStep <= 1}
                    onClick={() => {
                      setCurrentSopStep(prev => Math.max(1, prev - 1));
                      sounds.playClick();
                    }}
                  >
                    <ChevronLeft size={16} /> Sebelumnya
                  </button>
                  <div className="sop-dots-indicator">
                    {SOP_STEPS.map(s => (
                      <span 
                        key={s.stepNumber} 
                        className={`sop-dot ${s.stepNumber === currentSopStep ? 'active' : ''}`}
                        onClick={() => setCurrentSopStep(s.stepNumber)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn-sop-nav"
                    disabled={currentSopStep >= SOP_STEPS.length}
                    onClick={() => {
                      setCurrentSopStep(prev => Math.min(SOP_STEPS.length, prev + 1));
                      sounds.playClick();
                    }}
                  >
                    Berikutnya <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: Tarik Saldo Tunai */}
      {showWithdrawModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card withdraw-modal-card">
            <div className="modal-header-row">
              <h3>💵 Penarikan Saldo Tabungan</h3>
              <button 
                type="button" 
                className="btn-close-modal" 
                onClick={() => setShowWithdrawModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p className="modal-desc-text">
              Saldo saat ini: <strong className="text-gold">Rp {balance.toLocaleString('id-ID')}</strong>.
              Tentukan jumlah saldo yang ingin dicairkan:
            </p>
            <div className="withdraw-quick-buttons">
              {[5000, 10000, 20000, 50000].map(amt => (
                <button
                  key={amt}
                  type="button"
                  className={`btn-amt-chip ${withdrawAmount === amt ? 'selected' : ''}`}
                  disabled={amt > balance}
                  onClick={() => setWithdrawAmount(amt)}
                >
                  Rp {amt.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn-primary full-width"
              disabled={withdrawAmount > balance || withdrawAmount <= 0}
              onClick={handleWithdraw}
              style={{ marginTop: '1rem' }}
            >
              Cairkan Rp {withdrawAmount.toLocaleString('id-ID')} Sekarang
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Struk Cetak Setoran */}
      {receiptRecord && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card receipt-modal-card">
            <div className="receipt-paper" id="printable-receipt">
              <div className="receipt-header">
                <img src="/logo-mf.png" alt="Logo MF" className="receipt-mf-logo" />
                <h4>BANK SAMPAH PAHLAWAN CILIK</h4>
                <p>Unit Resmi Bank Sampah Sekolah • Mario Fahmi Syahrial</p>
                <div className="receipt-divider-dashed" />
              </div>
              <div className="receipt-meta-rows">
                <div className="r-row"><span>No. Struk:</span><strong>{receiptRecord.id}</strong></div>
                <div className="r-row"><span>Tanggal:</span><strong>{receiptRecord.date}</strong></div>
                <div className="r-row"><span>Nasabah Cilik:</span><strong>{userName}</strong></div>
                <div className="r-row"><span>Sekolah:</span><strong>{userSchool}</strong></div>
                <div className="receipt-divider-dashed" />
                <div className="r-row"><span>Jenis Sampah:</span><strong>{receiptRecord.commodityName}</strong></div>
                <div className="r-row"><span>Berat Ditimbang:</span><strong>{receiptRecord.weightKg} kg</strong></div>
                <div className="r-row"><span>Harga / kg:</span><strong>Rp {receiptRecord.pricePerKg.toLocaleString('id-ID')}</strong></div>
                <div className="receipt-divider-dashed" />
                <div className="r-row r-total">
                  <span>TOTAL SETORAN:</span>
                  <strong className="text-green">+Rp {receiptRecord.totalAmount.toLocaleString('id-ID')}</strong>
                </div>
                <div className="r-row">
                  <span>Saldo Tabungan:</span>
                  <strong className="text-gold">Rp {receiptRecord.balanceAfter.toLocaleString('id-ID')}</strong>
                </div>
              </div>
              <div className="receipt-seal-stamp">
                ⭐ SAH • BANK SAMPAH CILIK MF
              </div>
            </div>
            <div className="receipt-modal-actions">
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => {
                  window.print();
                }}
              >
                <Printer size={16} /> Cetak Struk
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setReceiptRecord(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Sukses Klaim Hadiah Celengan Cita-Cita */}
      {claimedWishlist && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card claim-celebration-card">
            <span className="celebration-emoji-large">{claimedWishlist.emoji}</span>
            <h3>Selamat, {userName}!</h3>
            <p>
              Kamu berhasil menukarkan koin tabungan sampahmu dengan:
            </p>
            <div className="claimed-item-badge">
              <strong>{claimedWishlist.name}</strong>
              <small>{claimedWishlist.description}</small>
            </div>
            <p className="claim-reward-points">
              ⭐ <strong>+100 Bintang Pahlawan</strong> telah ditambahkan ke profilmu!
            </p>
            <button
              type="button"
              className="btn-primary full-width"
              onClick={() => setClaimedWishlist(null)}
              style={{ marginTop: '1rem' }}
            >
              Terima Hadiah & Lanjutkan Menabung!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
