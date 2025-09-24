import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { DocumentsContent } from './documents-content';
import { MerchantSteps } from '../components/MerchantSteps';

export function DocumentsPage() {
  return (
    <Fragment>
      <MerchantSteps currentStep={2} />
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle text="Create New Merchant" />
            <ToolbarDescription>
              Complete all required data and documents to create a new merchant.
            </ToolbarDescription>
          </ToolbarHeading>
          <ToolbarActions>
            <Button variant="outline">
              <FileText />
              Save as Draft
            </Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <DocumentsContent />
      </Container>
    </Fragment>
  );
}
