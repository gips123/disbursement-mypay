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
import { OthersContent } from './others-content';
import { MerchantSteps } from '../components/MerchantSteps';

export function OthersPage() {
  return (
    <Fragment>
      <MerchantSteps currentStep={5} />
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
        <OthersContent />
      </Container>
    </Fragment>
  );
}
