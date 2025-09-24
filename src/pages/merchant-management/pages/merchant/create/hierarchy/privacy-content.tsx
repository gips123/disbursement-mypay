import { MoveLeft, MoveRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { PrivacyForm } from './components/privacy-form';
import { PrivacySummary } from './components/privacy-summary';

export function PrivacyContent() {
  return (
    <div className="grid xl:grid-cols-3 gap-5 lg:gap-9 mb-5 lg:mb-10">
      <div className="lg:col-span-2 space-y-5">
        <div className="space-y-5">
          <PrivacyForm />
        </div>
        <div className="flex justify-end items-center flex-wrap gap-3">
          <Button variant="outline">
            <MoveLeft className="text-base" />
            <Link to="/merchant-management/merchant/create/services">
              Previous
            </Link>
          </Button>

          <Button>
            <Link to="/merchant-management/merchant/create/notes">
              Next: Review
            </Link>
            <MoveRight className="text-base" />
          </Button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="space-y-5">
          <PrivacySummary />
        </div>
      </div>
    </div>
  );
}
