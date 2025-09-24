import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelType: string;
}

export function AddChannelModal({ isOpen, onClose, channelType }: AddChannelModalProps) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const eWalletChannels = [
    { id: 'dana', name: 'Dana', feeRate: '1.35%', provider: 'Upay', logo: 'DANA' },
    { id: 'shopeepay', name: 'ShopeePay', feeRate: '1.7%', provider: 'Upay', logo: 'S Pay' },
    { id: 'ovo', name: 'OVO', feeRate: '1.35%', provider: 'Upay', logo: 'OVO' },
    { id: 'gopay', name: 'GoPay', feeRate: '1.5%', provider: 'GoPay', logo: 'GoPay' },
    { id: 'linkaja', name: 'LinkAja', feeRate: '1.4%', provider: 'LinkAja', logo: 'LinkAja' },
  ];

  const qrCodeChannels = [
    { id: 'qris', name: 'QRIS', feeRate: '0.75%', provider: 'INA Cash', logo: 'QRIS' },
    { id: 'dana-qr', name: 'Dana QR', feeRate: '1.35%', provider: 'Upay', logo: 'DANA' },
    { id: 'shopeepay-qr', name: 'ShopeePay QR', feeRate: '1.7%', provider: 'Upay', logo: 'S Pay' },
  ];

  const virtualAccountChannels = [
    { id: 'va-permata', name: 'VA Permata Bank', feeRate: '1.35%', provider: 'Permata', logo: 'Permata' },
    { id: 'va-cimb', name: 'VA CIMB Niaga', feeRate: '1.7%', provider: 'Upay', logo: 'CIMB' },
    { id: 'va-bca', name: 'VA BCA', feeRate: '1.5%', provider: 'BCA', logo: 'BCA' },
    { id: 'va-mandiri', name: 'VA Mandiri', feeRate: '1.4%', provider: 'Mandiri', logo: 'Mandiri' },
  ];

  const getChannels = () => {
    switch (channelType) {
      case 'ewallet':
        return eWalletChannels;
      case 'qrcode':
        return qrCodeChannels;
      case 'virtualaccount':
        return virtualAccountChannels;
      default:
        return [];
    }
  };

  const channels = getChannels().filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleAddChannels = () => {
    console.log('Adding channels:', selectedChannels);
    onClose();
    setSelectedChannels([]);
    setSearchTerm('');
  };

  const getModalTitle = () => {
    switch (channelType) {
      case 'ewallet':
        return 'Add e-Wallet Channel';
      case 'qrcode':
        return 'Add QR Code Channel';
      case 'virtualaccount':
        return 'Add Virtual Account Channel';
      default:
        return 'Add Channel';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {getModalTitle()}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search channel"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={channel.id}
                    checked={selectedChannels.includes(channel.id)}
                    onCheckedChange={() => handleChannelToggle(channel.id)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">{channel.logo}</span>
                  </div>
                  <div>
                    <Label htmlFor={channel.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                      {channel.name}
                    </Label>
                    <p className="text-xs text-gray-600">
                      Setup Fee Rate: {channel.feeRate} • Provider: {channel.provider}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddChannels}
              disabled={selectedChannels.length === 0}
            >
              Add Channel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { AddChannelModal };
