import { Button } from '@/components/ui/button';
import { MerchantHeader } from '../../../components';
import { mockData } from '../../../mocks/merchant.mock';
import { useMerchantList } from './hooks/useMerchantList';
import { 
  MerchantListTable, 
  MerchantListDialogs, 
  useMerchantListActions 
} from './components';

export function MerchantListPage() {
  // For demo purposes, using mock data. In production, use the actual query
  const { data, isLoading } = { 
    data: { 
      data: mockData.merchants, 
      stats: mockData.stats 
    }, 
    isLoading: false 
  };

  const {
    // Navigation
    handleViewDetails,
    handleEditMerchant,
    handleCreateMerchant,
    handleViewTransactions,
    
    // Dialog management
    dialogs,
    openDeleteDialog,
    openSuspendDialog,
    openActivateDialog,
    closeAllDialogs,
    
    // Actions
    confirmDelete,
    confirmSuspend,
    confirmActivate,
    handleExport,
    
    // Loading states
    isDeleting,
    isSuspending,
    isActivating,
  } = useMerchantList();

  // Table actions configuration
  const actions = useMerchantListActions({
    onViewDetails: handleViewDetails,
    onEditMerchant: handleEditMerchant,
    onViewTransactions: handleViewTransactions,
    onSuspendMerchant: openSuspendDialog,
    onActivateMerchant: openActivateDialog,
    onDeleteMerchant: openDeleteDialog,
  });

  return (
    <div className="container mx-auto p-6">
      <MerchantHeader
        title="Merchants"
        subtitle="Manage and monitor all registered merchants"
      >
        <Button
          onClick={handleCreateMerchant}
          className="text-sm"
        >
          Create New Merchant
        </Button>
      </MerchantHeader>

      <MerchantListTable
        data={data?.data || []}
        isLoading={isLoading}
        actions={actions}
        onRowClick={handleViewDetails}
        onExport={handleExport}
      />

      <MerchantListDialogs
        dialogs={dialogs}
        onCloseDialogs={closeAllDialogs}
        onConfirmDelete={confirmDelete}
        onConfirmSuspend={confirmSuspend}
        onConfirmActivate={confirmActivate}
        isDeleting={isDeleting}
        isSuspending={isSuspending}
        isActivating={isActivating}
      />
    </div>
  );
}

export default MerchantListPage;
