import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { CreateMerchantContent } from './components/CreateMerchantContent';
import { MerchantSteps } from './components/MerchantSteps';

export function MerchantCreatePage() {
  return (
    <Fragment>
      <MerchantSteps currentStep={0} />
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle text="Create New Merchant" />
            <ToolbarDescription>
              Complete all required data and documents to create a new merchant
            </ToolbarDescription>
          </ToolbarHeading>
          <ToolbarActions>
            <Button variant="outline">
              <Building2 />
              Save as Draft
            </Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <CreateMerchantContent />
      </Container>
    </Fragment>
  );
}

export default MerchantCreatePage;
