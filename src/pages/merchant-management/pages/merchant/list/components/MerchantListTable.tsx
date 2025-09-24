import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MerchantTable } from '../../../../components';
import { MerchantListItem } from '../../../../core/merchant.model';
import { TableAction } from '@/components/table';

interface MerchantListTableProps {
  data: MerchantListItem[];
  isLoading: boolean;
  actions: TableAction<MerchantListItem>[];
  onRowClick: (merchant: MerchantListItem) => void;
  onExport: () => void;
}

export function MerchantListTable({
  data,
  isLoading,
  actions,
  onRowClick,
  onExport,
}: MerchantListTableProps) {
  return (
    <MerchantTable
      data={data}
      isLoading={isLoading}
      actions={actions}
      onRowClick={onRowClick}
      searchable={true}
      searchPlaceholder="Search merchants by name, email, or location..."
      toolbar={{
        rightContent: (
          <Button
            variant="outline"
            onClick={onExport}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        ),
      }}
    />
  );
}
