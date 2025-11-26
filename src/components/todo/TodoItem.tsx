import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import type { Task } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ task, onToggle, onEdit, onDelete }: TodoItemProps) {
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

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
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

          <div className="flex items-center gap-2 mt-1">
            <time
              dateTime={task.createdAt.toISOString()}
              className="text-xs text-muted-foreground"
            >
              {formatDate(task.createdAt)}
            </time>
            {task.isUrgent && (
              <Badge variant="destructive" className="text-xs">
                Dringend
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-1">
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
