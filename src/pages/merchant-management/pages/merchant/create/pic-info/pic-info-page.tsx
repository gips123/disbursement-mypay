import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PicInfoContent } from './pic-info-content';
import { MerchantSteps } from '../components/MerchantSteps';

export function PicInfoPage() {
  return (
    <Fragment>
      <MerchantSteps currentStep={1} />
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
              <User />
              Save as Draft
            </Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <PicInfoContent />
      </Container>
    </Fragment>
  );
}
