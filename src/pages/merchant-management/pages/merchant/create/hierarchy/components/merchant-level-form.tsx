import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Building } from 'lucide-react';

const merchantLevelSchema = z.object({
  merchantLevel: z.string().min(1, 'Merchant level is required'),
});

type MerchantLevelFormData = z.infer<typeof merchantLevelSchema>;

export function MerchantLevelForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<MerchantLevelFormData>({
    resolver: zodResolver(merchantLevelSchema),
    defaultValues: {
      merchantLevel: 'level-1',
    },
  });

  const onSubmit = (data: MerchantLevelFormData) => {
    console.log('Merchant Level Data:', data);
  };

  const merchantLevels = [
    {
      value: 'level-0',
      label: 'Level 0 (Grand-Parent Merchant)',
      description: 'Top-level merchant. Doesn\'t have a parent merchant above.',
    },
    {
      value: 'level-1',
      label: 'Level 1 (Parent Merchant)',
      description: 'Has a parent (Level 0). Can have child merchants.',
    },
    {
      value: 'level-2',
      label: 'Level 2 (Child Merchant)',
      description: 'Has a parent (Level 1). Can have child merchants.',
    },
    {
      value: 'level-3',
      label: 'Level 3 (Grand-Child Merchant)',
      description: 'Has a parent (Level 2). Cannot have child merchants below.',
    },
  ];

  const selectedLevel = merchantLevels.find(level => level.value === watch('merchantLevel'));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Merchant Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="merchantLevel">
              Merchant Level <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(value) => setValue('merchantLevel', value)} defaultValue="level-1">
              <SelectTrigger className={errors.merchantLevel ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select merchant level" />
              </SelectTrigger>
              <SelectContent>
                {merchantLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.merchantLevel && (
              <p className="text-sm text-red-500">{errors.merchantLevel.message}</p>
            )}
          </div>

          {selectedLevel && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{selectedLevel.description}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
