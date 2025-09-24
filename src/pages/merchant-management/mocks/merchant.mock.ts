import { 
  MerchantListItem, 
  Merchant, 
  MerchantReview,
  MerchantStatus,
  BusinessType,
  Country,
} from '../core/merchant.model';

// Mock data for merchant list
export const mockMerchantListData: MerchantListItem[] = [
  {
    id: '1',
    companyName: 'PT Digital Jaya Abadi',
    brandName: 'DigiStore',
    clientId: 'UP202509190000001',
    merchantLevel: 'Level 9',
    subMerchants: 2,
    activePaymentChannels: 5,
    productionStatus: {
      label: 'Active',
      color: 'success',
    },
    sandboxStatus: {
      label: 'Inactive',
      color: 'destructive',
    },
    registeredDate: '2025-12-16T23:32:00.000Z',
    updatedDate: '2025-12-31T23:32:00.000Z',
    // Legacy fields for backward compatibility
    merchant: {
      logo: 'brand-logos/shopify.svg',
      name: 'PT Digital Jaya Abadi',
      businessType: 'E-commerce',
    },
    contact: {
      email: 'admin@digistore.id',
      phone: '+62-21-1234567',
      website: 'digistore.id',
    },
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      flag: 'indonesia.svg',
    },
    status: {
      label: 'Active',
      color: 'success',
    },
    registrationDate: '2025-12-16',
    lastActivity: 'Today, 23:32',
    monthlyVolume: 150000000,
  },
  {
    id: '2',
    companyName: 'Food Delivery Singapore Pte Ltd',
    brandName: 'FoodExpress',
    clientId: 'UP202509190000002',
    merchantLevel: 'Level 7',
    subMerchants: 1,
    activePaymentChannels: 3,
    productionStatus: {
      label: 'Pending',
      color: 'warning',
    },
    sandboxStatus: {
      label: 'Active',
      color: 'success',
    },
    registeredDate: '2025-03-10T12:00:00.000Z',
    updatedDate: '2025-03-15T10:00:00.000Z',
    // Legacy fields for backward compatibility
    merchant: {
      logo: 'brand-logos/paypal.svg',
      name: 'Food Delivery SG',
      businessType: 'Food & Beverage',
    },
    contact: {
      email: 'support@fooddelivery.sg',
      phone: '+65-6789-0123',
      website: 'fooddelivery.sg',
    },
    location: {
      city: 'Singapore',
      country: 'Singapore',
      flag: 'singapore.svg',
    },
    status: {
      label: 'Pending',
      color: 'warning',
    },
    registrationDate: '2025-03-10',
    lastActivity: 'Week ago',
    monthlyVolume: 45000000,
  },
  {
    id: '3',
    companyName: 'Electronics Mart Thailand Co Ltd',
    brandName: 'TechMart',
    clientId: 'UP202509190000003',
    merchantLevel: 'Level 5',
    subMerchants: 0,
    activePaymentChannels: 2,
    productionStatus: {
      label: 'Suspended',
      color: 'destructive',
    },
    sandboxStatus: {
      label: 'Active',
      color: 'success',
    },
    registeredDate: '2023-12-05T08:00:00.000Z',
    updatedDate: '2024-12-01T14:00:00.000Z',
    // Legacy fields for backward compatibility
    merchant: {
      logo: 'brand-logos/visa.svg',
      name: 'Electronics Mart',
      businessType: 'Electronics',
    },
    contact: {
      email: 'contact@electronicsmart.com',
      phone: '+66-2-555-0199',
      website: 'electronicsmart.com',
    },
    location: {
      city: 'Bangkok',
      country: 'Thailand',
      flag: 'thailand.svg',
    },
    status: {
      label: 'Suspended',
      color: 'destructive',
    },
    registrationDate: '2023-12-05',
    lastActivity: 'Month ago',
    monthlyVolume: 25000000,
  },
  {
    id: '4',
    companyName: 'Digital Solutions Philippines Inc',
    brandName: 'DigiSolutions',
    clientId: 'UP202509190000004',
    merchantLevel: 'Level 8',
    subMerchants: 3,
    activePaymentChannels: 6,
    productionStatus: {
      label: 'Active',
      color: 'success',
    },
    sandboxStatus: {
      label: 'Active',
      color: 'success',
    },
    registeredDate: '2025-01-28T09:30:00.000Z',
    updatedDate: '2025-01-30T16:45:00.000Z',
    // Legacy fields for backward compatibility
    merchant: {
      logo: 'brand-logos/mastercard.svg',
      name: 'Digital Solutions PH',
      businessType: 'Software Services',
    },
    contact: {
      email: 'hello@digitalsolutions.ph',
      phone: '+63-2-987-6543',
      website: 'digitalsolutions.ph',
    },
    location: {
      city: 'Manila',
      country: 'Philippines',
      flag: 'philippines.svg',
    },
    status: {
      label: 'Active',
      color: 'success',
    },
    registrationDate: '2025-01-28',
    lastActivity: 'Today, 09:15',
    monthlyVolume: 75000000,
  },
  {
    id: '5',
    companyName: 'Mobile Accessories Vietnam Ltd',
    brandName: 'MobileHub',
    clientId: 'UP202509190000005',
    merchantLevel: 'Level 6',
    subMerchants: 1,
    activePaymentChannels: 4,
    productionStatus: {
      label: 'Active',
      color: 'success',
    },
    sandboxStatus: {
      label: 'Inactive',
      color: 'destructive',
    },
    registeredDate: '2025-02-14T11:00:00.000Z',
    updatedDate: '2025-02-20T13:20:00.000Z',
    // Legacy fields for backward compatibility
    merchant: {
      logo: 'brand-logos/amazon.svg',
      name: 'Mobile Accessories VN',
      businessType: 'Mobile Accessories',
    },
    contact: {
      email: 'info@mobileaccessories.vn',
      phone: '+84-28-333-4444',
      website: 'mobileaccessories.vn',
    },
    location: {
      city: 'Ho Chi Minh',
      country: 'Vietnam',
      flag: 'vietnam.svg',
    },
    status: {
      label: 'Active',
      color: 'success',
    },
    registrationDate: '2025-02-14',
    lastActivity: 'Yesterday, 11:20',
    monthlyVolume: 32000000,
  },
  {
    id: '6',
    companyName: 'BookStore Cambodia Co Ltd',
    brandName: 'BookWorld',
    clientId: 'UP202509190000006',
    merchantLevel: 'Level 4',
    subMerchants: 0,
    activePaymentChannels: 2,
    productionStatus: {
      label: 'Pending',
      color: 'warning',
    },
    sandboxStatus: {
      label: 'Active',
      color: 'success',
    },
    registeredDate: '2025-03-22T07:15:00.000Z',
    updatedDate: '2025-03-25T18:30:00.000Z',
    // Legacy fields for backward compatibility
    merchant: {
      logo: 'brand-logos/google.svg',
      name: 'BookStore Cambodia',
      businessType: 'Books & Education',
    },
    contact: {
      email: 'contact@bookstore.kh',
      phone: '+855-23-777-888',
      website: 'bookstore.kh',
    },
    location: {
      city: 'Phnom Penh',
      country: 'Cambodia',
      flag: 'cambodia.svg',
    },
    status: {
      label: 'Pending',
      color: 'warning',
    },
    registrationDate: '2025-03-22',
    lastActivity: '3 days ago',
    monthlyVolume: 18000000,
  },
  {
    id: '7',
    companyName: 'Health Plus Myanmar Ltd',
    brandName: 'HealthCare+',
    clientId: 'UP202509190000007',
    merchantLevel: 'Level 3',
    subMerchants: 0,
    activePaymentChannels: 1,
    productionStatus: {
      label: 'Suspended',
      color: 'destructive',
    },
    sandboxStatus: {
      label: 'Inactive',
      color: 'destructive',
    },
    registeredDate: '2023-11-20T14:45:00.000Z',
    updatedDate: '2024-01-10T09:00:00.000Z',
    // Legacy fields for backward compatibility
    merchant: {
      logo: 'brand-logos/microsoft.svg',
      name: 'Health Plus Myanmar',
      businessType: 'Healthcare',
    },
    contact: {
      email: 'contact@healthplus.mm',
      phone: '+95-1-234-5678',
    },
    location: {
      city: 'Yangon',
      country: 'Myanmar',
      flag: 'myanmar.svg',
    },
    status: {
      label: 'Suspended',
      color: 'destructive',
    },
    registrationDate: '2023-11-20',
    lastActivity: '2 weeks ago',
    monthlyVolume: 15000000,
  },
];

