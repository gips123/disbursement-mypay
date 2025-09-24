import {
  Merchant,
  MerchantListItem,
  CreateMerchantRequest,
  MerchantContact,
  MerchantLocation,
} from '../core/merchant.model';
import { COUNTRIES, BUSINESS_TYPES, MERCHANT_STATUS } from '../core/merchant.constants';

/**
 * Maps API response to MerchantListItem for table display
 */
export function mapToMerchantListItem(merchant: Merchant): MerchantListItem {
  return {
    id: merchant.id,
    companyName: merchant.business?.name || 'Unknown Company',
    brandName: merchant.business?.name || 'Unknown Brand',
    clientId: `CLI${merchant.id.slice(-6).toUpperCase()}`,
    merchantLevel: merchant.compliance?.kycStatus === 'verified' ? 'Premium' : 'Basic',
    subMerchants: 0,
    activePaymentChannels: merchant.financial?.paymentMethods?.length || 1,
    productionStatus: {
      label: merchant.status?.label === 'Active' ? 'Active' : 'Pending',
      color: merchant.status?.label === 'Active' ? 'success' : 'warning',
    },
    sandboxStatus: {
      label: 'Active',
      color: 'success',
    },
    registeredDate: merchant.dates?.registrationDate || new Date().toISOString().split('T')[0],
    updatedDate: merchant.dates?.lastActivity || new Date().toISOString().split('T')[0],
    // Legacy fields for backward compatibility
    merchant: {
      logo: merchant.business?.logo || '',
      name: merchant.business?.name || 'Unknown',
      businessType: BUSINESS_TYPES[merchant.business?.businessType]?.label || merchant.business?.businessType || 'Other',
    },
    contact: merchant.contact ? {
      email: merchant.contact.email,
      phone: merchant.contact.phone,
      website: merchant.contact.website,
    } : undefined,
    location: merchant.location ? {
      city: merchant.location.city,
      country: merchant.location.country,
      flag: merchant.location.flag || '',
    } : undefined,
    status: merchant.status ? {
      label: merchant.status.label,
      color: merchant.status.color === 'primary' ? 'success' : (merchant.status.color || 'success') as 'success' | 'destructive' | 'warning',
    } : undefined,
    registrationDate: merchant.dates?.registrationDate,
    lastActivity: merchant.dates?.lastActivity,
    monthlyVolume: merchant.financial?.monthlyVolume,
  };
}

/**
 * Maps multiple merchants to list items
 */
export function mapToMerchantListItems(merchants: Merchant[]): MerchantListItem[] {
  return merchants.map(mapToMerchantListItem);
}

/**
 * Maps CreateMerchantRequest to partial Merchant for form handling
 */
export function mapFromCreateRequest(request: CreateMerchantRequest): Partial<Merchant> {
  const country = COUNTRIES[request.location.country];
  
  return {
    business: {
      ...request.business,
      logo: '',
    },
    contact: request.contact,
    location: {
      ...request.location,
      flag: country?.flag || '',
      timezone: country?.timezone,
    },
    financial: {
      ...request.financial,
      currency: request.financial.currency || country?.currency || 'USD',
      yearlyVolume: request.financial.monthlyVolume * 12,
      avgTransactionValue: 0,
      totalTransactions: 0,
      paymentMethods: [],
    },
    status: {
      label: MERCHANT_STATUS.PENDING.label,
      value: MERCHANT_STATUS.PENDING.value,
      color: MERCHANT_STATUS.PENDING.color,
    },
    compliance: {
      kycStatus: 'pending',
      documents: {},
    },
    settings: {
      isActive: false,
      allowedCurrencies: [request.financial.currency || 'USD'],
      settlementPeriod: 'weekly',
      riskLevel: 'medium',
      ...request.settings,
    },
    dates: {
      registrationDate: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    },
    activityLog: [],
  };
}

/**
 * Maps form data to API request format
 */
export function mapToCreateRequest(formData: any): CreateMerchantRequest {
  return {
    business: {
      name: formData.businessName,
      businessType: formData.businessType,
      description: formData.description,
      registrationNumber: formData.registrationNumber,
      taxId: formData.taxId,
      establishedDate: formData.establishedDate,
    },
    contact: {
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: formData.address ? {
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        postalCode: formData.address.postalCode,
        country: formData.address.country,
      } : undefined,
    },
    location: {
      city: formData.city,
      country: formData.country,
      coordinates: formData.coordinates,
    },
    financial: {
      monthlyVolume: formData.monthlyVolume,
      currency: formData.currency,
    },
    settings: formData.settings,
  };
}

/**
 * Maps contact information for display
 */
export function mapContactForDisplay(contact: MerchantContact) {
  return {
    primary: [
      { label: 'Email', value: contact.email, type: 'email' },
      { label: 'Phone', value: contact.phone, type: 'phone' },
    ],
    secondary: [
      ...(contact.website ? [{ label: 'Website', value: contact.website, type: 'url' }] : []),
      ...(contact.address ? [{
        label: 'Address',
        value: `${contact.address.street}, ${contact.address.city}, ${contact.address.country}`,
        type: 'address'
      }] : []),
    ],
  };
}

