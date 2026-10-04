import React, { useState } from 'react';
import {
  Play,
  Download,
  Store,
  WifiOff,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Receipt,
  Smartphone,
} from 'lucide-react';

interface HeroProps {
  onOpenWebPOS: () => void;
  onOpenPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWebPOS, onOpenPortal }) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'breakdown' | 'alerts'>('sales');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
      {/* Subtle geometric grid background */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Atmospheric Amber Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Domain & Trust Marker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/50 rounded-md px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engineered in Nairobi for East African Retailers</span>
              <span className="text-slate-500">·</span>
              <span className="font-mono text-slate-300">bazupos.co.ke</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-['Syne',sans-serif] text-balance mb-6">
              The Unbreakable POS Built for Kenyan Retailers &amp; Businesses.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              Never stop selling. 100% offline-first local PC database preservation, instant M-Pesa Till &amp; Cash checkout, automated ESC/POS thermal printing, and live phone sync for business owners.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenWebPOS}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-lg shadow-amber-500/25 active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Launch Free Web POS</span>
              </button>

              <a
                href="#downloads"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download for PC &amp; Android</span>
              </a>

              <button
                onClick={onOpenPortal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Store className="w-4 h-4 text-emerald-400" />
                <span>Open Owner Cloud Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Key Assurance Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 w-full text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Cloud Dependency at Till</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant M-Pesa Till &amp; Paybill</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant ESC/POS Printing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Hero Preview Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            {/* Visual Glass Frame */}
            <div className="relative rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Terminal Header */}
              <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 ml-2 font-mono">
                    TERMINAL 01 · CBD MAIN
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    ONLINE &amp; LOCAL SECURED
                  </span>
                </div>
              </div>

              {/* Terminal View Switcher Tabs */}
              <div className="flex border-b border-slate-800/80 bg-slate-950/40 p-1">
                <button
                  onClick={() => setActiveTab('sales')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'sales'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Live Shift Sales
                </button>
                <button
                  onClick={() => setActiveTab('breakdown')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'breakdown'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Payment Split
                </button>
                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'alerts'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Stock Alerts (3)
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-5 space-y-4">
                {activeTab === 'sales' && (
                  <>
                    {/* Turnover Highlight */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Today&apos;s Gross Turnover</span>
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <TrendingUp className="w-3.5 h-3.5" /> +24% vs yesterday
                        </span>
                      </div>
                      <div className="text-3xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                        KES 48,250
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        48 verified receipts recorded · Last checkout 4 mins ago
                      </div>
                    </div>

                    {/* Active Cashier & Drawer Float */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                        <div className="text-[11px] text-slate-400">Current Cashier</div>
                        <div className="text-sm font-semibold text-slate-200 mt-0.5 truncate">
                          Mercy Wanjiku
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          PIN Verified · Shift #4
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                        <div className="text-[11px] text-slate-400">Active Drawer Cash</div>
                        <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono tabular-nums">
                          KES 18,500
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Float: KES 5,000 + Cash: 13,500
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'breakdown' && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Settlement Channels</span>
                      <span className="text-slate-400 font-mono">KES 48,250 Total</span>
                    </div>

                    {/* Progress Bar Split */}
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: '72%' }}
                        title="M-Pesa Till & Paybill: 72%"
                      />
                      <div
                        className="bg-amber-500 h-full transition-all duration-500"
                        style={{ width: '28%' }}
                        title="Cash in Drawer: 28%"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <div>
                          <div className="text-slate-400">M-Pesa (72%)</div>
                          <div className="font-semibold text-white font-mono tabular-nums">KES 34,750</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <div>
                          <div className="text-slate-400">Cash Drawer (28%)</div>
                          <div className="font-semibold text-white font-mono tabular-nums">KES 13,500</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-2">
                      Zero manual reconciliation gaps — All M-Pesa receipts verified against Safaricom Till #8849201.
                    </div>
                  </div>
                )}

                {activeTab === 'alerts' && (
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-rose-200">Daawat Basmati Rice 2kg</div>
                        <div className="text-rose-400/80 text-[11px]">4 packets remaining (Reorder: 10)</div>
                      </div>
                      <span className="font-mono text-rose-400 font-bold">CRITICAL</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/40 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-amber-200">Oraimo Fast Type-C Cable</div>
                        <div className="text-amber-400/80 text-[11px]">6 pieces remaining (Reorder: 10)</div>
                      </div>
                      <span className="font-mono text-amber-400 font-bold">LOW</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/40 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-amber-200">Tri-Circle Solid Brass Padlock 50mm</div>
                        <div className="text-amber-400/80 text-[11px]">3 units remaining (Reorder: 6)</div>
                      </div>
                      <span className="font-mono text-amber-400 font-bold">LOW</span>
                    </div>
                  </div>
                )}

                {/* Stock Alert Notice Bar */}
                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>3 Items Low on Stock — Reorder Suggested</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('alerts')}
                    className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline"
                  >
                    View
                  </button>
                </div>

                {/* Quick Simulation Trigger */}
                <div className="pt-2">
                  <button
                    onClick={onOpenWebPOS}
                    className="w-full py-2.5 px-4 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>Open Live POS Checkout Sandbox</span>
                  </button>
                </div>
              </div>

              {/* Terminal Footer Bar */}
              <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Tamper-evident SHA-256 Chaining Active</span>
                <span className="font-mono text-slate-400">Store: bazu-cbd-001</span>
              </div>
            </div>

            {/* Decorative background image card overlay */}
            <div className="mt-4 rounded-xl overflow-hidden border border-slate-800 relative group hidden sm:block">
              <img
                src="/src/assets/images/retail_supermarket_store_shelves_1791075838468.jpg"
                alt="Bazu POS Universal Retail & Supermarket Inventory"
                className="w-full h-36 object-cover object-center filter brightness-90 group-hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3">
                <p className="text-xs text-slate-300 font-medium">
                  Deployed across Kenyan Supermarkets, Hardware Shops, Pharmacies, Boutiques &amp; Retail Outlets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