// Mock review data for approvers
export const mockReviewData: MerchantReview[] = [
  {
    id: 'review-1',
    merchantId: '2',
    merchant: mockMerchantListData.find(m => m.id === '2')!,
    reviewType: 'creation',
    type: 'creation',
    status: 'pending',
    requestedBy: 'System',
    submittedBy: 'System',
    requestDate: '2025-03-10',
    submittedAt: '2025-03-10',
    priority: 'medium',
    comments: 'New merchant registration requires approval',
    reason: 'New merchant registration requires approval',
    description: 'Food Delivery Singapore has applied for merchant registration. All required documents have been submitted and require verification.',
    changes: [
      {
        field: 'status',
        oldValue: null,
        newValue: 'pending',
        type: 'creation',
        reason: 'New merchant registration',
      },
    ],
    history: [
      {
        id: 'hist-1',
        action: 'Review Request Submitted',
        timestamp: '2025-03-10T10:00:00Z',
        performedBy: 'System',
        details: 'Merchant registration submitted for review',
      },
    ],
  },
  {
    id: 'review-2',
    merchantId: '6',
    merchant: mockMerchantListData.find(m => m.id === '6')!,
    reviewType: 'creation',
    type: 'creation',
    status: 'pending',
    requestedBy: 'System',
    submittedBy: 'System',
    requestDate: '2025-03-22',
    submittedAt: '2025-03-22',
    priority: 'low',
    comments: 'Education sector merchant requires verification',
    reason: 'Education sector merchant requires verification',
    description: 'BookStore Cambodia has applied for merchant registration. Standard verification process required.',
    changes: [
      {
        field: 'status',
        oldValue: null,
        newValue: 'pending',
        type: 'creation',
        reason: 'New merchant registration',
      },
    ],
    history: [
      {
        id: 'hist-2',
        action: 'Review Request Submitted',
        timestamp: '2025-03-22T07:15:00Z',
        performedBy: 'System',
        details: 'Education merchant registration submitted for review',
      },
    ],
  },
  {
    id: 'review-3',
    merchantId: '3',
    merchant: mockMerchantListData.find(m => m.id === '3')!,
    reviewType: 'reactivation',
    type: 'reactivation',
    status: 'pending',
    requestedBy: 'Electronics Mart',
    submittedBy: 'Electronics Mart',
    requestDate: '2025-01-15',
    submittedAt: '2025-01-15',
    priority: 'urgent',
    comments: 'Merchant requesting reactivation after resolving compliance issues',
    reason: 'Merchant requesting reactivation after resolving compliance issues',
    description: 'Electronics Mart was previously suspended due to compliance issues. They have now resolved all outstanding issues and are requesting reactivation.',
    changes: [
      {
        field: 'status',
        oldValue: 'suspended',
        newValue: 'active',
        type: 'reactivation',
        reason: 'Compliance issues resolved, merchant ready for reactivation',
      },
    ],
    history: [
      {
        id: 'hist-3',
        action: 'Reactivation Request Submitted',
        timestamp: '2025-01-15T11:00:00Z',
        performedBy: 'Electronics Mart',
        details: 'Merchant submitted reactivation request with resolved compliance documentation',
      },
    ],
  },
];

