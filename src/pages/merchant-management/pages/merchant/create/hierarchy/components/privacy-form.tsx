import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, FileText, Eye, Lock } from 'lucide-react';

const privacySchema = z.object({
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  acceptPrivacyPolicy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
  acceptDataProcessing: z.boolean().refine(val => val === true, 'You must accept data processing agreement'),
  enableMarketing: z.boolean().default(false),
  enableAnalytics: z.boolean().default(true),
  dataRetentionPeriod: z.string().min(1, 'Data retention period is required'),
  consentNotes: z.string().optional(),
});

type PrivacyFormData = z.infer<typeof privacySchema>;

export function PrivacyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PrivacyFormData>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      enableAnalytics: true,
    },
  });

  const onSubmit = (data: PrivacyFormData) => {
    console.log('Privacy Data:', data);
    // Handle form submission
  };

  const dataRetentionPeriods = [
    '1 year',
    '2 years',
    '3 years',
    '5 years',
    '7 years',
    '10 years',
    'Indefinitely',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy & Terms Agreement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Terms and Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Terms and Conditions</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptTerms"
                  checked={watch('acceptTerms')}
                  onCheckedChange={(checked) => setValue('acceptTerms', checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="acceptTerms" className="text-base font-medium">
                    I accept the Terms and Conditions <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600">
                    By checking this box, you agree to our terms of service and merchant agreement.
                  </p>
                  <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                    <FileText className="h-4 w-4 mr-1" />
                    Read Terms and Conditions
                  </Button>
                </div>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
              )}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptPrivacyPolicy"
                  checked={watch('acceptPrivacyPolicy')}
                  onCheckedChange={(checked) => setValue('acceptPrivacyPolicy', checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="acceptPrivacyPolicy" className="text-base font-medium">
                    I accept the Privacy Policy <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600">
                    You acknowledge that you have read and understood our privacy policy.
                  </p>
                  <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                    <Eye className="h-4 w-4 mr-1" />
                    Read Privacy Policy
                  </Button>
                </div>
              </div>
              {errors.acceptPrivacyPolicy && (
                <p className="text-sm text-red-500">{errors.acceptPrivacyPolicy.message}</p>
              )}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptDataProcessing"
                  checked={watch('acceptDataProcessing')}
                  onCheckedChange={(checked) => setValue('acceptDataProcessing', checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="acceptDataProcessing" className="text-base font-medium">
                    I accept the Data Processing Agreement <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-600">
                    You consent to the processing of your personal data as described in our data processing agreement.
                  </p>
                  <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                    <Lock className="h-4 w-4 mr-1" />
                    Read Data Processing Agreement
                  </Button>
                </div>
              </div>
              {errors.acceptDataProcessing && (
                <p className="text-sm text-red-500">{errors.acceptDataProcessing.message}</p>
              )}
            </div>
          </div>

          {/* Marketing and Analytics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Marketing and Analytics</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableMarketing"
                  checked={watch('enableMarketing')}
                  onCheckedChange={(checked) => setValue('enableMarketing', checked)}
                />
                <Label htmlFor="enableMarketing">
                  I consent to receive marketing communications and promotional materials
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableAnalytics"
                  checked={watch('enableAnalytics')}
                  onCheckedChange={(checked) => setValue('enableAnalytics', checked)}
                />
                <Label htmlFor="enableAnalytics">
                  I consent to data collection for analytics and service improvement
                </Label>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Data Retention</h3>
            
            <div className="space-y-2">
              <Label htmlFor="dataRetentionPeriod">
                Data Retention Period <span className="text-red-500">*</span>
              </Label>
              <select
                id="dataRetentionPeriod"
                {...register('dataRetentionPeriod')}
                className={`w-full px-3 py-2 border rounded-md ${errors.dataRetentionPeriod ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select retention period</option>
                {dataRetentionPeriods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
              {errors.dataRetentionPeriod && (
                <p className="text-sm text-red-500">{errors.dataRetentionPeriod.message}</p>
              )}
              <p className="text-sm text-gray-600">
                How long should we retain your data after account closure?
              </p>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Consent Notes</h3>
            
            <div className="space-y-2">
              <Label htmlFor="consentNotes">Notes</Label>
              <Textarea
                id="consentNotes"
                {...register('consentNotes')}
                placeholder="Add any additional notes or special consent requirements..."
                rows={4}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Consent Summary</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• You have read and understood our terms and conditions</li>
              <li>• You consent to the processing of your personal data</li>
              <li>• You understand your rights regarding data protection</li>
              <li>• You can withdraw consent at any time by contacting us</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save & Continue'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
