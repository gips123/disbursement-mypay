import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MapPin } from 'lucide-react';

const businessAddressSchema = z.object({
  businessAddress: z.string().min(1, 'Business address is required'),
  country: z.string().min(1, 'Country is required'),
  province: z.string().min(1, 'Province is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
  subDistrict: z.string().min(1, 'Sub-district is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  isLegalAddress: z.boolean(),
});

type BusinessAddressFormData = z.infer<typeof businessAddressSchema>;

export function BusinessAddressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BusinessAddressFormData>({
    resolver: zodResolver(businessAddressSchema),
    defaultValues: {
      country: 'Indonesia',
      isLegalAddress: true,
    },
  });

  const onSubmit = (data: BusinessAddressFormData) => {
    console.log('Business Address Data:', data);
  };

  const provinces = [
    'DKI Jakarta',
    'West Java',
    'East Java',
    'Central Java',
    'Banten',
    'Bali',
    'Sumatra Utara',
    'Sumatra Selatan',
    'Lampung',
    'Riau',
  ];

  const cities = [
    'Jakarta Pusat',
    'Jakarta Utara',
    'Jakarta Selatan',
    'Jakarta Timur',
    'Jakarta Barat',
    'Bandung',
    'Surabaya',
    'Medan',
    'Semarang',
    'Makassar',
  ];

  const districts = [
    'Menteng',
    'Gambir',
    'Sawah Besar',
    'Kemayoran',
    'Senen',
    'Cikini',
    'Kebon Kelapa',
    'Petojo',
    'Gondangdia',
    'Cempaka Putih',
  ];

  const subDistricts = [
    'Menteng',
    'Cikini',
    'Gondangdia',
    'Kebon Kelapa',
    'Petojo Utara',
    'Petojo Selatan',
    'Cempaka Putih Timur',
    'Cempaka Putih Barat',
    'Rawasari',
    'Cempaka Baru',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Business Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessAddress">
              Business Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessAddress"
              {...register('businessAddress')}
              placeholder="Input business address."
              className={errors.businessAddress ? 'border-red-500' : ''}
            />
            {errors.businessAddress && (
              <p className="text-sm text-red-500">{errors.businessAddress.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue('country', value)} defaultValue="Indonesia">
                <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indonesia">🇮🇩 Indonesia</SelectItem>
                  <SelectItem value="Malaysia">🇲🇾 Malaysia</SelectItem>
                  <SelectItem value="Singapore">🇸🇬 Singapore</SelectItem>
                  <SelectItem value="Thailand">🇹🇭 Thailand</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">
                Province <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue('province', value)}>
                <SelectTrigger className={errors.province ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.province && (
                <p className="text-sm text-red-500">{errors.province.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue('city', value)}>
                <SelectTrigger className={errors.city ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">
                District <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue('district', value)}>
                <SelectTrigger className={errors.district ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.district && (
                <p className="text-sm text-red-500">{errors.district.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subDistrict">
                Sub-District <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue('subDistrict', value)}>
                <SelectTrigger className={errors.subDistrict ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select sub-district" />
                </SelectTrigger>
                <SelectContent>
                  {subDistricts.map((subDistrict) => (
                    <SelectItem key={subDistrict} value={subDistrict}>
                      {subDistrict}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subDistrict && (
                <p className="text-sm text-red-500">{errors.subDistrict.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">
                Postal Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                {...register('postalCode')}
                placeholder="Input postal code."
                className={errors.postalCode ? 'border-red-500' : ''}
              />
              {errors.postalCode && (
                <p className="text-sm text-red-500">{errors.postalCode.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4 border-t">
            <Switch
              id="isLegalAddress"
              checked={watch('isLegalAddress')}
              onCheckedChange={(checked) => setValue('isLegalAddress', checked)}
            />
            <Label htmlFor="isLegalAddress" className="text-sm font-medium">
              Legal address same as business address
            </Label>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
