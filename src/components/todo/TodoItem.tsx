import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import type { Task, Category } from '@/types/todo';
import { CATEGORIES } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Briefcase, Home, ShoppingCart, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
  onMoveToCategory: (id: string, category: Category | undefined) => void;
}

const CATEGORY_CONFIG: Record<
  Category,
  { icon: typeof Briefcase; colorClass: string }
> = {
  work: { icon: Briefcase, colorClass: 'bg-[var(--category-work)]' },
  personal: { icon: Home, colorClass: 'bg-[var(--category-personal)]' },
  shopping: { icon: ShoppingCart, colorClass: 'bg-[var(--category-shopping)]' },
  other: { icon: MoreHorizontal, colorClass: 'bg-[var(--category-other)]' },
};

export function TodoItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  onMoveToCategory,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.description);
  const [isChecking, setIsChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isCompleted = task.status === 'completed';
  const canEdit = !isCompleted;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleToggle = () => {
    setIsChecking(true);
    setTimeout(() => {
      onToggle(task.id);
      setIsChecking(false);
    }, 200);
  };

  const handleEditSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== task.description) {
      onEdit(task.id, trimmed);
    } else {
      setEditValue(task.description);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(task.description);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'none') {
      onMoveToCategory(task.id, undefined);
    } else {
      onMoveToCategory(task.id, value as Category);
    }
  };

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getCategoryLabel = (category: Category): string => {
    return CATEGORIES.find((c) => c.value === category)?.label ?? category;
  };

  const CategoryIcon = task.category
    ? CATEGORY_CONFIG[task.category].icon
    : null;

  return (
    <div
      className={cn(
        'bg-card rounded p-4 transition-all animate-task-enter',
        task.isUrgent && 'animate-urgent-pulse',
        isCompleted && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Custom Ring Checkbox */}
        <button
          onClick={handleToggle}
          className={cn(
            'mt-0.5 size-4 rounded-full border-2 transition-all shrink-0',
            isCompleted
              ? 'bg-primary border-primary'
              : 'border-muted-foreground/50 hover:border-primary',
            isChecking && 'animate-check-pop'
          )}
          aria-label={
            isCompleted ? 'Als offen markieren' : 'Als erledigt markieren'
          }
          role="checkbox"
          aria-checked={isCompleted}
        >
          {isCompleted && (
            <svg
              className="size-full text-primary-foreground p-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleEditSubmit}
                onKeyDown={handleKeyDown}
                aria-label="Aufgabe bearbeiten"
                className="flex-1 bg-secondary border-none"
              />
            </form>
          ) : (
            <>
              <p
                className={cn(
                  'text-base leading-tight',
                  isCompleted && 'line-through text-muted-foreground'
                )}
              >
                {task.description}
              </p>
              <time
                dateTime={task.createdAt.toISOString()}
                className="text-sm text-muted-foreground mt-1 block"
              >
                Heute um {formatTime(task.createdAt)}
              </time>
            </>
          )}
        </div>

        {/* Category Badge & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {task.category && CategoryIcon && (
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs text-white font-normal',
                CATEGORY_CONFIG[task.category].colorClass
              )}
            >
              <CategoryIcon className="size-3.5" />
              {getCategoryLabel(task.category)}
            </span>
          )}

          {task.isUrgent && (
            <span className="px-2 py-1 rounded text-xs bg-destructive text-white">
              Dringend
            </span>
          )}
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        <Select
          value={task.category ?? 'none'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger
            className="w-[120px] h-8 text-xs bg-secondary border-none"
            aria-label="Kategorie ändern"
          >
            <SelectValue placeholder="Kategorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Keine</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-1" />

        {canEdit && !isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            aria-label={`Aufgabe "${task.description}" bearbeiten`}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <Pencil className="size-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          aria-label={`Aufgabe "${task.description}" löschen`}
          className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
