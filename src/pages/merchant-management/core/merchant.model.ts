// Merchant Status Enum
export enum MerchantStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
  INACTIVE = 'inactive',
}

// Business Type Enum
export enum BusinessType {
  ECOMMERCE = 'e-commerce',
  FASHION_RETAIL = 'fashion-retail',
  FOOD_BEVERAGE = 'food-beverage',
  ELECTRONICS = 'electronics',
  SOFTWARE_SERVICES = 'software-services',
  MOBILE_ACCESSORIES = 'mobile-accessories',
  BOOKS_EDUCATION = 'books-education',
  HEALTHCARE = 'healthcare',
  AUTOMOTIVE = 'automotive',
  OTHER = 'other',
}

// Country Enum
export enum Country {
  INDONESIA = 'Indonesia',
  MALAYSIA = 'Malaysia',
  SINGAPORE = 'Singapore',
  THAILAND = 'Thailand',
  PHILIPPINES = 'Philippines',
  VIETNAM = 'Vietnam',
  CAMBODIA = 'Cambodia',
  MYANMAR = 'Myanmar',
}

// Merchant Contact Information
export interface MerchantContact {
  email: string;
  phone: string;
  website?: string;
  address?: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: Country;
  };
}

// Merchant Location
export interface MerchantLocation {
  city: string;
  country: Country;
  flag: string;
  timezone?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Merchant Business Information
export interface MerchantBusiness {
  name: string;
  businessType: BusinessType;
  description?: string;
  logo?: string;
  registrationNumber?: string;
  taxId?: string;
  establishedDate?: string;
}

// Merchant Financial Information
export interface MerchantFinancial {
  monthlyVolume: number;
  yearlyVolume?: number;
  avgTransactionValue?: number;
  totalTransactions?: number;
  currency: string;
  paymentMethods?: string[];
}

// Merchant Compliance & KYC
export interface MerchantCompliance {
  kycStatus: 'pending' | 'verified' | 'rejected';
  documents: {
    businessLicense?: string;
    taxCertificate?: string;
    bankStatement?: string;
    identityDocument?: string;
  };
  verifiedDate?: string;
  verifiedBy?: string;
  complianceNotes?: string;
}

// Merchant Settings & Configuration
export interface MerchantSettings {
  isActive: boolean;
  allowedCurrencies: string[];
  settlementPeriod: 'daily' | 'weekly' | 'monthly';
  feeStructure?: {
    processingFee: number;
    settlementFee: number;
    chargebackFee: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  autoApproveLimit?: number;
}

// Activity Log
export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  details?: string;
  ipAddress?: string;
}

// Main Merchant Interface
export interface Merchant {
  id: string;
  business: MerchantBusiness;
  contact: MerchantContact;
  location: MerchantLocation;
  financial: MerchantFinancial;
  compliance: MerchantCompliance;
  settings: MerchantSettings;
  status: {
    label: string;
    value: MerchantStatus;
    color: 'primary' | 'success' | 'destructive' | 'warning' | null;
  };
  dates: {
    registrationDate: string;
    lastActivity: string;
    lastLoginDate?: string;
    statusUpdatedDate?: string;
  };
  activityLog: ActivityLog[];
  metadata?: {
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}

// Create Merchant Request
export interface CreateMerchantRequest {
  business: Omit<MerchantBusiness, 'logo'>;
  contact: MerchantContact;
  location: Omit<MerchantLocation, 'flag'>;
  financial: Pick<MerchantFinancial, 'currency' | 'monthlyVolume'>;
  settings?: Partial<MerchantSettings>;
}

// Update Merchant Request
export interface UpdateMerchantRequest extends Partial<CreateMerchantRequest> {
  id: string;
}

// Status for production and sandbox environments
export interface StatusBadge {
  label: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  color: 'success' | 'destructive' | 'warning';
}

// Simplified merchant interface for list views and tables
export interface MerchantListItem {
  id: string;
  companyName: string;
  brandName: string;
  clientId: string;
  merchantLevel: string;
  subMerchants: number;
  activePaymentChannels: number;
  productionStatus: StatusBadge;
  sandboxStatus: StatusBadge;
  registeredDate: string;
  updatedDate: string;
  // Legacy fields for backward compatibility
  merchant?: {
    logo?: string;
    name: string;
    businessType: string;
  };
  contact?: {
    email: string;
    phone: string;
    website?: string;
  };
  location?: {
    city: string;
    country: string;
    flag: string;
  };
  status?: {
    label: string;
    color: 'success' | 'destructive' | 'warning';
  };
  registrationDate?: string;
  lastActivity?: string;
  monthlyVolume?: number;
}

// Merchant Statistics
export interface MerchantStats {
  totalMerchants: number;
  activeMerchants: number;
  pendingMerchants: number;
  suspendedMerchants: number;
  monthlyGrowth: number;
  totalVolume: number;
  avgVolumePerMerchant: number;
}

// Merchant Filter Options
export interface MerchantFilters {
  status?: MerchantStatus[];
  businessType?: BusinessType[];
  country?: Country[];
  volumeRange?: {
    min?: number;
    max?: number;
  };
  dateRange?: {
    from?: string;
    to?: string;
  };
  search?: string;
}

// Merchant Review (for Approver role)
export interface MerchantReview {
  id: string;
  merchantId: string;
  merchant: MerchantListItem;
  reviewType: 'creation' | 'modification' | 'reactivation' | 'suspension';
  type: 'creation' | 'modification' | 'reactivation' | 'suspension'; // Alias for reviewType
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  requestDate: string;
  submittedAt: string; // Alias for requestDate
  submittedBy: string; // Alias for requestedBy
  reviewedBy?: string;
  reviewedDate?: string;
  comments?: string;
  reason?: string; // Reason for the review request
  description?: string; // Detailed description
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
    type: string;
    reason?: string;
  }[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  history: Array<{
    id: string;
    action: string;
    timestamp: string;
    performedBy: string;
    details: string;
  }>;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MerchantListResponse extends ApiResponse<MerchantListItem[]> {
  stats?: MerchantStats;
}

// Sort Options
export interface MerchantSortOptions {
  field: keyof MerchantListItem | 'name' | 'registrationDate' | 'monthlyVolume' | 'lastActivity';
  direction: 'asc' | 'desc';
}
