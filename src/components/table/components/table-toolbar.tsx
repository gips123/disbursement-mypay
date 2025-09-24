import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { useDataGrid } from '@/components/ui/data-grid';
import { ReusableTableProps, BaseTableItem } from '../types';

interface TableToolbarProps<T extends BaseTableItem> {
  toolbar?: ReusableTableProps<T>['toolbar'];
  tableLayout?: ReusableTableProps<T>['tableLayout'];
}

export function TableToolbar<T extends BaseTableItem>({ 
  toolbar,
  tableLayout 
}: TableToolbarProps<T>) {
  const { table } = useDataGrid();

  return (
    <div className="flex items-center gap-2">
      {toolbar?.leftContent}
        <Button variant={"outline"}>
            <Settings2 size={16} />
            Filters
        </Button>

      {tableLayout?.columnsVisibility !== false && (
        <DataGridColumnVisibility
          table={table}
          trigger={
            <Button variant="outline">
              <Settings2 />
              Columns
            </Button>
          }
        />
      )}
      {toolbar?.rightContent}
    </div>
  );
}
