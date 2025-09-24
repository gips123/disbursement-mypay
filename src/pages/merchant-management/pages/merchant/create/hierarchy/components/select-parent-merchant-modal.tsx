import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search, Copy, ChevronLeft, ChevronRight } from 'lucide-react';

interface SelectParentMerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectParent: (parent: { id: string; name: string; clientId: string }) => void;
}

export function SelectParentMerchantModal({ 
  isOpen, 
  onClose, 
  onSelectParent 
}: SelectParentMerchantModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMerchantsOnly, setActiveMerchantsOnly] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const merchants = [
    {
      id: '1',
      name: 'PT Digital Jaya Abad',
      clientId: 'UP2025091900001',
      parentClientId: 'PMUP123999222',
      status: 'Active',
      registeredDate: 'Thu, Dec 16, 2025 23:12:32 (GMT+7)',
    },
    {
      id: '2',
      name: 'PT Teknologi Maju',
      clientId: 'UP2025091900002',
      parentClientId: 'PMUP123999223',
      status: 'Active',
      registeredDate: 'Thu, Dec 15, 2025 14:30:15 (GMT+7)',
    },
    {
      id: '3',
      name: 'PT Solusi Digital',
      clientId: 'UP2025091900003',
      parentClientId: 'PMUP123999224',
      status: 'Active',
      registeredDate: 'Thu, Dec 14, 2025 09:45:22 (GMT+7)',
    },
    {
      id: '4',
      name: 'PT Inovasi Teknologi',
      clientId: 'UP2025091900004',
      parentClientId: 'PMUP123999225',
      status: 'Active',
      registeredDate: 'Thu, Dec 13, 2025 16:20:10 (GMT+7)',
    },
    {
      id: '5',
      name: 'PT Digital Solutions',
      clientId: 'UP2025091900005',
      parentClientId: 'PMUP123999226',
      status: 'Active',
      registeredDate: 'Thu, Dec 12, 2025 11:15:45 (GMT+7)',
    },
    {
      id: '6',
      name: 'PT Tech Innovation',
      clientId: 'UP2025091900006',
      parentClientId: 'PMUP123999227',
      status: 'Inactive',
      registeredDate: 'Thu, Dec 11, 2025 08:30:30 (GMT+7)',
    },
  ];

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.clientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !activeMerchantsOnly || merchant.status === 'Active';
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMerchants = filteredMerchants.slice(startIndex, endIndex);

  const handleSelectMerchant = (merchant: typeof merchants[0]) => {
    onSelectParent({
      id: merchant.id,
      name: merchant.name,
      clientId: merchant.clientId,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Level 0 Parent Merchant</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Merchants"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="activeMerchants"
                checked={activeMerchantsOnly}
                onCheckedChange={setActiveMerchantsOnly}
              />
              <Label htmlFor="activeMerchants" className="text-sm">
                Active Merchants
              </Label>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parent Client ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Production Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMerchants.map((merchant) => (
                    <tr key={merchant.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {merchant.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          {merchant.clientId}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(merchant.clientId)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          {merchant.parentClientId}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(merchant.parentClientId)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge 
                          variant={merchant.status === 'Active' ? 'default' : 'secondary'}
                          className={merchant.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {merchant.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {merchant.registeredDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          size="sm"
                          onClick={() => handleSelectMerchant(merchant)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Select
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="itemsPerPage" className="text-sm">Show</Label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {startIndex + 1}-{Math.min(endIndex, filteredMerchants.length)} of {filteredMerchants.length}
              </span>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? 'bg-blue-600' : ''}
                    >
                      {page}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
