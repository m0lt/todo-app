import type { Task, Category } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
  onMoveToCategory: (id: string, category: Category | undefined) => void;
}

export function TodoList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onMoveToCategory,
}: TodoListProps) {
  return (
    <ul className="space-y-3" aria-label="Aufgabenliste">
      {tasks.map((task) => (
        <li key={task.id}>
          <TodoItem
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onMoveToCategory={onMoveToCategory}
          />
        </li>
      ))}
    </ul>
  );
}
