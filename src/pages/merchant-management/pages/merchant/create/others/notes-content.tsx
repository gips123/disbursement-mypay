import { MoveLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { NotesForm } from './components/notes-form';
import { NotesSummary } from './components/notes-summary';

export function NotesContent() {
  return (
    <div className="grid xl:grid-cols-3 gap-5 lg:gap-9 mb-5 lg:mb-10">
      <div className="lg:col-span-2 space-y-5">
        <div className="space-y-5">
          <NotesForm />
        </div>
        <div className="flex justify-end items-center flex-wrap gap-3">
          <Button variant="outline">
            <MoveLeft className="text-base" />
            <Link to="/merchant-management/merchant/create/privacy">
              Previous
            </Link>
          </Button>

          <Button className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="text-base" />
            Submit Application
          </Button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="space-y-5">
          <NotesSummary />
        </div>
      </div>
    </div>
  );
}
