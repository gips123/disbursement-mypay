import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, FileText, AlertCircle, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { MerchantHeader } from '../../components';
import { mockData } from '../../mocks/merchant.mock';
import { formatDate, formatRelativeTime } from '../../utils/merchant.helper';

export function MerchantReviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [reviewNote, setReviewNote] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'reject' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // For demo purposes, using mock data. In production, use the actual query
  const reviewData = id ? mockData.getMerchantReview(id) : null;
  
  if (!reviewData) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Review request not found</div>
        </div>
      </div>
    );
  }

  const { merchant, review } = reviewData;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getKYCStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewDecision) {
      toast.error('Please select a review decision');
      return;
    }

    if (!reviewNote.trim()) {
      toast.error('Please provide review notes');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Merchant ${reviewDecision === 'approve' ? 'approved' : 'rejected'} successfully`);
      navigate('/merchant-management/merchant-review');
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  };

  const handleSubmit = () => {
    if (!reviewDecision || !reviewNote.trim()) {
      toast.error('Please complete all required fields');
      return;
    }
    setShowConfirmDialog(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/merchant-management/merchant-review')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Review Queue
        </Button>
      </div>

      {/* Header */}
      <MerchantHeader
        title={`Review: ${merchant.business.name}`}
        subtitle={`${review.type} • Submitted ${formatRelativeTime(review.submittedAt)}`}
      >
        <div className="flex items-center gap-3">
          <Badge variant={review.status === 'pending' ? 'warning' : 'secondary'} className="gap-1">
            {getStatusIcon(review.status)}
            {review.status}
          </Badge>
          <Badge variant="outline">
            Priority: {review.priority}
          </Badge>
        </div>
      </MerchantHeader>

      {/* Review Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="changes">Changes</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Review Type</Label>
                    <p className="text-sm text-gray-900 capitalize">{review.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Reason</Label>
                    <p className="text-sm text-gray-900">{review.reason}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Submitted By</Label>
                    <p className="text-sm text-gray-900">{review.submittedBy}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Submitted At</Label>
                    <p className="text-sm text-gray-900">{formatDate(review.submittedAt)}</p>
                  </div>
                  {review.description && (
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {review.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Merchant Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Merchant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Business Name</Label>
                      <p className="text-sm text-gray-900">{merchant.business.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Business Type</Label>
                      <p className="text-sm text-gray-900">{merchant.business.businessType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-gray-900">{merchant.contact.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm text-gray-900">{merchant.contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Current Status</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(merchant.status.label)}
                        <Badge variant={merchant.status.color}>
                          {merchant.status.label}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">KYC Status</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {getKYCStatusIcon(merchant.compliance.kycStatus)}
                        <span className="text-sm capitalize">{merchant.compliance.kycStatus}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Submitted Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(merchant.compliance.documents).map(([type, url]) => (
                      <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium capitalize">
                              {type.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            {url && (
                              <p className="text-xs text-gray-500">Uploaded</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {url ? (
                            <>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="h-3 w-3" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Download className="h-3 w-3" />
                                Download
                              </Button>
                            </>
                          ) : (
                            <Badge variant="destructive">Missing</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Changes Tab */}
            <TabsContent value="changes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proposed Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  {review.changes && review.changes.length > 0 ? (
                    <div className="space-y-4">
                      {review.changes.map((change: any, index: number) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{change.field}</h4>
                            <Badge variant="outline">{change.type}</Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            {change.oldValue && (
                              <div className="mb-1">
                                <span className="text-red-600">- {change.oldValue}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-green-600">+ {change.newValue}</span>
                            </div>
                          </div>
                          {change.reason && (
                            <p className="text-xs text-gray-600 mt-1">
                              Reason: {change.reason}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No changes to review</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {review.history.map((entry: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{entry.action}</p>
                            <p className="text-xs text-gray-500">
                              {formatRelativeTime(entry.timestamp)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">{entry.details}</p>
                          <p className="text-xs text-gray-500">by {entry.performedBy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Review Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="decision" className="text-sm font-medium">
                  Decision *
                </Label>
                <Select value={reviewDecision} onValueChange={(value: 'approve' | 'reject') => setReviewDecision(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Approve
                      </div>
                    </SelectItem>
                    <SelectItem value="reject">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        Reject
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium">
                  Review Notes *
                </Label>
                <Textarea
                  id="notes"
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Provide detailed review notes..."
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {reviewNote.length}/500 characters
                </p>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={!reviewDecision || !reviewNote.trim()}
                >
                  Submit Review
                </Button>
              </div>

              {/* Review Info */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Review will be permanently recorded</p>
                <p>• Merchant will be notified of the decision</p>
                <p>• This action cannot be undone</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {reviewDecision === 'approve' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              Confirm {reviewDecision === 'approve' ? 'Approval' : 'Rejection'}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {reviewDecision} this merchant review? 
              This action cannot be undone and the merchant will be notified immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Review Summary:</h4>
              <p className="text-sm"><strong>Merchant:</strong> {merchant.business.name}</p>
              <p className="text-sm"><strong>Decision:</strong> {reviewDecision}</p>
              <p className="text-sm"><strong>Notes:</strong> {reviewNote}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReviewSubmit}
              disabled={isSubmitting}
              variant={reviewDecision === 'approve' ? 'primary' : 'destructive'}
            >
              {isSubmitting ? 'Submitting...' : `Confirm ${reviewDecision === 'approve' ? 'Approval' : 'Rejection'}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MerchantReviewPage;
