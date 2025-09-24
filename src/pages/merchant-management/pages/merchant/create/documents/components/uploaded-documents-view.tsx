import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload } from 'lucide-react';

export function UploadedDocumentsView() {
  const uploadedDocuments = [
    {
      id: 'idCard',
      name: 'ID Card (KTP)',
      fileName: 'IDCard.pdf',
    },
    {
      id: 'npwp',
      name: 'NPWP',
      fileName: 'NPWP.pdf',
    },
    {
      id: 'certificateOfIncorporation',
      name: 'Certificate of Incorporation (Akta Pendirian)',
      fileName: 'aktaPendirian.pdf',
    },
    {
      id: 'certificateOfAmendment',
      name: 'Certificate of Amendment (Akta Perubahan)',
      fileName: 'aktaPerubahan.pdf',
    },
    {
      id: 'businessIdentificationNumber',
      name: 'Business Identification Number (NIB)',
      fileName: 'NIB.pdf',
    },
    {
      id: 'tradingBusinessPermit',
      name: 'Trading Business Permit (SIUP)',
      fileName: 'siup.pdf',
    },
    {
      id: 'kemenkumhamEstablishmentDecree',
      name: 'Kemenkumham Establishment Decree (SK Kemenkumham)',
      fileName: 'SKMenkeh.pdf',
    },
  ];

  const handleChangeFile = (documentId: string) => {
    console.log('Change file for:', documentId);
    // Handle file change logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Supporting Documents (Uploaded)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-6">
          <p className="text-gray-600">
            Legal documents needed to registering the merchant
          </p>
        </div>

        <div className="space-y-0">
          {uploadedDocuments.map((doc, index) => (
            <div key={doc.id}>
              <div className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{doc.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-gray-100 rounded-md">
                    <span className="text-sm text-gray-600">{doc.fileName}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangeFile(doc.id)}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    Change File
                  </Button>
                </div>
              </div>
              {index < uploadedDocuments.length - 1 && (
                <hr className="border-gray-200" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-center">
            <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Documents
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
