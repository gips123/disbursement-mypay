import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function MerchantCreatePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the first step
    navigate('/merchant-management/merchant/create/business-info', { replace: true });
  }, [navigate]);

  return null;
}

export default MerchantCreatePage;
