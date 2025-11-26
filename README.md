# To-Do Liste

Eine React-Anwendung zur Verwaltung von Aufgaben mit automatischer Dringlichkeitsmarkierung und modernem Dark Mode Design.

## Setup

```bash
npm install
npm run dev
```

Die App läuft dann unter `http://localhost:5173`.

## Features

### Kern-Funktionen
- **Aufgaben erstellen**: Neue Aufgaben mit Beschreibung hinzufügen
- **Status verwalten**: Aufgaben als erledigt markieren oder wiedereröffnen
- **Bearbeiten**: Offene Aufgaben können bearbeitet werden
- **Löschen**: Beliebige Aufgaben entfernen
- **Automatische Dringlichkeit**: Aufgaben werden nach 1 Minute automatisch als dringend markiert
- **Tab-Filter**: Wechsel zwischen offenen und erledigten Aufgaben
- **Accessibility**: Vollständige Tastaturnavigation und Screenreader-Unterstützung

### Kategorien
- **Kategorie zuweisen**: Aufgaben können einer Kategorie zugeordnet werden (Arbeit, Privat, Einkaufen, Sonstiges)
- **Kategorie ändern**: Aufgaben können jederzeit in eine andere Kategorie verschoben werden
- **Gruppierte Ansicht**: Aufgaben werden nach Kategorien gruppiert angezeigt
- **Farbige Badges**: Jede Kategorie hat eine eigene Farbe und Icon

### Design & Animationen
- **Dark Mode**: Modernes dunkles Design
- **Animationen**: Smooth Transitions für Task-Aktionen (tw-animate-css)
- **Reduced Motion**: Respektiert `prefers-reduced-motion` Einstellung

## Tech Stack

- **React 19** - UI Framework
- **TypeScript 5.9** - Typsicherheit
- **Vite 7** - Build Tool
- **Tailwind CSS v4** - Styling
- **tw-animate-css** - Animationen
- **shadcn/ui** - UI-Komponenten (basiert auf Radix UI)
- **Lucide React** - Icons

## Projektstruktur

```
src/
├── components/
│   ├── todo/           # To-Do-Komponenten
│   │   ├── TodoApp.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   ├── TodoSummary.tsx
│   │   └── CategoryGroup.tsx
│   └── ui/             # shadcn/ui Komponenten
├── hooks/
│   └── useTodos.ts     # State-Management Hook
├── types/
│   └── todo.ts         # TypeScript Typen & Kategorien
├── lib/
│   └── utils.ts        # Utility-Funktionen
├── App.tsx
├── main.tsx
└── index.css           # Design-Tokens & Animationen
```

## Scripts

| Script | Beschreibung |
|--------|--------------|
| `npm run dev` | Startet den Entwicklungsserver |
| `npm run build` | Erstellt den Production Build |
| `npm run lint` | Führt ESLint aus |
| `npm run preview` | Zeigt den Production Build lokal |
