import { useMemo } from 'react';
import type { Task, Category } from '@/types/todo';
import { CATEGORIES } from '@/types/todo';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoSummary } from './TodoSummary';
import { CategoryGroup } from './CategoryGroup';

type GroupedTasks = {
  category: Category | 'uncategorized';
  tasks: Task[];
}[];

export function TodoApp() {
  const {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    moveToCategory,
    openCount,
    completedCount,
  } = useTodos();

  const groupedTasks = useMemo((): GroupedTasks => {
    const groups: GroupedTasks = [];

    // Add category groups in order
    for (const cat of CATEGORIES) {
      const tasksInCategory = todos.filter((t) => t.category === cat.value);
      if (tasksInCategory.length > 0) {
        groups.push({ category: cat.value, tasks: tasksInCategory });
      }
    }

    // Add uncategorized tasks
    const uncategorized = todos.filter((t) => !t.category);
    if (uncategorized.length > 0) {
      groups.push({ category: 'uncategorized', tasks: uncategorized });
    }

    return groups;
  }, [todos]);

  const hasAnyTasks = todos.length > 0;

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">To-Do Liste</h1>
          <p className="text-muted-foreground mt-1">
            Verwalte deine Aufgaben einfach und übersichtlich
          </p>
        </header>

        <section aria-labelledby="add-task-heading">
          <h2 id="add-task-heading" className="sr-only">
            Neue Aufgabe hinzufügen
          </h2>
          <TodoForm onAdd={addTodo} />
        </section>

        <TodoSummary openCount={openCount} completedCount={completedCount} />

        <section aria-labelledby="task-list-heading">
          <h2 id="task-list-heading" className="sr-only">
            Aufgaben nach Kategorie
          </h2>

          {!hasAnyTasks ? (
            <p className="text-center text-muted-foreground py-8">
              Keine Aufgaben vorhanden. Füge eine neue Aufgabe hinzu!
            </p>
          ) : (
            <div className="space-y-6">
              {groupedTasks.map((group) => (
                <CategoryGroup
                  key={group.category}
                  category={group.category}
                  tasks={group.tasks}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                  onDelete={deleteTodo}
                  onMoveToCategory={moveToCategory}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
