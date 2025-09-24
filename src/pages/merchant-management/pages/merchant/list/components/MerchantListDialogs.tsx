import {
  MerchantDeleteDialog,
  MerchantSuspendDialog,
  MerchantActivateDialog,
} from '../../../../components';
import type { MerchantListDialogs } from '../hooks/useMerchantList';

interface MerchantListDialogsProps {
  dialogs: MerchantListDialogs;
  onCloseDialogs: () => void;
  onConfirmDelete: (merchantId: string, reason?: string) => void;
  onConfirmSuspend: (merchantId: string, reason: string) => void;
  onConfirmActivate: (merchantId: string, reason?: string) => void;
  isDeleting: boolean;
  isSuspending: boolean;
  isActivating: boolean;
}

export function MerchantListDialogs({
  dialogs,
  onCloseDialogs,
  onConfirmDelete,
  onConfirmSuspend,
  onConfirmActivate,
  isDeleting,
  isSuspending,
  isActivating,
}: MerchantListDialogsProps) {
  return (
    <>
      {/* Delete Confirmation Dialog */}
      <MerchantDeleteDialog
        merchant={dialogs.delete.merchant}
        isOpen={dialogs.delete.isOpen}
        onClose={onCloseDialogs}
        onConfirm={onConfirmDelete}
        isLoading={isDeleting}
      />

      {/* Suspend Confirmation Dialog */}
      <MerchantSuspendDialog
        merchant={dialogs.suspend.merchant}
        isOpen={dialogs.suspend.isOpen}
        onClose={onCloseDialogs}
        onConfirm={onConfirmSuspend}
        isLoading={isSuspending}
      />

      {/* Activate Confirmation Dialog */}
      <MerchantActivateDialog
        merchant={dialogs.activate.merchant}
        isOpen={dialogs.activate.isOpen}
        onClose={onCloseDialogs}
        onConfirm={onConfirmActivate}
        isLoading={isActivating}
      />
    </>
  );
}
