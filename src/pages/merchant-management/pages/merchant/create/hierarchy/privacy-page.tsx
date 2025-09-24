import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { HierarchyContent } from './hierarchy-content';
import { MerchantSteps } from '../components/MerchantSteps';

export function HierarchyPage() {
  return (
    <Fragment>
      <MerchantSteps currentStep={4} />
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
              <Network />
              Save as Draft
            </Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <HierarchyContent />
      </Container>
    </Fragment>
  );
}
