import { ArrowLeft, Edit, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MerchantHeader } from '../../../components';
import { formatDate } from '../../../utils/merchant.helper';
import { useMerchantDetail } from './hooks/useMerchantDetail';
import { 
  MerchantDetailTabs, 
  MerchantStatusCards 
} from './components';

export function MerchantDetailPage() {
  const {
    merchant,
    handleBackToList,
    handleEditMerchant,
    handleSettings,
    handleViewTransactions,
    error,
  } = useMerchantDetail();

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
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={handleBackToList}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Merchants
        </Button>
      </div>

      {/* Header */}
      <MerchantHeader
        title={merchant.business.name}
        subtitle={`${merchant.business.businessType} • Registered ${formatDate(merchant.dates.registrationDate)}`}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleEditMerchant}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleSettings}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </MerchantHeader>

      {/* Status and Quick Info */}
      <MerchantStatusCards merchant={merchant} />

      {/* Main Content Tabs */}
      <MerchantDetailTabs 
        merchant={merchant} 
        onViewTransactions={handleViewTransactions}
      />
    </div>
  );
}

export default MerchantDetailPage;
