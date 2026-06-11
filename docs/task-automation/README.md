# Task Automation — Backlog and Agent Launch

Standard process for tasks in `app-js-presentation`: specification in `docs/`, implementation in a dedicated chat with an agent, acceptance by the owner.

**Related:** [AGENTS.md](../../AGENTS.md), [PROMPT.template.md](PROMPT.template.md), [README.md](../../README.md).

---

## Roles

- **Task documentation chat:** prepare and update task files, lock scope, generate a ready-to-run prompt for a new chat.
- **Dedicated chat + agent:** one chat = one task; prompt comes from the doc chat as a single copy-paste block.
- **QA:** owner confirms acceptance (slide review, demo rehearsal, technical accuracy); the agent does not mark `done` on its own.

---

## Language policy

- All project documentation files committed to the repository must be written in English.
- Agent-user conversation stays in Russian.

---

## Where specs live

**Features** (scope, narrative, demo plan): `docs/topics/<feature>/README.md`

**Tasks** (scoped implementation briefs): `docs/topics/<feature>/<ID>.md` — created by **planner / doc chat**, not pre-seeded for every feature.

```text
docs/
  task-automation/      <- process and prompt template (this folder)
  outline/              <- talk structure, timing, audience
  topics/
    <feature>/
      README.md         <- feature source of truth
      <ID>.md           <- tasks (planner creates when scoping work)
```

Recommended prompt path: `@docs/topics/<feature>/<ID>.md`.

Example features: `radon`, `typegpu`, `keyframer`.

### Planner workflow

1. Read `@docs/outline/README.md` and the feature `README.md`.
2. When work is ready to implement, create `<ID>.md` in that feature folder (task skeleton below).
3. Generate launch prompt: `generate prompt for <ID>`.

---

## Lifecycle

```text
open  ->  in progress (agent)  ->  awaiting QA  ->  done (only after owner approval)
```

- **open:** author/doc chat prepared the spec, implementation can start.
- **in progress:** implementation is ongoing.
- **awaiting QA:** work is ready and requires manual validation.
- **done/closed:** owner only, after explicit confirmation.

---

## Source-of-truth and mandatory re-read

The task file is a **scoped implementation brief**, not a substitute for official documentation or deck design sources.

| Layer                                             | Role for the implementation agent                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| Task spec                                         | Scope, acceptance, files, constraints — **what to change**                    |
| Repo docs (`docs/topics/...`, outline)            | Narrative order, cross-topic context, demo dependencies                       |
| **External sources** (Context7, docs URLs, Figma) | **Authoritative** for APIs, behavior, slide layout **at implementation time** |

**Rule:** before the first in-scope edit, the agent must **re-fetch** every item listed under **Source links (mandatory re-read)** in the task (and any extra sources named in the generated prompt). Do not rely only on summaries inside the task — those can be stale or incomplete.

### What to use when

| Source type              | Tool / action                                              | Agent must extract                                    |
| ------------------------ | ---------------------------------------------------------- | ----------------------------------------------------- |
| React Native / Expo APIs | Context7 MCP (or official doc URLs)                        | Correct API, version notes, setup steps, deprecations |
| Third-party libraries    | Context7 MCP                                               | Install steps, config, breaking changes               |
| Slide / deck design      | Figma MCP or listed slide files                            | Layout, copy, hierarchy, speaker-note placement       |
| Talk outline in repo     | Read `@docs/outline/` or `@docs/topics/<domain>/README.md` | Topic order, time budget, what to defer               |
| Prior topic demos        | Read linked topic specs and `src/**`                       | Reuse patterns; do not break earlier demos            |

If a source is unreachable (auth, broken link), **stop and report** in Russian; do not guess APIs or slide copy from the task summary alone.

### Source verification report (required)

After re-read, before coding or editing slides, the agent posts a short block in the chat (can be bullet list):

