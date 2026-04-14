import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Activity, Zap, ChevronRight, X } from 'lucide-react';
import QrisImg from './assets/qrisss.png';

type Product = {
  id: number;
  name: string;
  price: number;
  priceStr: string;
  category: string;
  minOrder?: number;
};

const products: Product[] = [
  { id: 1, name: 'Netflix private 1 bulan', price: 70000, priceStr: 'Rp 70.000', category: 'NETFLIX' },
  { id: 2, name: 'Netflix private 7 hari', price: 40000, priceStr: 'Rp 40.000', category: 'NETFLIX' },
  { id: 3, name: 'Capcut head 35 hari', price: 45000, priceStr: 'Rp 45.000', category: 'CAPCUT' },
  { id: 4, name: 'Wetv 1bulan', price: 20000, priceStr: 'Rp 20.000', category: 'SPOTIFY' },
  { id: 5, name: '2.000 followers', price: 65000, priceStr: 'Rp 65.000', category: 'AKUN INSTAGRAM (AKTIF)' },
  { id: 6, name: '1.000 followers', price: 45000, priceStr: 'Rp 45.000', category: 'AKUN INSTAGRAM (AKTIF)' },
  { id: 7, name: '2.000 followers ', price: 95000, priceStr: 'Rp 95.000', category: 'AKUN TIKTOK (AKTIF)' },
  { id: 8, name: '1.000 followers ', price: 65000, priceStr: 'Rp 65.000', category: 'AKUN TIKTOK (AKTIF)' },
  { id: 9, name: 'FRESH', price: 2500, priceStr: 'Rp 2.500', category: 'AKUN GMAIL', minOrder: 20 },
  { id: 10, name: 'YT PREMIUM', price: 3000, priceStr: 'Rp 3.000', category: 'AKUN GMAIL', minOrder: 15 },
  { id: 11, name: 'BEKAS', price: 1200, priceStr: 'Rp 1.200', category: 'AKUN GMAIL', minOrder: 33 },
  { id: 12, name: 'GEMINI', price: 3500, priceStr: 'Rp 3.500', category: 'AKUN GMAIL', minOrder: 13 },
];

export type Transaction = {
  id: string;
  name: string;
  product: string;
  qty: number;
  amount: string;
  date: string;
  status: string;
};

const initialTransactions: Transaction[] = [];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (trx: Transaction) => {
    setTransactions([trx, ...transactions]);
  };

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
              Jurji Store
            </span>
          </motion.div>

          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto justify-center sm:justify-end pb-1 sm:pb-0 hide-scrollbar">
            {[
              { id: 'home', label: 'Beranda' },
              { id: 'pricing', label: 'Produk' },
              { id: 'transactions', label: 'Riwayat Pembelian' },
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
          {activeTab === 'pricing' && <PricingView key="pricing" addTransaction={addTransaction} setActiveTab={setActiveTab} />}
          {activeTab === 'transactions' && <TransactionsView key="transactions" transactions={transactions} />}
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
        Jurji Store menyediakan berbagai macam lisensi, akun premium, dan kebutuhan digital lainnya dengan proses instan dan aman.
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
      </div>
    </motion.div>
  );
}

