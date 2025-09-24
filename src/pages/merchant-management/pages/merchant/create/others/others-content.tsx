import { useEffect, useRef, useState } from 'react';
import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scrollspy } from '@/components/ui/scrollspy';
import { ScrollspyMenu, ScrollspyMenuItems } from '@/partials/navbar/scrollspy-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { cn } from '@/lib/utils';
import { AdditionalNotesForm } from './components/additional-notes-form';

export function OthersContent() {
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
      title: 'Additional Notes',
      target: 'additional_notes',
      active: true,
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
        <div id="additional_notes" className="scroll-mt-24">
          <AdditionalNotesForm />
        </div>
        
        <div className="flex justify-center items-center flex-wrap gap-3 pt-5">
          <Button variant="outline">
            <MoveLeft className="text-base" />
            <Link to="/merchant-management/merchant/create/hierarchy">
              ← Previous Section
            </Link>
          </Button>

          <Button className="bg-blue-600 hover:bg-blue-700">
            Create Merchant
          </Button>
        </div>
      </div>
    </div>
  );
}