1. **Sources opened** — links/keys actually fetched.
2. **Confirmed for implementation** — APIs, claims, slide copy, demo steps taken from live sources.
3. **Conflicts / gaps** — task text vs official docs or deck; ambiguous acceptance. Propose resolution or ask the owner.
4. **Out of scope** — anything seen in sources but explicitly excluded in the task (do not implement silently).

Doc chat and generated prompts must surface all source links so the implementation agent does not skip this step.

---

## Task file skeleton

```markdown
# <ID> — <short title>

**Status:** open | in progress | awaiting QA | done
**Feature:** link to `docs/topics/<feature>/README.md`
**Outline:** link to talk outline
**Related docs:** ...

## Source links (mandatory re-read)

List every external source the implementation agent must open **before** editing.
The task body may summarize these sources; summaries are not a substitute for re-read.

| Source       | Link / key                    | What to verify |
| ------------ | ----------------------------- | -------------- |
| Expo docs    | Context7 query or doc URL     | ...            |
| RN docs      | Context7 query or doc URL     | ...            |
| Slide design | Figma URL + node IDs (if any) | ...            |

## Goal

## Acceptance (manual / qa) — scenario table

## Already OK (must not break)

## Root cause / context (for fixes)

## Implementation plan

## Presentation notes (optional)

Speaker flow, timing, what to show live vs on slides, fallback if demo fails.

## Related files

## Tests (lint / typecheck / manual)

## Links
```

ID must be unique within the project (`RADON-01`, `TYPEGPU-01`, `KEYFRAMER-01`, etc.).

---

## Launching an agent

### Recommended approach: owner's new chat

For slide iteration, demo polish, and screenshot-heavy tasks, always use a dedicated chat.

- **New chat (owner):** full context; use for narrative, visuals, and manual validation.
- **Subagent:** summary only in parent chat; suitable for narrow logic-only work without visual iteration.

### Checklist (new chat)

