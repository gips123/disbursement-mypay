import { MerchantStatus, BusinessType, Country } from './merchant.model';

// Merchant Status Constants
export const MERCHANT_STATUS = {
  ACTIVE: {
    value: MerchantStatus.ACTIVE,
    label: 'Active',
    color: 'success' as const,
    description: 'Merchant is active and can process transactions',
  },
  PENDING: {
    value: MerchantStatus.PENDING,
    label: 'Pending',
    color: 'warning' as const,
    description: 'Merchant registration is pending approval',
  },
  SUSPENDED: {
    value: MerchantStatus.SUSPENDED,
    label: 'Suspended',
    color: 'destructive' as const,
    description: 'Merchant is suspended and cannot process transactions',
  },
  REJECTED: {
    value: MerchantStatus.REJECTED,
    label: 'Rejected',
    color: 'destructive' as const,
    description: 'Merchant registration has been rejected',
  },
  INACTIVE: {
    value: MerchantStatus.INACTIVE,
    label: 'Inactive',
    color: null,
    description: 'Merchant is inactive but can be reactivated',
  },
} as const;

// Business Types Constants
export const BUSINESS_TYPES = {
  [BusinessType.ECOMMERCE]: {
    value: BusinessType.ECOMMERCE,
    label: 'E-commerce',
    description: 'Online retail and e-commerce platforms',
    icon: '🛒',
  },
  [BusinessType.FASHION_RETAIL]: {
    value: BusinessType.FASHION_RETAIL,
    label: 'Fashion Retail',
    description: 'Fashion and clothing retail',
    icon: '👗',
  },
  [BusinessType.FOOD_BEVERAGE]: {
    value: BusinessType.FOOD_BEVERAGE,
    label: 'Food & Beverage',
    description: 'Restaurants, food delivery, and beverage services',
    icon: '🍔',
  },
  [BusinessType.ELECTRONICS]: {
    value: BusinessType.ELECTRONICS,
    label: 'Electronics',
    description: 'Electronics and technology products',
    icon: '💻',
  },
  [BusinessType.SOFTWARE_SERVICES]: {
    value: BusinessType.SOFTWARE_SERVICES,
    label: 'Software Services',
    description: 'Software development and digital services',
    icon: '💼',
  },
  [BusinessType.MOBILE_ACCESSORIES]: {
    value: BusinessType.MOBILE_ACCESSORIES,
    label: 'Mobile & Accessories',
    description: 'Mobile devices and accessories',
    icon: '📱',
  },
  [BusinessType.BOOKS_EDUCATION]: {
    value: BusinessType.BOOKS_EDUCATION,
    label: 'Books & Education',
    description: 'Educational materials and books',
    icon: '📚',
  },
  [BusinessType.HEALTHCARE]: {
    value: BusinessType.HEALTHCARE,
    label: 'Healthcare',
    description: 'Healthcare and medical services',
    icon: '⚕️',
  },
  [BusinessType.AUTOMOTIVE]: {
    value: BusinessType.AUTOMOTIVE,
    label: 'Automotive',
    description: 'Automotive products and services',
    icon: '🚗',
  },
  [BusinessType.OTHER]: {
    value: BusinessType.OTHER,
    label: 'Other',
    description: 'Other business types',
    icon: '🏢',
  },
} as const;

// Countries Constants
export const COUNTRIES = {
  [Country.INDONESIA]: {
    value: Country.INDONESIA,
    label: 'Indonesia',
    code: 'ID',
    flag: 'indonesia.svg',
    currency: 'IDR',
    timezone: 'Asia/Jakarta',
  },
  [Country.MALAYSIA]: {
    value: Country.MALAYSIA,
    label: 'Malaysia',
    code: 'MY',
    flag: 'malaysia.svg',
    currency: 'MYR',
    timezone: 'Asia/Kuala_Lumpur',
  },
  [Country.SINGAPORE]: {
    value: Country.SINGAPORE,
    label: 'Singapore',
    code: 'SG',
    flag: 'singapore.svg',
    currency: 'SGD',
    timezone: 'Asia/Singapore',
  },
  [Country.THAILAND]: {
    value: Country.THAILAND,
    label: 'Thailand',
    code: 'TH',
    flag: 'thailand.svg',
    currency: 'THB',
    timezone: 'Asia/Bangkok',
  },
  [Country.PHILIPPINES]: {
    value: Country.PHILIPPINES,
    label: 'Philippines',
    code: 'PH',
    flag: 'philippines.svg',
    currency: 'PHP',
    timezone: 'Asia/Manila',
  },
  [Country.VIETNAM]: {
    value: Country.VIETNAM,
    label: 'Vietnam',
    code: 'VN',
    flag: 'vietnam.svg',
    currency: 'VND',
    timezone: 'Asia/Ho_Chi_Minh',
  },
  [Country.CAMBODIA]: {
    value: Country.CAMBODIA,
    label: 'Cambodia',
    code: 'KH',
    flag: 'cambodia.svg',
    currency: 'KHR',
    timezone: 'Asia/Phnom_Penh',
  },
  [Country.MYANMAR]: {
    value: Country.MYANMAR,
    label: 'Myanmar',
    code: 'MM',
    flag: 'myanmar.svg',
    currency: 'MMK',
    timezone: 'Asia/Yangon',
  },
} as const;

