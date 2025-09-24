import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';
import { SelectParentMerchantModal } from './select-parent-merchant-modal';

export function MerchantHierarchyForm() {
  const [isSelectParentModalOpen, setIsSelectParentModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<{
    id: string;
    name: string;
    clientId: string;
  } | null>(null);

  const handleSelectParent = (parent: { id: string; name: string; clientId: string }) => {
    setSelectedParent(parent);
    setIsSelectParentModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Merchant Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">1. Merchant as a Child Merchant</h3>
              <p className="text-sm text-gray-600">Select the parent of the merchant.</p>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedParent ? selectedParent.name : 'No Parent Merchant Selected'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedParent ? 'Selected as a Parent Merchant' : 'Select Parent Merchant'}
                    </p>
                    {selectedParent && (
                      <p className="text-xs text-gray-500">Client ID: {selectedParent.clientId}</p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => setIsSelectParentModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Select Parent Merchants
                </Button>
              </div>
            </div>

            {selectedParent && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Parent merchant selected: <strong>{selectedParent.name}</strong>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <SelectParentMerchantModal
        isOpen={isSelectParentModalOpen}
        onClose={() => setIsSelectParentModalOpen(false)}
        onSelectParent={handleSelectParent}
      />
    </>
  );
}
