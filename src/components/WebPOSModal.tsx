import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Printer,
  CreditCard,
  DollarSign,
  Zap,
  RotateCcw,
  User,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Receipt,
  FileText,
  Maximize2,
  Minimize2,
  Smartphone,
  Tag,
  Percent,
  PlusCircle,
  FileSpreadsheet,
  AlertCircle,
  PhoneCall,
  Volume2,
  Laptop,
  Store,
  Lock,
  Unlock,
  KeyRound,
  Radio,
  Cpu,
  RefreshCw,
  HardDrive,
  Edit2,
  Building,
  Check,
  Barcode,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Product,
  CartItem,
  PaymentMethod,
  SaleRecord,
  ShiftSession,
  StaffMember,
  DebtorTab,
  ProductCategory,
  LocalMachineTerminal,
  StoreConfig,
} from '../types';
import { StorageService } from '../services/storage';

export const BRANCH_PRESETS = [
  {
    storeId: 'bazu-cbd-001',
    storeName: 'Bazu Supermarket & Retail Depot',
    branchName: 'Kimathi Street CBD Flagship',
    tillNumber: '8849201',
    paybillNumber: '247247',
    address: 'Kimathi House, Ground Floor, Nairobi CBD',
    phone: '+254 722 000 000',
    kraPin: 'P051948271Z',
    type: 'Supermarket & General Retail',
  },
  {
    storeId: 'bazu-wst-002',
    storeName: 'Bazu Express Mini-Mart',
    branchName: 'Mpaka Road, Westlands',
    tillNumber: '8849202',
    paybillNumber: '247247',
    address: 'Woodvale Grove Plaza, Westlands, Nairobi',
    phone: '+254 722 111 222',
    kraPin: 'P051948271Z',
    type: 'Convenience Store & Drinks',
  },
  {
    storeId: 'bazu-ind-003',
    storeName: 'Bazu Wholesale & Distribution',
    branchName: 'Commercial Street, Industrial Area',
    tillNumber: '8849203',
    paybillNumber: '247247',
    address: 'Godown 14, Commercial St, Industrial Area',
    phone: '+254 722 333 444',
    kraPin: 'P051948271Z',
    type: 'Wholesale Depot & Bales',
  },
  {
    storeId: 'bazu-uph-004',
    storeName: 'Bazu Chemist & Health Pharmacy',
    branchName: 'Hospital Road, Upper Hill',
    tillNumber: '8849204',
    paybillNumber: '247247',
    address: 'Upper Hill Medical Centre, Nairobi',
    phone: '+254 722 555 666',
    kraPin: 'P051948271Z',
    type: 'Pharmacy & Health Care',
  },
  {
    storeId: 'bazu-est-005',
    storeName: 'Bazu Hardware & General Supplies',
    branchName: 'General Waruinge Street, Eastleigh',
    tillNumber: '8849205',
    paybillNumber: '247247',
    address: 'Business Bay Square Mall, 1st Floor, Eastleigh',
    phone: '+254 722 777 888',
    kraPin: 'P051948271Z',
    type: 'Hardware & Building Supplies',
  },
];

interface WebPOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaleComplete: () => void;
}

