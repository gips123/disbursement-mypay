import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText } from 'lucide-react';

const supportingDocumentsSchema = z.object({
  sharedFolderLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  idCard: z.boolean().default(false),
  npwp: z.boolean().default(false),
  certificateOfIncorporation: z.boolean().default(false),
  certificateOfAmendment: z.boolean().default(false),
  businessIdentificationNumber: z.boolean().default(false),
  tradingBusinessPermit: z.boolean().default(false),
  kemenkumhamEstablishmentDecree: z.boolean().default(false),
});

type SupportingDocumentsFormData = z.infer<typeof supportingDocumentsSchema>;

export function SupportingDocumentsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SupportingDocumentsFormData>({
    resolver: zodResolver(supportingDocumentsSchema),
    defaultValues: {
      idCard: true,
      npwp: true,
      certificateOfIncorporation: true,
      certificateOfAmendment: true,
      businessIdentificationNumber: true,
      tradingBusinessPermit: true,
      kemenkumhamEstablishmentDecree: true,
    },
  });

  const onSubmit = (data: SupportingDocumentsFormData) => {
    console.log('Supporting Documents Data:', data);
  };

  const documentTypes = [
    {
      id: 'idCard',
      name: 'ID Card (KTP)',
    },
    {
      id: 'npwp',
      name: 'NPWP',
    },
    {
      id: 'certificateOfIncorporation',
      name: 'Certificate of Incorporation (Akta Pendirian)',
    },
    {
      id: 'certificateOfAmendment',
      name: 'Certificate of Amendment (Akta Perubahan)',
    },
    {
      id: 'businessIdentificationNumber',
      name: 'Business Identification Number (NIB)',
    },
    {
      id: 'tradingBusinessPermit',
      name: 'Trading Business Permit (SIUP)',
    },
    {
      id: 'kemenkumhamEstablishmentDecree',
      name: 'Kemenkumham Establishment Decree (SK Kemenkumham)',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Supporting Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">
              Legal documents needed to registering the merchant
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sharedFolderLink">Shared Folder Link</Label>
              <Input
                id="sharedFolderLink"
                {...register('sharedFolderLink')}
                placeholder="URL of the compiled documents"
                className={errors.sharedFolderLink ? 'border-red-500' : ''}
              />
              <p className="text-sm text-gray-500">
                You can compile all the documents into one shared folder
              </p>
              {errors.sharedFolderLink && (
                <p className="text-sm text-red-500">{errors.sharedFolderLink.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">
              Check the checkbox if merchant have the related documents
            </p>
            
            <div className="space-y-3">
              {documentTypes.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={doc.id}
                    checked={watch(doc.id as keyof SupportingDocumentsFormData) as boolean}
                    onCheckedChange={(checked) => setValue(doc.id as keyof SupportingDocumentsFormData, checked as boolean)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor={doc.id} className="text-sm font-medium text-gray-700 cursor-pointer">
                    {doc.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
