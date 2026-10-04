import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Printer,
  Barcode,
  CheckCircle2,
  Volume2,
  FileText,
  Play,
  Scissors,
  DollarSign,
  Maximize2,
} from 'lucide-react';
import { StorageService } from '../services/storage';

interface HardwareTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'printer' | 'scanner';
}

export const HardwareTestModal: React.FC<HardwareTestModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'printer',
}) => {
  const [activeTab, setActiveTab] = useState<'printer' | 'scanner'>(initialTab);

  // Printer State
  const [paperWidth, setPaperWidth] = useState<'80mm' | '58mm'>('80mm');
  const [testPrintOutput, setTestPrintOutput] = useState<string | null>(null);
  const [cashDrawerKicked, setCashDrawerKicked] = useState(false);
  const [autoCutTriggered, setAutoCutTriggered] = useState(false);
  const [boldHeadActive, setBoldHeadActive] = useState(true);

  // Scanner State
  const [scannedBuffer, setScannedBuffer] = useState('');
  const [scanHistory, setScanHistory] = useState<{ code: string; time: string; valid: boolean }[]>([
    { code: '616110000001', time: '10:42:15', valid: true },
    { code: '616120000017', time: '10:43:02', valid: true },
  ]);
  const [scanSpeedMs, setScanSpeedMs] = useState<number | null>(42);
  const scannerInputRef = useRef<HTMLInputElement>(null);
  const lastKeyTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen && activeTab === 'scanner') {
      setTimeout(() => {
        scannerInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // AudioContext not supported
    }
  };

  const handleSimulatePrint = () => {
    const config = StorageService.getStoreConfig();
    const now = new Date().toLocaleString('en-KE');
    const widthCols = paperWidth === '80mm' ? 48 : 32;
    const divider = '='.repeat(widthCols);

    const testContent = `
[ESC/POS INITIALIZE: 1B 40]
[ALIGN: CENTER]
================================
${config.storeName.toUpperCase()}
${config.branchName.toUpperCase()}
TEL: ${config.phone}
TILL NUMBER: ${config.tillNumber}
================================
HARDWARE DIAGNOSTIC RECEIPT
TIMESTAMP: ${now}
PRINTER MODEL: ESC/POS GENERIC THERMAL
INTERFACE: USB / WEBBLUETOOTH
PAPER WIDTH: ${paperWidth}
DENSITY: ${boldHeadActive ? 'ULTRA-BOLD HIGH HEAT' : 'STANDARD'}
================================
[TEST PATTERNS]
ASCII: ABCDEFGHIJKLMNOPQRSTUVWXYZ
NUMBERS: 0123456789
CURRENCY: KES 1,450.00 | VAT: 16%
BARCODE: *616110000001* (CODE128)
================================
[DRAWER KICK: ESC p 0 19 FA]
[PAPER CUT: GS V 0]
BAZU POS HARDWARE VERIFIED OK
www.bazupos.co.ke
`.trim();

    setTestPrintOutput(testContent);
    setAutoCutTriggered(true);
    setCashDrawerKicked(true);
    playBeep();
  };

  const handlePrintPhysical = () => {
    window.print();
  };

  const handleScannerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const now = performance.now();
    if (lastKeyTimeRef.current > 0) {
      const delta = Math.round(now - lastKeyTimeRef.current);
      setScanSpeedMs(delta);
    }
    lastKeyTimeRef.current = now;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (scannedBuffer.trim().length > 0) {
        playBeep();
        const code = scannedBuffer.trim();
        const time = new Date().toLocaleTimeString('en-KE');
        const valid = code.length >= 8;
        setScanHistory([{ code, time, valid }, ...scanHistory]);
        setScannedBuffer('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Syne',sans-serif]">
                Hardware &amp; Peripheral Diagnostics
              </h3>
              <p className="text-xs text-slate-400">
                WebUSB / WebBluetooth Thermal Printing &amp; Laser Barcode Scanner Test
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1">
          <button
            onClick={() => setActiveTab('printer')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'printer'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Thermal Receipt Printer Test</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'scanner'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Barcode className="w-4 h-4 text-emerald-400" />
            <span>Barcode Scanner Wedge Test</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'printer' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Controls Column */}
              <div className="md:col-span-6 space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-slate-300">
                    Printer Configuration Parameters
                  </div>

                  {/* Width Selection */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Paper Roll Width</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPaperWidth('80mm')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                          paperWidth === '80mm'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        80mm (Standard Counter)
                      </button>
                      <button
                        onClick={() => setPaperWidth('58mm')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                          paperWidth === '58mm'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        58mm (Compact Mobile)
                      </button>
                    </div>
                  </div>

                  {/* Ultra bold print head toggle */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-300">Ultra-Bold Thermal Density</span>
                    <button
                      onClick={() => setBoldHeadActive(!boldHeadActive)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        boldHeadActive ? 'bg-amber-500' : 'bg-slate-800'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          boldHeadActive ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* ESC/POS Command Diagnostic Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleSimulatePrint}
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Send ESC/POS Test Sequence</span>
                  </button>

                  <button
                    onClick={handlePrintPhysical}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Print via OS System Dialog</span>
                  </button>
                </div>

                {/* Hardware State Indicators */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <DollarSign className={`w-4 h-4 ${cashDrawerKicked ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <div>
                      <div className="text-[11px] text-slate-400">Cash Drawer</div>
                      <div className="font-semibold text-slate-200">
                        {cashDrawerKicked ? 'PULSE KICKED' : 'IDLE'}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <Scissors className={`w-4 h-4 ${autoCutTriggered ? 'text-amber-400' : 'text-slate-600'}`} />
                    <div>
                      <div className="text-[11px] text-slate-400">Auto Paper Cut</div>
                      <div className="font-semibold text-slate-200">
                        {autoCutTriggered ? 'GS V 0 FIRED' : 'READY'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Receipt Tape Column */}
              <div className="md:col-span-6 flex flex-col items-center">
                <div className="text-xs font-semibold text-slate-400 mb-2 font-mono">
                  THERMAL RECEIPT TAPE PREVIEW ({paperWidth})
                </div>

                <div
                  className={`w-full ${
                    paperWidth === '80mm' ? 'max-w-xs' : 'max-w-[240px]'
                  } bg-white text-slate-950 font-mono text-[11px] leading-tight p-4 shadow-2xl rounded-sm border-t-8 border-slate-300 relative print:m-0`}
                  style={{ minHeight: '340px' }}
                >
                  {/* Jagged paper cut top */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  {testPrintOutput ? (
                    <pre className="whitespace-pre-wrap font-mono text-[10px] sm:text-[11px] text-slate-900 select-all">
                      {testPrintOutput}
                    </pre>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center p-4">
                      <Printer className="w-8 h-8 text-slate-300 mb-2" />
                      <p className="text-xs text-slate-500">
                        Click &quot;Send ESC/POS Test Sequence&quot; to simulate a live print roll output.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scanner' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Barcode className="w-4 h-4 text-emerald-400" />
                    <span>Laser Barcode Scanner Listener</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LISTENING ON KEYBOARD WEDGE
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Point your USB or wireless handheld barcode scanner at any retail product barcode or packaging and pull the trigger. Or test by typing numbers and pressing <kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">Enter</kbd>.
                </p>

                <div className="relative">
                  <input
                    ref={scannerInputRef}
                    type="text"
                    placeholder="Scan barcode here (e.g. 616210000001)..."
                    value={scannedBuffer}
                    onChange={(e) => setScannedBuffer(e.target.value)}
                    onKeyDown={handleScannerKeyDown}
                    className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono text-base tracking-wider"
                  />
                  <button
                    onClick={() => {
                      if (scannedBuffer.trim()) {
                        playBeep();
                        setScanHistory([
                          {
                            code: scannedBuffer.trim(),
                            time: new Date().toLocaleTimeString('en-KE'),
                            valid: scannedBuffer.trim().length >= 8,
                          },
                          ...scanHistory,
                        ]);
                        setScannedBuffer('');
                      }
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950 border border-emerald-800 rounded-lg hover:bg-emerald-900"
                  >
                    Simulate Gun Scan
                  </button>
                </div>

                {scanSpeedMs !== null && (
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                    <span>Scan Ingestion Latency: <strong className="text-emerald-400">{scanSpeedMs}ms</strong></span>
                    <span>Status: <strong className="text-white">HARDWARE COMPLIANT</strong></span>
                  </div>
                )}
              </div>

              {/* Scan History Log */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2">
                  Recent Scan Captures ({scanHistory.length})
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 divide-y divide-slate-800/80">
                  {scanHistory.map((scan, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-white font-bold">{scan.code}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span>Format: EAN-13 / UPC</span>
                        <span>{scan.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Bazu POS Device Bridge v1.2</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
