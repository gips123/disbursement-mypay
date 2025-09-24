import { TableAction } from '@/components/table';
import { MerchantListItem } from '../../../../core/merchant.model';

interface MerchantListActionsProps {
  onViewDetails: (merchant: MerchantListItem) => void;
  onEditMerchant: (merchant: MerchantListItem) => void;
  onViewTransactions: (merchant: MerchantListItem) => void;
  onSuspendMerchant: (merchant: MerchantListItem) => void;
  onActivateMerchant: (merchant: MerchantListItem) => void;
  onDeleteMerchant: (merchant: MerchantListItem) => void;
}

export function useMerchantListActions({
  onViewDetails,
  onEditMerchant,
  onViewTransactions,
  onSuspendMerchant,
  onActivateMerchant,
  onDeleteMerchant,
}: MerchantListActionsProps): TableAction<MerchantListItem>[] {
  return [
    {
      label: 'View Details',
      onClick: onViewDetails,
    },
    {
      label: 'Edit Merchant',
      onClick: onEditMerchant,
      hidden: (merchant) => {
        const status = merchant.productionStatus?.label || merchant.status?.label || 'Active';
        return status === 'Suspended';
      },
    },
    {
      label: 'View Transactions',
      onClick: onViewTransactions,
    },
    {
      label: 'Suspend',
      onClick: onSuspendMerchant,
      variant: 'destructive',
      hidden: (merchant) => {
        const status = merchant.productionStatus?.label || merchant.status?.label || 'Active';
        return status !== 'Active';
      },
    },
    {
      label: 'Activate',
      onClick: onActivateMerchant,
      hidden: (merchant) => {
        const status = merchant.productionStatus?.label || merchant.status?.label || 'Active';
        return status === 'Active';
      },
    },
    {
      label: 'Delete',
      onClick: onDeleteMerchant,
      variant: 'destructive',
    },
  ];
}
