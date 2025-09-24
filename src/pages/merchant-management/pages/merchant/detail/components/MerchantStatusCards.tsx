import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Shield, Clock } from 'lucide-react';
import { getStatusIcon, getKYCStatusIcon } from './statusUtils';
import { formatCurrency, formatRelativeTime } from '../../../../utils/merchant.helper';

interface MerchantStatusCardsProps {
  merchant: any; // Replace with proper type from your merchant model
}

export function MerchantStatusCards({ merchant }: MerchantStatusCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            {getStatusIcon(merchant.status.label)}
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <Badge variant={merchant.status.color} className="mt-1">
                {merchant.status.label}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Volume</p>
              <p className="text-lg font-semibold">
                {formatCurrency(merchant.financial.monthlyVolume, merchant.financial.currency)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">KYC Status</p>
              <div className="flex items-center gap-1 mt-1">
                {getKYCStatusIcon(merchant.compliance.kycStatus)}
                <span className="text-sm font-medium capitalize">
                  {merchant.compliance.kycStatus}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Last Activity</p>
              <p className="text-sm font-semibold">
                {formatRelativeTime(merchant.dates.lastActivity)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
