import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { NotesContent } from '.';
import { MerchantSteps } from '../components/MerchantSteps';

export function NotesPage() {
  return (
    <Fragment>
      <MerchantSteps currentStep={5} />
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle text="Review & Submit" />
            <ToolbarDescription>
              Review all information and submit your merchant application
            </ToolbarDescription>
          </ToolbarHeading>
          <ToolbarActions>
            <Button variant="outline">
              <FileCheck />
              Save as Draft
            </Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <NotesContent />
      </Container>
    </Fragment>
  );
}
