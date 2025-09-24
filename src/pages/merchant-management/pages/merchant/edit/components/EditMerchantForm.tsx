import { MerchantForm } from '../../../../components';
import { CreateMerchantRequest, UpdateMerchantRequest } from '../../../../core/merchant.model';

interface EditMerchantFormProps {
  initialData?: any; // Replace with proper type for form data
  onSubmit: (data: CreateMerchantRequest | UpdateMerchantRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function EditMerchantForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: EditMerchantFormProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <MerchantForm
        mode="edit"
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </div>
  );
}
