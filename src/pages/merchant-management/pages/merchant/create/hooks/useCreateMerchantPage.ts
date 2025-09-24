import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCreateMerchant } from '../../../../core';
import { CreateMerchantRequest, UpdateMerchantRequest } from '../../../../core/merchant.model';

export function useCreateMerchantPage() {
  const navigate = useNavigate();
  const createMerchant = useCreateMerchant();

  const handleSubmit = (data: CreateMerchantRequest | UpdateMerchantRequest) => {
    createMerchant.mutate(data as CreateMerchantRequest, {
      onSuccess: (response) => {
        toast.success('Merchant created successfully');
        navigate(`/merchant-management/merchant-detail/${response.data.id}`);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to create merchant');
      },
    });
  };

  const handleCancel = () => {
    navigate('/merchant-management/merchant-list');
  };

  return {
    handleSubmit,
    handleCancel,
    isLoading: createMerchant.isPending,
    mutation: createMerchant,
  };
}
