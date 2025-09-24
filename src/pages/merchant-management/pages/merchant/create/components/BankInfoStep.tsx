import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Schema untuk Bank Info
const bankInfoSchema = z.object({
  bankNameCode: z.string().min(1, 'Please select bank name / code'),
  accountNumber: z.string().min(8, 'Valid account number is required'),
  accountName: z.string().min(2, 'Account name is required'),
});

type BankInfoFormValues = z.infer<typeof bankInfoSchema>;

interface BankInfoStepProps {
  onNext: (data: BankInfoFormValues) => void;
  onPrevious: () => void;
  initialData?: Partial<BankInfoFormValues>;
}

const banks = [
  { value: 'bca', label: 'BCA (Bank Central Asia)', code: '014' },
  { value: 'mandiri', label: 'Bank Mandiri', code: '008' },
  { value: 'bni', label: 'BNI (Bank Negara Indonesia)', code: '009' },
  { value: 'bri', label: 'BRI (Bank Rakyat Indonesia)', code: '002' },
  { value: 'cimb', label: 'CIMB Niaga', code: '022' },
  { value: 'permata', label: 'Bank Permata', code: '013' },
  { value: 'danamon', label: 'Bank Danamon', code: '011' },
  { value: 'btn', label: 'BTN (Bank Tabungan Negara)', code: '200' },
];

export function BankInfoStep({ onNext, onPrevious, initialData }: BankInfoStepProps) {
  const form = useForm<BankInfoFormValues>({
    resolver: zodResolver(bankInfoSchema),
    defaultValues: {
      bankNameCode: '',
      accountNumber: '',
      accountName: '',
      ...initialData,
    },
  });

  const onSubmit = (values: BankInfoFormValues) => {
    onNext(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Bank Name / Code */}
            <FormField
              control={form.control}
              name="bankNameCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Bank Name / Code <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or search bank name / code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.value} value={bank.value}>
                          <div className="flex flex-col">
                            <span>{bank.label}</span>
                            <span className="text-xs text-muted-foreground">Code: {bank.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account Number */}
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Account Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Input account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account Name */}
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Account Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Input account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
      </CardContent>
    </Card>
  );
}
