import {
  AuditLogEntry,
  DebtorTab,
  LocalMachineTerminal,
  Product,
  SaleRecord,
  ShiftSession,
  StaffMember,
  StoreConfig,
} from '../types';
import { DEFAULT_CATALOG } from '../data/defaultCatalog';

// Storage keys
const KEY_PREFIX = 'bazupos_';
const KEY_STORE_CONFIG = `${KEY_PREFIX}config`;
const KEY_TERMINAL = `${KEY_PREFIX}terminal`;
const KEY_PRODUCTS = `${KEY_PREFIX}products`;
const KEY_SALES = `${KEY_PREFIX}sales`;
const KEY_STAFF = `${KEY_PREFIX}staff`;
const KEY_ACTIVE_SHIFT = `${KEY_PREFIX}active_shift`;
const KEY_DEBTORS = `${KEY_PREFIX}debtors`;
const KEY_AUDIT_LOG = `${KEY_PREFIX}audit_log`;
const KEY_CURRENT_USER = `${KEY_PREFIX}current_user`;

// Default Store Configuration
export const DEFAULT_STORE_CONFIG: StoreConfig = {
  storeId: 'bazu-cbd-001',
  storeName: 'Bazu Supermarket & Retail Depot',
  branchName: 'Kimathi Street CBD Flagship',
  tillNumber: '8849201',
  paybillNumber: '247247',
  phone: '+254 722 000 000',
  whatsapp: '+254 722 000 000',
  email: 'titusnjehia@gmail.com',
  address: 'Kimathi House, Ground Floor, Nairobi CBD',
  kraPin: 'P051948271Z',
  receiptHeader: 'BAZU SUPERMARKET & GENERAL RETAIL\nTHE UNBREAKABLE STORE EXPERIENCE\nTEL: +254 722 000 000',
  receiptFooter: 'Goods once sold are not returnable without receipt.\nAsante sana kwa biashara yako!\nPowered by Bazu POS — bazupos.co.ke',
  printerWidth: '80mm',
  autoCut: true,
  cashDrawerKick: true,
  ultraBoldPrint: true,
  vatRate: 16,
};

// Default Local Machine Terminal
export const DEFAULT_TERMINAL: LocalMachineTerminal = {
  terminalId: 'COUNTER-PC-01',
  machineName: 'Front Checkout Workstation',
  deviceFingerprint: 'DESKTOP-POS-NBO-8821',
  workstationRole: 'PRIMARY_CHECKOUT',
  linkedStoreId: 'bazu-cbd-001',
  linkedStoreName: 'Bazu Supermarket & Retail Depot',
  linkedBranchName: 'Kimathi Street CBD Flagship',
  localIp: '192.168.1.104 (Local Shop Subnet)',
  databaseStatus: 'LOCAL_PERSISTENT_SYNCED',
  hardwareAttached: {
    printer: 'ESC/POS 80mm High-Speed Thermal (USB-Direct)',
    scanner: 'Laser 1D/2D Barcode Scanner (Auto-Trigger)',
    drawer: 'RJ11 Solenoid Kick Drawer (Auto-Open on Cash)',
  },
  lastPairedTime: new Date().toISOString(),
};

// Default Staff Members
export const DEFAULT_STAFF: StaffMember[] = [
  {
    id: 'staff-admin-01',
    name: 'Titus Njehia (Store Owner)',
    email: 'titusnjehia@gmail.com',
    phone: '+254 722 000 000',
    pin: '1234',
    role: 'ADMIN',
    status: 'ACTIVE',
    joinedDate: '2025-01-01',
  },
  {
    id: 'staff-cashier-01',
    name: 'Mercy Wanjiku',
    email: 'mercy@bazupos.co.ke',
    phone: '+254 711 234 567',
    pin: '2244',
    role: 'SALES_CASHIER',
    status: 'ACTIVE',
    joinedDate: '2025-02-15',
  },
  {
    id: 'staff-cashier-02',
    name: 'Kevin Otieno',
    email: 'kevin@bazupos.co.ke',
    phone: '+254 733 987 654',
    pin: '5566',
    role: 'SALES_CASHIER',
    status: 'ACTIVE',
    joinedDate: '2025-03-01',
  },
];

// Helper: Calculate SHA-256 string
export async function calculateHash(message: string): Promise<string> {
  try {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback simple checksum if SubtleCrypto is unavailable in non-secure context
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      hash = (hash << 5) - hash + message.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }
}

