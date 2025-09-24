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
import { BusinessInfoContent } from '.';
import { MerchantSteps } from '../components/MerchantSteps';

export function BusinessInfoPage() {
  return (
    <Fragment>
      <MerchantSteps currentStep={0} />
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle text="Business Information" />
            <ToolbarDescription>
              Enter your business details and company information
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
        <BusinessInfoContent />
      </Container>
    </Fragment>
  );
}
