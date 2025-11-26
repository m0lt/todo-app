export type TaskStatus = 'open' | 'completed';

export type Category = 'work' | 'personal' | 'shopping' | 'other';

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'work', label: 'Arbeit' },
  { value: 'personal', label: 'Privat' },
  { value: 'shopping', label: 'Einkaufen' },
  { value: 'other', label: 'Sonstiges' },
];

export interface Task {
  id: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
  isUrgent: boolean;
  category?: Category;
}

/** Threshold in milliseconds after which an open task becomes urgent */
export const URGENT_THRESHOLD_MS = 60_000;

/** Creates a new task with the given description and optional category */
export function createTask(description: string, category?: Category): Task {
  return {
    id: crypto.randomUUID(),
    description: description.trim(),
    createdAt: new Date(),
    status: 'open',
    isUrgent: false,
    category,
  };
}

/** Checks if a task should be marked as urgent based on its age */
export function isTaskUrgent(task: Task): boolean {
  if (task.status === 'completed') {
    return false;
  }
  return Date.now() - task.createdAt.getTime() > URGENT_THRESHOLD_MS;
}
