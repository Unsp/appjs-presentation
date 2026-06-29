# Code style & conventions

## TypeScript
- strict mode enabled
- Use `type` not `interface` for object shapes
- Plain import/export for types — no `import type` / `export type`
- Never use `any`

## Imports
- Path aliases: ~app, ~app-root, ~screens/*, ~features/*, ~shared/*
- No relative import paths (eslint-plugin-no-relative-import-paths)
- simple-import-sort for ordering
- eslint-plugin-boundaries for layer rules

## Architecture
- FSD-ish layers: app → screens → features → shared
- expo-router file-based routing in src/app/
- Feature modules export public API via index.ts
- Demo code: minimal, projector-readable — not production-scale

## Languages
- Slide copy & speaker notes: **Russian**
- docs/, task specs, AGENTS.md: **English**
- Agent-owner chat: **Russian**

## Agent workflow
- Read task spec + feature README before edits
- Source verification via Context7 for RN/Expo claims
- Minimal diff within task scope
- Run slides:build for slide changes; lint + typecheck for demo app