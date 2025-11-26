import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoSummary } from './TodoSummary';

export function TodoApp() {
  const {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    openCount,
    completedCount,
  } = useTodos();

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
            Aufgaben
          </h2>
          <TodoList
            tasks={todos}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        </section>
      </div>
    </main>
  );
}
