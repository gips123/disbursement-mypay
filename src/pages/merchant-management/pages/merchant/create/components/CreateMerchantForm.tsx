import { MerchantForm } from '../../../../components';
import { CreateMerchantRequest, UpdateMerchantRequest } from '../../../../core/merchant.model';

interface CreateMerchantFormProps {
  onSubmit: (data: CreateMerchantRequest | UpdateMerchantRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function CreateMerchantForm({
  onSubmit,
  onCancel,
  isLoading,
}: CreateMerchantFormProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <MerchantForm
        mode="create"
        onSubmit={onSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </div>
  );
}
