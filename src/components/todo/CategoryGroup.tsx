import type { Task, Category } from '@/types/todo';
import { CATEGORIES } from '@/types/todo';
import { TodoList } from './TodoList';
import { Briefcase, Home, ShoppingCart, MoreHorizontal, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryGroupProps {
  category: Category | 'uncategorized';
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
  onMoveToCategory: (id: string, category: Category | undefined) => void;
}

const CATEGORY_ICONS: Record<Category | 'uncategorized', typeof Briefcase> = {
  work: Briefcase,
  personal: Home,
  shopping: ShoppingCart,
  other: MoreHorizontal,
  uncategorized: Inbox,
};

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

  const Icon = CATEGORY_ICONS[category];

  return (
    <section aria-labelledby={`category-${category}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon
          className={cn(
            'size-4',
            category === 'uncategorized'
              ? 'text-muted-foreground'
              : 'text-foreground'
          )}
        />
        <h3
          id={`category-${category}`}
          className="text-sm font-medium text-foreground"
        >
          {getCategoryLabel()}
        </h3>
        <span className="text-xs text-muted-foreground">
          ({tasks.length})
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
