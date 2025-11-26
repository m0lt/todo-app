import { cn } from '@/lib/utils';

type FilterTab = 'today' | 'completed';

interface TodoSummaryProps {
  openCount: number;
  completedCount: number;
  activeFilter: FilterTab;
  onFilterChange: (filter: FilterTab) => void;
}

export function TodoSummary({
  openCount,
  completedCount,
  activeFilter,
  onFilterChange,
}: TodoSummaryProps) {
  return (
    <div
      className="bg-accent rounded p-2 flex gap-2"
      role="tablist"
      aria-label="Aufgaben filtern"
    >
      <button
        role="tab"
        aria-selected={activeFilter === 'today'}
        aria-controls="task-list"
        onClick={() => onFilterChange('today')}
        className={cn(
          'flex-1 py-3 px-6 rounded text-base font-normal tracking-tight transition-colors',
          activeFilter === 'today'
            ? 'bg-primary text-primary-foreground'
            : 'bg-transparent text-foreground border-2 border-muted-foreground/50 hover:border-muted-foreground'
        )}
      >
        Offen ({openCount})
      </button>
      <button
        role="tab"
        aria-selected={activeFilter === 'completed'}
        aria-controls="task-list"
        onClick={() => onFilterChange('completed')}
        className={cn(
          'flex-1 py-3 px-6 rounded text-base font-normal tracking-tight transition-colors',
          activeFilter === 'completed'
            ? 'bg-primary text-primary-foreground'
            : 'bg-transparent text-foreground border-2 border-muted-foreground/50 hover:border-muted-foreground'
        )}
      >
        Erledigt ({completedCount})
      </button>
    </div>
  );
}

export type { FilterTab };
