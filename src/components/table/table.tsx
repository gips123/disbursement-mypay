import {
  Card,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
} from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Import organized components
import { BaseTableItem, ReusableTableProps } from './types';
import { useTableFilters } from './core/hooks';
import { useTableConfiguration } from './core/table-config';
import { generateFilterOptions } from './utils/data-utils';
import { TableFilters } from './components/table-filters';
import { TableToolbar } from './components/table-toolbar';
import { TableLoading, TableEmpty } from './components/table-states';

/**
 * Main reusable table component
 * Provides a complete table solution with search, filtering, sorting, and actions
 */
export function ReusableTable<T extends BaseTableItem>({
  data,
  columns,
  title,
  subtitle,
  searchable = true,
  searchPlaceholder = 'Search...',
  searchFields = [],
  filterable = false,
  filterOptions = [],
  filterLabel = 'Status',
  sortable = false,
  sortOptions = [],
  sortDefaultValue = 'latest',
  actions = [],
  selectable = false,
  pagination = { pageSize: 10, pageSizeOptions: [5, 10, 20, 50] },
  toolbar,
  tableLayout = {
    columnsPinnable: true,
    columnsMovable: true,
    columnsVisibility: true,
    cellBorder: true,
  },
  loading = false,
  className,
}: ReusableTableProps<T>) {
  // Use organized hooks
  const { filters, filteredData, updateFilters, clearSearch } = useTableFilters(
    data,
    searchFields,
    sortDefaultValue
  );

  const { table } = useTableConfiguration({
    data: filteredData,
    columns,
    actions,
    selectable,
    pagination,
  });

  // Generate enhanced filter options with counts
  const enhancedFilterOptions = generateFilterOptions(data, filterOptions);

  // Handle loading state
  if (loading) {
    return <TableLoading />;
  }

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <TableEmpty
        message="No data available"
        description="There are no items to display at the moment."
      />
    );
  }

  return (
    <div className={className}>
      <DataGrid
        table={table}
        recordCount={filteredData?.length || 0}
        tableLayout={tableLayout}
      >
        <Card>
          <CardHeader>
            <CardHeading className='flex justify-between items-center w-full p-5'>
                <div>
                  {title && (
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                      {subtitle && (
                        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {(searchable || filterable || sortable) && (
                    <TableFilters
                      filters={filters}
                      onFiltersChange={updateFilters}
                      onClearSearch={clearSearch}
                      searchPlaceholder={searchPlaceholder}
                      filterOptions={enhancedFilterOptions}
                      filterLabel={filterLabel}
                      sortOptions={sortOptions}
                      showSearch={searchable}
                      showFilters={filterable}
                      showSort={sortable}
                    />
                  )}
                  <TableToolbar toolbar={toolbar} tableLayout={tableLayout} />
                </div>
            </CardHeading>
          </CardHeader>
          
          <CardTable>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
          
          <CardFooter>
            <DataGridPagination />
          </CardFooter>
        </Card>
      </DataGrid>
    </div>
  );
}
