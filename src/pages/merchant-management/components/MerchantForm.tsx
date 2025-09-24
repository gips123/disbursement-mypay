import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { 
  BUSINESS_TYPE_OPTIONS, 
  COUNTRY_OPTIONS, 
  SUPPORTED_CURRENCIES,
  SETTLEMENT_PERIOD_OPTIONS 
} from '../core/merchant.constants';
import { CreateMerchantRequest, UpdateMerchantRequest } from '../core/merchant.model';

// Form schema
const merchantFormSchema = z.object({
  // Business Information
  businessName: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  description: z.string().optional(),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  establishedDate: z.string().optional(),

  // Contact Information
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  website: z.string().optional(),

  // Address
  street: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().min(1, 'Country is required'),

  // Financial Information
  monthlyVolume: z.number().min(0, 'Monthly volume must be positive'),
  currency: z.string().min(1, 'Currency is required'),

  // Settings
  settlementPeriod: z.string().optional(),
  autoApproveLimit: z.number().optional(),
});

type MerchantFormValues = z.infer<typeof merchantFormSchema>;

interface MerchantFormProps {
  initialData?: Partial<MerchantFormValues>;
  onSubmit: (data: CreateMerchantRequest | UpdateMerchantRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

export function MerchantForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create',
}: MerchantFormProps) {
  const form = useForm<MerchantFormValues>({
    resolver: zodResolver(merchantFormSchema),
    defaultValues: {
      businessName: '',
      businessType: '',
      description: '',
      registrationNumber: '',
      taxId: '',
      establishedDate: '',
      email: '',
      phone: '',
      website: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      monthlyVolume: 0,
      currency: 'USD',
      settlementPeriod: 'weekly',
      autoApproveLimit: 1000,
      ...initialData,
    },
  });

  const handleSubmit = (values: MerchantFormValues) => {
    const formattedData = {
      business: {
        name: values.businessName,
        businessType: values.businessType as any,
        description: values.description,
        registrationNumber: values.registrationNumber,
        taxId: values.taxId,
        establishedDate: values.establishedDate,
      },
      contact: {
        email: values.email,
        phone: values.phone,
        website: values.website,
        address: values.street ? {
          street: values.street,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode || '',
          country: values.country as any,
        } : undefined,
      },
      location: {
        city: values.city,
        country: values.country as any,
      },
      financial: {
        monthlyVolume: values.monthlyVolume,
        currency: values.currency,
      },
      settings: {
        settlementPeriod: values.settlementPeriod as any,
        autoApproveLimit: values.autoApproveLimit,
      },
    };

    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUSINESS_TYPE_OPTIONS.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <span>{type.icon}</span>
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of the business"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional description of the merchant business
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Business registration number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Tax identification number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="establishedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="www.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Business Address</h4>
              
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="State or Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COUNTRY_OPTIONS.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              <div className="flex items-center gap-2">
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthlyVolume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Monthly Volume *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="100000" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Expected monthly transaction volume in selected currency
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Currency *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SUPPORTED_CURRENCIES.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{currency.symbol}</span>
                              <span>{currency.code} - {currency.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="settlementPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Settlement Period</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select settlement period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SETTLEMENT_PERIOD_OPTIONS.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label} - {period.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoApproveLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auto-Approve Limit</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1000" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Transactions below this amount will be auto-approved
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : mode === 'create' ? 'Create Merchant' : 'Update Merchant'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default MerchantForm;
