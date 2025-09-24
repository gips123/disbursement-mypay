import { useMemo } from 'react';
import { BaseTableItem, FilterOption } from '../types';

/**
 * Generates filter options with counts from data
 */
export function generateFilterOptions<T extends BaseTableItem>(
  data: T[],
  providedOptions?: FilterOption[]
): FilterOption[] {
  return useMemo(() => {
    if (providedOptions && providedOptions.length > 0 && providedOptions[0].count !== undefined) {
      return providedOptions;
    }

    // Auto-generate filter options with counts from data
    const statusCounts = data.reduce((acc, item) => {
      Object.values(item).forEach((value) => {
        if (typeof value === 'object' && value !== null && 'label' in value) {
          const label = (value as any).label;
          acc[label] = (acc[label] || 0) + 1;
        }
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(statusCounts).map((key) => ({
      label: key,
      value: key,
      count: statusCounts[key],
    }));
  }, [data, providedOptions]);
}

/**
 * Utility functions for data processing
 */
export const dataUtils = {
  /**
   * Format currency value
   */
  formatCurrency: (amount: number, currency = 'IDR', locale = 'id-ID') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  /**
   * Format date value
   */
  formatDate: (date: string | Date, locale = 'id-ID') => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  },

  /**
   * Format relative time
   */
  formatRelativeTime: (date: string | Date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInMs = now.getTime() - targetDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
      }
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    } else {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }
  },

  /**
   * Truncate text with ellipsis
   */
  truncateText: (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  },

  /**
   * Get initials from name
   */
  getInitials: (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  },
};
