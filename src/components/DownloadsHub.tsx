import React, { useState } from 'react';
import {
  Download,
  Laptop,
  Apple,
  Smartphone,
  Terminal,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  FileCode,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface DownloadsHubProps {
  onOpenPrinterTest: () => void;
  onOpenScannerTest: () => void;
  onOpenWebPOS: () => void;
}

export const DownloadsHub: React.FC<DownloadsHubProps> = ({
  onOpenPrinterTest,
  onOpenScannerTest,
  onOpenWebPOS,
}) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [copiedScript, setCopiedScript] = useState(false);
  const [activePlatformTab, setActivePlatformTab] = useState<'windows' | 'mac' | 'android' | 'script'>('windows');

  const windowsInstallerUrl = 'https://github.com/Njehia/BazuPOS/releases/download/POS/Bazu.POS.Setup.1.2.0.exe';
  const macArmUrl = 'https://github.com/Njehia/BazuPOS/releases/download/POS/Bazu.POS.1.2.0.-.macOS.arm64.dmg';
  const macIntelUrl = 'https://github.com/Njehia/BazuPOS/releases/download/POS/Bazu.POS.1.2.0.-.macOS.x64.dmg';
  const androidApkUrl = '/downloads/Bazu.POS.1.2.0.apk';
  const githubReleasesUrl = 'https://github.com/Njehia/BazuPOS/releases/tag/POS';
  const githubRepoUrl = 'https://github.com/Njehia/BazuPOS';

  const batScriptContent = `@echo off
REM =======================================================
REM Bazu POS 1-Click Zero-Admin Desktop Launcher
REM Store: bazupos.co.ke | Developed by Titus Njehia
REM =======================================================
echo Launching Bazu POS in Dedicated Kiosk Window Mode...
start "" "msedge.exe" --app="https://bazupos.co.ke" --start-maximized --kiosk-printing --disable-pinch
if %ERRORLEVEL% NEQ 0 (
    start "" "chrome.exe" --app="https://bazupos.co.ke" --start-maximized --kiosk-printing --disable-pinch
)
exit
`;

  const handleDownloadBat = () => {
    const blob = new Blob([batScriptContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Launch-Bazu-POS.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(batScriptContent);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <section id="downloads" className="py-20 lg:py-28 bg-slate-950/80 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            04. Dedicated Downloads Hub &amp; Release Artifacts
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Syne',sans-serif] text-balance">
            Deploy Bazu POS on Counter PCs, Macs &amp; Mobile.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Verified release packages for Windows 10/11, macOS Apple Silicon, Intel Macs, Android WebAPK, and zero-admin kiosk launcher scripts.
          </p>
        </div>

        {/* 4 Download Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Windows Desktop */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Windows Desktop</h3>
                <div className="text-xs text-slate-400 mt-0.5">Windows 10 &amp; 11 (64-bit)</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Full standalone Electron executable with auto-update, native USB spooler printer access, and desktop shortcut.
              </p>

              <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                <div>Artifact: Bazu.POS.Setup.1.2.0.exe</div>
                <div>Size: ~78.4 MB · Code Signed</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <a
                href={windowsInstallerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download .EXE (v1.2.0)</span>
              </a>
              <span className="block text-center text-[10px] text-slate-500">
                Official GitHub Release
              </span>
            </div>
          </div>

          {/* macOS Apple Silicon */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Apple className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">macOS Apple Silicon</h3>
                <div className="text-xs text-slate-400 mt-0.5">M1 / M2 / M3 / M4 Native</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Optimized ARM64 disk image for modern Apple Silicon MacBooks and Mac minis with ultra-low thermal dissipation.
              </p>

              <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                <div>Artifact: Bazu.POS.1.2.0.arm64.dmg</div>
                <div>Size: ~82.1 MB · Universal</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <a
                href={macArmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download ARM64 .DMG</span>
              </a>
              <a
                href={macIntelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] text-purple-400 hover:underline"
              >
                Download for Intel x64 Mac &rarr;
              </a>
            </div>
          </div>

          {/* Android Mobile & POS Tablet .APK */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Android Mobile &amp; POS Tablet</h3>
                <div className="text-xs text-slate-400 mt-0.5">Native .APK Package (v1.2.0)</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Direct Android Package (.apk) installer for handheld Android POS terminals (Sunmi, Telpo, iMin, Pax), smartphones, and tablets. Offline local database, ESC/POS Bluetooth printing, and camera barcode scanning.
              </p>

              <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                <div>Artifact: Bazu.POS.1.2.0.apk</div>
                <div>Compatibility: Android 7.0+ (ARM/x86)</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <a
                href={androidApkUrl}
                download="Bazu.POS.1.2.0.apk"
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Android .APK</span>
              </a>
              <a
                href={githubReleasesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] text-emerald-400 hover:underline"
              >
                View on GitHub Releases &rarr;
              </a>
              {isInstallable && (
                <button
                  onClick={install}
                  className="block w-full text-center text-[10px] text-slate-400 hover:text-slate-200 mt-1"
                >
                  Or install via Browser PWA WebAPK
                </button>
              )}
            </div>
          </div>

          {/* Windows 1-Click Kiosk Script */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">1-Click Kiosk Script</h3>
                <div className="text-xs text-slate-400 mt-0.5">Zero Administrator Rights Needed</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Run Bazu POS inside a locked-down Chromium kiosk window on shop PCs where cashiers lack admin installation permissions.
              </p>

              <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                <div>Format: Executable .BAT / .PS1</div>
                <div>Flags: --kiosk-printing --app</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={handleDownloadBat}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <FileCode className="w-4 h-4" />
                <span>Download .BAT Launcher</span>
              </button>
              <button
                onClick={() => setActivePlatformTab('script')}
                className="block w-full text-center text-[11px] text-amber-400 hover:underline"
              >
                Inspect Script Source &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Step-by-Step Platform Setup Guides & Hardware Tests */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
          {/* Platform Tab Strip */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">SETUP &amp; HARDWARE VERIFICATION GUIDES:</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActivePlatformTab('windows')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activePlatformTab === 'windows'
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Windows PC
              </button>
              <button
                onClick={() => setActivePlatformTab('mac')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activePlatformTab === 'mac'
                    ? 'bg-purple-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                macOS
              </button>
              <button
                onClick={() => setActivePlatformTab('android')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activePlatformTab === 'android'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Android (.APK)
              </button>
              <button
                onClick={() => setActivePlatformTab('script')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activePlatformTab === 'script'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                Launcher Script
              </button>
            </div>
          </div>

          {/* Guide Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {activePlatformTab === 'windows' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-bold font-mono text-sm">STEP 1</div>
                  <div className="text-sm font-semibold text-white">Download &amp; Run Installer</div>
                  <p className="text-slate-400 leading-relaxed">
                    Download <code className="text-sky-300">Bazu.POS.Setup.1.2.0.exe</code>. Double click to launch the installation wizard. A desktop icon labeled &quot;Bazu POS Terminal&quot; will be created.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-bold font-mono text-sm">STEP 2</div>
                  <div className="text-sm font-semibold text-white">Plug In Receipt Printer &amp; Scanner</div>
                  <p className="text-slate-400 leading-relaxed">
                    Connect your 80mm or 58mm thermal receipt printer via USB or Bluetooth. Plug in your USB barcode scanner gun. Windows automatically assigns the standard HID and COM spooler drivers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-bold font-mono text-sm">STEP 3</div>
                  <div className="text-sm font-semibold text-white">Pair Store &amp; Start Ringing</div>
                  <p className="text-slate-400 leading-relaxed">
                    Sign in with your store administrator PIN (<code className="text-emerald-400">1234</code>) or scan your store QR code from the Owner Portal to immediately sync your catalog.
                  </p>
                </div>
              </div>
            )}

            {activePlatformTab === 'mac' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-purple-400 font-bold font-mono text-sm">STEP 1</div>
                  <div className="text-sm font-semibold text-white">Mount Disk Image</div>
                  <p className="text-slate-400 leading-relaxed">
                    Download <code className="text-purple-300">Bazu.POS.1.2.0.arm64.dmg</code>. Double-click the file and drag the &quot;Bazu POS&quot; icon into your Applications folder.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-purple-400 font-bold font-mono text-sm">STEP 2</div>
                  <div className="text-sm font-semibold text-white">Permit CUPS Printer Relay</div>
                  <p className="text-slate-400 leading-relaxed">
                    Add your thermal printer in macOS System Settings &gt; Printers &amp; Scanners using the &quot;Generic ESC/POS&quot; driver. Bazu POS prints without extra software.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-purple-400 font-bold font-mono text-sm">STEP 3</div>
                  <div className="text-sm font-semibold text-white">Full Screen Kiosk</div>
                  <p className="text-slate-400 leading-relaxed">
                    Press <kbd className="bg-slate-800 px-1 py-0.5 rounded text-white">Ctrl + Cmd + F</kbd> to lock Bazu POS into distraction-free cashier checkout mode.
                  </p>
                </div>
              </div>
            )}

            {activePlatformTab === 'android' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-emerald-400 font-bold font-mono text-sm">STEP 1</div>
                    <div className="text-sm font-semibold text-white">Download &amp; Install APK</div>
                    <p className="text-slate-400 leading-relaxed">
                      Download <code className="text-emerald-300">Bazu.POS.1.2.0.apk</code>. Tap the file in your downloads to install. If prompted, enable &quot;Install Unknown Apps&quot; for your browser.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-emerald-400 font-bold font-mono text-sm">STEP 2</div>
                    <div className="text-sm font-semibold text-white">Pair Bluetooth ESC/POS Printer</div>
                    <p className="text-slate-400 leading-relaxed">
                      Turn on your 58mm/80mm mobile Bluetooth printer. Pair with PIN <code className="text-white">0000</code> or <code className="text-white">1234</code> in Android settings.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-emerald-400 font-bold font-mono text-sm">STEP 3</div>
                    <div className="text-sm font-semibold text-white">Offline Local SQLite Storage</div>
                    <p className="text-slate-400 leading-relaxed">
                      All sales, customer credit ledgers, and stock are saved locally on your Android tablet or phone with zero cloud latency.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Download Bazu.POS.1.2.0.apk</div>
                      <div className="text-xs text-slate-400">Direct package install for Android phones &amp; POS terminals</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={androidApkUrl}
                      download="Bazu.POS.1.2.0.apk"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Android .APK</span>
                    </a>
                    <a
                      href={githubReleasesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>GitHub Releases</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activePlatformTab === 'script' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">
                    Windows Zero-Admin Batch Launcher Source Code (`Launch-Bazu-POS.bat`)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyScript}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:text-white rounded-lg transition-colors"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
                    </button>
                    <button
                      onClick={handleDownloadBat}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .BAT</span>
                    </button>
                  </div>
                </div>

                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto whitespace-pre">
                  {batScriptContent}
                </pre>
                <p className="text-xs text-slate-400">
                  Save this script onto your Windows desktop. Double-clicking it opens Bazu POS in an isolated, borderless app window without address bar or back buttons, ensuring cashiers stay strictly on the sales terminal.
                </p>
              </div>
            )}

            {/* Hardware Diagnostic Action Row */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Need to verify your USB printer or barcode scanner before downloading?</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenPrinterTest}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                >
                  Test Thermal Printer
                </button>
                <button
                  onClick={onOpenScannerTest}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                >
                  Test Barcode Scanner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
