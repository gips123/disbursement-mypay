import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

export function DisbursementPricingForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Disbursement Pricing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-6">
          <p className="text-gray-600">
            Disbursement Service need to be activated
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">₿</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">Default Pricing</h3>
                  <Badge variant="secondary" className="text-gray-600 bg-gray-200">
                    Default
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">145 Banks are active and set as a default setup</p>
                <p className="text-xs text-gray-500 mt-1">Pricing can be setup after merchant is created</p>
              </div>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center opacity-30">
              <div className="grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
