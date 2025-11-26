import { useState, type FormEvent } from 'react';
import type { Category } from '@/types/todo';
import { CATEGORIES } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TodoFormProps {
  onAdd: (description: string, category?: Category) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category | ''>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = description.trim();
    if (!trimmed) return;

    onAdd(trimmed, category || undefined);
    setDescription('');
    setCategory('');
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
      <Select
        value={category}
        onValueChange={(value) => setCategory(value as Category)}
      >
        <SelectTrigger className="w-[140px]" aria-label="Kategorie auswählen">
          <SelectValue placeholder="Kategorie" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" disabled={!description.trim()}>
        Hinzufügen
      </Button>
    </form>
  );
}