function PricingView({ addTransaction, setActiveTab }: { addTransaction: (trx: Transaction) => void, setActiveTab: (tab: string) => void }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({ name: '', contact: '', qty: 1 });
  const [errorText, setErrorText] = useState('');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setFormData({ name: '', contact: '', qty: product.minOrder || 1 });
    setErrorText('');
    setModalStep(1);
  };

  const handleNext = () => {
    if (!formData.name || !formData.contact || !formData.qty) {
      setErrorText('Mohon lengkapi semua data.');
      return;
    }
    const minQty = selectedProduct?.minOrder || 1;
    if (formData.qty < minQty) {
      setErrorText(`Minimal pembelian untuk produk ini adalah ${minQty}.`);
      return;
    }
    setErrorText('');
    setModalStep(2);
  };

  const handleFinishPayment = () => {
    if (!selectedProduct) return;
    const total = selectedProduct.price * formData.qty;
    const newTrx: Transaction = {
      id: \`TRX-\${Math.floor(10000 + Math.random() * 90000)}\`,
      name: formData.name,
      product: selectedProduct.name,
      qty: formData.qty,
      amount: \`Rp \${total.toLocaleString('id-ID')}\`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Sukses'
    };
    addTransaction(newTrx);
    setSelectedProduct(null);
    setActiveTab('transactions');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full relative"
    >
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Katalog Produk</h2>
        <p className="text-zinc-400">Pilih produk digital sesuai kebutuhan Anda.</p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-cyan-400 border-b border-white/10 pb-2">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {products.filter(p => p.category === category).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative group overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <h4 className="text-xl font-bold mb-2 relative z-10">{product.name}</h4>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 relative z-10">
                  {product.priceStr}
                </div>
                
                {product.minOrder && (
                  <p className="text-xs text-amber-400 mb-4 bg-amber-400/10 p-2 rounded-lg border border-amber-400/20 relative z-10">
                    * Minimal pembelian {product.minOrder}
                  </p>
                )}
                
                <motion.button
                  onClick={() => handleBuyClick(product)}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(34,211,238,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-auto py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all font-medium flex items-center justify-center gap-2 relative z-10"
                >
                  <ShoppingCart className="w-4 h-4" /> Beli Sekarang
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal Transaction */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 p-6 sm:p-8 rounded-2xl w-full max-w-md relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-black/50 p-1 rounded-full aspect-square flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold mb-6 pr-8 text-cyan-400">{selectedProduct.category}</h3>
              
              {modalStep === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-black/30 rounded-xl border border-white/5 mb-6">
                    <p className="font-medium">{selectedProduct.name}</p>
                    <p className="text-cyan-400 font-bold">{selectedProduct.priceStr}</p>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Nama</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50" 
                      placeholder="Masukkan nama anda" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Nomor Telepon / Sosial Media</label>
                    <input 
                      type="text" 
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50" 
                      placeholder="Contoh: 08123456789" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Jumlah Produk</label>
                    <input 
                      type="number" 
                      min={selectedProduct.minOrder || 1}
                      value={formData.qty}
                      onChange={(e) => setFormData({...formData, qty: parseInt(e.target.value) || 0})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50" 
                    />
                    {selectedProduct.minOrder && (
                      <p className="text-xs text-amber-400 mt-1">Minimal pembelian {selectedProduct.minOrder}</p>
                    )}
                  </div>
                  
                  {errorText && <p className="text-red-400 text-sm mt-2">{errorText}</p>}

                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 mt-6 rounded-xl bg-cyan-500 text-black font-semibold"
                  >
                    Next
                  </motion.button>
                </div>
              )}

              {modalStep === 2 && (
                <div className="flex flex-col items-center">
                  <p className="text-center text-zinc-400 mb-4 text-sm">Silakan scan QRIS di bawah ini untuk melakukan pembayaran.</p>
                  
                  <div className="bg-white p-3 rounded-2xl mb-6 flex justify-center w-full max-w-[240px]">
                    <img src={QrisImg} alt="QRIS" className="w-full h-auto object-contain rounded-lg" />
                  </div>
                  
                  <div className="text-center mb-6 w-full p-4 bg-black/30 rounded-xl border border-white/5">
                    <p className="text-sm text-zinc-400 mb-1">Total yang harus dibayar</p>
                    <p className="text-3xl font-bold text-cyan-400">
                      Rp {(selectedProduct.price * formData.qty).toLocaleString('id-ID')}
                    </p>
                  </div>

                  <motion.button
                    onClick={handleFinishPayment}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center justify-center gap-2"
                  >
                    Selesai
                  </motion.button>
                  <button 
                    onClick={() => setModalStep(1)}
                    className="mt-4 text-sm text-zinc-500 hover:text-white"
                  >
                    Kembali
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TransactionsView({ transactions }: { transactions: Transaction[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Riwayat Pembelian</h2>
          <p className="text-zinc-400">Daftar pembelian yang dilakukan.</p>
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
                <th className="p-4 text-sm font-medium text-zinc-400">NAMA USER</th>
                <th className="p-4 text-sm font-medium text-zinc-400">JENIS PRODUK</th>
                <th className="p-4 text-sm font-medium text-zinc-400">JUMLAH PRODUK</th>
                <th className="p-4 text-sm font-medium text-zinc-400">TOTAL HARGA</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, i) => (
                <motion.tr 
                  key={trx.id + i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 text-sm font-medium">{trx.name}</td>
                  <td className="p-4 text-sm text-zinc-300">{trx.product}</td>
                  <td className="p-4 text-sm font-mono text-zinc-300">{trx.qty}</td>
                  <td className="p-4 text-sm text-cyan-400 font-medium">{trx.amount}</td>
                </motion.tr>
              ))}
              {transactions.length === 0 && (
                 <tr>
                   <td colSpan={4} className="p-8 text-center text-zinc-500">
                     Belum ada riwayat pembelian.
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
