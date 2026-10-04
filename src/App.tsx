import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CatalogShowcase } from './components/CatalogShowcase';
import { HardwareHub } from './components/HardwareHub';
import { DownloadsHub } from './components/DownloadsHub';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WebPOSModal } from './components/WebPOSModal';
import { MerchantPortalModal } from './components/MerchantPortalModal';
import { HardwareTestModal } from './components/HardwareTestModal';
import { StorageService } from './services/storage';
import { Product } from './types';
import { useOnlineStatus } from './hooks/usePWAInstall';
import { WifiOff, ShieldCheck } from 'lucide-react';

export default function App() {
  const isOnline = useOnlineStatus();
  const [isDark, setIsDark] = useState(true);

  // Modal Open States
  const [isWebPOSOpen, setIsWebPOSOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isHardwareTestOpen, setIsHardwareTestOpen] = useState(false);
  const [hardwareTestTab, setHardwareTestTab] = useState<'printer' | 'scanner'>('printer');

  // Product Catalog State
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());

  const handleRefreshProducts = () => {
    setProducts(StorageService.getProducts());
  };

  const handleToggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleOpenPrinterTest = () => {
    setHardwareTestTab('printer');
    setIsHardwareTestOpen(true);
  };

  const handleOpenScannerTest = () => {
    setHardwareTestTab('scanner');
    setIsHardwareTestOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Offline Status Toast */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-xl border border-amber-400 animate-bounce">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Offline Terminal Active — PC Database Preservation Protecting All Sales</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        onOpenWebPOS={() => setIsWebPOSOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenHardwareTest={handleOpenPrinterTest}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenWebPOS={() => setIsWebPOSOpen(true)}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* 4 Feature Pillars */}
        <Features />

        {/* Product Catalog Showcase */}
        <CatalogShowcase
          products={products}
          onRefreshProducts={handleRefreshProducts}
          onOpenWebPOS={() => setIsWebPOSOpen(true)}
        />

        {/* Hardware & Peripherals Hub */}
        <HardwareHub
          onOpenPrinterTest={handleOpenPrinterTest}
          onOpenScannerTest={handleOpenScannerTest}
        />

        {/* Dedicated Downloads Hub */}
        <DownloadsHub
          onOpenPrinterTest={handleOpenPrinterTest}
          onOpenScannerTest={handleOpenScannerTest}
          onOpenWebPOS={() => setIsWebPOSOpen(true)}
        />

        {/* Pricing tailored for Kenyan SMEs */}
        <Pricing
          onOpenWebPOS={() => setIsWebPOSOpen(true)}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full-Screen Live Web POS Checkout Terminal */}
      <WebPOSModal
        isOpen={isWebPOSOpen}
        onClose={() => setIsWebPOSOpen(false)}
        products={products}
        onSaleComplete={handleRefreshProducts}
      />

      {/* Authenticated Self-Service Merchant Cloud Portal & Owner Dashboard */}
      <MerchantPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        onConfigUpdated={handleRefreshProducts}
      />

      {/* Hardware Diagnostics (ESC/POS Printer & Barcode Scanner) */}
      <HardwareTestModal
        isOpen={isHardwareTestOpen}
        onClose={() => setIsHardwareTestOpen(false)}
        initialTab={hardwareTestTab}
      />
    </div>
  );
}
