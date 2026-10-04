import React, { useState } from 'react';
import {
  Search,
  Zap,
  AlertTriangle,
  Lock,
  Trash2,
  RotateCcw,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { StorageService } from '../services/storage';

interface CatalogShowcaseProps {
  products: Product[];
  onRefreshProducts: () => void;
  onOpenWebPOS: () => void;
}

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Groceries & Pantry',
  'Beverages & Drinks',
  'Electronics & Tech',
  'Health & Personal Care',
  'Hardware & Home',
  'General Merchandise',
];

export const CatalogShowcase: React.FC<CatalogShowcaseProps> = ({
  products,
  onRefreshProducts,
  onOpenWebPOS,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [onlyQuickKeys, setOnlyQuickKeys] = useState(false);

  // Security Gate State for Catalog Purge / Reset
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  // Filtered Products
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcode.includes(searchQuery);
    const matchesLowStock = !onlyLowStock || item.stock <= item.reorderLevel;
    const matchesQuickKeys = !onlyQuickKeys || !!item.isQuickKey;
    return matchesCategory && matchesSearch && matchesLowStock && matchesQuickKeys;
  });

  const lowStockCount = products.filter((p) => p.stock <= p.reorderLevel).length;
  const quickKeyCount = products.filter((p) => p.isQuickKey).length;

  const handleExecutePurge = () => {
    // Admin PIN verification (Default admin PIN 1234 or superuser 'njehia')
    if (adminPinInput === '1234' || adminPinInput === 'njehia') {
      StorageService.resetProducts();
      onRefreshProducts();
      setPinError('');
      setPurgeSuccess(true);
      setTimeout(() => {
        setPurgeSuccess(false);
        setIsPurgeModalOpen(false);
        setAdminPinInput('');
      }, 1400);
    } else {
      setPinError('Invalid Administrator PIN. Access Denied.');
    }
  };

  return (
    <section id="catalog" className="py-20 lg:py-28 bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Catalog Strategy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
              02. Interactive Product Catalog &amp; Inventory Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Syne',sans-serif]">
              Pre-Loaded with 150+ Kenyan Retail SKUs.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl">
              Start selling within 60 seconds of installation. Bazu POS includes standard pricing, barcode numbers, and reorder levels for groceries, tech accessories, health products, hardware, beverages, and sundries.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPurgeModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Standard Catalog</span>
            </button>

            <button
              onClick={onOpenWebPOS}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Sell in Web POS</span>
            </button>
          </div>
        </div>

        {/* Catalog Banner with high-fidelity retail photo */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-slate-800 relative h-48 sm:h-56">
          <img
            src="/src/assets/images/retail_supermarket_store_shelves_1791075838468.jpg"
            alt="Modern Retail and Supermarket Display Shelves"
            className="w-full h-full object-cover object-center filter brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent flex items-center p-6 sm:p-10">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-amber-400 font-mono tracking-wide uppercase">
                Zero Data Entry Bottlenecks
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Universal Retail Standards Built-In
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Automatic safety stock indicators alert cashiers when fast-moving food staples, charger cables, lightbulbs, or personal care products drop below critical shelf thresholds.
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by product name or scan barcode (e.g. Jogoo, Oraimo, 616210000001)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 text-white placeholder-slate-500 text-xs sm:text-sm rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Toggles */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setOnlyQuickKeys(!onlyQuickKeys)}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  onlyQuickKeys
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Keys ({quickKeyCount})</span>
              </button>

              <button
                onClick={() => setOnlyLowStock(!onlyLowStock)}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  onlyLowStock
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Low Stock ({lowStockCount})</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.slice(0, 24).map((product) => {
            const isLowStock = product.stock <= product.reorderLevel;

            return (
              <div
                key={product.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Status Row */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="truncate max-w-[140px]">{product.category}</span>
                    {product.isQuickKey && (
                      <span className="flex items-center gap-1 text-amber-400 font-mono text-[10px]">
                        <Zap className="w-3 h-3 fill-amber-400" /> TOP-KEY
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="text-xs text-slate-400 mt-0.5">{product.unit}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      BARCODE: {product.barcode}
                    </div>
                    <div className="text-base font-extrabold text-white font-mono tabular-nums mt-0.5">
                      KES {product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-500">IN STOCK</div>
                    <div
                      className={`text-xs font-bold font-mono tabular-nums ${
                        isLowStock ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {product.stock} units
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 p-8 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-slate-400 text-sm">
              No products found matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setOnlyLowStock(false);
                setOnlyQuickKeys(false);
              }}
              className="mt-3 text-xs font-semibold text-amber-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {filteredProducts.length > 24 && (
          <div className="mt-8 text-center text-xs text-slate-500">
            Showing first 24 of {filteredProducts.length} items. Launch Web POS to explore the entire catalog and run transactions.
          </div>
        )}
      </div>

      {/* Admin Security Password Gate Modal for Purge */}
      {isPurgeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Administrator Security Gate</h3>
                <p className="text-xs text-slate-400">Catalog Reset &amp; Inventory Purge</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This action resets the local inventory catalog back to factory defaults (150+ Kenyan retail &amp; merchandise SKUs). Enter the store administrator PIN or Superuser master key to proceed.
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono">
              <div className="text-amber-400 font-semibold mb-1">Demo PIN Reference:</div>
              <div>Store Admin PIN: <strong className="text-white">1234</strong></div>
              <div>Titus Njehia Master Key: <strong className="text-white">njehia</strong></div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Administrator PIN / Password
              </label>
              <input
                type="password"
                placeholder="Enter PIN..."
                value={adminPinInput}
                onChange={(e) => setAdminPinInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleExecutePurge();
                }}
                className="w-full px-3.5 py-2.5 bg-slate-950 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 font-mono text-center tracking-widest text-lg"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-400 mt-1.5">{pinError}</p>}
            </div>

            {purgeSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Catalog successfully restored to factory defaults!</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsPurgeModalOpen(false);
                  setAdminPinInput('');
                  setPinError('');
                }}
                className="flex-1 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecutePurge}
                className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Verify &amp; Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
