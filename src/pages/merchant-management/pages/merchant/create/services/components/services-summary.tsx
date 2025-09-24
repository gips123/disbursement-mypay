import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, CheckCircle, AlertCircle, HelpCircle, CreditCard } from 'lucide-react';

export function ServicesSummary() {
  const isCompleted = true; // This would come from form state
  const hasErrors = false; // This would come from form validation
  const enabledServices = 3; // This would come from form state

  return (
    <div className="space-y-5">
      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Services Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Payment Services</span>
              <Badge variant={enabledServices > 0 ? 'default' : 'secondary'}>
                {enabledServices > 0 ? `${enabledServices} Enabled` : 'None Selected'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Business Settings</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Fee Structure</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Security Settings</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Settlement</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600 mb-2">
              Step 4 of 6 completed
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '66.67%' }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enabled Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enabled Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-600" />
              <span className="text-sm">Payment Gateway</span>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Active
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-600" />
              <span className="text-sm">Virtual Account</span>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Active
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-green-600" />
              <span className="text-sm">E-Wallet</span>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Active
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">QR Code Payment</span>
              <Badge variant="outline" className="text-gray-500 border-gray-300">
                Inactive
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            {hasErrors ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : isCompleted ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <HelpCircle className="h-4 w-4 text-yellow-500" />
            )}
            <span className="text-sm font-medium">
              {hasErrors ? 'Validation Errors' : isCompleted ? 'Ready to Continue' : 'In Progress'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {hasErrors 
              ? 'Please fix the errors above before continuing.'
              : isCompleted 
                ? 'All service configurations have been completed.'
                : 'Complete the service configuration to continue.'
            }
          </p>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base text-blue-900">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-4">
            Contact our support team if you need assistance with service configuration.
          </p>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-100">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