// Mock statistics
export const mockMerchantStats = {
  totalMerchants: mockMerchantListData.length,
  activeMerchants: mockMerchantListData.filter(m => m.productionStatus?.label === 'Active').length,
  pendingMerchants: mockMerchantListData.filter(m => m.productionStatus?.label === 'Pending').length,
  suspendedMerchants: mockMerchantListData.filter(m => m.productionStatus?.label === 'Suspended').length,
  monthlyGrowth: 12.5,
  totalVolume: mockMerchantListData.reduce((sum, merchant) => sum + (merchant.monthlyVolume || 0), 0),
  avgVolumePerMerchant: mockMerchantListData.reduce((sum, merchant) => sum + (merchant.monthlyVolume || 0), 0) / mockMerchantListData.length,
};

// Get detailed merchant information (mock implementation)
function getMockMerchantDetail(id: string): Merchant | null {
  const listItem = mockMerchantListData.find(m => m.id === id);
  if (!listItem) return null;

  return {
    id: listItem.id,
    business: {
      name: listItem.companyName,
      businessType: BusinessType.ECOMMERCE,
      description: `${listItem.merchant?.businessType || 'Business'} company providing quality services to customers.`,
      logo: listItem.merchant?.logo,
      registrationNumber: `REG-${listItem.id.padStart(6, '0')}`,
      taxId: `TAX-${listItem.id.padStart(8, '0')}`,
      establishedDate: '2020-01-01',
    },
    contact: {
      email: listItem.contact?.email || 'contact@example.com',
      phone: listItem.contact?.phone || '+62-21-1234567',
      website: listItem.contact?.website,
      address: {
        street: '123 Business Street',
        city: listItem.location?.city || 'Jakarta',
        state: 'Jakarta',
        postalCode: '12345',
        country: Country.INDONESIA,
      },
    },
    location: {
      city: listItem.location?.city || 'Jakarta',
      country: Country.INDONESIA,
      flag: listItem.location?.flag || 'indonesia.svg',
      timezone: 'Asia/Jakarta',
      coordinates: { lat: -6.2088, lng: 106.8456 },
    },
    financial: {
      monthlyVolume: listItem.monthlyVolume || 0,
      yearlyVolume: (listItem.monthlyVolume || 0) * 12,
      avgTransactionValue: 250000,
      totalTransactions: 1250,
      currency: 'IDR',
      paymentMethods: ['Credit Card', 'Bank Transfer', 'E-Wallet', 'QRIS'],
    },
    compliance: {
      kycStatus: 'verified',
      documents: {
        businessLicense: 'business-license.pdf',
        taxCertificate: 'tax-certificate.pdf',
        bankStatement: 'bank-statement.pdf',
        identityDocument: 'identity-document.pdf',
      },
      verifiedDate: '2024-01-20',
      verifiedBy: 'Compliance Team',
      complianceNotes: 'All documents verified and approved',
    },
    settings: {
      isActive: listItem.productionStatus?.label === 'Active',
      allowedCurrencies: ['IDR', 'USD', 'SGD'],
      settlementPeriod: 'daily',
      feeStructure: {
        processingFee: 2.9,
        settlementFee: 5000,
        chargebackFee: 150000,
      },
      riskLevel: 'low',
      autoApproveLimit: 10000000,
    },
    status: {
      label: listItem.productionStatus?.label || 'Active',
      value: MerchantStatus.ACTIVE,
      color: listItem.productionStatus?.color || 'success',
    },
    dates: {
      registrationDate: listItem.registeredDate,
      lastActivity: listItem.lastActivity || 'Today',
      lastLoginDate: '2024-03-15T10:30:00Z',
      statusUpdatedDate: listItem.updatedDate || '2024-03-15',
    },
    activityLog: [
      {
        id: 'activity-1',
        timestamp: '2024-03-15T10:30:00Z',
        action: 'Login',
        performedBy: 'Merchant User',
        details: 'Successful login from 192.168.1.1',
        ipAddress: '192.168.1.1',
      },
    ],
    metadata: {
      createdBy: 'System',
      updatedBy: 'Admin User',
      createdAt: listItem.registeredDate,
      updatedAt: listItem.updatedDate,
      version: 1,
    },
  };
}

