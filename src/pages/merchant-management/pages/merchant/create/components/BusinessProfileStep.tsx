import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileImage, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Schema untuk Business Profile
const businessProfileSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  brandName: z.string().min(2, 'Brand name is required'),
  businessPhoneNumber: z.string().min(10, 'Valid phone number is required'),
  businessEmail: z.string().email('Valid email is required'),
  businessType: z.string().min(1, 'Please select business type'),
  businessIndustry: z.string().min(1, 'Please select business industry'),
  businessWebsite: z.string().url('Valid website URL is required').optional().or(z.literal('')),
  companyLogo: z.any().optional(),
});

type BusinessProfileFormValues = z.infer<typeof businessProfileSchema>;

interface BusinessProfileStepProps {
  onNext: (data: BusinessProfileFormValues) => void;
  initialData?: Partial<BusinessProfileFormValues>;
}

const businessTypes = [
  { value: 'corporation', label: 'Corporation' },
  { value: 'llc', label: 'LLC' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
];

const businessIndustries = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'retail', label: 'Retail' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'other', label: 'Other' },
];

export function BusinessProfileStep({ onNext, initialData }: BusinessProfileStepProps) {
  const form = useForm<BusinessProfileFormValues>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      companyName: '',
      brandName: '',
      businessPhoneNumber: '+62',
      businessEmail: '',
      businessType: '',
      businessIndustry: '',
      businessWebsite: '',
      ...initialData,
    },
  });

  const onSubmit = (values: BusinessProfileFormValues) => {
    onNext(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-6 bg-blue-500 text-white rounded text-sm flex items-center justify-center font-medium">
            1
          </div>
          Business Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Name */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Phone Number */}
            <FormField
              control={form.control}
              name="businessPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Business Phone Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                        <span className="text-sm">🇮🇩</span>
                        <span className="ml-1 text-sm">+62</span>
                      </div>
                      <Input 
                        placeholder="8123456790" 
                        {...field} 
                        className="rounded-l-none border-l-0"
                        value={field.value?.replace('+62', '') || ''}
                        onChange={(e) => field.onChange(`+62${e.target.value}`)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Email */}
            <FormField
              control={form.control}
              name="businessEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Type */}
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Industry */}
            <FormField
              control={form.control}
              name="businessIndustry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Search or select business industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessIndustries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Website */}
            <FormField
              control={form.control}
              name="businessWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Website</FormLabel>
                  <FormControl>
                    <Input placeholder="domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Logo */}
            <FormField
              control={form.control}
              name="companyLogo"
              render={() => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <FileImage className="w-12 h-12 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Upload PNG, JPEG image</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            *Max 10mb, PNG, JPEG Image
                          </Badge>
                        </div>
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
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
