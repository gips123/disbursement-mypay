// Main Table Component
export { ReusableTable } from './table';

// Core Components
export { ActionsColumn } from './components/actions-column';
export { TableFilters } from './components/table-filters';
export { TableToolbar } from './components/table-toolbar';
export { TableLoading, TableEmpty } from './components/table-states';

// Core Logic
export { useTableFilters } from './core/hooks';
export { useTableConfiguration } from './core/table-config';
export { createTableColumns } from './core/column-builder';

// Utilities
export { generateFilterOptions, dataUtils } from './utils/data-utils';

// Types - Re-export all types for easy importing
export type {
  BaseTableItem,
  TableColumn,
  TableAction,
  FilterOption,
  SortOption,
  ReusableTableProps,
  TableFilters as TableFiltersType,
} from './types';
