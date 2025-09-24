import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Schema untuk Business Address
const businessAddressSchema = z.object({
  businessAddress: z.string().min(5, 'Business address is required'),
  country: z.string().min(1, 'Please select country'),
  province: z.string().min(1, 'Please select province'),
  city: z.string().min(1, 'Please select city'),
  district: z.string().min(1, 'Please select district'),
  subDistrict: z.string().min(1, 'Please select sub-district'),
  postalCode: z.string().min(5, 'Postal code is required'),
  legalAddressSame: z.boolean(),
});

type BusinessAddressFormValues = z.infer<typeof businessAddressSchema>;

interface BusinessAddressStepProps {
  onNext: (data: BusinessAddressFormValues) => void;
  onPrevious: () => void;
  initialData?: Partial<BusinessAddressFormValues>;
}

const countries = [
  { value: 'indonesia', label: 'Indonesia', flag: '🇮🇩' },
];

const provinces = [
  { value: 'jakarta', label: 'DKI Jakarta' },
  { value: 'west-java', label: 'West Java' },
  { value: 'central-java', label: 'Central Java' },
  { value: 'east-java', label: 'East Java' },
];

const cities = [
  { value: 'jakarta-pusat', label: 'Jakarta Pusat' },
  { value: 'jakarta-barat', label: 'Jakarta Barat' },
  { value: 'jakarta-timur', label: 'Jakarta Timur' },
  { value: 'jakarta-selatan', label: 'Jakarta Selatan' },
];

const districts = [
  { value: 'menteng', label: 'Menteng' },
  { value: 'gambir', label: 'Gambir' },
  { value: 'tanah-abang', label: 'Tanah Abang' },
];

const subDistricts = [
  { value: 'menteng-1', label: 'Menteng' },
  { value: 'pegangsaan', label: 'Pegangsaan' },
  { value: 'cikini', label: 'Cikini' },
];

export function BusinessAddressStep({ onNext, onPrevious, initialData }: BusinessAddressStepProps) {
  const form = useForm<BusinessAddressFormValues>({
    resolver: zodResolver(businessAddressSchema),
    defaultValues: {
      businessAddress: '',
      country: '',
      province: '',
      city: '',
      district: '',
      subDistrict: '',
      postalCode: '',
      legalAddressSame: false,
      ...initialData,
    },
  });

  const onSubmit = (values: BusinessAddressFormValues) => {
    onNext(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Address</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Address */}
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Business Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Input business address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Country <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Indonesia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Province */}
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.value} value={province.value}>
                          {province.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* District */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district.value} value={district.value}>
                          {district.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sub-District */}
            <FormField
              control={form.control}
              name="subDistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-District</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sub-district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subDistricts.map((subDistrict) => (
                        <SelectItem key={subDistrict.value} value={subDistrict.value}>
                          {subDistrict.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Postal Code */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Input postal code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Legal Address Same */}
            <FormField
              control={form.control}
              name="legalAddressSame"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Legal Address</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Legal address same as business address
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
