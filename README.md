# To-Do Liste

Eine React-Anwendung zur Verwaltung von Aufgaben mit automatischer Dringlichkeitsmarkierung.

## Setup

```bash
npm install
npm run dev
```

Die App läuft dann unter `http://localhost:5173`.

## Features

- **Aufgaben erstellen**: Neue Aufgaben mit Beschreibung hinzufügen
- **Status verwalten**: Aufgaben als erledigt markieren oder wiedereröffnen
- **Bearbeiten**: Offene Aufgaben können bearbeitet werden
- **Löschen**: Beliebige Aufgaben entfernen
- **Automatische Dringlichkeit**: Aufgaben werden nach 1 Minute automatisch als dringend markiert
- **Übersicht**: Zusammenfassung der offenen und erledigten Aufgaben
- **Accessibility**: Vollständige Tastaturnavigation und Screenreader-Unterstützung

## Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Typsicherheit
- **Vite 7** - Build Tool
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI-Komponenten (basiert auf Radix UI)

## Projektstruktur

```
src/
├── components/
│   ├── todo/           # To-Do-Komponenten
│   │   ├── TodoApp.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoSummary.tsx
│   └── ui/             # shadcn/ui Komponenten
├── hooks/
│   └── useTodos.ts     # State-Management Hook
├── types/
│   └── todo.ts         # TypeScript Typen
├── lib/
│   └── utils.ts        # Utility-Funktionen
├── App.tsx
├── main.tsx
└── index.css
```

## Scripts

| Script | Beschreibung |
|--------|--------------|
| `npm run dev` | Startet den Entwicklungsserver |
| `npm run build` | Erstellt den Production Build |
| `npm run lint` | Führt ESLint aus |
| `npm run preview` | Zeigt den Production Build lokal |
