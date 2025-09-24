import React from 'react';
import { cn } from '@/lib/utils';

interface MerchantHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export function MerchantHeader({ title, subtitle, children, className }: MerchantHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">{title}</h1>
        {subtitle && (
          <p className="text-sm text-secondary-foreground">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}

export default MerchantHeader;
