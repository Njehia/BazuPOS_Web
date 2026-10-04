export type ProductCategory =
  | 'Groceries & Pantry'
  | 'Beverages & Drinks'
  | 'Electronics & Tech'
  | 'Health & Personal Care'
  | 'Hardware & Home'
  | 'General Merchandise';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in KES
  costPrice: number; // in KES
  stock: number;
  reorderLevel: number;
  barcode: string;
  isQuickKey?: boolean;
  unit: string; // e.g. "500ml", "750ml", "Pack", "Can"
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discountPercent: number; // 0 - 100
}

export type PaymentMethod =
  | 'mpesa_till'
  | 'mpesa_paybill'
  | 'cash'
  | 'card'
  | 'split'
  | 'debtor_tab';

export interface SaleRecord {
  id: string;
  receiptNumber: string;
  timestamp: string; // ISO
  storeId: string;
  cashierId: string;
  cashierName: string;
  items: {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    discountPercent: number;
    subtotal: number;
  }[];
  subtotal: number;
  taxAmount: number;
  total: number;
  paymentMethod: PaymentMethod;
  mpesaReference?: string;
  cashTendered?: number;
  changeDue?: number;
  splitCash?: number;
  splitMpesa?: number;
  customerName?: string;
  customerPhone?: string;
  isSynced: boolean;
  hashChain: string; // SHA-256 tamper-evident chaining
}

export interface ShiftSession {
  id: string;
  storeId: string;
  cashierId: string;
  cashierName: string;
  openedAt: string;
  closedAt?: string;
  openingFloat: number;
  totalCashSales: number;
  totalMpesaSales: number;
  totalCardSales: number;
  totalCreditSales: number;
  expectedCashInDrawer: number;
  actualCashCounted?: number;
  cashDiscrepancy?: number;
  status: 'OPEN' | 'CLOSED';
}

export interface DebtorTab {
  id: string;
  customerName: string;
  customerPhone: string;
  creditLimit: number;
  balance: number; // Outstanding amount
  lastActivity: string;
  notes?: string;
  history: {
    id: string;
    timestamp: string;
    type: 'CHARGE' | 'PAYMENT';
    amount: number;
    receiptNumber?: string;
    notes?: string;
  }[];
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  pin: string; // 4-digit numeric PIN
  role: 'ADMIN' | 'SALES_CASHIER';
  status: 'ACTIVE' | 'SUSPENDED';
  joinedDate: string;
}

export interface StoreConfig {
  storeId: string;
  storeName: string;
  branchName: string;
  tillNumber: string;
  paybillNumber: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  kraPin: string;
  receiptHeader: string;
  receiptFooter: string;
  printerWidth: '80mm' | '58mm';
  autoCut: boolean;
  cashDrawerKick: boolean;
  ultraBoldPrint: boolean;
  vatRate: number; // default 16% in Kenya
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  event: 'SALE' | 'STOCK_ADJUSTMENT' | 'SHIFT_OPEN' | 'SHIFT_CLOSE' | 'CATALOG_PURGE' | 'CONFIG_UPDATE' | 'SYNC_RUN' | 'STORE_SYNC';
  actorName: string;
  actorRole: string;
  summary: string;
  previousHash: string;
  hash: string;
}

export interface LocalMachineTerminal {
  terminalId: string;
  machineName: string;
  deviceFingerprint: string;
  workstationRole: 'PRIMARY_CHECKOUT' | 'EXPRESS_REGISTER' | 'BACKOFFICE';
  linkedStoreId: string;
  linkedStoreName: string;
  linkedBranchName: string;
  localIp: string;
  databaseStatus: 'LOCAL_PERSISTENT_SYNCED' | 'STANDALONE_OFFLINE';
  hardwareAttached: {
    printer: string;
    scanner: string;
    drawer: string;
  };
  lastPairedTime: string;
}