// Storage Manager Class
export class StorageService {
  // Store Config
  static getStoreConfig(): StoreConfig {
    try {
      const data = localStorage.getItem(KEY_STORE_CONFIG);
      return data ? JSON.parse(data) : DEFAULT_STORE_CONFIG;
    } catch {
      return DEFAULT_STORE_CONFIG;
    }
  }

  static saveStoreConfig(config: StoreConfig): void {
    localStorage.setItem(KEY_STORE_CONFIG, JSON.stringify(config));
    this.appendAuditLog(
      'CONFIG_UPDATE',
      'Owner',
      'ADMIN',
      `Updated store configuration for ${config.storeName}`
    );
  }

  // Local Machine Terminal
  static getLocalTerminal(): LocalMachineTerminal {
    try {
      const data = localStorage.getItem(KEY_TERMINAL);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      //
    }
    const store = this.getStoreConfig();
    const defaultTerm: LocalMachineTerminal = {
      ...DEFAULT_TERMINAL,
      linkedStoreId: store.storeId,
      linkedStoreName: store.storeName,
      linkedBranchName: store.branchName,
    };
    this.saveLocalTerminal(defaultTerm);
    return defaultTerm;
  }

  static saveLocalTerminal(terminal: LocalMachineTerminal): void {
    try {
      localStorage.setItem(KEY_TERMINAL, JSON.stringify(terminal));
    } catch {
      //
    }
  }

  static pairLocalTerminal(updates: Partial<LocalMachineTerminal>): LocalMachineTerminal {
    const current = this.getLocalTerminal();
    const updated: LocalMachineTerminal = {
      ...current,
      ...updates,
      lastPairedTime: new Date().toISOString(),
    };
    this.saveLocalTerminal(updated);
    this.appendAuditLog(
      'CONFIG_UPDATE',
      'Terminal Manager',
      'ADMIN',
      `Terminal ${updated.terminalId} re-paired with shop ${updated.linkedStoreName}`
    );
    return updated;
  }

