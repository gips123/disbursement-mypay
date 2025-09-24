import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';

interface MerchantOverviewProps {
  merchant: any; // Replace with proper type from your merchant model
}

export function MerchantOverview({ merchant }: MerchantOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Business Name</label>
              <p className="text-sm text-gray-900">{merchant.business.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Business Type</label>
              <p className="text-sm text-gray-900">{merchant.business.businessType}</p>
            </div>
            {merchant.business.description && (
              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-sm text-gray-900">{merchant.business.description}</p>
              </div>
            )}
            {merchant.business.registrationNumber && (
              <div>
                <label className="text-sm font-medium text-gray-600">Registration Number</label>
                <p className="text-sm text-gray-900">{merchant.business.registrationNumber}</p>
              </div>
            )}
            {merchant.business.taxId && (
              <div>
                <label className="text-sm font-medium text-gray-600">Tax ID</label>
                <p className="text-sm text-gray-900">{merchant.business.taxId}</p>
              </div>
            )}
            {merchant.business.establishedDate && (
              <div>
                <label className="text-sm font-medium text-gray-600">Established Date</label>
                <p className="text-sm text-gray-900">{merchant.business.establishedDate}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-sm text-gray-900">{merchant.contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-sm text-gray-900">{merchant.contact.phone}</p>
              </div>
            </div>
            {merchant.contact.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-gray-500" />
                <div>
                  <label className="text-sm font-medium text-gray-600">Website</label>
                  <p className="text-sm text-gray-900">{merchant.contact.website}</p>
                </div>
              </div>
            )}
            {merchant.contact.address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-sm text-gray-900">
                    {merchant.contact.address.street}, {merchant.contact.address.city}, {merchant.contact.address.state} {merchant.contact.address.postalCode}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location & Regional Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <img
              src={toAbsoluteUrl(`/media/flags/${merchant.location.flag}`)}
              className="rounded size-8"
              alt={merchant.location.country}
            />
            <div>
              <p className="font-medium">{merchant.location.city}, {merchant.location.country}</p>
              <p className="text-sm text-gray-600">
                Primary Currency: {merchant.financial.currency}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
