import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '../../../../utils/merchant.helper';
import { getKYCStatusIcon } from './statusUtils';

interface MerchantComplianceProps {
  merchant: any; // Replace with proper type from your merchant model
}

export function MerchantCompliance({ merchant }: MerchantComplianceProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            KYC Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {getKYCStatusIcon(merchant.compliance.kycStatus)}
              <Badge 
                variant={merchant.compliance.kycStatus === 'verified' ? 'success' : 
                        merchant.compliance.kycStatus === 'rejected' ? 'destructive' : 'warning'}
                className="capitalize"
              >
                {merchant.compliance.kycStatus}
              </Badge>
            </div>
            {merchant.compliance.verifiedDate && (
              <div className="text-sm text-gray-600">
                Verified on {formatDate(merchant.compliance.verifiedDate)}
              </div>
            )}
          </div>
          
          {merchant.compliance.complianceNotes && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-900">{merchant.compliance.complianceNotes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(merchant.compliance.documents).map(([type, url]) => (
              <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm text-gray-500">PDF Document</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={url as string} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
