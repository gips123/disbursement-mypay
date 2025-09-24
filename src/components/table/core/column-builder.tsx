import { ColumnDef } from '@tanstack/react-table';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { BaseTableItem, TableColumn, ReusableTableProps } from '../types';
import { ActionsColumn } from '../components/actions-column';

/**
 * Creates selection column for table
 */
function createSelectionColumn<T extends BaseTableItem>(): ColumnDef<T> {
  return {
    accessorKey: 'id',
    accessorFn: (row) => row.id,
    header: () => <DataGridTableRowSelectAll />,
    cell: ({ row }) => <DataGridTableRowSelect row={row} />,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    size: 51,
    meta: {
      cellClassName: '',
    },
  };
}

/**
 * Creates actions column for table
 */
function createActionsColumn<T extends BaseTableItem>(
  actions: ReusableTableProps<T>['actions']
): ColumnDef<T> {
  return {
    id: 'actions',
    header: '',
    cell: ({ row }) => <ActionsColumn row={row} actions={actions || []} />,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    size: 60,
    meta: {
      headerClassName: '',
    },
  };
}

/**
 * Converts user-defined column to tanstack table column
 */
function convertToTableColumn<T extends BaseTableItem>(
  column: TableColumn<T>
): ColumnDef<T> {
  return {
    id: column.id,
    accessorKey: column.accessorKey,
    accessorFn: column.accessorFn,
    header:
      typeof column.header === 'string'
        ? ({ column: col }) => (
            <DataGridColumnHeader title={column.header as string} column={col} />
          )
        : column.header,
    cell: column.cell,
    enableSorting: column.enableSorting !== false,
    enableHiding: column.enableHiding !== false,
    enableResizing: column.enableResizing !== false,
    size: column.size || 180,
    meta: column.meta,
  };
}

/**
 * Creates complete table columns including selection, user columns, and actions
 */
export function createTableColumns<T extends BaseTableItem>(
  columns: TableColumn<T>[],
  selectable: boolean,
  actions?: ReusableTableProps<T>['actions']
): ColumnDef<T>[] {
  const tableColumns: ColumnDef<T>[] = [];

  // Add selection column if selectable
  if (selectable) {
    tableColumns.push(createSelectionColumn<T>());
  }

  // Add user-defined columns
  columns.forEach((column) => {
    tableColumns.push(convertToTableColumn(column));
  });

  // Add actions column if actions are provided
  if (actions && actions.length > 0) {
    tableColumns.push(createActionsColumn<T>(actions));
  }

  return tableColumns;
}
