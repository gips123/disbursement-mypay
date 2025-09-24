import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

export function BusinessInfoSummary() {
  const isCompleted = true; // This would come from form state
  const hasErrors = false; // This would come from form validation

  return (
    <div className="space-y-5">
      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Business Info Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Company Information</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Contact Details</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Business Type</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Company Logo</span>
              <Badge variant="outline">Optional</Badge>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600 mb-2">
              Step 1 of 6 completed
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '16.67%' }}
              ></div>
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
                ? 'All required information has been provided.'
                : 'Complete the form to continue to the next step.'
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
            Contact our support team if you need assistance with business information.
          </p>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-100">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
