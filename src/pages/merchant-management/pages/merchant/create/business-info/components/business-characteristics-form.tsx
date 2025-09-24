import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { BarChart3, TrendingUp, ArrowRightLeft } from 'lucide-react';

const businessCharacteristicsSchema = z.object({
  businessModel: z.string().min(1, 'Business model is required'),
  corporateTaxType: z.string().min(1, 'Corporate tax type is required'),
  currentMonthlySales: z.number().min(0, 'Current monthly sales must be positive'),
  estimatedMonthlySales: z.number().min(0, 'Estimated monthly sales must be positive'),
  averageEstimatedRevenue: z.number().min(0, 'Average estimated revenue must be positive'),
  useTransferService: z.boolean(),
  transferUseCase: z.string().optional(),
  transferVolume: z.string().optional(),
});

type BusinessCharacteristicsFormData = z.infer<typeof businessCharacteristicsSchema>;

export function BusinessCharacteristicsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BusinessCharacteristicsFormData>({
    resolver: zodResolver(businessCharacteristicsSchema),
    defaultValues: {
      currentMonthlySales: 0,
      estimatedMonthlySales: 0,
      averageEstimatedRevenue: 0,
      useTransferService: true,
    },
  });

  const onSubmit = (data: BusinessCharacteristicsFormData) => {
    console.log('Business Characteristics Data:', data);
  };

  const businessModels = [
    'B2B (Business to Business)',
    'B2C (Business to Consumer)',
    'B2B2C (Business to Business to Consumer)',
    'C2C (Consumer to Consumer)',
    'Marketplace',
    'Subscription',
    'Freemium',
    'Other',
  ];

  const taxTypes = [
    'Corporate Tax',
    'Personal Tax',
    'VAT (Value Added Tax)',
    'Sales Tax',
    'No Tax',
    'Other',
  ];

  const transferUseCases = [
    'Payroll',
    'Supplier Payments',
    'Customer Refunds',
    'Internal Transfers',
    'Investment',
    'Emergency Fund',
    'Other',
  ];

  const transferVolumes = [
    'Low (1-10 transactions/month)',
    'Medium (11-50 transactions/month)',
    'High (51-100 transactions/month)',
    'Very High (100+ transactions/month)',
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Business Characteristics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Characteristic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">1. Characteristic Info</h3>
            
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
                <Label htmlFor="corporateTaxType">
                  Corporate Tax Type <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('corporateTaxType', value)}>
                  <SelectTrigger className={errors.corporateTaxType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select tax type" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.corporateTaxType && (
                  <p className="text-sm text-red-500">{errors.corporateTaxType.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sales & Revenue */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">2. Sales & Revenue</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentMonthlySales">
                  Current Monthly Sales <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    IDR
                  </span>
                  <Input
                    id="currentMonthlySales"
                    type="number"
                    {...register('currentMonthlySales', { valueAsNumber: true })}
                    placeholder="0"
                    className={`pl-12 ${errors.currentMonthlySales ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.currentMonthlySales && (
                  <p className="text-sm text-red-500">{errors.currentMonthlySales.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedMonthlySales">
                  Estimated Monthly Sales <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    IDR
                  </span>
                  <Input
                    id="estimatedMonthlySales"
                    type="number"
                    {...register('estimatedMonthlySales', { valueAsNumber: true })}
                    placeholder="0"
                    className={`pl-12 ${errors.estimatedMonthlySales ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.estimatedMonthlySales && (
                  <p className="text-sm text-red-500">{errors.estimatedMonthlySales.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageEstimatedRevenue">
                  Average Estimated Revenue <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    IDR
                  </span>
                  <Input
                    id="averageEstimatedRevenue"
                    type="number"
                    {...register('averageEstimatedRevenue', { valueAsNumber: true })}
                    placeholder="0"
                    className={`pl-12 ${errors.averageEstimatedRevenue ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.averageEstimatedRevenue && (
                  <p className="text-sm text-red-500">{errors.averageEstimatedRevenue.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Transfer Characteristics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">3. Transfer Characteristics</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="useTransferService"
                checked={watch('useTransferService')}
                onCheckedChange={(checked) => setValue('useTransferService', checked)}
              />
              <Label htmlFor="useTransferService" className="text-sm font-medium">
                My business use transfer service
              </Label>
            </div>

            {watch('useTransferService') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transferUseCase">Transfer Use Case</Label>
                  <Select onValueChange={(value) => setValue('transferUseCase', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transfer use case" />
                    </SelectTrigger>
                    <SelectContent>
                      {transferUseCases.map((useCase) => (
                        <SelectItem key={useCase} value={useCase}>
                          {useCase}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transferVolume">Transfer Volume</Label>
                  <Select onValueChange={(value) => setValue('transferVolume', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transfer volume" />
                    </SelectTrigger>
                    <SelectContent>
                      {transferVolumes.map((volume) => (
                        <SelectItem key={volume} value={volume}>
                          {volume}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
