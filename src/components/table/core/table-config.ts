import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { BaseTableItem, ReusableTableProps } from '../types';
import { createTableColumns } from './column-builder';

/**
 * Hook for managing table state and configuration
 */
export function useTableConfiguration<T extends BaseTableItem>({
  data,
  columns,
  actions,
  selectable,
  pagination,
}: {
  data: T[];
  columns: ReusableTableProps<T>['columns'];
  actions: ReusableTableProps<T>['actions'];
  selectable: boolean;
  pagination: ReusableTableProps<T>['pagination'];
}) {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pagination?.pageSize || 10,
  });
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const tableColumns = useMemo(
    () => createTableColumns(columns, selectable, actions),
    [columns, selectable, actions]
  );

  const table = useReactTable({
    columns: tableColumns,
    data,
    pageCount: Math.ceil((data?.length || 0) / paginationState.pageSize),
    getRowId: (row: T) => String(row.id),
    state: {
      pagination: paginationState,
      sorting,
      rowSelection,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPaginationState,
    onSortingChange: setSorting,
    enableRowSelection: selectable,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return {
    table,
    paginationState,
    sorting,
    rowSelection,
  };
}
