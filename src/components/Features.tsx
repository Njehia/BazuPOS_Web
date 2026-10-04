import React from 'react';
import {
  HardDrive,
  ShieldCheck,
  Smartphone,
  Printer,
  CreditCard,
  Layers,
  Check,
  Lock,
  RefreshCw,
  Barcode,
  Users,
} from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">
            01. Retail Hardening &amp; Architectural Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Syne',sans-serif] text-balance">
            Engineered to Survive Kenyan Retail Realities.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            From sudden power outages on Thika Road to weekend M-Pesa network spikes in Westlands, Bazu POS eliminates counter downtime with unbreakable local-first engineering.
          </p>
        </div>

        {/* Feature 1: PC Data Guard & Zero-Loss Local Preservation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
          <div className="lg:col-span-7 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <HardDrive className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne',sans-serif]">
                PC Data Guard &amp; Zero-Loss Local Preservation
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Sudden electricity blackouts, ISP disruptions, or accidental browser cache flushes will <strong>never erase your records</strong>. Every product variant, transaction receipt, debtor balance, and cashier shift is committed directly to your counter PC&apos;s physical storage with zero cloud latency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SHA-256 Audit Chain</span>
                </div>
                <p className="text-xs text-slate-400">
                  Receipts are cryptographically chained with SHA-256 hashes, preventing backdoor edits or unauthorized deletions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Admin Purge Protection</span>
                </div>
                <p className="text-xs text-slate-400">
                  Bulk catalog deletions, inventory resets, and shift overrides require master administrator PIN authentication.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                <span className="font-mono">INTEGRITY AUDIT LOG</span>
                <span className="text-emerald-400 font-mono">STATUS: UNTAMPERED</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">PREVIOUS BLOCK HASH</div>
                  <div className="text-slate-300 truncate text-[10px]">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </div>
                </div>
                <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">PAYLOAD RECORD</div>
                  <div className="text-emerald-400 text-[11px]">
                    SALE #BZ-2026-00048 · KES 3,010 · TILL #8849201
                  </div>
                </div>
                <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">CRYPTOGRAPHIC SIGNATURE</div>
                  <div className="text-amber-400 truncate text-[10px]">
                    9c5a1a9e8b7c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Zero data loss guarantee: Survives hard reboot and browser refresh.
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Native Kenyan Payments & M-Pesa Reconciliation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300">Supported Checkout Modes</span>
                <span className="text-xs font-mono text-emerald-400">Zero Gateway Commission</span>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                      TILL
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">M-Pesa Buy Goods Till</div>
                      <div className="text-xs text-slate-400">Direct merchant till settlement</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">ACTIVE</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs">
                      PAY
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">M-Pesa Paybill</div>
                      <div className="text-xs text-slate-400">Business No + Account Reference</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-300">ACTIVE</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs">
                      CASH
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Cash &amp; Change Calculator</div>
                      <div className="text-xs text-slate-400">Auto cash drawer kick output</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-300">ACTIVE</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
                      TAB
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Customer Credit &amp; Debt Tabs</div>
                      <div className="text-xs text-slate-400">Debt aging and debtor statement</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-purple-400">LEDGER</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne',sans-serif]">
                Native Kenyan Payments &amp; M-Pesa Reconciliation
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Tired of cashiers misplacing M-Pesa SMS alerts or pocketing cash by faking messages? Bazu POS validates M-Pesa transaction reference codes, prevents duplicate receipts, and reconciles Buy Goods Till and Paybill receipts against daily sales reports.
              </p>
            </div>

            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Split Payments:</strong> Accept part cash and part M-Pesa on high-value bulk purchases or customer tabs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Debtor Ledgers:</strong> Run customer credit accounts with limits, automated debt aging, and itemized debt receipts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero Middleman Surcharges:</strong> Direct connection to your Safaricom merchant line with no percentage cuts.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 3: Multi-Device Real-Time Cloud Synchronization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
          <div className="lg:col-span-7 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <RefreshCw className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne',sans-serif]">
                Multi-Device Real-Time Cloud Synchronization
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Keep every stakeholder in sync. Counter cashiers ring up sales with supersonic speed on the counter PC, warehouse supervisors update inventory and receive stock on tablets, and the business owner monitors live daily turnover, drawer float, and margins from home on their phone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-xs font-semibold text-amber-400 mb-1">01. Counter Desktop</div>
                <p className="text-xs text-slate-300">
                  Supersonic keyboard shortcuts, instant barcode scanning, and thermal printing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-xs font-semibold text-emerald-400 mb-1">02. Floor Tablet</div>
                <p className="text-xs text-slate-300">
                  Mobile stock counts, incoming purchase orders, and supplier invoice intake.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-xs font-semibold text-sky-400 mb-1">03. Owner Phone</div>
                <p className="text-xs text-slate-300">
                  Live revenue, drawer cash, voided sale alerts, and end-of-shift audits anywhere.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl relative group">
              <img
                src="/src/assets/images/mobile_store_owner_phone_sync_1791075435185.jpg"
                alt="Store owner mobile live revenue dashboard"
                className="w-full h-72 object-cover object-center filter brightness-95 group-hover:scale-103 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-4">
                <div className="text-xs text-slate-200">
                  <div className="font-semibold text-white">Remote Phone Monitoring</div>
                  <div className="text-slate-400 text-[11px]">Real-time cloud push on every completed receipt</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Hardware & Peripheral Compatibility */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl relative group">
              <img
                src="/src/assets/images/hardware_thermal_printer_scanner_1791075425191.jpg"
                alt="80mm Thermal Receipt Printer and Barcode Scanner"
                className="w-full h-72 object-cover object-center filter brightness-95 group-hover:scale-103 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-4">
                <div className="text-xs text-slate-200">
                  <div className="font-semibold text-white">Plug &amp; Play USB &amp; Bluetooth Hardware</div>
                  <div className="text-slate-400 text-[11px]">Direct ESC/POS binary printing &amp; cash drawer relay</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Printer className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Syne',sans-serif]">
                Hardware &amp; Peripheral Compatibility
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect your existing POS equipment without proprietary driver lock-in. Bazu POS supports standard 58mm and 80mm ESC/POS thermal printers via USB, Bluetooth, and Windows print spoolers, along with 1D/2D laser barcode scanners and cash drawers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>ESC/POS Command Suite</span>
                </div>
                <div className="text-slate-400">
                  Auto-cutter trigger (`GS V 0`), cash drawer kick pulse (`ESC p 0`), and ultra-bold print density settings.
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Barcode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Barcode Scanners</span>
                </div>
                <div className="text-slate-400">
                  Compatible with Honeywell, Datalogic, Sunmi, Xprinter, and all plug-and-play USB barcode reader guns.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
