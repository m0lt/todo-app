import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import type { Task, Category } from '@/types/todo';
import { CATEGORIES } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
  onMoveToCategory: (id: string, category: Category | undefined) => void;
}

export function TodoItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  onMoveToCategory,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.description);
  const inputRef = useRef<HTMLInputElement>(null);

  const isCompleted = task.status === 'completed';
  const canEdit = !isCompleted;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getCategoryLabel = (category: Category): string => {
    return CATEGORIES.find((c) => c.value === category)?.label ?? category;
  };

  return (
    <Card
      className={`p-4 transition-colors ${
        task.isUrgent ? 'border-destructive bg-destructive/5' : ''
      } ${isCompleted ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={isCompleted}
          onCheckedChange={() => onToggle(task.id)}
          aria-label={isCompleted ? 'Als offen markieren' : 'Als erledigt markieren'}
          className="mt-1"
        />

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
                className="flex-1"
              />
            </form>
          ) : (
            <label
              htmlFor={`task-${task.id}`}
              className={`block cursor-pointer ${
                isCompleted ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {task.description}
            </label>
          )}

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <time
              dateTime={task.createdAt.toISOString()}
              className="text-xs text-muted-foreground"
            >
              {formatDate(task.createdAt)}
            </time>
            {task.category && (
              <Badge variant="secondary" className="text-xs">
                {getCategoryLabel(task.category)}
              </Badge>
            )}
            {task.isUrgent && (
              <Badge variant="destructive" className="text-xs">
                Dringend
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Select
            value={task.category ?? 'none'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger
              className="w-[110px] h-8 text-xs"
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
          {canEdit && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              aria-label={`Aufgabe "${task.description}" bearbeiten`}
            >
              Bearbeiten
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            aria-label={`Aufgabe "${task.description}" löschen`}
            className="text-destructive hover:text-destructive"
          >
            Löschen
          </Button>
        </div>
      </div>
    </Card>
  );
}
