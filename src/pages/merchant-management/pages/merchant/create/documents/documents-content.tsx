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
import { SupportingDocumentsForm } from './components/supporting-documents-form';
import { UploadedDocumentsView } from './components/uploaded-documents-view';

export function DocumentsContent() {
  const isMobile = useIsMobile();
  const [sidebarSticky, setSidebarSticky] = useState(false);
  const [activeView, setActiveView] = useState<'supporting' | 'uploaded'>('supporting');
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
      title: 'Supporting Documents',
      target: 'supporting_documents',
      active: activeView === 'supporting',
    },
    {
      title: 'Supporting Documents (Uploaded)',
      target: 'uploaded_documents',
      active: activeView === 'uploaded',
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents</h2>
          <p className="text-gray-600">
            Upload all necessary documents for merchant verification.
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <Button
            variant={activeView === 'supporting' ? 'primary' : 'outline'}
            onClick={() => setActiveView('supporting')}
          >
            Supporting Documents
          </Button>
          <Button
            variant={activeView === 'uploaded' ? 'primary' : 'outline'}
            onClick={() => setActiveView('uploaded')}
          >
            Uploaded Documents
          </Button>
        </div>

        {activeView === 'supporting' && (
          <div id="supporting_documents" className="scroll-mt-24">
            <SupportingDocumentsForm />
          </div>
        )}

        {activeView === 'uploaded' && (
          <div id="uploaded_documents" className="scroll-mt-24">
            <UploadedDocumentsView />
          </div>
        )}
        
        <div className="flex justify-between items-center flex-wrap gap-3 pt-5">
          <Button variant="outline">
            <MoveLeft className="text-base" />
            <Link to="/merchant-management/merchant/create/pic-info">
              ← Previous Section
            </Link>
          </Button>

          <Button>
            <Link to="/merchant-management/merchant/create/services">
              Next Section →
            </Link>
            <MoveRight className="text-base" />
          </Button>
        </div>
      </div>
    </div>
  );
}
