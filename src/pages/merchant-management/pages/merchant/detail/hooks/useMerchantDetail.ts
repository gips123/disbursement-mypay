import { useParams, useNavigate } from 'react-router-dom';
import { mockData } from '../../../../mocks/merchant.mock';

export function useMerchantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // For demo purposes, using mock data. In production, use the actual query
  const merchant = id ? mockData.getMerchantDetail(id) : null;

  const handleBackToList = () => {
    navigate('/merchant-management/merchant-list');
  };

  const handleEditMerchant = () => {
    if (id) {
      navigate(`/merchant-management/merchant-edit/${id}`);
    }
  };

  const handleSettings = () => {
    // Handle settings action
    console.log('Settings clicked');
  };

  const handleViewTransactions = () => {
    if (id) {
      navigate(`/transaction-history?merchant=${id}`);
    }
  };

  return {
    id,
    merchant,
    handleBackToList,
    handleEditMerchant,
    handleSettings,
    handleViewTransactions,
    isLoading: false, // In production, this would come from the query
    error: !merchant && id ? 'Merchant not found' : null,
  };
}
