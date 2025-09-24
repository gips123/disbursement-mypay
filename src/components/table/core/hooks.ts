import { useState, useMemo } from 'react';
import { BaseTableItem, TableFilters } from '../types';

/**
 * Custom hook for managing table filters and search
 * Handles search, filtering, and sorting logic
 */
export function useTableFilters<T extends BaseTableItem>(
  data: T[],
  searchFields: (keyof T)[] = [],
  defaultSort = 'latest'
) {
  const [filters, setFilters] = useState<TableFilters>({
    search: '',
    selectedFilters: [],
    sortOrder: defaultSort,
  });

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (filters.search && searchFields.length > 0) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          return searchInValue(value, searchLower);
        })
      );
    }

    // Apply status/category filters
    if (filters.selectedFilters.length > 0) {
      filtered = filtered.filter((item) =>
        filters.selectedFilters.some((filterValue) =>
          Object.values(item).some((value) => {
            if (typeof value === 'object' && value !== null && 'label' in value) {
              return value.label === filterValue;
            }
            return String(value) === filterValue;
          })
        )
      );
    }

    // Apply sorting
    if (filters.sortOrder) {
      filtered = applySorting(filtered, filters.sortOrder);
    }

    return filtered;
  }, [data, filters, searchFields]);

  const updateFilters = (updates: Partial<TableFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const clearSearch = () => {
    updateFilters({ search: '' });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      selectedFilters: [],
      sortOrder: defaultSort,
    });
  };

  return {
    filters,
    filteredData,
    updateFilters,
    clearSearch,
    clearFilters,
  };
}

/**
 * Helper function to search in different value types
 */
function searchInValue(value: any, searchLower: string): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase().includes(searchLower);
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value).toLowerCase().includes(searchLower);
  }
  return String(value).toLowerCase().includes(searchLower);
}

/**
 * Helper function to apply sorting
 */
function applySorting<T extends BaseTableItem>(data: T[], sortOrder: string): T[] {
  return data.sort((a, b) => {
    switch (sortOrder) {
      case 'latest':
        return Number(b.id) - Number(a.id);
      case 'oldest':
        return Number(a.id) - Number(b.id);
      case 'older':
        return Number(a.id) - Number(b.id);
      default:
        return 0;
    }
  });
}