/**
 * Maps location information for display
 */
export function mapLocationForDisplay(location: MerchantLocation) {
  const country = COUNTRIES[location.country];
  
  return {
    display: `${location.city}, ${location.country}`,
    details: {
      city: location.city,
      country: location.country,
      flag: location.flag,
      timezone: location.timezone,
      currency: country?.currency,
      countryCode: country?.code,
    },
  };
}

/**
 * Maps financial data for display
 */
export function mapFinancialForDisplay(financial: any) {
  return {
    volume: {
      monthly: financial.monthlyVolume,
      yearly: financial.yearlyVolume || financial.monthlyVolume * 12,
      average: financial.avgTransactionValue || 0,
    },
    currency: financial.currency,
    transactions: financial.totalTransactions || 0,
    paymentMethods: financial.paymentMethods || [],
  };
}

/**
 * Maps status for display with additional metadata
 */
export function mapStatusForDisplay(status: any) {
  const statusConfig = Object.values(MERCHANT_STATUS).find(s => s.value === status.value);
  
  return {
    ...status,
    description: statusConfig?.description || '',
    canTransact: status.value === 'active',
    requiresAction: ['pending', 'rejected'].includes(status.value),
  };
}

/**
 * Maps activity log for timeline display
 */
export function mapActivityLogForDisplay(activityLog: any[]) {
  return activityLog.map(log => ({
    id: log.id,
    timestamp: log.timestamp,
    action: log.action,
    performedBy: log.performedBy,
    details: log.details,
    type: getActivityType(log.action),
    icon: getActivityIcon(log.action),
    color: getActivityColor(log.action),
  }));
}

/**
 * Helper function to determine activity type
 */
function getActivityType(action: string): 'info' | 'success' | 'warning' | 'error' {
  if (action.includes('Created') || action.includes('Verified')) return 'success';
  if (action.includes('Rejected') || action.includes('Suspended') || action.includes('Deleted')) return 'error';
  if (action.includes('Pending') || action.includes('Updated')) return 'warning';
  return 'info';
}

/**
 * Helper function to get activity icon
 */
function getActivityIcon(action: string): string {
  if (action.includes('Created')) return '✨';
  if (action.includes('Updated')) return '📝';
  if (action.includes('Verified')) return '✅';
  if (action.includes('Rejected')) return '❌';
  if (action.includes('Suspended')) return '⚠️';
  if (action.includes('Activated')) return '🟢';
  if (action.includes('Login')) return '🔐';
  return '📋';
}

/**
 * Helper function to get activity color
 */
function getActivityColor(action: string): string {
  const type = getActivityType(action);
  switch (type) {
    case 'success': return 'text-green-600';
    case 'error': return 'text-red-600';
    case 'warning': return 'text-orange-600';
    default: return 'text-blue-600';
  }
}

/**
 * Maps compliance data for display
 */
export function mapComplianceForDisplay(compliance: any) {
  const kycStatusConfig = compliance.kycStatus === 'pending' 
    ? { color: 'warning', label: 'Pending Verification' }
    : compliance.kycStatus === 'verified'
    ? { color: 'success', label: 'Verified' }
    : { color: 'destructive', label: 'Rejected' };

  return {
    kycStatus: {
      ...kycStatusConfig,
      value: compliance.kycStatus,
    },
    documents: Object.entries(compliance.documents || {}).map(([type, url]) => ({
      type: type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      url: url as string,
      uploaded: !!url,
    })),
    verifiedDate: compliance.verifiedDate,
    verifiedBy: compliance.verifiedBy,
    notes: compliance.complianceNotes,
  };
}

/**
 * Utility to determine if merchant can be edited
 */
export function canEditMerchant(merchant: Merchant): boolean {
  return !['suspended', 'rejected'].includes(merchant.status.value);
}

/**
 * Utility to determine if merchant can be activated
 */
export function canActivateMerchant(merchant: Merchant): boolean {
  return ['pending', 'inactive', 'suspended'].includes(merchant.status.value);
}

/**
 * Utility to determine if merchant can be suspended
 */
export function canSuspendMerchant(merchant: Merchant): boolean {
  return merchant.status.value === 'active';
}

/**
 * Utility to determine available actions for merchant
 */
export function getAvailableActions(merchant: Merchant) {
  const actions = [];
  
  // Always available
  actions.push('view', 'viewTransactions');
  
  // Conditional actions
  if (canEditMerchant(merchant)) {
    actions.push('edit');
  }
  
  if (canActivateMerchant(merchant)) {
    actions.push('activate');
  }
  
  if (canSuspendMerchant(merchant)) {
    actions.push('suspend');
  }
  
  // Admin actions
  actions.push('delete');
  
  return actions;
}
