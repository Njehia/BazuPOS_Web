import React from 'react';
import {
  Printer,
  Barcode,
  Laptop,
  CheckCircle2,
  Zap,
  Scissors,
  DollarSign,
  Maximize2,
  Layers,
} from 'lucide-react';

interface HardwareHubProps {
  onOpenPrinterTest: () => void;
  onOpenScannerTest: () => void;
}

export const HardwareHub: React.FC<HardwareHubProps> = ({
  onOpenPrinterTest,
  onOpenScannerTest,
}) => {
  return (
    <section id="hardware" className="py-20 lg:py-28 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            03. Peripherals &amp; Hardware Compatibility
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Syne',sans-serif] text-balance">
            Zero Hardware Lock-In. Run on Any Standard Retail Gear.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Don&apos;t waste money on overpriced proprietary touch terminals. Bazu POS works seamlessly with standard USB and Bluetooth thermal printers, cash drawers, and barcode scanners found in every computer shop across Nairobi.
          </p>
        </div>

        {/* 2-Column Hardware Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Card 1: Thermal Receipt Printing (6 Cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Printer className="w-6 h-6" />
                </div>
                <button
                  onClick={onOpenPrinterTest}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/60 rounded-lg hover:bg-amber-900/60 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Launch Printer Test</span>
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-['Syne',sans-serif]">
                  ESC/POS Thermal Receipt Printers
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Direct raw command integration for Epson, Xprinter, Rongta, Star Micronics, Sunmi, and generic Chinese POS printers over USB, Bluetooth, or Network IP.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Dual Roll Support:</strong> Select between standard 80mm and compact 58mm paper rolls.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Automatic Paper Cut:</strong> Sends <code className="text-amber-300 font-mono">GS V 0</code> immediately following receipt footer.</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Cash Drawer Kick:</strong> Fires 24V pulse <code className="text-emerald-300 font-mono">ESC p 0</code> only when cash checkout is selected.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Ultra-Bold Thermal Print Head:</strong> Optimizes heating pulses so receipts stay legible for months.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">58mm &amp; 80mm Standard ESC/POS</span>
              <button
                onClick={onOpenPrinterTest}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline"
              >
                Run Thermal Roll Simulation &rarr;
              </button>
            </div>
          </div>

          {/* Card 2: Barcode Readers & Counter Scanners (6 Cols) */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Barcode className="w-6 h-6" />
                </div>
                <button
                  onClick={onOpenScannerTest}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 rounded-lg hover:bg-emerald-900/60 transition-colors"
                >
                  <Barcode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Launch Scanner Test</span>
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-['Syne',sans-serif]">
                  Laser Barcode Scanners &amp; Handheld Guns
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Ring up items with lightning reflex. High-frequency HID keyboard-wedge listener instantly captures barcode scans and adds items to cart with zero focus loss.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Sub-50ms Scan Latency:</strong> Immediate item addition without UI lag or manual mouse clicks.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Universal Symbologies:</strong> Decodes EAN-13, UPC-A, Code 128, QR Codes, and GS1 DataBar.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Audio Verification:</strong> Instant affirmative audio beep confirming successful barcode registration.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Automatic Unit Quantity Bump:</strong> Scanning the same product barcode multiple times increments quantity automatically.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">USB HID &amp; Bluetooth Wireless</span>
              <button
                onClick={onOpenScannerTest}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                Test Handheld Scanner Input &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Hardware Verification Banner */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Need Help Setting Up Your Counter Thermal Printer?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Our support team in Nairobi provides remote USB baud rate setup and test scripts via AnyDesk or WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenPrinterTest}
              className="flex-1 md:flex-initial px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              Test Printer Now
            </button>
            <a
              href="https://wa.me/254722000000?text=Hello%20Bazu%20POS,%20I%20need%20assistance%20setting%20up%20my%20thermal%20printer."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors text-center"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
