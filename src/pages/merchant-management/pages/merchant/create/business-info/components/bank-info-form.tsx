import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard } from 'lucide-react';

const bankInfoSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  accountName: z.string().min(1, 'Account name is required'),
});

type BankInfoFormData = z.infer<typeof bankInfoSchema>;

export function BankInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BankInfoFormData>({
    resolver: zodResolver(bankInfoSchema),
  });

  const onSubmit = (data: BankInfoFormData) => {
    console.log('Bank Info Data:', data);
  };

  const banks = [
    { name: 'Bank Mandiri', code: '008' },
    { name: 'Bank Rakyat Indonesia (BRI)', code: '002' },
    { name: 'Bank Central Asia (BCA)', code: '014' },
    { name: 'Bank Negara Indonesia (BNI)', code: '009' },
    { name: 'Bank CIMB Niaga', code: '022' },
    { name: 'Bank Danamon', code: '011' },
    { name: 'Bank Permata', code: '013' },
    { name: 'Bank Maybank Indonesia', code: '016' },
    { name: 'Bank OCBC NISP', code: '028' },
    { name: 'Bank Panin', code: '019' },
    { name: 'Bank UOB Indonesia', code: '023' },
    { name: 'Bank BTPN', code: '213' },
    { name: 'Bank BCA Syariah', code: '536' },
    { name: 'Bank Mandiri Syariah', code: '451' },
    { name: 'Bank BRI Syariah', code: '422' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Bank Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bankName">
              Bank Name / Code <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(value) => setValue('bankName', value)}>
              <SelectTrigger className={errors.bankName ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select or search bank name / code" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.code} value={bank.name}>
                    {bank.name} ({bank.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.bankName && (
              <p className="text-sm text-red-500">{errors.bankName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">
                Account Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="accountNumber"
                {...register('accountNumber')}
                placeholder="Input account number."
                className={errors.accountNumber ? 'border-red-500' : ''}
              />
              {errors.accountNumber && (
                <p className="text-sm text-red-500">{errors.accountNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">
                Account Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="accountName"
                {...register('accountName')}
                placeholder="Input account name."
                className={errors.accountName ? 'border-red-500' : ''}
              />
              {errors.accountName && (
                <p className="text-sm text-red-500">{errors.accountName.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
