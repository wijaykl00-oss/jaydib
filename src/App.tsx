import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Activity, Zap, Shield, Cpu, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

// Mock Data
const products = [
  { id: 1, name: 'Lisensi Windows 11 Pro', price: 'Rp 150.000', features: ['Lifetime Activation', 'Original Key', 'Instant Delivery'], icon: Cpu },
  { id: 2, name: 'Spotify Premium 1 Bulan', price: 'Rp 35.000', features: ['Private Account', 'Full Garansi', 'Anti Banned'], icon: Zap },
  { id: 3, name: 'Netflix Premium UHD', price: 'Rp 45.000', features: ['1 Profile 1 User', 'Resolusi 4K UHD', 'Garansi 30 Hari'], icon: Shield },
];

const mockTransactions = [
  { id: 'TRX-99281', product: 'Spotify Premium 1 Bulan', date: '10 Mar 2026', status: 'Sukses', amount: 'Rp 35.000' },
  { id: 'TRX-99280', product: 'Lisensi Windows 11 Pro', date: '09 Mar 2026', status: 'Pending', amount: 'Rp 150.000' },
  { id: 'TRX-99279', product: 'Netflix Premium UHD', date: '08 Mar 2026', status: 'Sukses', amount: 'Rp 45.000' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern z-0 opacity-50 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] z-0 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl sm:text-2xl font-bold tracking-tighter flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 glow-text">
              Wijay Store
            </span>
          </motion.div>

          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto justify-center sm:justify-end pb-1 sm:pb-0 hide-scrollbar">
            {[
              { id: 'home', label: 'Beranda' },
              { id: 'pricing', label: 'Harga' },
              { id: 'check', label: 'Cek Penjualan' },
              { id: 'transactions', label: 'Transaksi' },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgb(34,211,238)" }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === item.id ? 'text-cyan-400' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-400/10 border border-cyan-400/30 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeView key="home" setActiveTab={setActiveTab} />}
          {activeTab === 'pricing' && <PricingView key="pricing" />}
          {activeTab === 'check' && <CheckSalesView key="check" />}
          {activeTab === 'transactions' && <TransactionsView key="transactions" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeView({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center text-center pt-10 sm:pt-20"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs sm:text-sm mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        Platform Produk Digital Terpercaya
      </motion.div>
      
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
        Masa Depan <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Produk Digital
        </span>
      </h1>
      
      <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mb-10 px-4">
        Wijay Store menyediakan berbagai macam lisensi, akun premium, dan kebutuhan digital lainnya dengan proses instan dan aman.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
        <motion.button
          onClick={() => setActiveTab('pricing')}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34,211,238,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center justify-center gap-2"
        >
          Lihat Produk <ChevronRight className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('check')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
        >
          Cek Pesanan <Search className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function PricingView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Katalog Produk</h2>
        <p className="text-zinc-400">Pilih produk digital sesuai kebutuhan Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 border border-cyan-500/30">
              <product.icon className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
              {product.price}
            </div>
            
            <ul className="space-y-3 mb-8">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(34,211,238,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all font-medium flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Beli Sekarang
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CheckSalesView() {
  const [orderId, setOrderId] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    
    setIsChecking(true);
    setResult(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false);
      const found = mockTransactions.find(t => t.id === orderId);
      setResult(found || { error: 'Pesanan tidak ditemukan. Pastikan ID Transaksi benar.' });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Cek Status Pesanan</h2>
        <p className="text-zinc-400">Masukkan ID Transaksi Anda untuk melihat status terbaru.</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Contoh: TRX-99281"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(34,211,238,0.3)" }}
            whileTap={{ scale: 0.98 }}
            disabled={isChecking || !orderId}
            className="px-8 py-4 rounded-xl bg-cyan-500 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
          >
            {isChecking ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Clock className="w-5 h-5" />
              </motion.div>
            ) : (
              'Cek Sekarang'
            )}
          </motion.button>
        </form>

        <AnimatePresence mode="wait">
          {result && !result.error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black/40 border border-white/5 rounded-xl p-6 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">ID Transaksi</p>
                  <p className="font-mono text-lg text-cyan-400">{result.id}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-zinc-500 mb-1">Status</p>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    result.status === 'Sukses' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {result.status === 'Sukses' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {result.status}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span className="text-zinc-400">Produk</span>
                  <span className="font-medium">{result.product}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span className="text-zinc-400">Tanggal</span>
                  <span className="font-medium">{result.date}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1 pt-4 border-t border-white/5">
                  <span className="text-zinc-400">Total Pembayaran</span>
                  <span className="font-bold text-lg text-cyan-400">{result.amount}</span>
                </div>
              </div>
            </motion.div>
          )}

          {result && result.error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center text-red-400 overflow-hidden"
            >
              {result.error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TransactionsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Riwayat Transaksi</h2>
          <p className="text-zinc-400">Daftar transaksi terbaru di Wijay Store.</p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center">
          <Activity className="w-6 h-6 text-cyan-400" />
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="p-4 text-sm font-medium text-zinc-400">ID Transaksi</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Produk</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Tanggal</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Jumlah</th>
                <th className="p-4 text-sm font-medium text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((trx, i) => (
                <motion.tr 
                  key={trx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-mono text-sm text-cyan-400">{trx.id}</td>
                  <td className="p-4 text-sm font-medium">{trx.product}</td>
                  <td className="p-4 text-sm text-zinc-400">{trx.date}</td>
                  <td className="p-4 text-sm">{trx.amount}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      trx.status === 'Sukses' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
