import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  useDeleteMerchant, 
  useSuspendMerchant, 
  useActivateMerchant 
} from '../../../../core';
import { MerchantListItem } from '../../../../core/merchant.model';

export interface MerchantListDialogs {
  delete: {
    isOpen: boolean;
    merchant: MerchantListItem | null;
  };
  suspend: {
    isOpen: boolean;
    merchant: MerchantListItem | null;
  };
  activate: {
    isOpen: boolean;
    merchant: MerchantListItem | null;
  };
}

export function useMerchantList() {
  const navigate = useNavigate();
  
  // Mutations
  const deleteMerchant = useDeleteMerchant();
  const suspendMerchant = useSuspendMerchant();
  const activateMerchant = useActivateMerchant();

  // Dialog states
  const [dialogs, setDialogs] = useState<MerchantListDialogs>({
    delete: { isOpen: false, merchant: null },
    suspend: { isOpen: false, merchant: null },
    activate: { isOpen: false, merchant: null },
  });

  // Navigation handlers
  const handleViewDetails = (merchant: MerchantListItem) => {
    navigate(`/merchant-management/merchant-detail/${merchant.id}`);
  };

  const handleEditMerchant = (merchant: MerchantListItem) => {
    navigate(`/merchant-management/merchant-edit/${merchant.id}`);
  };

  const handleCreateMerchant = () => {
    navigate('/merchant-management/merchant-create');
  };

  const handleViewTransactions = (merchant: MerchantListItem) => {
    const merchantName = merchant.companyName || merchant.merchant?.name || 'Unknown Merchant';
    toast.info(`Viewing transactions for ${merchantName}`);
    navigate(`/transaction-history?merchant=${merchant.id}`);
  };

  // Dialog handlers
  const openDeleteDialog = (merchant: MerchantListItem) => {
    setDialogs(prev => ({
      ...prev,
      delete: { isOpen: true, merchant }
    }));
  };

  const openSuspendDialog = (merchant: MerchantListItem) => {
    setDialogs(prev => ({
      ...prev,
      suspend: { isOpen: true, merchant }
    }));
  };

  const openActivateDialog = (merchant: MerchantListItem) => {
    setDialogs(prev => ({
      ...prev,
      activate: { isOpen: true, merchant }
    }));
  };

  const closeAllDialogs = () => {
    setDialogs({
      delete: { isOpen: false, merchant: null },
      suspend: { isOpen: false, merchant: null },
      activate: { isOpen: false, merchant: null },
    });
  };

  // Confirm handlers
  const confirmDelete = (merchantId: string, _reason?: string) => {
    deleteMerchant.mutate(merchantId, {
      onSuccess: () => {
        closeAllDialogs();
        toast.success('Merchant deleted successfully');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to delete merchant');
      },
    });
  };

  const confirmSuspend = (merchantId: string, reason: string) => {
    suspendMerchant.mutate({ merchantId, reason }, {
      onSuccess: () => {
        closeAllDialogs();
        toast.success('Merchant suspended successfully');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to suspend merchant');
      },
    });
  };

  const confirmActivate = (merchantId: string, reason?: string) => {
    activateMerchant.mutate({ merchantId, reason }, {
      onSuccess: () => {
        closeAllDialogs();
        toast.success('Merchant activated successfully');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to activate merchant');
      },
    });
  };

  // Export functionality
  const handleExport = () => {
    toast.success('Export functionality will be implemented');
  };

  return {
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
    isDeleting: deleteMerchant.isPending,
    isSuspending: suspendMerchant.isPending,
    isActivating: activateMerchant.isPending,
  };
}
