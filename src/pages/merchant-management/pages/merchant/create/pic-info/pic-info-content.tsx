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
import { PicOwnerForm } from './components/pic-owner-form';
import { PicBusinessForm } from './components/pic-business-form';
import { PicFinanceForm } from './components/pic-finance-form';
import { PicTechnicalForm } from './components/pic-technical-form';

export function PicInfoContent() {
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
      title: 'PIC of Owner',
      target: 'pic_owner',
      active: true,
    },
    {
      title: 'PIC of Business',
      target: 'pic_business',
    },
    {
      title: 'PIC of Finance',
      target: 'pic_finance',
    },
    {
      title: 'PIC of Technical Engineering',
      target: 'pic_technical',
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
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">PIC</h2>
          <p className="text-gray-600">
            Add at least one PIC in the section below. You can update or add more PICs later.
          </p>
        </div>

        <div id="pic_owner" className="scroll-mt-24">
          <PicOwnerForm />
        </div>
        <div id="pic_business" className="scroll-mt-24">
          <PicBusinessForm />
        </div>
        <div id="pic_finance" className="scroll-mt-24">
          <PicFinanceForm />
        </div>
        <div id="pic_technical" className="scroll-mt-24">
          <PicTechnicalForm />
        </div>
        
        <div className="flex justify-between items-center flex-wrap gap-3 pt-5">
          <Button variant="outline">
            <MoveLeft className="text-base" />
            <Link to="/merchant-management/merchant/create/business-info">
              ← Previous Section
            </Link>
          </Button>

          <Button>
            <Link to="/merchant-management/merchant/create/documents">
              Next Section →
            </Link>
            <MoveRight className="text-base" />
          </Button>
        </div>
      </div>
    </div>
  );
}
