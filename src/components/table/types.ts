export interface BaseTableItem {
  id: string;
  [key: string]: any;
}

export interface TableColumn<T> {
  id: string;
  accessorKey?: string;
  accessorFn?: (row: T) => any;
  header: string | ((props: any) => React.ReactNode);
  cell?: (props: { row: { original: T }; getValue: () => any }) => React.ReactNode;
  enableSorting?: boolean;
  enableHiding?: boolean;
  enableResizing?: boolean;
  size?: number;
  meta?: {
    headerClassName?: string;
    cellClassName?: string;
  };
}

export interface TableAction<T> {
  label: string;
  onClick: (item: T) => void;
  variant?: 'default' | 'destructive';
  disabled?: (item: T) => boolean;
  hidden?: (item: T) => boolean;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface ReusableTableProps<T extends BaseTableItem> {
  data: T[];
  columns: TableColumn<T>[];
  title?: string;
  subtitle?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  filterable?: boolean;
  filterOptions?: FilterOption[];
  filterLabel?: string;
  sortable?: boolean;
  sortOptions?: SortOption[];
  sortDefaultValue?: string;
  actions?: TableAction<T>[];
  selectable?: boolean;
  pagination?: {
    pageSize?: number;
    pageSizeOptions?: number[];
  };
  toolbar?: {
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
  };
  tableLayout?: {
    columnsPinnable?: boolean;
    columnsMovable?: boolean;
    columnsVisibility?: boolean;
    cellBorder?: boolean;
  };
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export interface TableFilters {
  search: string;
  selectedFilters: string[];
  sortOrder: string;
}
