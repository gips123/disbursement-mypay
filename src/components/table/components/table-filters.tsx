import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FilterOption, SortOption, type TableFilters } from '../types';

interface TableFiltersProps {
  filters: TableFilters;
  onFiltersChange: (filters: Partial<TableFilters>) => void;
  onClearSearch: () => void;
  searchPlaceholder?: string;
  filterOptions?: FilterOption[];
  filterLabel?: string;
  sortOptions?: SortOption[];
  showSearch?: boolean;
  showFilters?: boolean;
  showSort?: boolean;
}

export function TableFilters({
  filters,
  onFiltersChange,
  onClearSearch,
  searchPlaceholder = 'Search...',
  filterOptions = [],
  filterLabel = 'Status',
  sortOptions = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Older', value: 'older' },
  ],
  showSearch = true,
  showFilters = true,
  showSort = true,
}: TableFiltersProps) {
  const handleStatusChange = (checked: boolean, value: string) => {
    const newSelectedFilters = checked
      ? [...filters.selectedFilters, value]
      : filters.selectedFilters.filter((v) => v !== value);
    
    onFiltersChange({ selectedFilters: newSelectedFilters });
  };

  const handleSortChange = (checked: boolean, value: string) => {
    if (checked) {
      onFiltersChange({ sortOrder: value });
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Search Input */}
      {showSearch && (
        <div className="relative">
          <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder={searchPlaceholder}
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="ps-9 w-60"
          />
          {filters.search.length > 0 && (
            <Button
              mode="icon"
              variant="ghost"
              className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={onClearSearch}
            >
              <X />
            </Button>
          )}
        </div>
      )}

      {/* Status Filter */}
      {showFilters && filterOptions.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter />
              {filterLabel}
              {filters.selectedFilters.length > 0 && (
                <Badge size="sm" variant="outline">
                  {filters.selectedFilters.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-3" align="start">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">
                Filters
              </div>
              <div className="space-y-3">
                {filterOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2.5">
                    <Checkbox
                      id={option.value}
                      checked={filters.selectedFilters.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleStatusChange(checked === true, option.value)
                      }
                    />
                    <Label
                      htmlFor={option.value}
                      className="grow flex items-center justify-between font-normal gap-1.5"
                    >
                      {option.label}
                      {option.count && (
                        <span className="text-muted-foreground">
                          {option.count}
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Sort Order */}
      {showSort && sortOptions.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter />
              Sort Order
              {filters.sortOrder !== 'latest' && (
                <Badge size="sm" variant="outline">
                  {sortOptions.find(o => o.value === filters.sortOrder)?.label}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-3" align="start">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">
                Sort By
              </div>
              <div className="space-y-3">
                {sortOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2.5">
                    <Checkbox
                      id={option.value}
                      checked={filters.sortOrder === option.value}
                      onCheckedChange={(checked) =>
                        handleSortChange(checked === true, option.value)
                      }
                    />
                    <Label
                      htmlFor={option.value}
                      className="grow flex items-center justify-between font-normal gap-1.5"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
