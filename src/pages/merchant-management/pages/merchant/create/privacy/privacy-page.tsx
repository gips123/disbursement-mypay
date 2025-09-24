import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PrivacyContent } from '.';
import { MerchantSteps } from '../components/MerchantSteps';

export function PrivacyPage() {
  return (
    <Fragment>
      <MerchantSteps currentStep={4} />
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle text="Privacy & Terms" />
            <ToolbarDescription>
              Review and accept our privacy policy and terms of service
            </ToolbarDescription>
          </ToolbarHeading>
          <ToolbarActions>
            <Button variant="outline">
              <Shield />
              Save as Draft
            </Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <PrivacyContent />
      </Container>
    </Fragment>
  );
}
