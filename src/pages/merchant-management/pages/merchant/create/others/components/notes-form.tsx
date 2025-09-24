import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FileCheck, AlertCircle, CheckCircle, Info } from 'lucide-react';

const notesSchema = z.object({
  reviewNotes: z.string().optional(),
  specialInstructions: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  priority: z.string().default('normal'),
  estimatedProcessingTime: z.string().optional(),
});

type NotesFormData = z.infer<typeof notesSchema>;

export function NotesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<NotesFormData>({
    resolver: zodResolver(notesSchema),
    defaultValues: {
      priority: 'normal',
    },
  });

  const onSubmit = (data: NotesFormData) => {
    console.log('Notes Data:', data);
    // Handle final submission
  };

  const priorities = [
    { value: 'low', label: 'Low Priority' },
    { value: 'normal', label: 'Normal Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const processingTimes = [
    '1-2 business days',
    '3-5 business days',
    '1 week',
    '2 weeks',
    '1 month',
  ];

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Application Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-green-900">Application Complete</h3>
              </div>
              <p className="text-sm text-green-800">
                All required information has been provided and your merchant application is ready for submission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Application Summary</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Business Information: Complete</li>
                  <li>• PIC Information: Complete</li>
                  <li>• Required Documents: Complete</li>
                  <li>• Service Configuration: Complete</li>
                  <li>• Privacy & Terms: Complete</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Next Steps</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Application will be reviewed</li>
                  <li>• Verification process will begin</li>
                  <li>• You'll receive email updates</li>
                  <li>• Account activation within 3-5 days</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes Form */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Review Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review Notes</h3>
              
              <div className="space-y-2">
                <Label htmlFor="reviewNotes">Review Notes</Label>
                <Textarea
                  id="reviewNotes"
                  {...register('reviewNotes')}
                  placeholder="Add any final notes or comments about your application..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  {...register('specialInstructions')}
                  placeholder="Any special instructions or requirements for your merchant account..."
                  rows={3}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    {...register('contactPerson')}
                    placeholder="Enter contact person name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    {...register('contactPhone')}
                    placeholder="+62 812 3456 7890"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register('contactEmail')}
                  placeholder="contact@company.com"
                  className={errors.contactEmail ? 'border-red-500' : ''}
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
                )}
              </div>
            </div>

            {/* Processing Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Processing Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <select
                    id="priority"
                    {...register('priority')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedProcessingTime">Estimated Processing Time</Label>
                  <select
                    id="estimatedProcessingTime"
                    {...register('estimatedProcessingTime')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select processing time</option>
                    {processingTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Final Confirmation */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Important Notice</h4>
                  <p className="text-sm text-yellow-800">
                    By submitting this application, you confirm that all information provided is accurate and complete. 
                    Any false information may result in application rejection or account termination.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
