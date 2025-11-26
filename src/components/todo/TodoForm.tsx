import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TodoFormProps {
  onAdd: (description: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = description.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Neue Aufgabe eingeben..."
        aria-label="Aufgabenbeschreibung"
        className="flex-1"
      />
      <Button type="submit" disabled={!description.trim()}>
        Hinzufügen
      </Button>
    </form>
  );
}
