import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Settings, CreditCard, DollarSign, Shield, Clock } from 'lucide-react';

const servicesSchema = z.object({
  // Payment Services
  enablePaymentGateway: z.boolean().default(false),
  enableVirtualAccount: z.boolean().default(false),
  enableEwallet: z.boolean().default(false),
  enableQRCode: z.boolean().default(false),
  
  // Business Settings
  businessModel: z.string().min(1, 'Business model is required'),
  monthlyTransactionLimit: z.string().min(1, 'Monthly transaction limit is required'),
  dailyTransactionLimit: z.string().min(1, 'Daily transaction limit is required'),
  currency: z.string().default('IDR'),
  
  // Fee Structure
  transactionFee: z.string().optional(),
  setupFee: z.string().optional(),
  monthlyFee: z.string().optional(),
  
  // Security Settings
  enableTwoFactorAuth: z.boolean().default(true),
  enableSMSNotification: z.boolean().default(true),
  enableEmailNotification: z.boolean().default(true),
  
  // Settlement
  settlementFrequency: z.string().min(1, 'Settlement frequency is required'),
  settlementAccount: z.string().min(1, 'Settlement account is required'),
  
  // Additional Settings
  enableRefunds: z.boolean().default(true),
  enableChargebacks: z.boolean().default(true),
  autoSettlement: z.boolean().default(false),
  notes: z.string().optional(),
});

type ServicesFormData = z.infer<typeof servicesSchema>;

export function ServicesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ServicesFormData>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      enableTwoFactorAuth: true,
      enableSMSNotification: true,
      enableEmailNotification: true,
      enableRefunds: true,
      enableChargebacks: true,
      currency: 'IDR',
    },
  });

  const onSubmit = (data: ServicesFormData) => {
    console.log('Services Data:', data);
    // Handle form submission
  };

  const businessModels = [
    'B2B (Business to Business)',
    'B2C (Business to Consumer)',
    'C2C (Consumer to Consumer)',
    'B2B2C (Business to Business to Consumer)',
    'Marketplace',
    'Subscription',
  ];

  const settlementFrequencies = [
    'Daily',
    'Weekly',
    'Bi-weekly',
    'Monthly',
  ];

  const transactionLimits = [
    '1,000,000 IDR',
    '5,000,000 IDR',
    '10,000,000 IDR',
    '50,000,000 IDR',
    '100,000,000 IDR',
    '500,000,000 IDR',
    '1,000,000,000 IDR',
    'Custom',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Service Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Payment Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Services</h3>
            <p className="text-sm text-gray-600">
              Select the payment services you want to enable for your merchant account.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="enablePaymentGateway"
                  checked={watch('enablePaymentGateway')}
                  onCheckedChange={(checked) => setValue('enablePaymentGateway', checked)}
                />
                <Label htmlFor="enablePaymentGateway" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Gateway
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableVirtualAccount"
                  checked={watch('enableVirtualAccount')}
                  onCheckedChange={(checked) => setValue('enableVirtualAccount', checked)}
                />
                <Label htmlFor="enableVirtualAccount" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Virtual Account
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableEwallet"
                  checked={watch('enableEwallet')}
                  onCheckedChange={(checked) => setValue('enableEwallet', checked)}
                />
                <Label htmlFor="enableEwallet" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  E-Wallet
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableQRCode"
                  checked={watch('enableQRCode')}
                  onCheckedChange={(checked) => setValue('enableQRCode', checked)}
                />
                <Label htmlFor="enableQRCode" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  QR Code Payment
                </Label>
              </div>
            </div>
          </div>

          {/* Business Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Business Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessModel">
                  Business Model <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('businessModel', value)}>
                  <SelectTrigger className={errors.businessModel ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select business model" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.businessModel && (
                  <p className="text-sm text-red-500">{errors.businessModel.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select onValueChange={(value) => setValue('currency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDR">IDR (Indonesian Rupiah)</SelectItem>
                    <SelectItem value="USD">USD (US Dollar)</SelectItem>
                    <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyTransactionLimit">
                  Monthly Transaction Limit <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('monthlyTransactionLimit', value)}>
                  <SelectTrigger className={errors.monthlyTransactionLimit ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select monthly limit" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionLimits.map((limit) => (
                      <SelectItem key={limit} value={limit}>
                        {limit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.monthlyTransactionLimit && (
                  <p className="text-sm text-red-500">{errors.monthlyTransactionLimit.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyTransactionLimit">
                  Daily Transaction Limit <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('dailyTransactionLimit', value)}>
                  <SelectTrigger className={errors.dailyTransactionLimit ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select daily limit" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionLimits.map((limit) => (
                      <SelectItem key={limit} value={limit}>
                        {limit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.dailyTransactionLimit && (
                  <p className="text-sm text-red-500">{errors.dailyTransactionLimit.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Fee Structure */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Fee Structure</h3>
            <p className="text-sm text-gray-600">
              Configure the fee structure for your merchant account.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transactionFee">Transaction Fee (%)</Label>
                <Input
                  id="transactionFee"
                  {...register('transactionFee')}
                  placeholder="2.5"
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="setupFee">Setup Fee (IDR)</Label>
                <Input
                  id="setupFee"
                  {...register('setupFee')}
                  placeholder="500000"
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyFee">Monthly Fee (IDR)</Label>
                <Input
                  id="monthlyFee"
                  {...register('monthlyFee')}
                  placeholder="100000"
                  type="number"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableTwoFactorAuth"
                  checked={watch('enableTwoFactorAuth')}
                  onCheckedChange={(checked) => setValue('enableTwoFactorAuth', checked)}
                />
                <Label htmlFor="enableTwoFactorAuth" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Two-Factor Authentication
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableSMSNotification"
                  checked={watch('enableSMSNotification')}
                  onCheckedChange={(checked) => setValue('enableSMSNotification', checked)}
                />
                <Label htmlFor="enableSMSNotification" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  SMS Notifications
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableEmailNotification"
                  checked={watch('enableEmailNotification')}
                  onCheckedChange={(checked) => setValue('enableEmailNotification', checked)}
                />
                <Label htmlFor="enableEmailNotification" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Email Notifications
                </Label>
              </div>
            </div>
          </div>

          {/* Settlement */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Settlement Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="settlementFrequency">
                  Settlement Frequency <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('settlementFrequency', value)}>
                  <SelectTrigger className={errors.settlementFrequency ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select settlement frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {settlementFrequencies.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.settlementFrequency && (
                  <p className="text-sm text-red-500">{errors.settlementFrequency.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="settlementAccount">
                  Settlement Account <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="settlementAccount"
                  {...register('settlementAccount')}
                  placeholder="Enter settlement account number"
                  className={errors.settlementAccount ? 'border-red-500' : ''}
                />
                {errors.settlementAccount && (
                  <p className="text-sm text-red-500">{errors.settlementAccount.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="autoSettlement"
                checked={watch('autoSettlement')}
                onCheckedChange={(checked) => setValue('autoSettlement', checked)}
              />
              <Label htmlFor="autoSettlement">
                Enable automatic settlement
              </Label>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableRefunds"
                  checked={watch('enableRefunds')}
                  onCheckedChange={(checked) => setValue('enableRefunds', checked)}
                />
                <Label htmlFor="enableRefunds">
                  Enable refunds
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableChargebacks"
                  checked={watch('enableChargebacks')}
                  onCheckedChange={(checked) => setValue('enableChargebacks', checked)}
                />
                <Label htmlFor="enableChargebacks">
                  Enable chargebacks
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Add any additional notes or special requirements..."
                rows={3}
              />
            </div>
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
