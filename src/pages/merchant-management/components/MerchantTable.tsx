import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ReusableTable, TableColumn } from '@/components/table';
import { MerchantListItem } from '../core/merchant.model';

interface MerchantTableProps {
  data: MerchantListItem[];
  isLoading?: boolean;
  onRowClick?: (merchant: MerchantListItem) => void;
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  actions?: any[];
  title?: string;
  subtitle?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  toolbar?: {
    rightContent?: React.ReactNode;
  };
}

export function MerchantTable({
  data,
  isLoading = false,
  onRowClick,
  actions = [],
  title = 'Merchants',
  subtitle = 'Manage and monitor all registered merchants',
  searchable = true,
  searchPlaceholder = 'Search merchants...',
  toolbar,
}: MerchantTableProps) {
  // Define table columns
  const columns: TableColumn<MerchantListItem>[] = [
    {
      id: 'companyName',
      accessorKey: 'companyName',
      header: 'Company Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg shrink-0">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <Link
            to={`/merchant-management/merchant-detail/${row.original.id}`}
            className="text-sm font-medium text-mono hover:text-primary-active"
          >
            {row.original.companyName}
          </Link>
        </div>
      ),
      enableSorting: true,
      size: 200,
    },
    {
      id: 'brandName',
      accessorKey: 'brandName',
      header: 'Brand Name',
      cell: ({ row }) => (
        <span className="text-sm font-medium">
          {row.original.brandName}
        </span>
      ),
      enableSorting: true,
      size: 150,
    },
    {
      id: 'clientId',
      accessorKey: 'clientId',
      header: 'Client ID',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
            {row.original.clientId}
          </span>
        </div>
      ),
      enableSorting: true,
      size: 140,
    },
    {
      id: 'merchantLevel',
      accessorKey: 'merchantLevel',
      header: 'Merchant Level',
      cell: ({ row }) => (
        <Badge variant="outline" className="font-medium">
          {row.original.merchantLevel}
        </Badge>
      ),
      enableSorting: true,
      size: 130,
    },
    {
      id: 'subMerchants',
      accessorKey: 'subMerchants',
      header: 'Sub-Merchants',
      cell: ({ row }) => (
        <span className="text-sm font-medium text-center block">
          {row.original.subMerchants}
        </span>
      ),
      enableSorting: true,
      size: 120,
    },
    {
      id: 'activePaymentChannels',
      accessorKey: 'activePaymentChannels',
      header: 'Active Payment Channels',
      cell: ({ row }) => (
        <span className="text-sm font-medium text-center block">
          {row.original.activePaymentChannels}
        </span>
      ),
      enableSorting: true,
      size: 180,
    },
    {
      id: 'productionStatus',
      accessorFn: (row) => row.productionStatus,
      header: 'Production Status',
      cell: ({ row }) => (
        <Badge
          variant={row.original.productionStatus.color}
          className="font-medium"
        >
          {row.original.productionStatus.label}
        </Badge>
      ),
      enableSorting: true,
      size: 140,
    },
    {
      id: 'sandboxStatus',
      accessorFn: (row) => row.sandboxStatus,
      header: 'Sandbox Status',
      cell: ({ row }) => (
        <Badge
          variant={row.original.sandboxStatus.color}
          className="font-medium"
        >
          {row.original.sandboxStatus.label}
        </Badge>
      ),
      enableSorting: true,
      size: 140,
    },
    {
      id: 'registeredDate',
      accessorKey: 'registeredDate',
      header: 'Registered Date',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {new Date(row.original.registeredDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(row.original.registeredDate).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })}
          </span>
        </div>
      ),
      enableSorting: true,
      size: 160,
    },
    {
      id: 'updatedDate',
      accessorKey: 'updatedDate',
      header: 'Updated Date',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {new Date(row.original.updatedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(row.original.updatedDate).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })}
          </span>
        </div>
      ),
      enableSorting: true,
      size: 160,
    },
  ];

  return (
    <ReusableTable
      data={data}
      columns={columns}
      actions={actions}
      title={title}
      subtitle={subtitle}
      searchable={searchable}
      searchPlaceholder={searchPlaceholder}
      searchFields={['companyName', 'brandName', 'clientId']}
      filterable={false}
      sortable={false}
      selectable={true}
      pagination={{
        pageSize: 10,
        pageSizeOptions: [5, 10, 20, 50],
      }}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
      toolbar={toolbar}
      onRowClick={onRowClick}
      className="w-full"
      loading={isLoading}
    />
  );
}

export default MerchantTable;
