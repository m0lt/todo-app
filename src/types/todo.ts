export type TaskStatus = 'open' | 'completed';

export interface Task {
  id: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
  isUrgent: boolean;
}

/** Threshold in milliseconds after which an open task becomes urgent */
export const URGENT_THRESHOLD_MS = 60_000;

/** Creates a new task with the given description */
export function createTask(description: string): Task {
  return {
    id: crypto.randomUUID(),
    description: description.trim(),
    createdAt: new Date(),
    status: 'open',
    isUrgent: false,
  };
}

/** Checks if a task should be marked as urgent based on its age */
export function isTaskUrgent(task: Task): boolean {
  if (task.status === 'completed') {
    return false;
  }
  return Date.now() - task.createdAt.getTime() > URGENT_THRESHOLD_MS;
}
