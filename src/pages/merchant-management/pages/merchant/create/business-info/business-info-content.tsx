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
import { BusinessProfileForm } from './components/business-profile-form';
import { BusinessAddressForm } from './components/business-address-form';
import { BusinessCharacteristicsForm } from './components/business-characteristics-form';
import { BankInfoForm } from './components/bank-info-form';

export function BusinessInfoContent() {
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
      title: 'Business Profile',
      target: 'business_profile',
      active: true,
    },
    {
      title: 'Business Address',
      target: 'business_address',
    },
    {
      title: 'Business Characteristics',
      target: 'business_characteristics',
    },
    {
      title: 'Bank Info',
      target: 'bank_info',
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
        <div id="business_profile" className="scroll-mt-24">
          <BusinessProfileForm />
        </div>
        <div id="business_address" className="scroll-mt-24">
          <BusinessAddressForm />
        </div>
        <div id="business_characteristics" className="scroll-mt-24">
          <BusinessCharacteristicsForm />
        </div>
        <div id="bank_info" className="scroll-mt-24">
          <BankInfoForm />
        </div>
        
        <div className="flex justify-end items-center flex-wrap gap-3 pt-5">
          <Button variant="outline" disabled>
            <MoveLeft className="text-base" />
            Cancel Creation
          </Button>

          <Button>
            <Link to="/merchant-management/merchant/create/pic-info">
              Next Section →
            </Link>
            <MoveRight className="text-base" />
          </Button>
        </div>
      </div>
    </div>
  );
}
