import { useEffect, useRef, useState } from 'react';
import { MoveLeft, MoveRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scrollspy } from '@/components/ui/scrollspy';
import { ScrollspyMenu, ScrollspyMenuItems } from '@/partials/navbar/scrollspy-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { cn } from '@/lib/utils';
import { ServiceTypeForm } from './components/service-type-form';
import { PaymentMethodsForm } from './components/payment-methods-form';
import { DisbursementPricingForm } from './components/disbursement-pricing-form';

export function ServicesContent() {
  const isMobile = useIsMobile();
  const [sidebarSticky, setSidebarSticky] = useState(false);
  const parentRef = useRef<HTMLElement | Document>(document);
  const scrollPosition = useScrollPosition({ targetRef: parentRef });

  useEffect(() => {
    const scrollableElement = document.getElementById('scrollable_content');
    if (scrollableElement) {
      parentRef.current = scrollableElement;
    }
  }, []);

  useEffect(() => {
    setSidebarSticky(scrollPosition > 100);
  }, [scrollPosition]);

  const sidebarItems: ScrollspyMenuItems = [
    {
      title: 'Service Type',
      target: 'service_type',
      active: true,
    },
    {
      title: 'Payment Method',
      target: 'payment_method',
    },
    {
      title: 'Disbursement Service',
      target: 'disbursement_service',
    },
  ];

  return (
    <div className="flex grow gap-5 lg:gap-7.5">
      {!isMobile && (
        <div className="w-[280px] shrink-0">
          <div
            className={cn(
              'w-[280px]',
              sidebarSticky && 'fixed z-10 start-auto top-[calc(var(--header-height)+1rem)]',
            )}
          >
            <ScrollArea className="h-full">
              <Scrollspy offset={100} targetRef={parentRef}>
                <ScrollspyMenu items={sidebarItems} />
              </Scrollspy>
            </ScrollArea>
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-stretch grow gap-5 lg:gap-7.5">
        <div id="service_type" className="scroll-mt-24">
          <ServiceTypeForm />
        </div>
        <div id="payment_method" className="scroll-mt-24">
          <PaymentMethodsForm />
        </div>
        <div id="disbursement_service" className="scroll-mt-24">
          <DisbursementPricingForm />
        </div>
        
        <div className="flex justify-between items-center flex-wrap gap-3 pt-5">
          <Button variant="outline">
            <MoveLeft className="text-base" />
            <Link to="/merchant-management/merchant/create/documents">
              ← Previous Section
            </Link>
          </Button>

          <Button>
            <Link to="/merchant-management/merchant/create/hierarchy">
              Next Section →
            </Link>
            <MoveRight className="text-base" />
          </Button>
        </div>
      </div>
    </div>
  );
}