// Risk Levels
export const RISK_LEVELS = {
  LOW: {
    value: 'low' as const,
    label: 'Low Risk',
    color: 'success' as const,
    description: 'Low risk merchant with good payment history',
  },
  MEDIUM: {
    value: 'medium' as const,
    label: 'Medium Risk',
    color: 'warning' as const,
    description: 'Medium risk merchant requiring standard monitoring',
  },
  HIGH: {
    value: 'high' as const,
    label: 'High Risk',
    color: 'destructive' as const,
    description: 'High risk merchant requiring close monitoring',
  },
} as const;

// KYC Status Constants
export const KYC_STATUS = {
  PENDING: {
    value: 'pending' as const,
    label: 'Pending Verification',
    color: 'warning' as const,
    description: 'Documents are being reviewed',
  },
  VERIFIED: {
    value: 'verified' as const,
    label: 'Verified',
    color: 'success' as const,
    description: 'KYC verification completed successfully',
  },
  REJECTED: {
    value: 'rejected' as const,
    label: 'Rejected',
    color: 'destructive' as const,
    description: 'KYC verification rejected',
  },
} as const;

// Settlement Periods
export const SETTLEMENT_PERIODS = {
  DAILY: {
    value: 'daily' as const,
    label: 'Daily',
    description: 'Settlements processed daily',
  },
  WEEKLY: {
    value: 'weekly' as const,
    label: 'Weekly',
    description: 'Settlements processed weekly',
  },
  MONTHLY: {
    value: 'monthly' as const,
    label: 'Monthly',
    description: 'Settlements processed monthly',
  },
} as const;

// Supported Currencies
export const SUPPORTED_CURRENCIES = [
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
] as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'Credit Card',
  DEBIT_CARD: 'Debit Card',
  BANK_TRANSFER: 'Bank Transfer',
  DIGITAL_WALLET: 'Digital Wallet',
  QR_CODE: 'QR Code Payment',
  CRYPTO: 'Cryptocurrency',
  CASH_ON_DELIVERY: 'Cash on Delivery',
} as const;

// Default Values
export const DEFAULT_VALUES = {
  PAGINATION: {
    PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  },
  FILTERS: {
    DATE_RANGE_DAYS: 30,
  },
  MERCHANT: {
    CURRENCY: 'USD',
    SETTLEMENT_PERIOD: SETTLEMENT_PERIODS.WEEKLY.value,
    RISK_LEVEL: RISK_LEVELS.MEDIUM.value,
    AUTO_APPROVE_LIMIT: 1000,
    PROCESSING_FEE: 2.9,
    SETTLEMENT_FEE: 0,
    CHARGEBACK_FEE: 15,
  },
} as const;

// Action Types for Activity Log
export const ACTIVITY_ACTIONS = {
  CREATED: 'Merchant Created',
  UPDATED: 'Merchant Updated',
  ACTIVATED: 'Merchant Activated',
  SUSPENDED: 'Merchant Suspended',
  REACTIVATED: 'Merchant Reactivated',
  DELETED: 'Merchant Deleted',
  KYC_SUBMITTED: 'KYC Documents Submitted',
  KYC_VERIFIED: 'KYC Verification Completed',
  KYC_REJECTED: 'KYC Verification Rejected',
  SETTINGS_UPDATED: 'Settings Updated',
  STATUS_CHANGED: 'Status Changed',
  LOGIN: 'Merchant Login',
  PASSWORD_CHANGED: 'Password Changed',
} as const;

// Review Types and Priorities
export const REVIEW_TYPES = {
  CREATION: {
    value: 'creation' as const,
    label: 'New Merchant Registration',
    description: 'Review new merchant registration',
  },
  MODIFICATION: {
    value: 'modification' as const,
    label: 'Merchant Information Update',
    description: 'Review merchant information changes',
  },
  REACTIVATION: {
    value: 'reactivation' as const,
    label: 'Reactivation Request',
    description: 'Review merchant reactivation request',
  },
  SUSPENSION: {
    value: 'suspension' as const,
    label: 'Suspension Request',
    description: 'Review merchant suspension request',
  },
} as const;

export const REVIEW_PRIORITIES = {
  LOW: {
    value: 'low' as const,
    label: 'Low',
    color: 'secondary' as const,
  },
  MEDIUM: {
    value: 'medium' as const,
    label: 'Medium',
    color: 'primary' as const,
  },
  HIGH: {
    value: 'high' as const,
    label: 'High',
    color: 'warning' as const,
  },
  URGENT: {
    value: 'urgent' as const,
    label: 'Urgent',
    color: 'destructive' as const,
  },
} as const;

// Export arrays for dropdown/select options
export const STATUS_OPTIONS = Object.values(MERCHANT_STATUS);
export const BUSINESS_TYPE_OPTIONS = Object.values(BUSINESS_TYPES);
export const COUNTRY_OPTIONS = Object.values(COUNTRIES);
export const RISK_LEVEL_OPTIONS = Object.values(RISK_LEVELS);
export const KYC_STATUS_OPTIONS = Object.values(KYC_STATUS);
export const SETTLEMENT_PERIOD_OPTIONS = Object.values(SETTLEMENT_PERIODS);
export const REVIEW_TYPE_OPTIONS = Object.values(REVIEW_TYPES);
export const REVIEW_PRIORITY_OPTIONS = Object.values(REVIEW_PRIORITIES);