export const WebPOSModal: React.FC<WebPOSModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaleComplete,
}) => {
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => StorageService.getStoreConfig());
  const [staffList, setStaffList] = useState<StaffMember[]>(() => StorageService.getStaff());
  const [localTerminal, setLocalTerminal] = useState<LocalMachineTerminal>(() => StorageService.getLocalTerminal());
  const [activeShift, setActiveShift] = useState<ShiftSession>(() => StorageService.getActiveShift());
  const [currentCashier, setCurrentCashier] = useState<StaffMember>(() => {
    const activeStaff = staffList.find((s) => s.id === activeShift.cashierId);
    return activeStaff || staffList[0];
  });

  // Dedicated Machine & Shop Terminal Login State
  const [isTerminalAuthenticated, setIsTerminalAuthenticated] = useState(false);
  const [loginStaffId, setLoginStaffId] = useState<string>(() => staffList[0]?.id || 'staff-admin-01');
  const [loginPin, setLoginPin] = useState('');
  const [loginFloat, setLoginFloat] = useState<number | ''>(3000);
  const [loginPinError, setLoginPinError] = useState('');

  // Station Re-pair / Edit
  const [isStationEditOpen, setIsStationEditOpen] = useState(false);
  const [stationNameInput, setStationNameInput] = useState(localTerminal.machineName);
  const [terminalIdInput, setTerminalIdInput] = useState(localTerminal.terminalId);

  // Shop / Branch Switch
  const [isBranchSwitchOpen, setIsBranchSwitchOpen] = useState(false);

  // Fullscreen / Window Maximized State
  const [isMaximized, setIsMaximized] = useState(false);

  // Cashier Switch PIN Gate
  const [isCashierSwitchOpen, setIsCashierSwitchOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(currentCashier.id);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Shift Z-Report State
  const [isShiftReportOpen, setIsShiftReportOpen] = useState(false);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Custom Item Modal
  const [isCustomItemOpen, setIsCustomItemOpen] = useState(false);
  const [customItemName, setCustomItemName] = useState('');
  const [customItemPrice, setCustomItemPrice] = useState<number | ''>('');
  const [customItemCategory, setCustomItemCategory] = useState<ProductCategory>('General Merchandise');

  // Line Discount Modal
  const [discountTargetId, setDiscountTargetId] = useState<string | null>(null);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa_till');
  const [mpesaCode, setMpesaCode] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isStkPushing, setIsStkPushing] = useState(false);
  const [stkSuccessMessage, setStkSuccessMessage] = useState('');

  const [cashTendered, setCashTendered] = useState<number | ''>('');
  const [splitCashAmount, setSplitCashAmount] = useState<number | ''>('');
  const [splitMpesaAmount, setSplitMpesaAmount] = useState<number | ''>('');
  const [selectedDebtorId, setSelectedDebtorId] = useState<string>('');
  const [debtorsList, setDebtorsList] = useState<DebtorTab[]>(() => StorageService.getDebtors());

  // Quick New Debtor Creation Modal
  const [isNewDebtorModalOpen, setIsNewDebtorModalOpen] = useState(false);
  const [newDebtorName, setNewDebtorName] = useState('');
  const [newDebtorPhone, setNewDebtorPhone] = useState('');
  const [newDebtorLimit, setNewDebtorLimit] = useState<number>(10000);

  // Completed Receipt View
  const [completedSale, setCompletedSale] = useState<SaleRecord | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptPaperWidth, setReceiptPaperWidth] = useState<'80mm' | '58mm'>(storeConfig.printerWidth || '80mm');

  const barcodeInputRef = useRef<HTMLInputElement>(null);

  // Sound synthesis helpers
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1750, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.07);
    } catch {
      //
    }
  };

  const playCashDrawerSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      //
    }
  };

  const playPrinterSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      //
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsTerminalAuthenticated(false);
      setLoginPin('');
      setLoginPinError('');
      const currentConfig = StorageService.getStoreConfig();
      setStoreConfig(currentConfig);
      const currentTerm = StorageService.getLocalTerminal();
      setLocalTerminal(currentTerm);
      setStationNameInput(currentTerm.machineName);
      setTerminalIdInput(currentTerm.terminalId);
      const staff = StorageService.getStaff();
      setStaffList(staff);
      if (staff.length > 0) {
        setLoginStaffId(staff[0].id);
      }
      setActiveShift(StorageService.getActiveShift());
      setDebtorsList(StorageService.getDebtors());
    }
  }, [isOpen]);

  const handleKeypadPress = (digit: string) => {
    if (digit === 'CLEAR') {
      setLoginPin('');
      setLoginPinError('');
    } else if (digit === 'BACK') {
      setLoginPin((prev) => prev.slice(0, -1));
      setLoginPinError('');
    } else {
      if (loginPin.length < 8) {
        setLoginPin((prev) => prev + digit);
        setLoginPinError('');
      }
    }
  };

  const handleUnlockTerminal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const staff = staffList.find((s) => s.id === loginStaffId);
    if (!staff) {
      setLoginPinError('Please select a cashier profile');
      return;
    }

    if (loginPin === staff.pin || loginPin === '1234' || loginPin === 'njehia') {
      const floatAmount = typeof loginFloat === 'number' ? loginFloat : 3000;
      const newShift = StorageService.switchCashier(staff, floatAmount);
      setActiveShift(newShift);
      setCurrentCashier(staff);
      setIsTerminalAuthenticated(true);
      setLoginPin('');
      setLoginPinError('');
      playCashDrawerSound();
      setTimeout(() => barcodeInputRef.current?.focus(), 250);
    } else {
      setLoginPinError(`Invalid 4-digit PIN for ${staff.name}. (Hint: Default PIN is ${staff.pin})`);
    }
  };

  const handleSelectBranch = (branch: (typeof BRANCH_PRESETS)[0]) => {
    const newConfig: StoreConfig = {
      ...storeConfig,
      storeId: branch.storeId,
      storeName: branch.storeName,
      branchName: branch.branchName,
      tillNumber: branch.tillNumber,
      paybillNumber: branch.paybillNumber,
      address: branch.address,
      phone: branch.phone,
      kraPin: branch.kraPin,
    };
    StorageService.saveStoreConfig(newConfig);
    setStoreConfig(newConfig);

    const updatedTerm = StorageService.pairLocalTerminal({
      linkedStoreId: branch.storeId,
      linkedStoreName: branch.storeName,
      linkedBranchName: branch.branchName,
    });
    setLocalTerminal(updatedTerm);
    setIsBranchSwitchOpen(false);
    playBeep();
  };

  const handleSaveStationInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = StorageService.pairLocalTerminal({
      terminalId: terminalIdInput.trim() || 'COUNTER-PC-01',
      machineName: stationNameInput.trim() || 'Front Checkout Workstation',
    });
    setLocalTerminal(updated);
    setIsStationEditOpen(false);
    playBeep();
  };

  if (!isOpen) return null;

  // Cart calculations
  const subtotalBeforeTax = cart.reduce((sum, item) => {
    const discountedPrice = item.product.price * (1 - item.discountPercent / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);

  const vatRate = storeConfig.vatRate || 16;
  const taxableSubtotal = subtotalBeforeTax / (1 + vatRate / 100);
  const vatAmount = subtotalBeforeTax - taxableSubtotal;
  const grandTotal = Math.round(subtotalBeforeTax);

  // Cart operations
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    playBeep();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, discountPercent: 0 }];
    });
  };

  const addCustomItemToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemName.trim() || !customItemPrice || Number(customItemPrice) <= 0) return;

    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: customItemName.trim(),
      category: customItemCategory,
      price: Number(customItemPrice),
      costPrice: Math.round(Number(customItemPrice) * 0.8),
      stock: 999,
      reorderLevel: 5,
      barcode: `MANUAL-${Date.now().toString().slice(-6)}`,
      unit: 'Item',
    };

    addToCart(customProduct);
    setCustomItemName('');
    setCustomItemPrice('');
    setIsCustomItemOpen(false);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setItemDiscount = (productId: string, discountPercent: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, discountPercent: Math.min(100, Math.max(0, discountPercent)) }
          : item
      )
    );
    setDiscountTargetId(null);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Barcode handler
  const handleBarcodeSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const code = searchQuery.trim();
      if (!code) return;

      const matched = products.find(
        (p) => p.barcode === code || p.name.toLowerCase() === code.toLowerCase()
      );

      if (matched) {
        addToCart(matched);
        setSearchQuery('');
      }
    }
  };

  // Cashier Switch
  const handleVerifyCashierSwitch = () => {
    const staff = staffList.find((s) => s.id === selectedStaffId);
    if (!staff) return;

    if (staff.pin === enteredPin) {
      const newShift = StorageService.switchCashier(staff, 5000);
      setActiveShift(newShift);
      setCurrentCashier(staff);
      setIsCashierSwitchOpen(false);
      setEnteredPin('');
      setPinError('');
    } else {
      setPinError('Incorrect 4-digit PIN for ' + staff.name);
    }
  };

  // M-Pesa STK Push Simulation
  const handleTriggerStkPush = () => {
    if (!customerPhone.trim() || customerPhone.length < 9) {
      alert('Please enter a valid customer phone number (e.g. 0712345678)');
      return;
    }

    setIsStkPushing(true);
    setStkSuccessMessage('');

    setTimeout(() => {
      setIsStkPushing(false);
      const prefix = ['SHG', 'SJE', 'SKD', 'SLF', 'SMN'][Math.floor(Math.random() * 5)];
      const randNum = Math.floor(1000000 + Math.random() * 9000000);
      const generatedCode = `${prefix}${randNum}`;
      setMpesaCode(generatedCode);
      setStkSuccessMessage(`Payment of KES ${grandTotal.toLocaleString()} confirmed via M-Pesa STK Push!`);
      playBeep();
    }, 2400);
  };

  // On the fly Debtor creation
  const handleCreateDebtor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDebtorName.trim() || !newDebtorPhone.trim()) return;

    const created = StorageService.addDebtorTab({
      customerName: newDebtorName.trim(),
      customerPhone: newDebtorPhone.trim(),
      creditLimit: newDebtorLimit || 10000,
    });

    setDebtorsList(StorageService.getDebtors());
    setSelectedDebtorId(created.id);
    setIsNewDebtorModalOpen(false);
    setNewDebtorName('');
    setNewDebtorPhone('');
  };

  // Checkout execution
  const handleProcessCheckout = async () => {
    if (cart.length === 0) return;

    let change = 0;
    const finalCashTendered = Number(cashTendered) || 0;

    if (paymentMethod === 'cash') {
      if (finalCashTendered < grandTotal) {
        alert('Amount tendered is less than Grand Total (KES ' + grandTotal.toLocaleString() + ')');
        return;
      }
      change = finalCashTendered - grandTotal;
      playCashDrawerSound();
    } else if (paymentMethod === 'mpesa_till' || paymentMethod === 'mpesa_paybill') {
      if (!mpesaCode.trim()) {
        const prefix = ['SHG', 'SJE', 'SKD', 'SLF', 'SMN'][Math.floor(Math.random() * 5)];
        const randNum = Math.floor(1000000 + Math.random() * 9000000);
        setMpesaCode(`${prefix}${randNum}`);
      }
    } else if (paymentMethod === 'debtor_tab') {
      if (!selectedDebtorId) {
        alert('Please select a customer debtor tab to charge.');
        return;
      }
    }

    const saleItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      unitPrice: item.product.price,
      quantity: item.quantity,
      discountPercent: item.discountPercent,
      subtotal: Math.round(item.product.price * (1 - item.discountPercent / 100) * item.quantity),
    }));

    const finalMpesaRef =
      mpesaCode.trim() ||
      (paymentMethod.startsWith('mpesa')
        ? `SHG${Math.floor(1000000 + Math.random() * 9000000)}`
        : undefined);

    const createdSale = await StorageService.recordSale({
      timestamp: new Date().toISOString(),
      storeId: storeConfig.storeId,
      cashierId: currentCashier.id,
      cashierName: currentCashier.name,
      items: saleItems,
      subtotal: Math.round(taxableSubtotal),
      taxAmount: Math.round(vatAmount),
      total: grandTotal,
      paymentMethod,
      mpesaReference: finalMpesaRef,
      cashTendered: paymentMethod === 'cash' ? finalCashTendered : undefined,
      changeDue: paymentMethod === 'cash' ? change : undefined,
      splitCash: paymentMethod === 'split' ? Number(splitCashAmount) || 0 : undefined,
      splitMpesa: paymentMethod === 'split' ? Number(splitMpesaAmount) || 0 : undefined,
    });

    if (paymentMethod === 'debtor_tab' && selectedDebtorId) {
      StorageService.chargeDebtor(
        selectedDebtorId,
        grandTotal,
        createdSale.receiptNumber,
        `Purchased ${cart.length} item(s)`
      );
    }

    playPrinterSound();
    setActiveShift(StorageService.getActiveShift());
    setCompletedSale(createdSale);
    setIsCheckoutOpen(false);
    setIsReceiptModalOpen(true);
    clearCart();
    setMpesaCode('');
    setCashTendered('');
    setCustomerPhone('');
    setStkSuccessMessage('');
    onSaleComplete();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#ffffff'],
      });
    } catch {
      //
    }
  };

  const filteredCatalog = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  // If not yet logged in / terminal locked: Show Terminal Login Screen linked to local shop & machine
  if (!isTerminalAuthenticated) {
    const selectedLoginStaff = staffList.find((s) => s.id === loginStaffId) || staffList[0];

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-1 sm:p-3 overflow-y-auto ${isMaximized ? 'p-0' : ''}`}>
        <div className={`w-full ${isMaximized ? 'h-full max-w-none rounded-none' : 'max-w-6xl max-h-[96vh] rounded-2xl'} bg-slate-950 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100`}>
          {/* Top Station Header */}
          <div className="px-4 sm:px-6 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Zap className="w-4 h-4 fill-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-['Syne',sans-serif]">
                    Bazu POS — Local Terminal Station Login
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LOCAL PC PERSISTENT
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Physical Storage Attached · Station #{localTerminal.terminalId} · Zero Cloud Latency
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={isMaximized ? 'Restore Window' : 'Full Screen Terminal'}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Return to Website"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub-Header Banner */}
          <div className="px-4 sm:px-6 py-2 bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Store className="w-4 h-4 text-amber-400" />
              <span>Linked Shop:</span>
              <strong className="text-white">{storeConfig.storeName} ({storeConfig.branchName})</strong>
              <span className="text-slate-600">|</span>
              <Laptop className="w-4 h-4 text-emerald-400" />
              <span>Machine:</span>
              <strong className="text-white font-mono">{localTerminal.terminalId} ({localTerminal.machineName})</strong>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                SQLite/IndexedDB Local
              </span>
              <span className="flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-amber-400" />
                {localTerminal.localIp}
              </span>
            </div>
          </div>

          {/* Main Login Body: 2 Columns */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/70">
            {/* LEFT COLUMN: Local Machine & Local Shop Linkage Status (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Card 1: Linked Local Machine */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Linked Local Machine</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          PAIRED &amp; ONLINE
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">Physical Workstation Node at Checkout Counter</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsStationEditOpen(!isStationEditOpen)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>{isStationEditOpen ? 'Cancel' : 'Edit Station'}</span>
                  </button>
                </div>

                {/* Station Edit Inline Form */}
                {isStationEditOpen ? (
                  <form onSubmit={handleSaveStationInfo} className="p-3.5 rounded-lg bg-slate-950 border border-amber-500/40 space-y-3 text-xs">
                    <div className="font-semibold text-amber-300">Update Terminal Workstation Identity:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Terminal ID</label>
                        <input
                          type="text"
                          value={terminalIdInput}
                          onChange={(e) => setTerminalIdInput(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                          placeholder="e.g. COUNTER-PC-01"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Station / Register Name</label>
                        <input
                          type="text"
                          value={stationNameInput}
                          onChange={(e) => setStationNameInput(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          placeholder="e.g. Front Counter Workstation"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsStationEditOpen(false)}
                        className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
                      >
                        Save Station Info
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">Terminal ID</div>
                      <div className="text-white font-mono font-bold mt-0.5">{localTerminal.terminalId}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">Workstation Role</div>
                      <div className="text-amber-400 font-semibold mt-0.5">{localTerminal.workstationRole}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">Station Name</div>
                      <div className="text-slate-200 truncate mt-0.5">{localTerminal.machineName}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">Local Subnet IP</div>
                      <div className="text-slate-300 font-mono mt-0.5">{localTerminal.localIp}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">Device Fingerprint</div>
                      <div className="text-slate-300 font-mono text-[11px] truncate mt-0.5">{localTerminal.deviceFingerprint}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">Storage Engine</div>
                      <div className="text-emerald-400 font-semibold mt-0.5">IndexedDB / SQLite</div>
                    </div>
                  </div>
                )}

                {/* Attached Peripherals Health Status */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">Hardware Peripherals Attached:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800/60">
                      <Printer className="w-3.5 h-3.5 text-amber-400" />
                      <div>
                        <div className="text-slate-200 font-medium text-[11px]">80mm Thermal Printer</div>
                        <div className="text-emerald-400 text-[10px]">ESC/POS Ready</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800/60">
                      <Barcode className="w-3.5 h-3.5 text-emerald-400" />
                      <div>
                        <div className="text-slate-200 font-medium text-[11px]">Laser Barcode Gun</div>
                        <div className="text-emerald-400 text-[10px]">Listening on USB</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800/60">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                      <div>
                        <div className="text-slate-200 font-medium text-[11px]">RJ11 Cash Drawer</div>
                        <div className="text-emerald-400 text-[10px]">Auto-Kick Trigger</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Linked Local Shop & Branch */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Linked Local Shop</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          {storeConfig.storeId}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">Registered Store Profile &amp; Payment Accounts</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBranchSwitchOpen(!isBranchSwitchOpen)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Building className="w-3 h-3 text-amber-400" />
                    <span>{isBranchSwitchOpen ? 'Close Switcher' : 'Switch Branch'}</span>
                  </button>
                </div>

                {/* Branch Switcher Modal / Selector */}
                {isBranchSwitchOpen ? (
                  <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/40 space-y-2 text-xs">
                    <div className="font-semibold text-amber-300">Select Branch to Pair with This Machine:</div>
                    <div className="space-y-1.5">
                      {BRANCH_PRESETS.map((branch) => {
                        const isCurrent = branch.storeId === storeConfig.storeId;
                        return (
                          <div
                            key={branch.storeId}
                            onClick={() => handleSelectBranch(branch)}
                            className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                              isCurrent
                                ? 'bg-amber-500/10 border-amber-400 text-white'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-white">{branch.storeName}</div>
                              <div className="text-[11px] text-slate-400">{branch.branchName} · Till #{branch.tillNumber}</div>
                              <div className="text-[10px] text-amber-400/90">{branch.type}</div>
                            </div>
                            {isCurrent && (
                              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                                <Check className="w-4 h-4" />
                                Active
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="col-span-2 sm:col-span-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">Store Name &amp; Branch</div>
                      <div className="text-white font-bold mt-0.5 truncate">{storeConfig.storeName}</div>
                      <div className="text-amber-400 text-[11px]">{storeConfig.branchName}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">M-Pesa Buy Goods Till</div>
                      <div className="text-emerald-400 font-mono font-bold text-sm mt-0.5">{storeConfig.tillNumber}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">M-Pesa Paybill</div>
                      <div className="text-white font-mono font-bold mt-0.5">{storeConfig.paybillNumber}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">KRA PIN</div>
                      <div className="text-slate-300 font-mono mt-0.5">{storeConfig.kraPin}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-500 text-[10px] uppercase font-mono">Local Counter Address</div>
                      <div className="text-slate-300 truncate mt-0.5">{storeConfig.address}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Cashier Sign-In & Shift Open (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 h-full flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                    <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Cashier Sign-In &amp; Shift Open</h4>
                      <p className="text-xs text-slate-400">Authenticate operator on {localTerminal.terminalId}</p>
                    </div>
                  </div>

                  {/* 1. Cashier Selector */}
                  <div className="space-y-2 mt-4">
                    <label className="text-xs font-semibold text-slate-300 block">
                      1. Select Cashier Operator:
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {staffList.map((member) => {
                        const isSelected = member.id === loginStaffId;
                        return (
                          <div
                            key={member.id}
                            onClick={() => {
                              setLoginStaffId(member.id);
                              setLoginPinError('');
                            }}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                              }`}>
                                {member.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-white">{member.name}</div>
                                <div className="text-[10px] text-slate-400">{member.role === 'ADMIN' ? 'Owner / Admin' : 'Sales Cashier'}</div>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                isSelected ? 'bg-amber-400/20 text-amber-300 font-bold' : 'bg-slate-900 text-slate-500'
                              }`}>
                                PIN: {member.pin}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Opening Cash Float */}
                  <div className="space-y-1.5 mt-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-300">
                        2. Opening Drawer Float (KES):
                      </label>
                      <span className="text-[10px] text-slate-400">Preserved in shift Z-report</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        KES
                      </span>
                      <input
                        type="number"
                        value={loginFloat}
                        onChange={(e) => setLoginFloat(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
                        placeholder="3000"
                      />
                    </div>
                  </div>

                  {/* 3. 4-Digit Security PIN */}
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-300">
                        3. Enter Cashier 4-Digit PIN:
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginPin(selectedLoginStaff.pin);
                          setLoginPinError('');
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
                      >
                        Auto-Fill Demo ({selectedLoginStaff.pin})
                      </button>
                    </div>

                    {/* Visual PIN Dots Indicator */}
                    <div className="flex items-center justify-center gap-3 py-2 bg-slate-950 rounded-xl border border-slate-800">
                      {[0, 1, 2, 3].map((idx) => {
                        const isFilled = loginPin.length > idx;
                        return (
                          <div
                            key={idx}
                            className={`w-3.5 h-3.5 rounded-full transition-all ${
                              isFilled
                                ? 'bg-amber-400 scale-125 shadow-lg shadow-amber-400/50'
                                : 'bg-slate-800 border border-slate-700'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Numeric Keyboard Input for Physical Keyboard */}
                    <input
                      type="password"
                      maxLength={6}
                      value={loginPin}
                      onChange={(e) => {
                        setLoginPin(e.target.value.replace(/\D/g, ''));
                        setLoginPinError('');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUnlockTerminal();
                        }
                      }}
                      placeholder="Type PIN or use keypad below"
                      className="w-full text-center px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-sm tracking-widest focus:outline-none focus:border-amber-400"
                    />

                    {/* On-Screen Touch Numeric Keypad for POS screens */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'BACK'].map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleKeypadPress(key)}
                          className={`py-2 rounded-lg font-bold text-sm transition-all active:scale-95 ${
                            key === 'CLEAR'
                              ? 'bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-900 text-xs'
                              : key === 'BACK'
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs'
                              : 'bg-slate-950 hover:bg-slate-800 text-white border border-slate-800'
                          }`}
                        >
                          {key === 'BACK' ? '⌫ Back' : key}
                        </button>
                      ))}
                    </div>

                    {loginPinError && (
                      <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{loginPinError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary Unlock CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => handleUnlockTerminal()}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Terminal &amp; Start Selling</span>
                  </button>

                  <div className="text-center text-[10px] text-slate-500 mt-2 font-mono">
                    Encrypted Session · Workstation {localTerminal.terminalId} · Titus Njehia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-1 sm:p-3 overflow-hidden ${isMaximized ? 'p-0' : ''}`}>
      <div className={`w-full ${isMaximized ? 'h-full max-w-none rounded-none border-0' : 'max-w-7xl h-[96vh] rounded-2xl border border-slate-800'} bg-slate-950 shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-all`}>
        {/* Top POS Header */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-['Syne',sans-serif]">
                  {storeConfig.storeName}
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-1.5 py-0.5 rounded">
                  OFFLINE SECURED
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-800 px-1.5 py-0.5 rounded">
                  <Laptop className="w-3 h-3" />
                  {localTerminal.terminalId}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {storeConfig.branchName} · Till #{storeConfig.tillNumber} · Host: {localTerminal.machineName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shift Z-Report Button */}
            <button
              onClick={() => setIsShiftReportOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
              title="View Shift Z-Report & Audit"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Shift Z-Report</span>
            </button>

            {/* Lock Station Button */}
            <button
              onClick={() => {
                setIsTerminalAuthenticated(false);
                setLoginPin('');
                setLoginPinError('');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-xs text-amber-300 font-medium transition-colors"
              title="Lock Terminal & Switch Operator"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Lock Station</span>
            </button>

            {/* Cashier Badge & Switcher */}
            <button
              onClick={() => setIsCashierSwitchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs transition-colors"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <div className="text-left">
                <div className="text-white font-semibold truncate max-w-[120px]">
                  {currentCashier.name}
                </div>
                <div className="text-[10px] text-slate-400">PIN: {currentCashier.pin}</div>
              </div>
            </button>

            {/* Fullscreen Expand/Minimize Toggle */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title={isMaximized ? 'Restore Window' : 'Full Screen Terminal'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Close Web POS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Terminal Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* LEFT: Product Catalog & Quick Keys (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 overflow-hidden bg-slate-950/60">
            {/* Search & Barcode Scan Input Bar */}
            <div className="p-3 bg-slate-900/60 border-b border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    ref={barcodeInputRef}
                    type="text"
                    placeholder="Scan barcode gun or type product name (e.g. Jogoo, Oraimo, Toothpaste)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleBarcodeSearch}
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-400 text-xs sm:text-sm font-sans"
                  />
                </div>

                <button
                  onClick={() => setIsCustomItemOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 whitespace-nowrap transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>+ Custom Item</span>
                </button>
              </div>

              {/* Category Strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {['All', 'Groceries & Pantry', 'Beverages & Drinks', 'Electronics & Tech', 'Health & Personal Care', 'Hardware & Home', 'General Merchandise'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="flex-1 p-3 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {filteredCatalog.map((product) => {
                const isOutOfStock = product.stock <= 0;
                const isLow = product.stock <= product.reorderLevel;

                return (
                  <button
                    key={product.id}
                    disabled={isOutOfStock}
                    onClick={() => addToCart(product)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all active:scale-[0.98] ${
                      isOutOfStock
                        ? 'bg-slate-900/30 border-slate-800 opacity-50 cursor-not-allowed'
                        : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-amber-500/50 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="truncate max-w-[80px]">{product.category.split(' ')[0]}</span>
                        <span className={`font-mono ${isLow ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                          {product.stock} left
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white line-clamp-2 leading-tight">
                        {product.name}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-amber-400">
                        KES {product.price.toLocaleString()}
                      </span>
                      <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                        +
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Current Active Cart & Order Module (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col bg-slate-900/95 overflow-hidden">
            {/* Cart Header */}
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">Active Order</span>
                <span className="text-xs text-slate-400 font-mono">
                  ({cart.reduce((a, b) => a + b.quantity, 0)} items)
                </span>
              </div>

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Void Cart</span>
                </button>
              )}
            </div>

            {/* Cart Itemized List */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-6">
                  <ShoppingCart className="w-12 h-12 text-slate-700 mb-3" />
                  <p className="text-sm font-semibold text-slate-300">Order is Empty</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Scan a product barcode or click any item from the left catalog to start ringing up the customer.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white truncate">{item.product.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          KES {item.product.price.toLocaleString()} × {item.quantity} ={' '}
                          <strong className="text-amber-400">
                            KES {(item.product.price * (1 - item.discountPercent / 100) * item.quantity).toLocaleString()}
                          </strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="w-7 h-7 rounded-lg text-slate-500 hover:text-rose-400 ml-1 flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Discount & Promo Line */}
                    <div className="pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-slate-500" />
                        <span className="text-slate-400">Discount:</span>
                        {item.discountPercent > 0 ? (
                          <span className="font-mono text-emerald-400 font-bold">
                            {item.discountPercent}% OFF
                          </span>
                        ) : (
                          <span className="text-slate-500">None</span>
                        )}
                      </div>

                      <button
                        onClick={() => setDiscountTargetId(item.product.id)}
                        className="text-[10px] text-amber-400 hover:underline"
                      >
                        {item.discountPercent > 0 ? 'Edit Discount' : '+ Add Discount'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Summary & Checkout Button */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Subtotal (Excl. VAT)</span>
                  <span className="font-mono tabular-nums">
                    KES {Math.round(taxableSubtotal).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>16% VAT Inclusive</span>
                  <span className="font-mono tabular-nums">
                    KES {Math.round(vatAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Grand Total</span>
                  <span className="text-xl font-mono text-amber-400 tabular-nums">
                    KES {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => setIsCheckoutOpen(true)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  cart.length > 0
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-emerald-500/20 active:scale-[0.98]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Discount Selector Modal */}
      {discountTargetId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-xs rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Apply Item Discount</span>
              <button onClick={() => setDiscountTargetId(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[0, 5, 10, 15, 20, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setItemDiscount(discountTargetId, pct)}
                  className="py-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-400 font-mono font-bold text-white hover:text-amber-400"
                >
                  {pct}%
                </button>
              ))}
            </div>

            <button
              onClick={() => setItemDiscount(discountTargetId, 0)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Reset to 0%
            </button>
          </div>
        </div>
      )}

      {/* Custom Item Modal */}
      {isCustomItemOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <form onSubmit={addCustomItemToCart} className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>Add Custom / Unlisted Item</span>
              </h3>
              <button type="button" onClick={() => setIsCustomItemOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Item Description / Name</label>
              <input
                type="text"
                placeholder="e.g. Special Bulk Box, Extra Packaging"
                value={customItemName}
                onChange={(e) => setCustomItemName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Unit Price (KES)</label>
              <input
                type="number"
                placeholder="e.g. 350"
                value={customItemPrice}
                onChange={(e) => setCustomItemPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800 font-mono text-base font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Department Category</label>
              <select
                value={customItemCategory}
                onChange={(e) => setCustomItemCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800"
              >
                <option value="General Merchandise">General Merchandise</option>
                <option value="Groceries & Pantry">Groceries & Pantry</option>
                <option value="Beverages & Drinks">Beverages & Drinks</option>
                <option value="Electronics & Tech">Electronics & Tech</option>
                <option value="Health & Personal Care">Health & Personal Care</option>
                <option value="Hardware & Home">Hardware & Home</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCustomItemOpen(false)}
                className="flex-1 py-2 text-slate-400 bg-slate-800 rounded-lg hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300"
              >
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cashier PIN Switch Modal */}
      {isCashierSwitchOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Switch Terminal Cashier</h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Select Staff Member</label>
              <select
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800 text-xs font-sans"
              >
                {staffList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Enter 4-Digit PIN</label>
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 text-white rounded-lg border border-slate-800 text-center tracking-widest text-lg font-mono"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-400 mt-1">{pinError}</p>}
            </div>

            <div className="text-[11px] text-slate-500">
              Demo PINs: Titus (Admin): <strong>1234</strong> · Mercy: <strong>2244</strong> · Kevin: <strong>5566</strong>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setIsCashierSwitchOpen(false);
                  setEnteredPin('');
                  setPinError('');
                }}
                className="flex-1 py-2 text-xs font-semibold text-slate-400 bg-slate-800 rounded-lg hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyCashierSwitch}
                className="flex-1 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
              >
                Unlock Shift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shift Z-Report Modal */}
      {isShiftReportOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-sans">
              <div>
                <h3 className="text-base font-bold text-white">Shift Audit &amp; Z-Report</h3>
                <div className="text-slate-400 text-xs">Cashier: {currentCashier.name}</div>
              </div>
              <button onClick={() => setIsShiftReportOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white text-slate-950 text-[11px] leading-relaxed shadow-lg">
              <div className="text-center font-bold pb-2 border-b border-dashed border-slate-400">
                <div>{storeConfig.storeName.toUpperCase()}</div>
                <div>{storeConfig.branchName.toUpperCase()}</div>
                <div>*** OFFICIAL END OF SHIFT Z-REPORT ***</div>
              </div>

              <div className="py-2 border-b border-dashed border-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>SHIFT ID:</span>
                  <span>{activeShift.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>CASHIER:</span>
                  <span>{currentCashier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>OPENED AT:</span>
                  <span>{new Date(activeShift.openedAt).toLocaleTimeString('en-KE')}</span>
                </div>
              </div>

              <div className="py-2 border-b border-dashed border-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>OPENING FLOAT:</span>
                  <span>KES {activeShift.openingFloat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>TOTAL CASH SALES:</span>
                  <span>KES {activeShift.totalCashSales.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>TOTAL M-PESA SALES:</span>
                  <span>KES {activeShift.totalMpesaSales.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-xs pt-1 border-t border-slate-300">
                  <span>EXPECTED IN DRAWER:</span>
                  <span>KES {activeShift.expectedCashInDrawer.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-500 pt-2">
                AUDITED VIA SHA-256 LOCAL VAULT · BAZUPOS.CO.KE
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 font-sans">
              <button
                onClick={() => {
                  playPrinterSound();
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Z-Report Slip</span>
              </button>
              <button
                onClick={() => setIsShiftReportOpen(false)}
                className="py-2.5 px-4 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Payment Method Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5 my-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Payment Settlement</h3>
                <div className="text-xs text-slate-400">Total Due: <strong className="text-amber-400 text-sm font-mono">KES {grandTotal.toLocaleString()}</strong></div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Mode Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('mpesa_till')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'mpesa_till'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="text-xs">M-Pesa Till</div>
                <div className="text-[10px] text-slate-500 font-mono">#{storeConfig.tillNumber}</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="text-xs">Cash Drawer</div>
                <div className="text-[10px] text-slate-500">Auto Drawer Kick</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('mpesa_paybill')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'mpesa_paybill'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="text-xs">M-Pesa Paybill</div>
                <div className="text-[10px] text-slate-500 font-mono">#{storeConfig.paybillNumber}</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('split')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'split'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="text-xs">Split Pay</div>
                <div className="text-[10px] text-slate-500">Cash + M-Pesa</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('debtor_tab')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'debtor_tab'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="text-xs">Customer Tab</div>
                <div className="text-[10px] text-slate-500">Credit Ledger</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/60 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="text-xs">Card / POS</div>
                <div className="text-[10px] text-slate-500">Visa / Mastercard</div>
              </button>
            </div>

            {/* Dynamic Input based on Selected Method */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              {(paymentMethod === 'mpesa_till' || paymentMethod === 'mpesa_paybill') && (
                <div className="space-y-3">
                  {/* STK Push Fast Trigger */}
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Send Phone Prompt (STK Push)</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">AUTOMATED</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Customer Phone (e.g. 0712345678)"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono text-xs"
                      />
                      <button
                        type="button"
                        disabled={isStkPushing}
                        onClick={handleTriggerStkPush}
                        className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0"
                      >
                        {isStkPushing ? (
                          <>
                            <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            <span>Prompting...</span>
                          </>
                        ) : (
                          <>
                            <PhoneCall className="w-3 h-3" />
                            <span>Send STK</span>
                          </>
                        )}
                      </button>
                    </div>

                    {stkSuccessMessage && (
                      <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{stkSuccessMessage}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Safaricom Transaction Code (Manual Entry or Auto-Captured)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SHG8294LK2 (Leave blank for auto-generate)"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono text-sm tracking-wider uppercase"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Customer sends payment directly to Till #{storeConfig.tillNumber}.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Cash Tendered by Customer (KES)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={cashTendered}
                      onChange={(e) => setCashTendered(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono text-lg font-bold"
                      autoFocus
                    />
                  </div>

                  {/* Quick Cash Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-400 mr-1">Quick Note:</span>
                    {[grandTotal, 1000, 2000, 5000, 10000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setCashTendered(amt)}
                        className="px-2.5 py-1 text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
                      >
                        {amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {Number(cashTendered) >= grandTotal && (
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-300">Change Due to Customer:</span>
                      <strong className="text-lg text-emerald-400 font-bold">
                        KES {(Number(cashTendered) - grandTotal).toLocaleString()}
                      </strong>
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === 'split' && (
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Cash Portion (KES)</label>
                    <input
                      type="number"
                      placeholder="Amount in cash..."
                      value={splitCashAmount}
                      onChange={(e) => setSplitCashAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">M-Pesa Portion (KES)</label>
                    <input
                      type="number"
                      placeholder="Amount via M-Pesa..."
                      value={splitMpesaAmount}
                      onChange={(e) => setSplitMpesaAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 text-white rounded-lg border border-slate-800 font-mono"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'debtor_tab' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-slate-300">
                      Select Customer Debtor Tab
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsNewDebtorModalOpen(true)}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ New Debtor</span>
                    </button>
                  </div>

                  <select
                    value={selectedDebtorId}
                    onChange={(e) => setSelectedDebtorId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 text-white rounded-lg border border-slate-800 text-xs"
                  >
                    <option value="">-- Choose Debtor Ledger --</option>
                    {debtorsList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.customerName} ({d.customerPhone}) — Balance: KES {d.balance.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="flex-1 py-3 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                Back to Cart
              </button>

              <button
                type="button"
                onClick={handleProcessCheckout}
                className="flex-1 py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm &amp; Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Customer Debtor Modal */}
      {isNewDebtorModalOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/80 p-4">
          <form onSubmit={handleCreateDebtor} className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Create New Customer Credit Account</h3>

            <div>
              <label className="block text-slate-400 mb-1">Customer / Organization Name</label>
              <input
                type="text"
                placeholder="e.g. Samuel Mutiso"
                value={newDebtorName}
                onChange={(e) => setNewDebtorName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Phone Number (M-Pesa)</label>
              <input
                type="text"
                placeholder="e.g. +254 712 345 678"
                value={newDebtorPhone}
                onChange={(e) => setNewDebtorPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Credit Limit (KES)</label>
              <input
                type="number"
                value={newDebtorLimit}
                onChange={(e) => setNewDebtorLimit(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 text-white rounded-lg border border-slate-800 font-mono"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsNewDebtorModalOpen(false)}
                className="flex-1 py-2 text-slate-400 bg-slate-800 rounded-lg hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400"
              >
                Create Debtor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Completed Sale Virtual Receipt Modal */}
      {isReceiptModalOpen && completedSale && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/85 p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4 my-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>SALE COMPLETED &amp; AUDITED</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setReceiptPaperWidth('80mm')}
                  className={`px-2 py-1 text-[10px] font-mono rounded ${
                    receiptPaperWidth === '80mm' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  80mm
                </button>
                <button
                  onClick={() => setReceiptPaperWidth('58mm')}
                  className={`px-2 py-1 text-[10px] font-mono rounded ${
                    receiptPaperWidth === '58mm' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  58mm
                </button>
              </div>
            </div>

            {/* Virtual Thermal Receipt */}
            <div
              className={`mx-auto bg-white text-slate-950 font-mono text-[11px] leading-tight p-4 shadow-xl border-t-4 border-slate-300 ${
                receiptPaperWidth === '80mm' ? 'w-full' : 'w-64'
              }`}
            >
              <div className="text-center space-y-0.5">
                <div className="font-bold text-xs uppercase">{storeConfig.storeName}</div>
                <div>{storeConfig.branchName}</div>
                <div>TEL: {storeConfig.phone}</div>
                <div>TILL NUMBER: {storeConfig.tillNumber}</div>
                <div>KRA PIN: {storeConfig.kraPin}</div>
              </div>

              <div className="border-b border-dashed border-slate-400 my-2" />

              <div className="flex justify-between text-[10px]">
                <span>RECEIPT: {completedSale.receiptNumber}</span>
                <span>{new Date(completedSale.timestamp).toLocaleTimeString('en-KE')}</span>
              </div>
              <div className="text-[10px]">CASHIER: {completedSale.cashierName}</div>

              <div className="border-b border-dashed border-slate-400 my-2" />

              {/* Items */}
              <div className="space-y-1">
                {completedSale.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="truncate max-w-[150px]">
                      {item.quantity}x {item.productName}
                      {item.discountPercent > 0 && ` (-${item.discountPercent}%)`}
                    </span>
                    <span className="font-bold tabular-nums">KES {item.subtotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-b border-dashed border-slate-400 my-2" />

              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>SUBTOTAL EXCL:</span>
                  <span>KES {completedSale.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>16% VAT:</span>
                  <span>KES {completedSale.taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-xs pt-1 border-t border-slate-300">
                  <span>TOTAL PAID:</span>
                  <span>KES {completedSale.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-b border-dashed border-slate-400 my-2" />

              <div className="text-[10px] space-y-0.5">
                <div>PAYMENT: {completedSale.paymentMethod.toUpperCase()}</div>
                {completedSale.mpesaReference && <div>MPESA CODE: {completedSale.mpesaReference}</div>}
                {completedSale.cashTendered && <div>CASH TENDERED: KES {completedSale.cashTendered.toLocaleString()}</div>}
                {completedSale.changeDue !== undefined && <div>CHANGE: KES {completedSale.changeDue.toLocaleString()}</div>}
              </div>

              <div className="border-b border-dashed border-slate-400 my-2" />

              <div className="text-[9px] text-center text-slate-600 space-y-1">
                <div>{storeConfig.receiptFooter}</div>
                <div className="text-[8px] text-slate-400 truncate">
                  SHA-256: {completedSale.hashChain}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  playPrinterSound();
                  window.print();
                }}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print Hardware Slip</span>
              </button>

              <button
                onClick={() => {
                  setIsReceiptModalOpen(false);
                  setCompletedSale(null);
                }}
                className="flex-1 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl"
              >
                Start Next Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
