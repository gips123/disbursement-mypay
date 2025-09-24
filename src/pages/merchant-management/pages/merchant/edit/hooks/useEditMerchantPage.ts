import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useUpdateMerchant } from '../../../../core';
import { CreateMerchantRequest, UpdateMerchantRequest } from '../../../../core/merchant.model';
import { mockData } from '../../../../mocks/merchant.mock';

export function useEditMerchantPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // For demo purposes, using mock data. In production, use the actual query
  const { data: merchant, isLoading } = { 
    data: id ? { data: mockData.getMerchantDetail(id) } : null, 
    isLoading: false 
  };
  
  const updateMerchant = useUpdateMerchant();

  const handleSubmit = (data: CreateMerchantRequest | UpdateMerchantRequest) => {
    if (!id) return;
    
    const updateData: UpdateMerchantRequest = {
      id,
      ...data,
    };

    updateMerchant.mutate(updateData, {
      onSuccess: () => {
        toast.success('Merchant updated successfully');
        navigate(`/merchant-management/merchant-detail/${id}`);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to update merchant');
      },
    });
  };

  const handleCancel = () => {
    navigate(`/merchant-management/merchant-detail/${id}`);
  };

  // Convert merchant data to form initial values
  const getInitialData = () => {
    if (!merchant?.data) return undefined;

    return {
      businessName: merchant.data.business.name,
      businessType: merchant.data.business.businessType,
      description: merchant.data.business.description,
      registrationNumber: merchant.data.business.registrationNumber,
      taxId: merchant.data.business.taxId,
      establishedDate: merchant.data.business.establishedDate,
      email: merchant.data.contact.email,
      phone: merchant.data.contact.phone,
      website: merchant.data.contact.website,
      street: merchant.data.contact.address?.street,
      city: merchant.data.location.city,
      state: merchant.data.contact.address?.state,
      postalCode: merchant.data.contact.address?.postalCode,
      country: merchant.data.location.country,
      monthlyVolume: merchant.data.financial.monthlyVolume,
      currency: merchant.data.financial.currency,
      settlementPeriod: merchant.data.settings.settlementPeriod,
      autoApproveLimit: merchant.data.settings.autoApproveLimit,
    };
  };

  return {
    id,
    merchant: merchant?.data,
    initialData: getInitialData(),
    isLoading,
    handleSubmit,
    handleCancel,
    isUpdating: updateMerchant.isPending,
    error: !merchant?.data && id ? 'Merchant not found' : null,
  };
}
