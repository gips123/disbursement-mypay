interface TableLoadingProps {
  message?: string;
}

export function TableLoading({ message = 'Loading...' }: TableLoadingProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <div className="text-muted-foreground">{message}</div>
      </div>
    </div>
  );
}

interface TableEmptyProps {
  message?: string;
  description?: string;
  action?: React.ReactNode;
}

export function TableEmpty({ 
  message = 'No data available',
  description,
  action
}: TableEmptyProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-6xl text-muted-foreground/20">📋</div>
        <div>
          <h3 className="text-lg font-medium text-foreground">{message}</h3>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}
