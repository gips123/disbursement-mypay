import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Format currency amount with proper locale and currency symbol
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback to basic formatting
    return `${currency} ${amount.toLocaleString()}`;
  }
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Format date for display
 */
export function formatDate(
  date: string | Date,
  formatString = 'MMM d, yyyy'
): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid Date';
    }
    return format(dateObj, formatString);
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Format date as relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Unknown';
    }
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    return 'Unknown';
  }
}

/**
 * Format datetime for display
 */
export function formatDateTime(
  date: string | Date,
  formatString = 'MMM d, yyyy HH:mm'
): string {
  return formatDate(date, formatString);
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  if (digits.startsWith('62')) {
    // Indonesian format
    return `+62 ${digits.slice(2, 5)} ${digits.slice(5, 9)} ${digits.slice(9)}`;
  } else if (digits.startsWith('60')) {
    // Malaysian format
    return `+60 ${digits.slice(2, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
  } else if (digits.startsWith('65')) {
    // Singapore format
    return `+65 ${digits.slice(2, 6)} ${digits.slice(6)}`;
  }
  
  // Default format
  return phone;
}

/**
 * Format email for display (truncate if too long)
 */
export function formatEmail(email: string, maxLength = 30): string {
  if (email.length <= maxLength) {
    return email;
  }
  
  const [localPart, domain] = email.split('@');
  const truncatedLocal = localPart.slice(0, maxLength - domain.length - 4);
  return `${truncatedLocal}...@${domain}`;
}

/**
 * Format business registration number
 */
export function formatRegistrationNumber(regNumber: string): string {
  // Add spaces for better readability
  return regNumber.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

/**
 * Capitalize first letter of each word
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

/**
 * Convert camelCase to readable title
 */
export function camelToTitle(str: string): string {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
 * Generate initials from name
 */
export function getInitials(name: string, maxChars = 2): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .slice(0, maxChars)
    .toUpperCase();
}

/**
 * Validate and format URL
 */
export function formatUrl(url: string): string {
  if (!url) return '';
  
  // Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  
  return url;
}

/**
 * Parse and validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Parse and validate phone number
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Generate random color for avatars
 */
export function generateAvatarColor(name: string): string {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

/**
 * Calculate growth percentage
 */
export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Format growth percentage with appropriate styling
 */
export function formatGrowth(growth: number): {
  value: string;
  isPositive: boolean;
  isNegative: boolean;
  color: string;
} {
  const isPositive = growth > 0;
  const isNegative = growth < 0;
  
  return {
    value: `${isPositive ? '+' : ''}${growth.toFixed(1)}%`,
    isPositive,
    isNegative,
    color: isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600',
  };
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

/**
 * Get status color class for Tailwind CSS
 */
export function getStatusColorClass(
  status: 'active' | 'pending' | 'suspended' | 'rejected' | 'inactive',
  type: 'bg' | 'text' | 'border' = 'bg'
): string {
  const colorMap = {
    active: 'green',
    pending: 'yellow',
    suspended: 'red',
    rejected: 'red',
    inactive: 'gray',
  };
  
  const color = colorMap[status] || 'gray';
  
  switch (type) {
    case 'text':
      return `text-${color}-600`;
    case 'border':
      return `border-${color}-300`;
    default:
      return `bg-${color}-100`;
  }
}

/**
 * Generate unique ID
 */
export function generateId(prefix = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}
