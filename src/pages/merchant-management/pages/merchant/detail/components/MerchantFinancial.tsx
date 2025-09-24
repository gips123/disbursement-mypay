import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '../../../../utils/merchant.helper';

interface MerchantFinancialProps {
  merchant: any; // Replace with proper type from your merchant model
}

export function MerchantFinancial({ merchant }: MerchantFinancialProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Monthly Volume</label>
              <p className="text-2xl font-bold">
                {formatCurrency(merchant.financial.monthlyVolume, merchant.financial.currency)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Yearly Volume (Projected)</label>
              <p className="text-lg font-semibold">
                {formatCurrency(merchant.financial.monthlyVolume * 12, merchant.financial.currency)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Average Transaction Value</label>
              <p className="text-lg font-semibold">
                {formatCurrency(merchant.financial.averageTransactionValue, merchant.financial.currency)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Total Transactions</label>
              <p className="text-lg font-semibold">
                {merchant.financial.totalTransactions.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings & Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Settlement Period</label>
              <p className="text-sm text-gray-900 capitalize">{merchant.settings.settlementPeriod}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Auto-approve Limit</label>
              <p className="text-sm text-gray-900">
                {formatCurrency(merchant.settings.autoApproveLimit, merchant.financial.currency)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Risk Level</label>
              <Badge 
                variant={merchant.settings.riskLevel === 'low' ? 'success' : 
                       merchant.settings.riskLevel === 'high' ? 'destructive' : 'warning'}
                className="capitalize"
              >
                {merchant.settings.riskLevel}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Allowed Currencies</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {merchant.settings.allowedCurrencies.map((currency: string) => (
                  <Badge key={currency} variant="outline" className="text-xs">
                    {currency}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure */}
      {merchant.settings.feeStructure && (
        <Card>
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Processing Fee</label>
                <p className="text-lg font-semibold">{merchant.settings.feeStructure.processingFee}%</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Transaction Fee</label>
                <p className="text-lg font-semibold">
                  {formatCurrency(merchant.settings.feeStructure.transactionFee, merchant.financial.currency)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Monthly Fee</label>
                <p className="text-lg font-semibold">
                  {formatCurrency(merchant.settings.feeStructure.monthlyFee, merchant.financial.currency)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
