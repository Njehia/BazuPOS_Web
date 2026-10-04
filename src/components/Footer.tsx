import React from 'react';
import { ShieldCheck, Mail, MapPin, Globe, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold">
                <svg className="w-5 h-5 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <path d="M13 7l-4 6h3l-1 4 4-6h-3l1-4z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white font-['Syne',sans-serif]">
                Bazu <span className="text-amber-400">POS</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              The unbreakable, 100% offline-first Point of Sale terminal and merchant management portal engineered for Kenyan retail stores, supermarkets, pharmacies, hardware shops, and businesses of all sizes.
            </p>

            <div className="pt-2 text-slate-300 space-y-1 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>bazupos.co.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a href="mailto:titusnjehia@gmail.com" className="hover:text-white transition-colors">
                  titusnjehia@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Column: Product */}
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  PC Data Guard
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  150+ SKU Catalog
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-white transition-colors">
                  ESC/POS Printing
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  M-Pesa Reconciliation
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Debtor Tab Management
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Downloads & Artifacts */}
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">
              Downloads
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Njehia/BazuPOS/releases/download/POS/Bazu.POS.Setup.1.2.0.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Windows Setup (.exe)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Njehia/BazuPOS/releases/download/POS/Bazu.POS.1.2.0.-.macOS.arm64.dmg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  macOS Apple Silicon (.dmg)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Njehia/BazuPOS/releases/download/POS/Bazu.POS.1.2.0.-.macOS.x64.dmg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  macOS Intel (.dmg)
                </a>
              </li>
              <li>
                <a
                  href="/downloads/Bazu.POS.1.2.0.apk"
                  download="Bazu.POS.1.2.0.apk"
                  className="hover:text-emerald-400 text-emerald-300/90 font-medium transition-colors"
                >
                  Android APK Package (.apk)
                </a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">
                  1-Click Windows .BAT
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Njehia/BazuPOS/releases/tag/POS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>GitHub Releases (v1.2.0)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Njehia/BazuPOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Developer & Company */}
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">
              Creator &amp; Support
            </div>
            <ul className="space-y-2">
              <li className="text-slate-300">
                Architected &amp; Built by <strong className="text-white">Titus Njehia</strong>
              </li>
              <li>
                <a
                  href="https://wa.me/254722000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Merchant Desk
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing &amp; Plans
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Technical FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Bazu POS (bazupos.co.ke). All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographic SHA-256 Audit Log Chaining Enabled</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
