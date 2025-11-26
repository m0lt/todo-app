# Project Context

## Purpose

React State Management & TypeScript Übung - eine To-Do-Listen-Anwendung, die sauberes State Management, User-Interaktionen und wartbare Business-Logik demonstriert.

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 7 (Build Tool)
- Tailwind CSS v4 + shadcn/ui (Styling & Accessibility)
- ESLint (Code Quality)

## Project Conventions

### Code Style

- **Sprache**: Code und Kommentare auf Englisch, UI-Texte können Deutsch sein
- **Naming Conventions**:
  - Komponenten: PascalCase (`TodoItem.tsx`)
  - Hooks: camelCase mit `use`-Prefix (`useTodos.ts`)
  - Types/Interfaces: PascalCase (`Task`, `TaskStatus`)
  - Variablen/Funktionen: camelCase (`handleSubmit`, `isUrgent`)
  - Konstanten: SCREAMING_SNAKE_CASE nur für echte Konstanten (`URGENT_THRESHOLD_MS`)
  - Dateien: kebab-case für Utils (`date-utils.ts`), PascalCase für Komponenten
- **Formatting**: Prettier defaults (wenn konfiguriert), sonst ESLint

### Code Comments

- Kommentare nur wo nötig - Code sollte selbsterklärend sein
- JSDoc für exportierte Funktionen und komplexe Typen
- TODO-Kommentare mit Kontext: `// TODO: Add validation when API is ready`
- Keine auskommentierten Code-Blöcke committen

### Coding Best Practices

- **Einfachheit vor Cleverness**: Keine "fancy" Lösungen, lieber lesbarer Code
- **Keine Over-Engineering**: Abstraktionen nur wenn mindestens 3x verwendet
- **Explizit vor implizit**: Klare Prop-Namen, keine magic numbers
- **Kleine Funktionen**: Eine Funktion = eine Aufgabe
- **Frühe Returns**: Guard clauses statt tief verschachtelter if-else
- **TypeScript strikt nutzen**: Keine `any`, explizite Return-Types für exportierte Funktionen

### Architecture Patterns

- Custom Hooks für State-Logik (Trennung von UI und Business-Logik)
- Komponenten so klein wie sinnvoll, aber nicht zu granular
- Props drilling ist OK für 2-3 Ebenen, danach Context erwägen
- Keine externen State-Management-Libraries für diesen Scope

## Git Workflow

### Branching

- `main`: Stabiler, lauffähiger Code
- Feature Branches bei Bedarf: `feature/add-categories`, `fix/urgent-timer`
- Für diese Übung: Direkt auf `main` ist OK, solange Commits sauber sind

### Commit Conventions

- Aussagekräftige Commit-Messages auf Englisch
- Format: `type: short description`
  - `feat:` Neue Features
  - `fix:` Bug Fixes
  - `refactor:` Code-Umstrukturierung ohne Funktionsänderung
  - `style:` Formatting, keine Code-Änderungen
  - `docs:` Dokumentation
  - `chore:` Build, Dependencies, Config
- Beispiele:
  - `feat: add todo creation form with validation`
  - `fix: urgent marker not updating automatically`
  - `refactor: extract useTodos hook from TodoApp`

### .gitignore

Folgende Dateien/Ordner NICHT committen:
- `node_modules/`
- `dist/`
- `.env*` (außer `.env.example`)
- IDE-spezifische Dateien (`.idea/`, `.vscode/` wenn persönlich)
- `openspec/` (AI-Instruktionen, nicht Teil der Abgabe)
- `CLAUDE.md`, `.claude/` (AI-Assistant-Konfiguration)

## README Requirements

Die `README.md` soll enthalten:
1. **Projekt-Titel und kurze Beschreibung**
2. **Setup-Anleitung**: `npm install && npm run dev`
3. **Features-Übersicht** (was kann die App)
4. **Tech Stack** (verwendete Technologien)
5. **Projektstruktur** (kurze Ordner-Erklärung)
6. **Keine Implementation-Details** - Code sollte selbsterklärend sein

## Domain Context

- Task/Aufgabe: Ein To-Do-Eintrag mit Beschreibung, Status, Erstellungsdatum
- Status: "open" (offen) oder "completed" (erledigt)
- Urgent/Dringend: Automatisch markiert nach 1 Minute offen

## Important Constraints

- Keine Persistierung (localStorage/Backend) erforderlich
- Accessibility ist Pflicht (Tastatur, Screenreader, Kontraste)
- Part 1 muss fertig und committet sein bevor Part 2 beginnt
