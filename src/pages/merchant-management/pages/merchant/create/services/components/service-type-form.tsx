import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CreditCard, Rocket } from 'lucide-react';

const serviceTypeSchema = z.object({
  enablePaymentGateway: z.boolean().default(true),
  enableDisbursementService: z.boolean().default(true),
  paymentGatewayDirectAPI: z.boolean().default(true),
  paymentGatewayNonIntegration: z.boolean().default(true),
  disbursementDirectAPI: z.boolean().default(true),
  disbursementNonIntegration: z.boolean().default(false),
});

type ServiceTypeFormData = z.infer<typeof serviceTypeSchema>;

export function ServiceTypeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ServiceTypeFormData>({
    resolver: zodResolver(serviceTypeSchema),
    defaultValues: {
      enablePaymentGateway: true,
      enableDisbursementService: true,
      paymentGatewayDirectAPI: true,
      paymentGatewayNonIntegration: true,
      disbursementDirectAPI: true,
      disbursementNonIntegration: false,
    },
  });

  const onSubmit = (data: ServiceTypeFormData) => {
    console.log('Service Type Data:', data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Service Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">
              Choose service you want to use (at least 1 service is enabled)
            </p>
          </div>

          {/* Payment Gateway */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Payment Gateway</h3>
                  <p className="text-sm text-gray-600">Enable to use Payment Gateway Service</p>
                </div>
              </div>
              <Switch
                checked={watch('enablePaymentGateway')}
                onCheckedChange={(checked) => setValue('enablePaymentGateway', checked)}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            {watch('enablePaymentGateway') && (
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Payment Gateway Services</h4>
                  <p className="text-sm text-gray-600">Chose service (at least 1 service is enabled)</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="paymentGatewayDirectAPI"
                      checked={watch('paymentGatewayDirectAPI')}
                      onCheckedChange={(checked) => setValue('paymentGatewayDirectAPI', checked as boolean)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="paymentGatewayDirectAPI" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Direct API Integration
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">Integration platform to Payment Gateway Service</p>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="paymentGatewayNonIntegration"
                      checked={watch('paymentGatewayNonIntegration')}
                      onCheckedChange={(checked) => setValue('paymentGatewayNonIntegration', checked as boolean)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="paymentGatewayNonIntegration" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Non-Integration
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">Using [our brand name] provided dashboard</p>
                </div>
              </div>
            )}
          </div>

          {/* Disbursement Service */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Disbursement Service</h3>
                  <p className="text-sm text-gray-600">Enable to use Disbursement Service</p>
                </div>
              </div>
              <Switch
                checked={watch('enableDisbursementService')}
                onCheckedChange={(checked) => setValue('enableDisbursementService', checked)}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            {watch('enableDisbursementService') && (
              <div className="ml-4 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Payment Disbursement Services</h4>
                  <p className="text-sm text-gray-600">Chose service (at least 1 service is enabled)</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="disbursementDirectAPI"
                      checked={watch('disbursementDirectAPI')}
                      onCheckedChange={(checked) => setValue('disbursementDirectAPI', checked as boolean)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="disbursementDirectAPI" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Direct API Integration
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">Integration platform to Disbursement Service</p>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="disbursementNonIntegration"
                      checked={watch('disbursementNonIntegration')}
                      onCheckedChange={(checked) => setValue('disbursementNonIntegration', checked as boolean)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="disbursementNonIntegration" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Non-Integration
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">Using [our brand name] provided dashboard</p>
                </div>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
