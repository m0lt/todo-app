import type { Task } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string, description: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ tasks, onToggle, onEdit, onDelete }: TodoListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        Keine Aufgaben vorhanden. Füge eine neue Aufgabe hinzu!
      </p>
    );
  }

  return (
    <ul className="space-y-2" aria-label="Aufgabenliste">
      {tasks.map((task) => (
        <li key={task.id}>
          <TodoItem
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
