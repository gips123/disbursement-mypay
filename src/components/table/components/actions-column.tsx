import React from 'react';
import { Row } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableAction, BaseTableItem } from '../types';

interface ActionsColumnProps<T extends BaseTableItem> {
  row: Row<T>;
  actions: TableAction<T>[];
}

export function ActionsColumn<T extends BaseTableItem>({
  row,
  actions,
}: ActionsColumnProps<T>) {
  const visibleActions = actions.filter(
    (action) => !action.hidden || !action.hidden(row.original)
  );

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" mode="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        {visibleActions.map((action, index) => {
          const isDestructive = action.variant === 'destructive';
          const isDisabled = action.disabled ? action.disabled(row.original) : false;
          
          return (
            <React.Fragment key={action.label}>
              <DropdownMenuItem
                onClick={() => !isDisabled && action.onClick(row.original)}
                variant={isDestructive ? 'destructive' : undefined}
                disabled={isDisabled}
              >
                {action.label}
              </DropdownMenuItem>
              {isDestructive && index < visibleActions.length - 1 && (
                <DropdownMenuSeparator />
              )}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
