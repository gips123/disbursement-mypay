import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CreditCard, Clock, ExternalLink } from 'lucide-react';
import { MerchantOverview } from './MerchantOverview';
import { MerchantFinancial } from './MerchantFinancial';
import { MerchantCompliance } from './MerchantCompliance';
import { formatRelativeTime } from '../../../../utils/merchant.helper';

interface MerchantDetailTabsProps {
  merchant: any; // Replace with proper type from your merchant model
  onViewTransactions: () => void;
}

export function MerchantDetailTabs({ merchant, onViewTransactions }: MerchantDetailTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="financial">Financial</TabsTrigger>
        <TabsTrigger value="compliance">Compliance</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <MerchantOverview merchant={merchant} />
      </TabsContent>

      {/* Financial Tab */}
      <TabsContent value="financial" className="space-y-6">
        <MerchantFinancial merchant={merchant} />
      </TabsContent>

      {/* Compliance Tab */}
      <TabsContent value="compliance" className="space-y-6">
        <MerchantCompliance merchant={merchant} />
      </TabsContent>

      {/* Transactions Tab */}
      <TabsContent value="transactions" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Recent Transactions
              </span>
              <Button onClick={onViewTransactions} variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Transaction history will be displayed here</p>
              <p className="text-sm">Connect to your transaction service to view data</p>
              <Button 
                onClick={onViewTransactions}
                className="mt-4"
                variant="outline"
              >
                View Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Activity Tab */}
      <TabsContent value="activity" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {merchant.activityLog.map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {formatRelativeTime(activity.timestamp)} • {activity.user}
                    </p>
                    {activity.details && (
                      <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
