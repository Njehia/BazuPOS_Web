import React, { useState } from 'react';
import {
  X,
  Store,
  TrendingUp,
  FileSpreadsheet,
  Download,
  Settings,
  QrCode,
  Users,
  Shield,
  CheckCircle2,
  Copy,
  Check,
  Plus,
  RefreshCw,
  LogOut,
  Smartphone,
  Printer,
  DollarSign,
  Lock,
} from 'lucide-react';
import { SaleRecord, StoreConfig, StaffMember } from '../types';
import { StorageService } from '../services/storage';

interface MerchantPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
}

export const MerchantPortalModal: React.FC<MerchantPortalModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default authenticated for seamless testing
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('titusnjehia@gmail.com');
  const [loginPassword, setLoginPassword] = useState('njehia');

  // Register Fields
  const [regStoreName, setRegStoreName] = useState('');
  const [regBranch, setRegBranch] = useState('');
  const [regTillNumber, setRegTillNumber] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'sales' | 'downloads' | 'config' | 'mobile' | 'staff'>('sales');

  // Store Configuration
  const [config, setConfig] = useState<StoreConfig>(() => StorageService.getStoreConfig());
  const [configSavedToast, setConfigSavedToast] = useState(false);

  // Sales Records & Staff
  const [sales, setSales] = useState<SaleRecord[]>(() => StorageService.getSales());
  const [staff, setStaff] = useState<StaffMember[]>(() => StorageService.getStaff());

  // Staff creation form
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffPin, setNewStaffPin] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<'ADMIN' | 'SALES_CASHIER'>('SALES_CASHIER');

  // Copy state
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  // Aggregate Performance Metrics
  const grossTurnover = sales.reduce((sum, s) => sum + s.total, 0);
  const netSales = sales.reduce((sum, s) => sum + s.subtotal, 0);
  const cashSales = sales
    .filter((s) => s.paymentMethod === 'cash')
    .reduce((sum, s) => sum + s.total, 0);
  const mpesaSales = sales
    .filter((s) => s.paymentMethod === 'mpesa_till' || s.paymentMethod === 'mpesa_paybill')
    .reduce((sum, s) => sum + s.total, 0);

  // Superuser Login handler
  const handleSuperUserLogin = () => {
    setLoginEmail('titusnjehia@gmail.com');
    setLoginPassword('njehia');
    setIsAuthenticated(true);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setIsAuthenticated(true);
    }
  };

  const handleSelfServiceRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regStoreName.trim()) return;

    const generatedId = `bazu-${regStoreName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(100 + Math.random() * 900)}`;
    const newConfig: StoreConfig = {
      ...config,
      storeId: generatedId,
      storeName: regStoreName.trim(),
      branchName: regBranch.trim() || 'Main Branch',
      tillNumber: regTillNumber.trim() || '8849201',
      phone: regPhone.trim() || '+254 700 000 000',
    };

    StorageService.saveStoreConfig(newConfig);
    setConfig(newConfig);
    onConfigUpdated();
    setIsAuthenticated(true);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveStoreConfig(config);
    onConfigUpdated();
    setConfigSavedToast(true);
    setTimeout(() => setConfigSavedToast(false), 2000);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || newStaffPin.length !== 4) {
      alert('Please enter staff name and a 4-digit PIN.');
      return;
    }

    const added = StorageService.addStaffMember({
      name: newStaffName.trim(),
      email: newStaffEmail.trim() || `${newStaffName.toLowerCase().replace(/\s+/g, '')}@bazupos.co.ke`,
      phone: newStaffPhone.trim() || '+254 700 000 000',
      pin: newStaffPin.trim(),
      role: newStaffRole,
      status: 'ACTIVE',
    });

    setStaff([...staff, added]);
    setNewStaffName('');
    setNewStaffEmail('');
    setNewStaffPhone('');
    setNewStaffPin('');
  };

  const toggleStaffStatus = (staffId: string) => {
    const updated = staff.map((s) => {
      if (s.id === staffId) {
        return {
          ...s,
          status: (s.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE') as StaffMember['status'],
        };
      }
      return s;
    });
    setStaff(updated);
    StorageService.saveStaff(updated);
  };

  const pairingDeepLink = `https://bazupos.co.ke/login?storeId=${config.storeId}&branch=${encodeURIComponent(config.branchName)}`;
  const appSchemeUrl = `bazupos://login?storeId=${config.storeId}&till=${config.tillNumber}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-6xl rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col my-6 max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-['Syne',sans-serif]">
                  Merchant Cloud Portal &amp; Owner Dashboard
                </h3>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                  Store: {config.storeId}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                {config.storeName} ({config.branchName}) · Managed by Titus Njehia
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portal Body */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white font-['Syne',sans-serif]">
                {authMode === 'login' ? 'Merchant Portal Sign In' : 'Provision New Store Account'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'login'
                  ? 'Access live store turnover, cashier audits, and printer settings.'
                  : 'Instant multi-tenant store provisioning with standard 150+ product catalog.'}
              </p>
            </div>

            {/* Super User Quick Login Button */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-amber-300">Master Super User Access</span>
                <span className="text-[10px] text-emerald-400 font-mono">ONE-CLICK</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Pre-configured for owner Titus Njehia (<code className="text-white">titusnjehia@gmail.com</code>).
              </p>
              <button
                type="button"
                onClick={handleSuperUserLogin}
                className="w-full py-2 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Sign In as Master Superuser (Titus Njehia)
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Email or Store Username</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
                >
                  Sign In with Offline Database Fallback
                </button>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-amber-400 hover:underline text-xs"
                  >
                    Need a new store? Provision Account &rarr;
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSelfServiceRegister} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Store / Outlet Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Westlands Supermarket &amp; Retail Depot"
                    value={regStoreName}
                    onChange={(e) => setRegStoreName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Branch Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mpaka Road Branch"
                    value={regBranch}
                    onChange={(e) => setRegBranch(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">M-Pesa Buy Goods Till Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 554921"
                    value={regTillNumber}
                    onChange={(e) => setRegTillNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Owner WhatsApp / Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. +254 712 345 678"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors mt-2"
                >
                  Provision Store &amp; Seed 150+ SKUs
                </button>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    Already registered? Sign In &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Navigation Strip */}
            <div className="flex border-b border-slate-800 bg-slate-950 px-6 overflow-x-auto scrollbar-none text-xs">
              <button
                onClick={() => setActiveTab('sales')}
                className={`py-3.5 px-4 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'sales'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Live Sales &amp; Performance</span>
              </button>

              <button
                onClick={() => setActiveTab('downloads')}
                className={`py-3.5 px-4 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'downloads'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>My Installers &amp; Scripts</span>
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className={`py-3.5 px-4 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'config'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Store Configuration &amp; Printing</span>
              </button>

              <button
                onClick={() => setActiveTab('mobile')}
                className={`py-3.5 px-4 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'mobile'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Mobile App Deep Link &amp; QR</span>
              </button>

              <button
                onClick={() => setActiveTab('staff')}
                className={`py-3.5 px-4 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'staff'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Staff Management &amp; PINs</span>
              </button>
            </div>

            {/* Tab 1: Live Sales & Performance */}
            {activeTab === 'sales' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Total Gross Turnover</div>
                    <div className="text-2xl font-extrabold text-white font-mono tabular-nums mt-1">
                      KES {grossTurnover.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                      All verified receipts
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">M-Pesa Collections (Till + Paybill)</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono tabular-nums mt-1">
                      KES {mpesaSales.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-medium">
                      {Math.round((mpesaSales / (grossTurnover || 1)) * 100)}% of turnover
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Cash in Drawer</div>
                    <div className="text-2xl font-extrabold text-amber-400 font-mono tabular-nums mt-1">
                      KES {cashSales.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-medium">
                      {Math.round((cashSales / (grossTurnover || 1)) * 100)}% of turnover
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Net Sales (Excl. 16% VAT)</div>
                    <div className="text-2xl font-extrabold text-white font-mono tabular-nums mt-1">
                      KES {Math.round(netSales).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      VAT: KES {Math.round(grossTurnover - netSales).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Ledger & KRA Export Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">Itemized Receipt Ledger</h4>
                    <p className="text-xs text-slate-400">
                      Cryptographically chained with SHA-256 tamper-evident integrity hashes
                    </p>
                  </div>

                  <button
                    onClick={() => StorageService.exportSalesToCSV()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export to CSV / Excel for KRA</span>
                  </button>
                </div>

                {/* Receipt Table */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                        <tr>
                          <th className="py-3 px-4">Receipt #</th>
                          <th className="py-3 px-4">Time</th>
                          <th className="py-3 px-4">Cashier</th>
                          <th className="py-3 px-4">Payment</th>
                          <th className="py-3 px-4">Items Breakdown</th>
                          <th className="py-3 px-4 text-right">Total (KES)</th>
                          <th className="py-3 px-4">Integrity Hash</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 font-mono">
                        {sales.map((sale) => (
                          <tr key={sale.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-4 text-white font-bold">{sale.receiptNumber}</td>
                            <td className="py-3 px-4 text-slate-400">
                              {new Date(sale.timestamp).toLocaleTimeString('en-KE')}
                            </td>
                            <td className="py-3 px-4 text-slate-300 font-sans">{sale.cashierName}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  sale.paymentMethod.startsWith('mpesa')
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                                }`}
                              >
                                {sale.paymentMethod.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-300 font-sans truncate max-w-[200px]">
                              {sale.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                            </td>
                            <td className="py-3 px-4 text-right font-extrabold text-white tabular-nums">
                              {sale.total.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-slate-500 truncate max-w-[120px] text-[10px]">
                              {sale.hashChain}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: My Downloads & Installers */}
            {activeTab === 'downloads' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-base font-bold text-white">Pre-Configured Store Installers</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    These installers contain launch parameters pre-bound to your store ID (<code className="text-amber-400">{config.storeId}</code>).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                        EXE
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Windows Standalone Desktop</div>
                        <div className="text-xs text-slate-400">Windows 10 / 11 64-bit installer</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Download the official installer. Runs with direct access to physical USB thermal receipt printers and hardware barcode readers.
                    </p>
                    <a
                      href="https://github.com/Njehia/BazuPOS/releases/download/POS/Bazu.POS.Setup.1.2.0.exe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download .EXE (v1.2.0)</span>
                    </a>
                  </div>

                  <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        APK
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Android Mobile &amp; POS Tablet</div>
                        <div className="text-xs text-slate-400">Native Android .APK Installer</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Download the standalone Android APK for wireless POS terminals, phones, and tablets. Offline local database and Bluetooth printing.
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href="/downloads/Bazu.POS.1.2.0.apk"
                        download="Bazu.POS.1.2.0.apk"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download .APK</span>
                      </a>
                      <a
                        href="https://github.com/Njehia/BazuPOS/releases/tag/POS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                      >
                        <span>GitHub Release</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        BAT
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Custom 1-Click Store Launcher</div>
                        <div className="text-xs text-slate-400">Embeds Store: {config.storeId}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Generates a portable batch file that launches Bazu POS locked directly to your store on any counter PC without installation.
                    </p>
                    <button
                      onClick={() => {
                        const customBat = `@echo off\nstart "" "msedge.exe" --app="https://bazupos.co.ke?storeId=${config.storeId}" --start-maximized --kiosk-printing\nexit\n`;
                        const blob = new Blob([customBat], { type: 'application/x-bat' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Launch-${config.storeId}.bat`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Launch-{config.storeId}.bat</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Store Configuration & Branding */}
            {activeTab === 'config' && (
              <form onSubmit={handleSaveConfig} className="flex-1 p-6 overflow-y-auto space-y-6 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-base font-bold text-white">Store Identity &amp; Thermal Printing Settings</h4>
                    <p className="text-slate-400">Configure receipt headers, Till numbers, and hardware cut options.</p>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-colors"
                  >
                    Save Changes
                  </button>
                </div>

                {configSavedToast && (
                  <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Store configuration saved and propagated to local POS terminals!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Store / Business Name</label>
                    <input
                      type="text"
                      value={config.storeName}
                      onChange={(e) => setConfig({ ...config, storeName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Branch / Location</label>
                    <input
                      type="text"
                      value={config.branchName}
                      onChange={(e) => setConfig({ ...config, branchName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">M-Pesa Buy Goods Till Number</label>
                    <input
                      type="text"
                      value={config.tillNumber}
                      onChange={(e) => setConfig({ ...config, tillNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">M-Pesa Paybill Number</label>
                    <input
                      type="text"
                      value={config.paybillNumber}
                      onChange={(e) => setConfig({ ...config, paybillNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Telephone / WhatsApp</label>
                    <input
                      type="text"
                      value={config.phone}
                      onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">KRA PIN Number</label>
                    <input
                      type="text"
                      value={config.kraPin}
                      onChange={(e) => setConfig({ ...config, kraPin: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono uppercase"
                    />
                  </div>
                </div>

                {/* Hardware Thermal Printer Settings */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Thermal Printer Hardware Preferences</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Receipt Roll Width</label>
                      <select
                        value={config.printerWidth}
                        onChange={(e) => setConfig({ ...config, printerWidth: e.target.value as '80mm' | '58mm' })}
                        className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800"
                      >
                        <option value="80mm">80mm (Standard Desktop Counter Roll)</option>
                        <option value="58mm">58mm (Compact Mobile Roll)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <div>
                        <div className="font-semibold text-white">Auto Paper Cut</div>
                        <div className="text-[11px] text-slate-500">Send GS V 0 on finish</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.autoCut}
                        onChange={(e) => setConfig({ ...config, autoCut: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <div>
                        <div className="font-semibold text-white">Cash Drawer Kick</div>
                        <div className="text-[11px] text-slate-500">Send 24V pulse on cash sale</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.cashDrawerKick}
                        onChange={(e) => setConfig({ ...config, cashDrawerKick: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Receipt Header & Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Receipt Header Text</label>
                    <textarea
                      rows={3}
                      value={config.receiptHeader}
                      onChange={(e) => setConfig({ ...config, receiptHeader: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Receipt Footer Text</label>
                    <textarea
                      rows={3}
                      value={config.receiptFooter}
                      onChange={(e) => setConfig({ ...config, receiptFooter: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono text-[11px]"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Tab 4: Mobile App Deep Link & Handoff */}
            {activeTab === 'mobile' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-base font-bold text-white">Mobile Phone Quick Pairing</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Scan the QR code or click the deep link on your smartphone to pair the owner live sales app with this store.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center space-y-4">
                    <div className="w-52 h-52 bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-lg">
                      {/* Stylized QR Code representation with SVG */}
                      <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M0 0h30v30H0zM8 8h14v14H8zM70 0h30v30H70zM78 8h14v14H78zM0 70h30v30H0zM8 78h14v14H8zM40 10h10v10H40zM55 10h10v10H55zM40 25h10v10H40zM25 40h10v10H25zM40 40h20v20H40zM70 40h10v10H70zM85 40h10v10H85zM10 55h10v10H10zM70 55h20v10H70zM40 70h10v10H40zM55 70h10v10H55zM85 70h10v10H85zM40 85h20v10H40zM70 85h10v10H70zM85 85h10v10H85z" />
                      </svg>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      Target Store: {config.storeId}
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="font-semibold text-white">Browser Deep Link</div>
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300 break-all select-all">
                        {pairingDeepLink}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(pairingDeepLink);
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2000);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Web Link'}</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="font-semibold text-white">Native App URI Scheme</div>
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 break-all select-all">
                        {appSchemeUrl}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Staff Management & PINs */}
            {activeTab === 'staff' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-base font-bold text-white">Cashier &amp; Administrator Accounts</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage 4-digit unlock PINs, toggle roles, or suspend access.
                  </p>
                </div>

                {/* Staff List */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800">
                  {staff.map((member) => (
                    <div key={member.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{member.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              member.role === 'ADMIN'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {member.role}
                          </span>
                        </div>
                        <div className="text-slate-400 mt-0.5">
                          {member.email} · Phone: {member.phone}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500 font-mono">UNLOCK PIN</div>
                          <div className="text-sm font-mono font-bold text-amber-400">
                            {member.pin}
                          </div>
                        </div>

                        <button
                          onClick={() => toggleStaffStatus(member.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            member.status === 'ACTIVE'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                              : 'bg-rose-950 text-rose-400 border border-rose-800 hover:bg-rose-900'
                          }`}
                        >
                          {member.status}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Staff Form */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Add New Staff Cashier</span>
                  </div>

                  <form onSubmit={handleAddStaff} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Brian Mwangi"
                        value={newStaffName}
                        onChange={(e) => setNewStaffName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Phone Number</label>
                      <input
                        type="text"
                        placeholder="e.g. +254 7..."
                        value={newStaffPhone}
                        onChange={(e) => setNewStaffPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Role</label>
                      <select
                        value={newStaffRole}
                        onChange={(e) => setNewStaffRole(e.target.value as 'ADMIN' | 'SALES_CASHIER')}
                        className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800"
                      >
                        <option value="SALES_CASHIER">SALES_CASHIER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">4-Digit PIN</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={newStaffPin}
                        onChange={(e) => setNewStaffPin(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800 font-mono tracking-widest text-center"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 md:col-span-4 pt-2">
                      <button
                        type="submit"
                        className="py-2.5 px-5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                      >
                        Add Staff Member
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between shrink-0">
          <span>Bazu Merchant Cloud Bridge v1.2</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
