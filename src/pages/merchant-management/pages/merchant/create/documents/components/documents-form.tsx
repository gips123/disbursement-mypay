import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const documentsSchema = z.object({
  businessLicense: z.any().optional(),
  taxId: z.any().optional(),
  companyDeed: z.any().optional(),
  bankStatement: z.any().optional(),
  idCard: z.any().optional(),
  additionalDocuments: z.array(z.any()).optional(),
  notes: z.string().optional(),
});

type DocumentsFormData = z.infer<typeof documentsSchema>;

export function DocumentsForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
  });

  const onSubmit = (data: DocumentsFormData) => {
    console.log('Documents Data:', data);
    // Handle form submission
  };

  const requiredDocuments = [
    {
      id: 'businessLicense',
      title: 'Business License',
      description: 'Valid business license or permit',
      required: true,
      acceptedFormats: 'PDF, JPG, PNG (Max 10MB)',
    },
    {
      id: 'taxId',
      title: 'Tax ID (NPWP)',
      description: 'Company tax identification number',
      required: true,
      acceptedFormats: 'PDF, JPG, PNG (Max 10MB)',
    },
    {
      id: 'companyDeed',
      title: 'Company Deed',
      description: 'Articles of incorporation or company deed',
      required: true,
      acceptedFormats: 'PDF (Max 10MB)',
    },
    {
      id: 'bankStatement',
      title: 'Bank Statement',
      description: 'Recent bank statement (last 3 months)',
      required: true,
      acceptedFormats: 'PDF, JPG, PNG (Max 10MB)',
    },
    {
      id: 'idCard',
      title: 'PIC ID Card',
      description: 'Valid ID card of person in charge',
      required: true,
      acceptedFormats: 'PDF, JPG, PNG (Max 10MB)',
    },
  ];

  const handleFileUpload = (fieldName: string, file: File) => {
    setValue(fieldName as any, file);
  };

  const handleFileRemove = (fieldName: string) => {
    setValue(fieldName as any, undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Required Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Required Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Required Documents</h3>
            <p className="text-sm text-gray-600">
              Please upload all required documents for merchant verification. All documents must be clear and readable.
            </p>
            
            <div className="space-y-4">
              {requiredDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Label className="text-base font-medium">
                        {doc.title}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{doc.acceptedFormats}</p>
                    </div>
                    <div className="flex gap-2">
                      {watch(doc.id as any) && (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {/* Handle view */}}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileRemove(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {!watch(doc.id as any) ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(doc.id, file);
                        }}
                        className="hidden"
                        id={`upload-${doc.id}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById(`upload-${doc.id}`)?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-800">
                        {watch(doc.id as any)?.name}
                      </span>
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        Uploaded
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Documents</h3>
            <p className="text-sm text-gray-600">
              Upload any additional documents that might be helpful for verification.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload additional documents
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setValue('additionalDocuments', files);
                }}
                className="hidden"
                id="upload-additional"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('upload-additional')?.click()}
              >
                Choose Files
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Notes</h3>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Add any additional notes or comments about the documents..."
                rows={4}
              />
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
