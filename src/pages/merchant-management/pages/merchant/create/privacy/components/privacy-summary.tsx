import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertCircle, HelpCircle, FileText } from 'lucide-react';

export function PrivacySummary() {
  const isCompleted = true; // This would come from form state
  const hasErrors = false; // This would come from form validation

  return (
    <div className="space-y-5">
      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Terms & Conditions</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Accepted' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Privacy Policy</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Accepted' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Processing</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Accepted' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Marketing Consent</span>
              <Badge variant="outline">Optional</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Retention</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Configured' : 'Pending'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600 mb-2">
              Step 5 of 6 completed
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '83.33%' }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consent Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Consent Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Terms and Conditions</span>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Accepted
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Privacy Policy</span>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Accepted
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Data Processing Agreement</span>
              <Badge variant="outline" className="text-green-600 border-green-300">
                Accepted
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Marketing Communications</span>
              <Badge variant="outline" className="text-gray-500 border-gray-300">
                Declined
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
                ? 'All required consents have been given.'
                : 'Please review and accept the required agreements.'
            }
          </p>
        </CardContent>
      </Card>

      {/* Legal Documents */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-base text-gray-900">Legal Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Terms and Conditions
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Privacy Policy
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Data Processing Agreement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base text-blue-900">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-4">
            Contact our legal team if you have questions about our terms and privacy policy.
          </p>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-100">
            Contact Legal Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
