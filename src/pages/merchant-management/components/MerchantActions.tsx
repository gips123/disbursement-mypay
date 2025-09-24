import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Play, 
  Pause, 
  Trash2, 
  CreditCard,
  Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MerchantListItem } from '../core/merchant.model';
import { getAvailableActions } from '../utils/merchant.mapper';

interface MerchantActionsProps {
  merchant: MerchantListItem;
  onViewDetails?: (merchant: MerchantListItem) => void;
  onEdit?: (merchant: MerchantListItem) => void;
  onActivate?: (merchant: MerchantListItem) => void;
  onSuspend?: (merchant: MerchantListItem) => void;
  onDelete?: (merchant: MerchantListItem) => void;
  onViewTransactions?: (merchant: MerchantListItem) => void;
  onSettings?: (merchant: MerchantListItem) => void;
  disabled?: boolean;
}

export function MerchantActions({
  merchant,
  onViewDetails,
  onEdit,
  onActivate,
  onSuspend,
  onDelete,
  onViewTransactions,
  onSettings,
  disabled = false,
}: MerchantActionsProps) {
  // Convert MerchantListItem to Merchant-like object for getAvailableActions
  const merchantForActions = {
    ...merchant,
    status: {
      ...merchant.productionStatus,
      value: (merchant.productionStatus?.label || merchant.status?.label || 'Active').toLowerCase() as any,
    },
  };

  const availableActions = getAvailableActions(merchantForActions as any);

  const handleAction = (action: string, event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();

    switch (action) {
      case 'view':
        onViewDetails?.(merchant);
        break;
      case 'edit':
        onEdit?.(merchant);
        break;
      case 'activate':
        onActivate?.(merchant);
        break;
      case 'suspend':
        onSuspend?.(merchant);
        break;
      case 'delete':
        onDelete?.(merchant);
        break;
      case 'viewTransactions':
        onViewTransactions?.(merchant);
        break;
      case 'settings':
        onSettings?.(merchant);
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0" 
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* View Details - Always available */}
        {availableActions.includes('view') && (
          <DropdownMenuItem onClick={(e) => handleAction('view', e)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        )}

        {/* Edit - Available when merchant can be edited */}
        {availableActions.includes('edit') && (
          <DropdownMenuItem onClick={(e) => handleAction('edit', e)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Merchant
          </DropdownMenuItem>
        )}

        {/* View Transactions */}
        {availableActions.includes('viewTransactions') && (
          <DropdownMenuItem onClick={(e) => handleAction('viewTransactions', e)}>
            <CreditCard className="mr-2 h-4 w-4" />
            View Transactions
          </DropdownMenuItem>
        )}

        {/* Settings */}
        {availableActions.includes('edit') && (
          <DropdownMenuItem onClick={(e) => handleAction('settings', e)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Activate - Available when merchant is not active */}
        {availableActions.includes('activate') && (
          <DropdownMenuItem 
            onClick={(e) => handleAction('activate', e)}
            className="text-green-600"
          >
            <Play className="mr-2 h-4 w-4" />
            Activate
          </DropdownMenuItem>
        )}

        {/* Suspend - Available when merchant is active */}
        {availableActions.includes('suspend') && (
          <DropdownMenuItem 
            onClick={(e) => handleAction('suspend', e)}
            className="text-orange-600"
          >
            <Pause className="mr-2 h-4 w-4" />
            Suspend
          </DropdownMenuItem>
        )}

        {/* Delete - Always available (admin only) */}
        {availableActions.includes('delete') && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => handleAction('delete', e)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Quick action buttons for frequently used actions
interface MerchantQuickActionsProps {
  merchant: MerchantListItem;
  onViewDetails?: (merchant: MerchantListItem) => void;
  onEdit?: (merchant: MerchantListItem) => void;
  onActivate?: (merchant: MerchantListItem) => void;
  onSuspend?: (merchant: MerchantListItem) => void;
  compact?: boolean;
}

export function MerchantQuickActions({
  merchant,
  onViewDetails,
  onEdit,
  onActivate,
  onSuspend,
  compact = false,
}: MerchantQuickActionsProps) {
  const merchantForActions = {
    ...merchant,
    status: {
      ...merchant.productionStatus,
      value: (merchant.productionStatus?.label || merchant.status?.label || 'Active').toLowerCase() as any,
    },
  };

  const availableActions = getAvailableActions(merchantForActions as any);

  const buttonSize = compact ? 'sm' : 'md' as const;
  const iconSize = compact ? 'h-3 w-3' : 'h-4 w-4';

  return (
    <div className="flex items-center gap-1">
      {/* View Details */}
      {availableActions.includes('view') && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.(merchant);
          }}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <Eye className={iconSize} />
          {!compact && <span className="ml-1">View</span>}
        </Button>
      )}

      {/* Edit */}
      {availableActions.includes('edit') && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(merchant);
          }}
          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
        >
          <Edit className={iconSize} />
          {!compact && <span className="ml-1">Edit</span>}
        </Button>
      )}

      {/* Activate/Suspend */}
      {availableActions.includes('activate') && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={(e) => {
            e.stopPropagation();
            onActivate?.(merchant);
          }}
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <Play className={iconSize} />
          {!compact && <span className="ml-1">Activate</span>}
        </Button>
      )}

      {availableActions.includes('suspend') && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={(e) => {
            e.stopPropagation();
            onSuspend?.(merchant);
          }}
          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        >
          <Pause className={iconSize} />
          {!compact && <span className="ml-1">Suspend</span>}
        </Button>
      )}
    </div>
  );
}

export default MerchantActions;
