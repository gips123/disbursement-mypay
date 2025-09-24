import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileCheck, CheckCircle, AlertCircle, HelpCircle, Clock, User, Mail, Phone } from 'lucide-react';

export function NotesSummary() {
  const isCompleted = true; // This would come from form state
  const hasErrors = false; // This would come from form validation

  return (
    <div className="space-y-5">
      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Final Review Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Application Review</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Additional Notes</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Contact Information</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Processing Settings</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Final Confirmation</span>
              <Badge variant={isCompleted ? 'default' : 'secondary'}>
                {isCompleted ? 'Complete' : 'Pending'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600 mb-2">
              Step 6 of 6 completed
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Status */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-base text-green-900">Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Ready for Submission</span>
          </div>
          <p className="text-sm text-green-800 mb-4">
            Your merchant application is complete and ready to be submitted for review.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <CheckCircle className="h-4 w-4" />
              All required information provided
            </div>
            <div className="flex items-center gap-2 text-sm text-green-800">
              <CheckCircle className="h-4 w-4" />
              All documents uploaded
            </div>
            <div className="flex items-center gap-2 text-sm text-green-800">
              <CheckCircle className="h-4 w-4" />
              Terms and conditions accepted
            </div>
            <div className="flex items-center gap-2 text-sm text-green-800">
              <CheckCircle className="h-4 w-4" />
              Application reviewed and confirmed
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">John Doe</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">john.doe@company.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">+62 812 3456 7890</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Processing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Priority Level</span>
              <Badge variant="outline">Normal Priority</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Estimated Processing Time</span>
              <span className="text-sm text-gray-600">3-5 business days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Application ID</span>
              <span className="text-sm font-mono text-gray-600">#MER-2024-001234</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base text-blue-900">What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">1. Application Review</p>
                <p className="text-xs text-blue-700">Our team will review your application within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">2. Document Verification</p>
                <p className="text-xs text-blue-700">We'll verify all submitted documents</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">3. Account Activation</p>
                <p className="text-xs text-blue-700">Your merchant account will be activated and ready to use</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-base text-gray-900">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            If you have any questions about your application or need to make changes, contact our support team.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-100">
              Contact Support
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-100">
              Download Application
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
