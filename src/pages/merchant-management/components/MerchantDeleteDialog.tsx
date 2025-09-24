import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { MerchantListItem } from '../core/merchant.model';

interface MerchantDeleteDialogProps {
  merchant: MerchantListItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (merchantId: string, reason?: string) => void;
  isLoading?: boolean;
}

export function MerchantDeleteDialog({
  merchant,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: MerchantDeleteDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (merchant) {
      onConfirm(merchant.id, reason.trim() || undefined);
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  if (!merchant) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg">Delete Merchant</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600 mt-1">
                This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {merchant.companyName || merchant.merchant?.name || 'Unknown Merchant'}
                </p>
                <p className="text-sm text-gray-600">
                  {merchant.merchant?.businessType || 'Unknown Business Type'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {merchant.location?.city || 'Unknown City'}
                </p>
                <p className="text-xs text-gray-500">
                  {merchant.contact?.email || 'No email'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delete-reason">Reason for deletion (optional)</Label>
            <Textarea
              id="delete-reason"
              placeholder="Provide a reason for deleting this merchant..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  Warning
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Deleting this merchant will:
                </p>
                <ul className="text-xs text-yellow-700 mt-2 list-disc list-inside space-y-1">
                  <li>Remove access to the merchant dashboard</li>
                  <li>Stop all transaction processing</li>
                  <li>Archive all merchant data (not permanently deleted)</li>
                  <li>Require reactivation process to restore access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isLoading ? 'Deleting...' : 'Delete Merchant'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Suspend Dialog
interface MerchantSuspendDialogProps {
  merchant: MerchantListItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (merchantId: string, reason: string) => void;
  isLoading?: boolean;
}

export function MerchantSuspendDialog({
  merchant,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: MerchantSuspendDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (merchant && reason.trim()) {
      onConfirm(merchant.id, reason.trim());
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  const isReasonRequired = true;
  const canConfirm = reason.trim().length > 0;

  if (!merchant) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg">Suspend Merchant</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600 mt-1">
                Temporarily suspend merchant operations
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {merchant.companyName || merchant.merchant?.name || 'Unknown Merchant'}
                </p>
                <p className="text-sm text-gray-600">
                  {merchant.merchant?.businessType || 'Unknown Business Type'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {merchant.location?.city || 'Unknown City'}
                </p>
                <p className="text-xs text-gray-500">
                  {merchant.contact?.email || 'No email'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="suspend-reason">
              Reason for suspension {isReasonRequired && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id="suspend-reason"
              placeholder="Provide a detailed reason for suspending this merchant..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
              required={isReasonRequired}
            />
            {isReasonRequired && (
              <p className="text-xs text-gray-500">
                A reason is required for audit and compliance purposes
              </p>
            )}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-orange-800">
                  Suspension Effects
                </p>
                <ul className="text-sm text-orange-700 mt-1 list-disc list-inside space-y-1">
                  <li>All transaction processing will be stopped immediately</li>
                  <li>Merchant dashboard access will be restricted</li>
                  <li>Customers will see payment unavailable messages</li>
                  <li>Merchant can request reactivation review</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading || !canConfirm}
            className="bg-orange-600 hover:bg-orange-700 focus:ring-orange-600"
          >
            {isLoading ? 'Suspending...' : 'Suspend Merchant'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Activate Dialog
interface MerchantActivateDialogProps {
  merchant: MerchantListItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (merchantId: string, reason?: string) => void;
  isLoading?: boolean;
}

export function MerchantActivateDialog({
  merchant,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: MerchantActivateDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (merchant) {
      onConfirm(merchant.id, reason.trim() || undefined);
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  if (!merchant) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg">Activate Merchant</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600 mt-1">
                Enable merchant operations and transaction processing
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {merchant.companyName || merchant.merchant?.name || 'Unknown Merchant'}
                </p>
                <p className="text-sm text-gray-600">
                  {merchant.merchant?.businessType || 'Unknown Business Type'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {merchant.location?.city || 'Unknown City'}
                </p>
                <p className="text-xs text-gray-500">
                  {merchant.contact?.email || 'No email'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activate-reason">Notes (optional)</Label>
            <Textarea
              id="activate-reason"
              placeholder="Add any notes about the activation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Activation Effects
                </p>
                <ul className="text-sm text-green-700 mt-1 list-disc list-inside space-y-1">
                  <li>Transaction processing will be enabled</li>
                  <li>Full merchant dashboard access will be restored</li>
                  <li>Payment methods will be available to customers</li>
                  <li>Settlement schedule will resume</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 focus:ring-green-600"
          >
            {isLoading ? 'Activating...' : 'Activate Merchant'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default MerchantDeleteDialog;
