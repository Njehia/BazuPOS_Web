import React from 'react';
import { Sun, Moon, Laptop, ShieldCheck, Download, Store } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  onOpenWebPOS: () => void;
  onOpenPortal: () => void;
  onOpenHardwareTest: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWebPOS,
  onOpenPortal,
  onOpenHardwareTest,
  isDark,
  onToggleTheme,
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <svg className="w-6 h-6 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <path d="M13 7l-4 6h3l-1 4 4-6h-3l1-4z" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-['Syne',sans-serif]">
              Bazu <span className="text-amber-400">POS</span>
            </span>
            <span className="text-[11px] text-slate-400 tracking-wide font-mono">
              bazupos.co.ke
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-amber-400 transition-colors">
            Features
          </a>
          <a href="#catalog" className="hover:text-amber-400 transition-colors">
            Retail Catalog
          </a>
          <a href="#hardware" className="hover:text-amber-400 transition-colors">
            Peripherals & Hardware
          </a>
          <a href="#downloads" className="hover:text-amber-400 transition-colors">
            Downloads Hub
          </a>
          <a href="#pricing" className="hover:text-amber-400 transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Hardware Diagnostic Quick Link */}
          <button
            onClick={onOpenHardwareTest}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title="Test Thermal Printer & Barcode Scanner"
          >
            <Laptop className="w-3.5 h-3.5 text-amber-400" />
            <span>Hardware Test</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
            aria-label="Toggle visual theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* PWA Install Button if available */}
          {isInstallable && !isInstalled && (
            <button
              onClick={install}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Install App</span>
            </button>
          )}

          {/* Merchant Portal */}
          <button
            onClick={onOpenPortal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg transition-all shadow-sm"
          >
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">Owner Portal</span>
          </button>

          {/* Primary Action: Launch Live Web POS */}
          <button
            onClick={onOpenWebPOS}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md shadow-amber-500/20 active:scale-95 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Launch Web POS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
