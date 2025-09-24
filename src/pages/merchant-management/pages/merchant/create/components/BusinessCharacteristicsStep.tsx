import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Schema untuk Business Characteristics
const businessCharacteristicsSchema = z.object({
  businessModel: z.string().min(1, 'Please select business model'),
  corporateTaxType: z.string().min(1, 'Please select tax type'),
  currentMonthlySales: z.number().min(0, 'Current monthly sales must be positive'),
  estimatedMonthlySales: z.number().min(0, 'Estimated monthly sales must be positive'),
  averageEstimatedRevenue: z.number().min(0, 'Average estimated revenue must be positive'),
  transferService: z.boolean(),
  transferUseCase: z.string().optional(),
  transferVolume: z.string().optional(),
});

type BusinessCharacteristicsFormValues = z.infer<typeof businessCharacteristicsSchema>;

interface BusinessCharacteristicsStepProps {
  onNext: (data: BusinessCharacteristicsFormValues) => void;
  onPrevious: () => void;
  initialData?: Partial<BusinessCharacteristicsFormValues>;
}

const businessModels = [
  { value: 'b2b', label: 'B2B (Business to Business)' },
  { value: 'b2c', label: 'B2C (Business to Consumer)' },
  { value: 'b2b2c', label: 'B2B2C (Business to Business to Consumer)' },
  { value: 'marketplace', label: 'Marketplace' },
];

const taxTypes = [
  { value: 'pph21', label: 'PPh 21' },
  { value: 'pph23', label: 'PPh 23' },
  { value: 'ppn', label: 'PPN' },
  { value: 'other', label: 'Other' },
];

const transferUseCases = [
  { value: 'payroll', label: 'Payroll' },
  { value: 'vendor-payment', label: 'Vendor Payment' },
  { value: 'customer-refund', label: 'Customer Refund' },
  { value: 'other', label: 'Other' },
];

const transferVolumes = [
  { value: 'less-than-100', label: 'Less than 100' },
  { value: '100-500', label: '100 - 500' },
  { value: '500-1000', label: '500 - 1,000' },
  { value: 'more-than-1000', label: 'More than 1,000' },
];

export function BusinessCharacteristicsStep({ onNext, onPrevious, initialData }: BusinessCharacteristicsStepProps) {
  const form = useForm<BusinessCharacteristicsFormValues>({
    resolver: zodResolver(businessCharacteristicsSchema),
    defaultValues: {
      businessModel: '',
      corporateTaxType: '',
      currentMonthlySales: 0,
      estimatedMonthlySales: 0,
      averageEstimatedRevenue: 0,
      transferService: false,
      transferUseCase: '',
      transferVolume: '',
      ...initialData,
    },
  });

  const transferServiceEnabled = form.watch('transferService');

  const onSubmit = (values: BusinessCharacteristicsFormValues) => {
    onNext(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-6 bg-blue-500 text-white rounded text-sm flex items-center justify-center font-medium">
            2
          </div>
          Business Characteristics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Characteristic Info Section */}
          <div>
            <h3 className="text-sm font-medium mb-4">1. Characteristic Info</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Business Model */}
                <FormField
                  control={form.control}
                  name="businessModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessModels.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Corporate Tax Type */}
                <FormField
                  control={form.control}
                  name="corporateTaxType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Corporate Tax Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tax type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {taxTypes.map((tax) => (
                            <SelectItem key={tax.value} value={tax.value}>
                              {tax.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          {/* Sales & Revenue Section */}
          <div>
            <h3 className="text-sm font-medium mb-4">2. Sales & Revenue</h3>
            <Form {...form}>
              <form className="space-y-6">
                {/* Current Monthly Sales */}
                <FormField
                  control={form.control}
                  name="currentMonthlySales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Monthly Sales</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                            <span className="text-sm font-medium">IDR</span>
                          </div>
                          <Input 
                            type="number"
                            placeholder="0"
                            {...field} 
                            className="rounded-l-none border-l-0"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Estimated Monthly Sales */}
                <FormField
                  control={form.control}
                  name="estimatedMonthlySales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Monthly Sales</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                            <span className="text-sm font-medium">IDR</span>
                          </div>
                          <Input 
                            type="number"
                            placeholder="0"
                            {...field} 
                            className="rounded-l-none border-l-0"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Average Estimated Revenue */}
                <FormField
                  control={form.control}
                  name="averageEstimatedRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Estimated Revenue</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                            <span className="text-sm font-medium">IDR</span>
                          </div>
                          <Input 
                            type="number"
                            placeholder="0"
                            {...field} 
                            className="rounded-l-none border-l-0"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          {/* Transfer Characteristics Section */}
          <div>
            <h3 className="text-sm font-medium mb-4">3. Transfer Characteristics</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Transfer Service */}
                <FormField
                  control={form.control}
                  name="transferService"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Transfer Service</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          My business use transfer service
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Transfer Use Case - shown only when transfer service is enabled */}
                {transferServiceEnabled && (
                  <FormField
                    control={form.control}
                    name="transferUseCase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transfer Use Case</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transfer use case" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {transferUseCases.map((useCase) => (
                              <SelectItem key={useCase.value} value={useCase.value}>
                                {useCase.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Transfer Volume - shown only when transfer service is enabled */}
                {transferServiceEnabled && (
                  <FormField
                    control={form.control}
                    name="transferVolume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transfer Volume</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transfer volume" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {transferVolumes.map((volume) => (
                              <SelectItem key={volume.value} value={volume.value}>
                                {volume.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel Creation
                  </button>
                  
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Next Section
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
