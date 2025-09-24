import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, AlertCircle, HelpCircle, Download } from 'lucide-react';

export function DocumentsSummary() {
  const isCompleted = true; // This would come from form state
  const hasErrors = false; // This would come from form validation
  const uploadedCount = 4; // This would come from form state
  const totalRequired = 5;

  return (
    <div className="space-y-5">
      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Business License</span>
              <Badge variant={uploadedCount >= 1 ? 'default' : 'secondary'}>
                {uploadedCount >= 1 ? 'Uploaded' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tax ID (NPWP)</span>
              <Badge variant={uploadedCount >= 2 ? 'default' : 'secondary'}>
                {uploadedCount >= 2 ? 'Uploaded' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Company Deed</span>
              <Badge variant={uploadedCount >= 3 ? 'default' : 'secondary'}>
                {uploadedCount >= 3 ? 'Uploaded' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bank Statement</span>
              <Badge variant={uploadedCount >= 4 ? 'default' : 'secondary'}>
                {uploadedCount >= 4 ? 'Uploaded' : 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">PIC ID Card</span>
              <Badge variant={uploadedCount >= 5 ? 'default' : 'secondary'}>
                {uploadedCount >= 5 ? 'Uploaded' : 'Pending'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600 mb-2">
              {uploadedCount} of {totalRequired} required documents uploaded
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(uploadedCount / totalRequired) * 100}%` }}
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
                ? 'All required documents have been uploaded.'
                : `${totalRequired - uploadedCount} more documents required.`
            }
          </p>
        </CardContent>
      </Card>

      {/* Document Guidelines */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-base text-yellow-900">Document Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• All documents must be clear and readable</li>
            <li>• Maximum file size: 10MB per document</li>
            <li>• Accepted formats: PDF, JPG, PNG</li>
            <li>• Documents must be valid and up-to-date</li>
          </ul>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base text-blue-900">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-4">
            Contact our support team if you need assistance with document upload.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-100">
              Contact Support
            </Button>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-100">
              <Download className="h-4 w-4 mr-1" />
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
