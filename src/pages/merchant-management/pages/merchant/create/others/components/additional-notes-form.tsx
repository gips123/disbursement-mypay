import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

const additionalNotesSchema = z.object({
  notes: z.string().optional(),
});

type AdditionalNotesFormData = z.infer<typeof additionalNotesSchema>;

export function AdditionalNotesForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdditionalNotesFormData>({
    resolver: zodResolver(additionalNotesSchema),
    defaultValues: {
      notes: '',
    },
  });

  const onSubmit = (data: AdditionalNotesFormData) => {
    console.log('Additional Notes Data:', data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Additional Notes (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">
              For additional requests or notes outside the required fields, please provide details below.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Any additional notes."
              rows={8}
              className="resize-none"
            />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
