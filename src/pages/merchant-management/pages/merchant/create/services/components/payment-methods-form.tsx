import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  QrCode, 
  Building, 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2,
  ArrowRightLeft,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { AddChannelModal } from './add-channel-modal';

export function PaymentMethodsForm() {
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
  const [selectedChannelType, setSelectedChannelType] = useState<string>('');
  const [expandedMethods, setExpandedMethods] = useState<Set<string>>(new Set(['ewallet'])); // e-Wallet expanded by default

  const handleAddChannel = (channelType: string) => {
    setSelectedChannelType(channelType);
    setIsAddChannelModalOpen(true);
  };

  const toggleMethod = (methodId: string) => {
    setExpandedMethods(prev => {
      const newSet = new Set(prev);
      if (newSet.has(methodId)) {
        newSet.delete(methodId);
      } else {
        newSet.add(methodId);
      }
      return newSet;
    });
  };

  const paymentMethods = [
    {
      id: 'ewallet',
      name: 'e-Wallet',
      icon: Wallet,
      description: 'Fee Rate Exclude VAT',
      channels: [
        { name: 'Dana', feeRate: '1.35%', provider: 'Upay' },
        { name: 'ShopeePay', feeRate: '1.7%', provider: 'Upay' },
      ],
      hasChannels: true,
    },
    {
      id: 'qrcode',
      name: 'QR Code',
      icon: QrCode,
      description: 'Fee Rate Exclude VAT',
      channels: [
        { name: 'QRIS', feeRate: '0.75%', provider: 'INA Cash' },
      ],
      hasChannels: true,
    },
    {
      id: 'virtualaccount',
      name: 'Virtual Account',
      icon: Building,
      description: 'Fee Rate Exclude VAT',
      channels: [
        { name: 'VA Permata Bank', feeRate: '1.35%', provider: 'Permata' },
        { name: 'VA CIMB Niaga', feeRate: '1.7%', provider: 'Upay' },
      ],
      hasChannels: true,
    },
    {
      id: 'directdebit',
      name: 'Direct Debit',
      icon: ArrowRightLeft,
      description: 'Fee Rate Exclude VAT',
      channels: [],
      hasChannels: false,
    },
    {
      id: 'creditcard',
      name: 'Debit / Credit Card',
      icon: CreditCard,
      description: 'Fee Rate Exclude VAT',
      channels: [
        { name: 'Regular', feeRate: '1.7% + IDR 5.000', provider: '' },
        { name: 'Recurring', feeRate: '1.7% + IDR 5.000', provider: '' },
        { name: '1 Month Installment', feeRate: '1.7% + IDR 5.000', provider: '' },
        { name: '3 Month Installment', feeRate: '1.7% + IDR 5.000', provider: '' },
        { name: '6 Month Installment', feeRate: '1.7% + IDR 5.000', provider: '' },
        { name: '12 Month Installment', feeRate: '1.7% + IDR 5.000', provider: '' },
      ],
      hasChannels: true,
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            PG Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-6">
            <p className="text-gray-600">
              PG Service need to be activated (Fee Rate Exclude VAT)
            </p>
          </div>

          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              const isExpanded = expandedMethods.has(method.id);
              return (
                <div key={method.id} className="border rounded-lg">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleMethod(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.hasChannels && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddChannel(method.id);
                          }}
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          {method.id === 'creditcard' ? 'Add Payment Type' : 'Add Channel'}
                        </Button>
                      )}
                      {!method.hasChannels && (
                        <Badge variant="secondary" className="text-purple-600 bg-purple-100">
                          Coming Soon
                        </Badge>
                      )}
                      <div className="p-1">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && method.channels.length > 0 && (
                    <div className="border-t bg-gray-50">
                      <div className="p-4 space-y-2">
                        {method.channels.map((channel, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  {channel.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{channel.name}</p>
                                <p className="text-xs text-gray-600">
                                  Setup Fee Rate: {channel.feeRate}
                                  {channel.provider && channel.provider !== '' && ` • Provider: ${channel.provider}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AddChannelModal
        isOpen={isAddChannelModalOpen}
        onClose={() => setIsAddChannelModalOpen(false)}
        channelType={selectedChannelType}
      />
    </>
  );
}
