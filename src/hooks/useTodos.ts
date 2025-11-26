import { useState, useEffect, useCallback } from 'react';
import type { Task, Category } from '@/types/todo';
import { createTask, isTaskUrgent } from '@/types/todo';

export interface UseTodosReturn {
  todos: Task[];
  addTodo: (description: string, category?: Category) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, description: string) => void;
  deleteTodo: (id: string) => void;
  moveToCategory: (id: string, category: Category | undefined) => void;
  openCount: number;
  completedCount: number;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Task[]>([]);

  // Update urgent status every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prev) =>
        prev.map((todo) => ({
          ...todo,
          isUrgent: isTaskUrgent(todo),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTodo = useCallback((description: string, category?: Category) => {
    const trimmed = description.trim();
    if (!trimmed) return;

    setTodos((prev) => [...prev, createTask(trimmed, category)]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id !== id) return todo;

        const newStatus = todo.status === 'open' ? 'completed' : 'open';
        return {
          ...todo,
          status: newStatus,
          isUrgent: newStatus === 'completed' ? false : isTaskUrgent(todo),
        };
      })
    );
  }, []);

  const editTodo = useCallback((id: string, description: string) => {
    const trimmed = description.trim();
    if (!trimmed) return;

    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id !== id) return todo;
        // Only allow editing open tasks
        if (todo.status !== 'open') return todo;

        return { ...todo, description: trimmed };
      })
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const moveToCategory = useCallback(
    (id: string, category: Category | undefined) => {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id !== id) return todo;
          return { ...todo, category };
        })
      );
    },
    []
  );

  const openCount = todos.filter((t) => t.status === 'open').length;
  const completedCount = todos.filter((t) => t.status === 'completed').length;

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    moveToCategory,
    openCount,
    completedCount,
  };
}