1. Task file is in `open` status; **Acceptance**, **Already OK**, and **Source links (mandatory re-read)** are filled in (or explicitly "none — repo-only").
2. In doc chat: "generate prompt for `<ID>`".
3. Open a new chat and paste the prompt from doc chat (use the block **Copy** button) — see [Copy-safe prompt delivery](#copy-safe-prompt-delivery).
4. Agent **re-reads all mandatory sources**, posts **Source verification**, then implements + checks + updates status to `awaiting QA`.
5. Owner validates scenarios and gives feedback in the same chat.
6. After owner confirmation, move the task to `done`.

### Ready prompt from doc chat

Do not fill `PROMPT.template.md` manually. Ask in doc chat:

> generate prompt for RADON-01

Doc chat reads the task spec and returns one **copy-button** markdown fence in chat.

#### Output rules (for doc chat)

See [Copy-safe prompt delivery](#copy-safe-prompt-delivery).

- Wrap the **entire** runnable prompt in a single ` ```markdown ` … ` ``` ` fence (so Cursor shows **Copy** on the block).
- One short line in Russian **before** the fence (e.g. "Скопируй блок кнопкой Copy в новый чат").
- **Nothing** inside the fence except the prompt — no START/END markers, no extra commentary.
- Nothing after the closing fence.
- No `<...>` placeholders; prompt must be immediately runnable.
- First line inside the fence = chat title.
- "Task-specific details" section must be filled.
- **Mandatory source re-read:** bullet list with full URLs/keys from the task (not markdown tables).
- Instruct the agent: complete source re-read and post **Source verification** before any in-scope edit.

---

## Copy-safe prompt delivery

Long prompts used to break when the fenced block contained **nested** ` ``` ` lines or **markdown tables**. Owner workflow stays **one copy into a new chat** (Copy button on the block) — no repo files or `@` attachment.

### Owner steps

1. Doc chat: `generate prompt for <ID>`.
2. Click **Copy** on the `markdown` code block (or select all inside the fence).
3. New chat → paste as the first message.

### Doc chat output shape

1. One line in Russian: «Скопируй блок кнопкой Copy в новый чат».
2. Immediately after: open fence `markdown`, full prompt body, close fence.
3. First line inside the fence = chat title (e.g. `TYPEGPU-01 — TypeGPU + Redraw demo`).
4. No text after the closing fence.

### Prompt body rules (inside the single fence)

These keep the Copy block intact:

- **No** lines that are only ` ``` ` or ` ```language ` (no nested fenced code blocks).
- **No** markdown tables (`| col |` rows). Use bullets for sources, acceptance, and matrices.
- Shell commands as plain lines: `npm run lint`, `npm run typecheck` (not ` ```bash `).
- Inline backticks for paths are OK (`src/**`, `@AGENTS.md`).
- `##` headings and bullet lists are OK.
- Do **not** use `--- AGENT PROMPT START/END ---` inside the fence (redundant with Copy; was for manual selection).

### Anti-patterns

- Nested ` ```bash ` / ` ``` ` inside the prompt — closes the outer fence early on render or paste.
- Markdown tables inside the prompt — truncates or splits the block.
- Placeholder `<...>` — agent cannot run.
- Paraphrasing doc URLs — breaks mandatory re-read.
- Second markdown fence or long text after the closing fence — owner may copy the wrong slice.
- Asking the owner to open a repo file or `@`-attach a launch prompt — not part of this workflow.

### Why one outer fence is OK

A single ` ```markdown ` wrapper is safe **if** the body follows the rules above. The Copy button needs that wrapper; delimiters-only was fallback when inner ` ``` ` and tables broke the fence.

---

## Prompt customization

You can add a "Notes for the agent prompt" section to the task file. It is copied into "Task-specific details".

- Task header (`outline`, `docs`, `scope`) is mapped to `@` links and scope boundaries.
- **Source links (mandatory re-read)** → copied into prompt **Mandatory source re-read** (full URLs/keys, not paraphrased).
- "Already OK (must not break)" goes into the "Task" section.
- "Acceptance"/"Tests" goes into "Tests" and "QA" sections.
- "Implementation plan" and "Related files" goes into "Task-specific details".
- "Presentation notes" goes into "Task-specific details".
- "Notes for the agent prompt" is copied as-is into "Task-specific details".

---

## Task indexes by domain

- **Features index:** [docs/topics/README.md](../topics/README.md)
- **radon:** [feature doc](../topics/radon/README.md)
- **typegpu:** [feature doc](../topics/typegpu/README.md)
- **keyframer:** [feature doc](../topics/keyframer/README.md)
- **Talk outline:** [docs/outline/README.md](../outline/README.md)

Task files appear under each feature folder when the planner creates them.

---

## When local environment restart is needed

If a task changes native config or dependencies (`app.json`, `app.config.*`, plugins, `ios/`, `android/`, build scripts), hot reload is often not enough.

Base workflow:

1. Stop dev server.
2. Rebuild dev client if needed (`npm run ios` / `npm run android`).
3. Start again with `npm run start`.

For pure TS/JS/React Native changes, a regular Metro restart is usually enough.

Before a live talk, rehearse demo startup once after dependency changes.

---

## Prompt template notes

- **Context7:** mandatory for React Native, Expo, and library APIs cited in slides or demos.
- **Serena:** use symbol-aware navigation/edits when possible.
- **Figma MCP:** use when the task lists slide or asset frames; optional otherwise.
- **Checks:** `npm run slides:build` for slide tasks; `npm run lint` + `npm run typecheck` when demo app scripts exist; run tests as needed by scope.
- **Content-only tasks:** manual acceptance from the task table is sufficient when no code changes.
- **`done`:** only after explicit owner approval.
- **Git:** do not commit unless explicitly requested.

Full template: [PROMPT.template.md](PROMPT.template.md).