  // Products
  static getProducts(): Product[] {
    try {
      const data = localStorage.getItem(KEY_PRODUCTS);
      if (!data) {
        this.saveProducts(DEFAULT_CATALOG);
        return DEFAULT_CATALOG;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_CATALOG;
    }
  }

  static saveProducts(products: Product[]): void {
    localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
  }

  static resetProducts(): Product[] {
    this.saveProducts(DEFAULT_CATALOG);
    this.appendAuditLog(
      'CATALOG_PURGE',
      'System Admin',
      'ADMIN',
      'Catalog reset to default 150+ universal retail inventory SKUs'
    );
    return DEFAULT_CATALOG;
  }

  static updateStock(productId: string, quantityDeducted: number): void {
    const products = this.getProducts();
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, stock: Math.max(0, p.stock - quantityDeducted) };
      }
      return p;
    });
    this.saveProducts(updated);
  }

  // Sales
  static getSales(): SaleRecord[] {
    try {
      const data = localStorage.getItem(KEY_SALES);
      if (!data) {
        // Seed initial realistic sales for demo purposes
        const initialSales = this.generateSampleSales();
        localStorage.setItem(KEY_SALES, JSON.stringify(initialSales));
        return initialSales;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static async recordSale(sale: Omit<SaleRecord, 'id' | 'receiptNumber' | 'hashChain' | 'isSynced'>): Promise<SaleRecord> {
    const sales = this.getSales();
    const store = this.getStoreConfig();
    const receiptSeq = sales.length + 1;
    const receiptNumber = `BZ-${new Date().getFullYear()}-${String(receiptSeq).padStart(5, '0')}`;
    const id = `sale-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Hash chain linkage
    const lastSale = sales[0];
    const previousHash = lastSale ? lastSale.hashChain : 'GENESIS_BAZU_CHAIN_0000000000000000';
    const payload = `${previousHash}|${receiptNumber}|${sale.total}|${sale.paymentMethod}|${sale.timestamp}|${sale.cashierId}`;
    const hashChain = await calculateHash(payload);

    const completedSale: SaleRecord = {
      ...sale,
      id,
      receiptNumber,
      isSynced: true, // Mark local sync immediate
      hashChain,
    };

    // Update stock for each item
    for (const item of sale.items) {
      this.updateStock(item.productId, item.quantity);
    }

    // Prepend to sales
    const updatedSales = [completedSale, ...sales];
    localStorage.setItem(KEY_SALES, JSON.stringify(updatedSales));

    // Update active shift stats
    this.updateActiveShiftWithSale(completedSale);

    // Audit entry
    this.appendAuditLog(
      'SALE',
      sale.cashierName,
      'SALES_CASHIER',
      `Receipt ${receiptNumber} completed: KES ${sale.total.toLocaleString()} via ${sale.paymentMethod}`
    );

    return completedSale;
  }

  // Active Shift Management
  static getActiveShift(): ShiftSession {
    try {
      const data = localStorage.getItem(KEY_ACTIVE_SHIFT);
      if (data) return JSON.parse(data);
    } catch {
      // Fallback
    }

    const newShift: ShiftSession = {
      id: `shift-${Date.now()}`,
      storeId: 'bazu-cbd-001',
      cashierId: 'staff-cashier-01',
      cashierName: 'Mercy Wanjiku',
      openedAt: new Date().toISOString(),
      openingFloat: 5000,
      totalCashSales: 13500,
      totalMpesaSales: 34750,
      totalCardSales: 0,
      totalCreditSales: 0,
      expectedCashInDrawer: 18500, // 5000 float + 13500 cash
      status: 'OPEN',
    };
    localStorage.setItem(KEY_ACTIVE_SHIFT, JSON.stringify(newShift));
    return newShift;
  }

  static updateActiveShiftWithSale(sale: SaleRecord): void {
    const shift = this.getActiveShift();
    if (sale.paymentMethod === 'cash') {
      shift.totalCashSales += sale.total;
      shift.expectedCashInDrawer += sale.total;
    } else if (sale.paymentMethod === 'mpesa_till' || sale.paymentMethod === 'mpesa_paybill') {
      shift.totalMpesaSales += sale.total;
    } else if (sale.paymentMethod === 'split') {
      shift.totalCashSales += sale.splitCash || 0;
      shift.totalMpesaSales += sale.splitMpesa || 0;
      shift.expectedCashInDrawer += sale.splitCash || 0;
    } else if (sale.paymentMethod === 'card') {
      shift.totalCardSales += sale.total;
    } else if (sale.paymentMethod === 'debtor_tab') {
      shift.totalCreditSales += sale.total;
    }
    localStorage.setItem(KEY_ACTIVE_SHIFT, JSON.stringify(shift));
  }

  static switchCashier(staff: StaffMember, openingFloat: number = 5000): ShiftSession {
    const newShift: ShiftSession = {
      id: `shift-${Date.now()}`,
      storeId: this.getStoreConfig().storeId,
      cashierId: staff.id,
      cashierName: staff.name,
      openedAt: new Date().toISOString(),
      openingFloat,
      totalCashSales: 0,
      totalMpesaSales: 0,
      totalCardSales: 0,
      totalCreditSales: 0,
      expectedCashInDrawer: openingFloat,
      status: 'OPEN',
    };
    localStorage.setItem(KEY_ACTIVE_SHIFT, JSON.stringify(newShift));
    this.appendAuditLog(
      'SHIFT_OPEN',
      staff.name,
      staff.role,
      `Shift opened with float KES ${openingFloat.toLocaleString()}`
    );
    return newShift;
  }

  // Staff Management
  static getStaff(): StaffMember[] {
    try {
      const data = localStorage.getItem(KEY_STAFF);
      return data ? JSON.parse(data) : DEFAULT_STAFF;
    } catch {
      return DEFAULT_STAFF;
    }
  }

  static saveStaff(staffList: StaffMember[]): void {
    localStorage.setItem(KEY_STAFF, JSON.stringify(staffList));
  }

  static addStaffMember(member: Omit<StaffMember, 'id' | 'joinedDate'>): StaffMember {
    const staff = this.getStaff();
    const newMember: StaffMember = {
      ...member,
      id: `staff-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    staff.push(newMember);
    this.saveStaff(staff);
    this.appendAuditLog('CONFIG_UPDATE', 'Owner', 'ADMIN', `Added staff cashier ${newMember.name}`);
    return newMember;
  }

  // Debtors / Customer Credit Tabs
  static getDebtors(): DebtorTab[] {
    try {
      const data = localStorage.getItem(KEY_DEBTORS);
      if (data) return JSON.parse(data);
    } catch {
      // Fallback
    }

    const defaultDebtors: DebtorTab[] = [
      {
        id: 'deb-01',
        customerName: 'Mwaura Kariuki (Law Office)',
        customerPhone: '+254 722 123 456',
        creditLimit: 25000,
        balance: 6850,
        lastActivity: new Date(Date.now() - 86400000 * 2).toISOString(),
        notes: 'Monthly corporate settle via Paybill',
        history: [
          {
            id: 'h-1',
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
            type: 'CHARGE',
            amount: 6850,
            receiptNumber: 'BZ-2026-00041',
            notes: '2x Jameson 750ml + 6x Krest',
          },
        ],
      },
      {
        id: 'deb-02',
        customerName: 'Captain Otieno',
        customerPhone: '+254 733 555 777',
        creditLimit: 15000,
        balance: 3200,
        lastActivity: new Date(Date.now() - 86400000 * 5).toISOString(),
        notes: 'Regular customer',
        history: [
          {
            id: 'h-2',
            timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
            type: 'CHARGE',
            amount: 3200,
            receiptNumber: 'BZ-2026-00032',
            notes: '1x Black Label 750ml',
          },
        ],
      },
    ];
    localStorage.setItem(KEY_DEBTORS, JSON.stringify(defaultDebtors));
    return defaultDebtors;
  }

  static chargeDebtor(debtorId: string, amount: number, receiptNumber: string, notes: string): void {
    const debtors = this.getDebtors();
    const updated = debtors.map((d) => {
      if (d.id === debtorId) {
        return {
          ...d,
          balance: d.balance + amount,
          lastActivity: new Date().toISOString(),
          history: [
            {
              id: `dh-${Date.now()}`,
              timestamp: new Date().toISOString(),
              type: 'CHARGE' as const,
              amount,
              receiptNumber,
              notes,
            },
            ...d.history,
          ],
        };
      }
      return d;
    });
    localStorage.setItem(KEY_DEBTORS, JSON.stringify(updated));
  }

  static addDebtorTab(debtor: { customerName: string; customerPhone: string; creditLimit: number; notes?: string }): DebtorTab {
    const debtors = this.getDebtors();
    const newDebtor: DebtorTab = {
      id: `deb-${Date.now()}`,
      customerName: debtor.customerName,
      customerPhone: debtor.customerPhone,
      creditLimit: debtor.creditLimit,
      balance: 0,
      lastActivity: new Date().toISOString(),
      notes: debtor.notes || 'Created via Web POS Terminal',
      history: [],
    };
    const updated = [newDebtor, ...debtors];
    localStorage.setItem(KEY_DEBTORS, JSON.stringify(updated));
    this.appendAuditLog('CONFIG_UPDATE', 'Cashier', 'SALES_CASHIER', `Created customer credit tab for ${debtor.customerName}`);
    return newDebtor;
  }

  // Audit Logs (Tamper Evident)
  static getAuditLogs(): AuditLogEntry[] {
    try {
      const data = localStorage.getItem(KEY_AUDIT_LOG);
      if (data) return JSON.parse(data);
    } catch {
      //
    }
    const initialLog: AuditLogEntry = {
      id: 'log-001',
      timestamp: new Date().toISOString(),
      event: 'STORE_SYNC',
      actorName: 'Titus Njehia',
      actorRole: 'ADMIN',
      summary: 'Store initialized with universal retail, groceries, tech, health, and hardware inventory',
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    };
    localStorage.setItem(KEY_AUDIT_LOG, JSON.stringify([initialLog]));
    return [initialLog];
  }

  static async appendAuditLog(
    event: AuditLogEntry['event'],
    actorName: string,
    actorRole: string,
    summary: string
  ): Promise<void> {
    const logs = this.getAuditLogs();
    const lastLog = logs[0];
    const previousHash = lastLog ? lastLog.hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();
    const raw = `${previousHash}|${timestamp}|${event}|${actorName}|${summary}`;
    const hash = await calculateHash(raw);

    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp,
      event,
      actorName,
      actorRole,
      summary,
      previousHash,
      hash,
    };

    localStorage.setItem(KEY_AUDIT_LOG, JSON.stringify([newEntry, ...logs.slice(0, 99)]));
  }

  // Export Sales to KRA-Compliant CSV
  static exportSalesToCSV(): void {
    const sales = this.getSales();
    const headers = [
      'Receipt Number',
      'Timestamp',
      'Cashier',
      'Payment Method',
      'Item Count',
      'Items Detail',
      'Subtotal (KES)',
      'VAT 16% (KES)',
      'Total Paid (KES)',
      'M-Pesa Reference',
      'Hash Chain SHA256',
    ];

    const rows = sales.map((s) => [
      `"${s.receiptNumber}"`,
      `"${s.timestamp}"`,
      `"${s.cashierName}"`,
      `"${s.paymentMethod.toUpperCase()}"`,
      s.items.reduce((acc, i) => acc + i.quantity, 0),
      `"${s.items.map((i) => `${i.quantity}x ${i.productName}`).join('; ')}"`,
      s.subtotal.toFixed(2),
      s.taxAmount.toFixed(2),
      s.total.toFixed(2),
      `"${s.mpesaReference || 'N/A'}"`,
      `"${s.hashChain}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BazuPOS_Sales_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Generate Sample Sales for demonstration
  static generateSampleSales(): SaleRecord[] {
    const store = DEFAULT_STORE_CONFIG;
    const now = Date.now();
    return [
      {
        id: 'sale-init-01',
        receiptNumber: 'BZ-2026-00048',
        timestamp: new Date(now - 12 * 60 * 1000).toISOString(),
        storeId: store.storeId,
        cashierId: 'staff-cashier-01',
        cashierName: 'Mercy Wanjiku',
        items: [
          {
            productId: 'groc-03',
            productName: 'Daawat Traditional Basmati Rice 2kg',
            unitPrice: 495,
            quantity: 2,
            discountPercent: 0,
            subtotal: 990,
          },
          {
            productId: 'groc-02',
            productName: 'Rina Pure Vegetable Cooking Oil 1L',
            unitPrice: 290,
            quantity: 2,
            discountPercent: 0,
            subtotal: 580,
          },
          {
            productId: 'bev-01',
            productName: 'Coca-Cola Original 500ml PET',
            unitPrice: 80,
            quantity: 2,
            discountPercent: 0,
            subtotal: 160,
          },
        ],
        subtotal: 1491.38,
        taxAmount: 238.62,
        total: 1730,
        paymentMethod: 'mpesa_till',
        mpesaReference: 'SHG8294LK2',
        isSynced: true,
        hashChain: '9c5a1a9e8b7c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e',
      },
      {
        id: 'sale-init-02',
        receiptNumber: 'BZ-2026-00047',
        timestamp: new Date(now - 45 * 60 * 1000).toISOString(),
        storeId: store.storeId,
        cashierId: 'staff-cashier-01',
        cashierName: 'Mercy Wanjiku',
        items: [
          {
            productId: 'elec-01',
            productName: 'Oraimo Type-C Fast Charging Cable 1M',
            unitPrice: 450,
            quantity: 1,
            discountPercent: 0,
            subtotal: 450,
          },
          {
            productId: 'hlth-01',
            productName: 'Colgate Total 12 Active Fresh Toothpaste 100ml',
            unitPrice: 210,
            quantity: 2,
            discountPercent: 0,
            subtotal: 420,
          },
        ],
        subtotal: 750.0,
        taxAmount: 120.0,
        total: 870,
        paymentMethod: 'cash',
        cashTendered: 1000,
        changeDue: 130,
        isSynced: true,
        hashChain: '8b4a0a8e7b6c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e',
      },
      {
        id: 'sale-init-03',
        receiptNumber: 'BZ-2026-00046',
        timestamp: new Date(now - 90 * 60 * 1000).toISOString(),
        storeId: store.storeId,
        cashierId: 'staff-cashier-02',
        cashierName: 'Kevin Otieno',
        items: [
          {
            productId: 'hard-01',
            productName: 'Tri-Circle Solid Brass Heavy Duty Padlock 50mm',
            unitPrice: 650,
            quantity: 2,
            discountPercent: 0,
            subtotal: 1300,
          },
          {
            productId: 'hard-02',
            productName: 'Philips LED Daylight Eco-Bulb 12W Pin B22',
            unitPrice: 250,
            quantity: 4,
            discountPercent: 0,
            subtotal: 1000,
          },
        ],
        subtotal: 1982.76,
        taxAmount: 317.24,
        total: 2300,
        paymentMethod: 'mpesa_till',
        mpesaReference: 'SHG71839QP4',
        isSynced: true,
        hashChain: '7a3a9a7e6b5c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e',
      },
      {
        id: 'sale-init-04',
        receiptNumber: 'BZ-2026-00045',
        timestamp: new Date(now - 160 * 60 * 1000).toISOString(),
        storeId: store.storeId,
        cashierId: 'staff-cashier-02',
        cashierName: 'Kevin Otieno',
        items: [
          {
            productId: 'elec-02',
            productName: 'Oraimo 20,000mAh Dual Output Power Bank',
            unitPrice: 2600,
            quantity: 1,
            discountPercent: 0,
            subtotal: 2600,
          },
        ],
        subtotal: 2241.38,
        taxAmount: 358.62,
        total: 2600,
        paymentMethod: 'mpesa_paybill',
        mpesaReference: 'SHG61928ZZ9',
        isSynced: true,
        hashChain: '6a2a8a6e5b4c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e',
      },
    ];
  }
}
