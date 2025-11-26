import type { Task, Category } from '@/types/todo';
import { CATEGORIES } from '@/types/todo';
import { TodoList } from './TodoList';

interface CategoryGroupProps {
  category: Category | 'uncategorized';
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
  onMoveToCategory: (id: string, category: Category | undefined) => void;
}

export function CategoryGroup({
  category,
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onMoveToCategory,
}: CategoryGroupProps) {
  const getCategoryLabel = (): string => {
    if (category === 'uncategorized') {
      return 'Ohne Kategorie';
    }
    return CATEGORIES.find((c) => c.value === category)?.label ?? category;
  };

  const openCount = tasks.filter((t) => t.status === 'open').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <section aria-labelledby={`category-${category}`}>
      <div className="flex items-center justify-between mb-2">
        <h3
          id={`category-${category}`}
          className="text-lg font-semibold text-foreground"
        >
          {getCategoryLabel()}
        </h3>
        <span className="text-sm text-muted-foreground">
          {openCount} offen, {completedCount} erledigt
        </span>
      </div>
      <TodoList
        tasks={tasks}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onMoveToCategory={onMoveToCategory}
      />
    </section>
  );
}