// Get merchant review detail
function getMockMerchantReview(reviewId: string) {
  const review = mockReviewData.find(r => r.id === reviewId);
  if (!review) return null;

  const merchant = getMockMerchantDetail(review.merchantId);
  if (!merchant) return null;

  return {
    merchant,
    review,
  };
}

// Generate additional mock merchants
function generateMockMerchants(count: number): MerchantListItem[] {
  const businessTypes = ['E-commerce', 'Fashion Retail', 'Food & Beverage', 'Electronics', 'Healthcare', 'Software Services'];
  const statuses = [
    { label: 'Active', color: 'success' as const },
    { label: 'Pending', color: 'warning' as const },
    { label: 'Suspended', color: 'destructive' as const },
  ];
  const countries = ['Indonesia', 'Malaysia', 'Singapore', 'Thailand', 'Philippines', 'Vietnam'];
  const cities = ['Jakarta', 'Kuala Lumpur', 'Singapore', 'Bangkok', 'Manila', 'Ho Chi Minh'];

  return Array.from({ length: count }, (_, index) => {
    const id = (mockMerchantListData.length + index + 1).toString();
    const businessType = businessTypes[index % businessTypes.length];
    const status = statuses[index % statuses.length];
    const country = countries[index % countries.length];
    const city = cities[index % cities.length];

    return {
      id,
      companyName: `${businessType} Company ${id}`,
      brandName: `Brand ${id}`,
      clientId: `UP20250919000000${id.padStart(2, '0')}`,
      merchantLevel: `Level ${(index % 9) + 1}`,
      subMerchants: Math.floor(Math.random() * 10) + 1,
      activePaymentChannels: Math.floor(Math.random() * 8) + 1,
      productionStatus: {
        label: status.label as 'Active' | 'Inactive' | 'Suspended',
        color: status.color,
      },
      sandboxStatus: {
        label: Math.random() > 0.5 ? 'Active' : 'Inactive' as 'Active' | 'Inactive',
        color: Math.random() > 0.5 ? 'success' : 'destructive' as 'success' | 'destructive',
      },
      registeredDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      updatedDate: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      // Legacy fields for backward compatibility
      merchant: {
        logo: 'brand-logos/shopify.svg',
        name: `${businessType} Company ${id}`,
        businessType,
      },
      contact: {
        email: `contact${id}@example.com`,
        phone: `+62-21-${Math.random().toString().slice(2, 9)}`,
        website: `company${id}.com`,
      },
      location: {
        city,
        country,
        flag: `${country.toLowerCase()}.svg`,
      },
      status,
      registrationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      lastActivity: `${Math.floor(Math.random() * 30) + 1} days ago`,
      monthlyVolume: Math.floor(Math.random() * 200000000) + 10000000,
    };
  });
}

// Export all mock data
export const mockData = {
  merchants: mockMerchantListData,
  reviews: mockReviewData,
  stats: mockMerchantStats,
  getMerchantDetail: getMockMerchantDetail,
  getMerchantReview: getMockMerchantReview,
  generateMockMerchants,
};
