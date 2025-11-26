import { useMemo, useState } from 'react';
import type { Task, Category } from '@/types/todo';
import { CATEGORIES } from '@/types/todo';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoSummary, type FilterTab } from './TodoSummary';
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

  const [activeFilter, setActiveFilter] = useState<FilterTab>('today');

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      activeFilter === 'today'
        ? todo.status === 'open'
        : todo.status === 'completed'
    );
  }, [todos, activeFilter]);

  const groupedTasks = useMemo((): GroupedTasks => {
    const groups: GroupedTasks = [];

    // Add category groups in order
    for (const cat of CATEGORIES) {
      const tasksInCategory = filteredTodos.filter(
        (t) => t.category === cat.value
      );
      if (tasksInCategory.length > 0) {
        groups.push({ category: cat.value, tasks: tasksInCategory });
      }
    }

    // Add uncategorized tasks
    const uncategorized = filteredTodos.filter((t) => !t.category);
    if (uncategorized.length > 0) {
      groups.push({ category: 'uncategorized', tasks: uncategorized });
    }

    return groups;
  }, [filteredTodos]);

  const hasFilteredTasks = filteredTodos.length > 0;

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center space-y-1">
          <h1 className="text-xl font-normal tracking-tight">To-Do Liste</h1>
        </header>

        <TodoSummary
          openCount={openCount}
          completedCount={completedCount}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <section
          id="task-list"
          role="tabpanel"
          aria-labelledby="task-list-heading"
        >
          <h2 id="task-list-heading" className="sr-only">
            {activeFilter === 'today' ? 'Offene Aufgaben' : 'Erledigte Aufgaben'}
          </h2>

          {!hasFilteredTasks ? (
            <p className="text-center text-muted-foreground py-8">
              {activeFilter === 'today'
                ? 'Keine offenen Aufgaben. Gut gemacht!'
                : 'Noch keine erledigten Aufgaben.'}
            </p>
          ) : (
            <div className="space-y-3">
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

        {/* Floating Add Form */}
        <section
          aria-labelledby="add-task-heading"
          className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8"
        >
          <h2 id="add-task-heading" className="sr-only">
            Neue Aufgabe hinzufügen
          </h2>
          <div className="max-w-md mx-auto">
            <TodoForm onAdd={addTodo} />
          </div>
        </section>

        {/* Spacer for fixed form */}
        <div className="h-24" aria-hidden="true" />
      </div>
    </main>
  );
}
