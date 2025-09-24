import { MerchantHeader } from '../../../components';
import { useEditMerchantPage } from './hooks/useEditMerchantPage';
import { EditMerchantForm } from './components';

export function MerchantEditPage() {
  const {
    merchant,
    initialData,
    isLoading,
    handleSubmit,
    handleCancel,
    isUpdating,
    error,
  } = useEditMerchantPage();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Merchant not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <MerchantHeader
        title={`Edit ${merchant.business.name}`}
        subtitle="Update merchant information and settings"
      />

      <EditMerchantForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isUpdating}
      />
    </div>
  );
}

export default MerchantEditPage;
