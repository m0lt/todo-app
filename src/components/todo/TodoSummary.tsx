interface TodoSummaryProps {
  openCount: number;
  completedCount: number;
}

export function TodoSummary({ openCount, completedCount }: TodoSummaryProps) {
  const total = openCount + completedCount;

  return (
    <div
      className="flex gap-4 text-sm text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <span>
        <span className="font-medium text-foreground">{openCount}</span> offen
      </span>
      <span>
        <span className="font-medium text-foreground">{completedCount}</span>{' '}
        erledigt
      </span>
      {total > 0 && (
        <span className="text-muted-foreground/70">({total} gesamt)</span>
      )}
    </div>
  );
}
