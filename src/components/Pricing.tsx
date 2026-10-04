import React, { useState } from 'react';
import { Check, Zap, Shield, Sparkles, Building2, HelpCircle } from 'lucide-react';

interface PricingProps {
  onOpenWebPOS: () => void;
  onOpenPortal: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenWebPOS, onOpenPortal }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            05. Transparent Pricing Plans Tailored for Kenyan Retailers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Syne',sans-serif]">
            Simple, Honest Pricing in Kenyan Shillings.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            No percentage commission cut on your M-Pesa sales. No hidden gateway fees. Choose standalone offline freedom or real-time cloud multi-device sync.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                !isAnnual
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[10px] px-1.5 py-0.5 rounded font-bold">
                SAVE 2 MONTHS
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Free Local PC Starter */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-8 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase mb-1">
                STANDALONE COUNTER
              </div>
              <h3 className="text-2xl font-bold text-white">Local PC Starter</h3>
              <p className="text-xs text-slate-400 mt-2">
                Ideal for single-counter shops that want 100% offline terminal independence.
              </p>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">KES 0</span>
                  <span className="text-xs text-slate-400 font-medium">/ Forever</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1">
                  No credit card or recurring contract required
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% Offline Standalone POS Terminal</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Unlimited Inventory SKUs &amp; Barcode Lookup</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Unlimited Sales Receipts &amp; KRA Tax Breakdown</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>ESC/POS Thermal Printing (58mm &amp; 80mm)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Customer Credit Debtor Ledger &amp; Running Tabs</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>One-Click Encrypted Local Database Backup</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenWebPOS}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Launch Free Web POS
              </button>
            </div>
          </div>

          {/* Plan 2: Cloud Sync Pro (Most Popular) */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-400/80 p-8 flex flex-col justify-between shadow-2xl shadow-amber-500/10 relative">
            {/* Pill Header Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              MOST POPULAR IN KENYA
            </div>

            <div>
              <div className="text-xs font-bold text-amber-400 font-mono tracking-wider uppercase mb-1">
                CONNECTED STORE
              </div>
              <h3 className="text-2xl font-bold text-white">Cloud Sync Pro</h3>
              <p className="text-xs text-slate-300 mt-2">
                For growing retail stores, supermarkets, pharmacies, hardware shops, and businesses where the owner monitors sales remotely from their phone.
              </p>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {isAnnual ? 'KES 15,000' : 'KES 1,500'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {isAnnual ? '/ year' : '/ month'}
                  </span>
                </div>
                <div className="text-[11px] text-amber-300 font-medium mt-1">
                  {isAnnual ? 'Equivalent to KES 1,250/mo (Save KES 3,000)' : 'Billed monthly, cancel anytime'}
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-200 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-2.5 font-semibold text-white">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Everything in Local PC Starter, plus:</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Real-Time Multi-Device Cloud Sync</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Owner Live Mobile Dashboard (iOS / Android)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Multi-Cashier Shift Logins with 4-Digit Unlock PINs</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Real-Time M-Pesa Till &amp; Paybill Matching</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>End-of-Day Shift Close Summaries via WhatsApp/Email</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Automated Encrypted Cloud Vault Backup</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenPortal}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/25 active:scale-[0.98]"
              >
                Start 14-Day Pro Cloud Trial
              </button>
            </div>
          </div>

          {/* Plan 3: Multi-Branch Enterprise */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-8 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase mb-1">
                MULTI-STORE CHAIN
              </div>
              <h3 className="text-2xl font-bold text-white">Multi-Branch Enterprise</h3>
              <p className="text-xs text-slate-400 mt-2">
                For retail networks with 2+ locations, central warehouses, and high transaction volumes.
              </p>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">KES 3,500</span>
                  <span className="text-xs text-slate-400 font-medium">/ month per branch</span>
                </div>
                <div className="text-[11px] text-sky-400 font-medium mt-1">
                  Volume discounts available for 5+ branches
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-2.5 font-semibold text-white">
                  <Building2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Everything in Cloud Sync Pro, plus:</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Centralized Warehouse &amp; Inter-Branch Stock Transfers</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Cross-Store Consolidated Sales Auditing</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Custom KRA eTIMS Integration Support</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Dedicated WhatsApp Account Manager &amp; On-Site Training</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Role-Based Permissions &amp; Loss Prevention Controls</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <a
                href="mailto:titusnjehia@gmail.com?subject=Bazu%20POS%20Enterprise%20Inquiry"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center transition-colors"
              >
                Contact Enterprise Sales
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods Accepted Notice */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Subscription payments accepted via M-Pesa Buy Goods Till, M-Pesa Paybill, Visa, Mastercard, or Annual KES Invoicing.
        </div>
      </div>
    </section>
  );
};
