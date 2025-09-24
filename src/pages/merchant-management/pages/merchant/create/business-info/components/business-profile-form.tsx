import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Upload, Globe, Phone, Mail } from 'lucide-react';

const businessProfileSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  brandName: z.string().optional(),
  businessPhone: z.string().min(1, 'Business phone is required'),
  businessEmail: z.string().email('Invalid email address'),
  businessType: z.string().min(1, 'Business type is required'),
  businessIndustry: z.string().min(1, 'Business industry is required'),
  businessWebsite: z.string().url('Invalid website URL').optional().or(z.literal('')),
  companyLogo: z.any().optional(),
});

type BusinessProfileFormData = z.infer<typeof businessProfileSchema>;

export function BusinessProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema),
  });

  const onSubmit = (data: BusinessProfileFormData) => {
    console.log('Business Profile Data:', data);
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
          Business Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                {...register('companyName')}
                placeholder="Company name."
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
                placeholder="Brand name."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessPhone">
                Business Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex">
                <Select defaultValue="+62">
                  <SelectTrigger className="w-[120px] rounded-r-none border-r-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+62">🇮🇩 +62</SelectItem>
                    <SelectItem value="+1">🇺🇸 +1</SelectItem>
                    <SelectItem value="+44">🇬🇧 +44</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="businessPhone"
                  {...register('businessPhone')}
                  placeholder="e.g. 812345567890"
                  className={`rounded-l-none ${errors.businessPhone ? 'border-red-500' : ''}`}
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
              <Input
                id="businessEmail"
                type="email"
                {...register('businessEmail')}
                placeholder="email@domain.com"
                className={errors.businessEmail ? 'border-red-500' : ''}
              />
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
                  <SelectValue placeholder="Search or select business industry" />
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
            <Input
              id="businessWebsite"
              {...register('businessWebsite')}
              placeholder="domain.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">150x150px JPEG, PNG Image</p>
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
                  className="mt-2"
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
