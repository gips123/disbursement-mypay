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
import { Building2, Upload, Globe, Phone, Mail } from 'lucide-react';

const businessInfoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  brandName: z.string().optional(),
  businessPhone: z.string().min(1, 'Business phone is required'),
  businessEmail: z.string().email('Invalid email address'),
  businessType: z.string().min(1, 'Business type is required'),
  businessIndustry: z.string().min(1, 'Business industry is required'),
  businessWebsite: z.string().url('Invalid website URL').optional().or(z.literal('')),
  companyLogo: z.any().optional(),
  description: z.string().optional(),
  isLegalAddress: z.boolean(),
});

type BusinessInfoFormData = z.infer<typeof businessInfoSchema>;

export function BusinessInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      isLegalAddress: false,
    },
  });

  const onSubmit = (data: BusinessInfoFormData) => {
    console.log('Business Info Data:', data);
    // Handle form submission
  };

  const businessTypes = [
    'Corporation',
    'Partnership',
    'Sole Proprietorship',
    'LLC',
    'Non-Profit',
    'Government',
  ];

  const businessIndustries = [
    'Retail',
    'E-commerce',
    'Food & Beverage',
    'Healthcare',
    'Education',
    'Technology',
    'Finance',
    'Manufacturing',
    'Services',
    'Other',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Business Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  {...register('companyName')}
                  placeholder="Enter company name"
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">{errors.companyName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  {...register('brandName')}
                  placeholder="Enter brand name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessPhone">
                  Business Phone <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="businessPhone"
                    {...register('businessPhone')}
                    placeholder="+62 812 3456 7890"
                    className={`pl-10 ${errors.businessPhone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.businessPhone && (
                  <p className="text-sm text-red-500">{errors.businessPhone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessEmail">
                  Business Email <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="businessEmail"
                    type="email"
                    {...register('businessEmail')}
                    placeholder="contact@company.com"
                    className={`pl-10 ${errors.businessEmail ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.businessEmail && (
                  <p className="text-sm text-red-500">{errors.businessEmail.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessType">
                  Business Type <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('businessType', value)}>
                  <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.businessType && (
                  <p className="text-sm text-red-500">{errors.businessType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessIndustry">
                  Business Industry <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue('businessIndustry', value)}>
                  <SelectTrigger className={errors.businessIndustry ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select business industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessIndustries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.businessIndustry && (
                  <p className="text-sm text-red-500">{errors.businessIndustry.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessWebsite">Business Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="businessWebsite"
                  {...register('businessWebsite')}
                  placeholder="https://www.company.com"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Company Logo */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company Logo</h3>
            <div className="space-y-2">
              <Label>Upload Company Logo</Label>
              <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setValue('companyLogo', file);
                    }}
                    className="hidden"
                    id="upload-logo"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('upload-logo')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Business Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Business Description</h3>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Describe your business..."
                rows={4}
              />
            </div>
          </div>

          {/* Legal Address Toggle */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isLegalAddress"
                checked={watch('isLegalAddress')}
                onCheckedChange={(checked) => setValue('isLegalAddress', checked)}
              />
              <Label htmlFor="isLegalAddress">
                This is also the legal address
              </Label>
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
