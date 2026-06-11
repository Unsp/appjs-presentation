# AGENTS.md — app-js-presentation

Instructions for AI agents (Cursor, Claude Code, etc.) working on tasks in this repository.

**Project root:** `app-js-presentation`  
**Purpose:** technical presentation about React Native and Expo (slides, speaker notes, live demos)  
**Stack:** React Native + Expo + TypeScript (demo app and examples)  
**Task workflow source of truth:** [docs/task-automation/README.md](docs/task-automation/README.md)

---

## 1. Project priorities

1. Minimal and safe changes inside task spec boundaries.
2. Preserve existing slides, demos, and navigation outside the requested scope.
3. Clear verifiability: lint/typecheck/tests (when applicable) + manual walkthrough from the task.
4. Keep `docs/` aligned with implemented content and demo behavior.
5. Favor clarity for a live audience over production-app patterns.

---

## 2. Quick structure context

```text
app-js-presentation/
├── src/                    # Expo demo app (when added)
├── slides/
│   ├── slides.md           # canonical Slidev deck
│   └── SLIDEV.md           # syntax rules
├── docs/
│   ├── topics/             # feature docs + planner-created tasks
│   │   └── <feature>/
│   │       ├── README.md   # feature source of truth
│   │       └── <ID>.md     # tasks (planner creates)
│   ├── outline/
│   └── task-automation/
├── package.json
└── README.md
```

Exact folders may appear as the project grows. Feature scope lives in `docs/topics/<feature>/README.md`; implementation tasks are `<ID>.md` in the same folder (created by planner).

---

## 3. Mandatory agent workflow

### Before edits

1. Read the task spec, feature doc, and related repo docs (`@docs/topics/<feature>/<ID>.md`, `@docs/topics/<feature>/README.md`, outline).
2. **Re-read mandatory external sources** listed in the task (**Source links (mandatory re-read)**) or in the launch prompt (**Mandatory source re-read**):
   - **Context7** — official React Native / Expo / library docs for APIs and behavior cited in slides or demos.
   - **Design / deck sources** (Figma, slide markdown, PDF) — layout, copy, visual hierarchy when listed.
   - Do not treat task summaries as sufficient for technical claims or slide copy.
3. Post **Source verification** (see [docs/task-automation/README.md](docs/task-automation/README.md)) in Russian, then proceed.
4. Review existing implementation in affected files (`src/**`, `slides/**`, `docs/**` as scoped).
5. Confirm boundaries: in-scope vs out-of-scope.

### After edits

1. Run checks when the repo has them:
   - `npm run slides:build` — for any `slides/**` change
   - `npm run lint` / `npm run typecheck` — when demo app scripts exist
   - relevant tests for changed demo behavior
2. Update task status to `awaiting QA` (if work is complete).
3. Update relevant docs in `docs/` if slide flow, demo contract, or topic outline changed.

---

## 4. Tools and MCP

### Serena

Use Serena tools whenever possible for symbol-aware navigation and precise edits.

### Context7

Use Context7 for current React Native, Expo, and third-party library documentation. Verify API names, deprecations, and setup steps before putting them on slides or in demo code.

### Figma MCP (optional)

Use when the task lists Figma nodes for slide layout or visual assets. Task text is a hint; frames in Figma are authoritative for layout and copy.

### Shell

Use npm scripts from `package.json`. Avoid running heavy commands that are not required for this scope.

---

## 5. Validation commands

When `package.json` scripts exist:

```bash
npm run slides:build
```

Demo app (when `src/` exists):

```bash
npm run lint
npm run typecheck
```

Tests (when configured):

```bash
npm run test -- --watchAll=false
```

If full test run is too expensive for scope, run relevant subsets and call that out explicitly in the report.

For content-only tasks (slides, docs), manual QA from the task acceptance table is the primary gate.

---

## 6. Code and content change rules

- TypeScript: use `type` not `interface` for object shapes; use plain `import`/`export` for types — no `import type` / `export type` (when `.cursor/rules/typescript-prefer-type.mdc` is present).
- Demo code should be minimal and readable on a projector — avoid app-scale abstractions unless the topic requires them.
- Do not exceed task scope.
- Do not do "while we're here" refactors.
- Do not leave legacy tails, commented dead code, or temporary flags for "later cleanup".
- Do not change public contracts without reflecting it in docs and task spec.
- Do not commit unless explicitly requested by the user.

---

## 7. Task status rules

- `open` -> ready to start
- `in progress` -> implementation is in progress
- `awaiting QA` -> work is ready and awaits manual validation (rehearsal, slide review, demo run)
- `done` / `closed` -> owner confirmation only

Agent must never mark a task as `done` without explicit user approval.

---

## 8. Documentation and source of truth

**Scope and engineering boundaries** (what to touch, files, regressions):

1. Task spec (`docs/topics/<feature>/<ID>.md`) and linked feature doc (`docs/topics/<feature>/README.md`)
2. Related docs linked in the task (outline, prior topics)
3. This `AGENTS.md`

**Technical and presentation facts** at implementation time:

1. Live **Context7 / official docs** and any sources listed under **Source links (mandatory re-read)**
2. Topic roadmap in `docs/topics/<domain>/`
3. Task spec summaries (may be outdated; reconcile in Source verification)

Chat context does not override live sources or the task’s out-of-scope section.

If implementation changes behavior or slide narrative, sync `docs/` as part of the same task.

---

## 9. Anti-patterns

- Implementing from the task summary only without re-reading mandatory doc or design sources.
- Skipping **Source verification** before the first in-scope edit.
- Nested ` ``` ` or markdown tables **inside** a launch prompt fence — breaks the Copy block; one outer `markdown` fence is OK per [task-automation README](docs/task-automation/README.md#copy-safe-prompt-delivery).
- Editing files owned by parallel tasks.
- Fixing unrelated failures outside current scope.
- Adding processes/docs that were not requested.
- Over-engineering demos as if this were a production mobile product.
- Bypassing git hooks or using unsafe git operations.

---

## Quick reference

```text
Launch (owner):
  doc chat -> Copy on markdown fence -> paste in new chat

Task flow:
  read task spec + repo docs
  -> re-read Context7 / mandatory sources
  -> Source verification (chat)
  -> implement minimal diff (slides and/or demo)
  -> run lint + typecheck (+ relevant tests)
  -> update docs/task status to awaiting QA
  -> wait owner confirmation

Never:
  commit without ask
  change unrelated files
  mark done without owner OK
```
