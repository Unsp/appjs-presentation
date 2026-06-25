# DECK-01 — Deck shell and inter-topic slides polish

**Status:** open  
**Scope:** talk-level (not a feature topic)  
**Outline:** [README.md](README.md)  
**Related docs:** [slides/SLIDEV.md](../../slides/SLIDEV.md), [docs/topics/README.md](../topics/README.md)

## Source links (mandatory re-read)

| Source                            | Link / key                        | What to verify                                                |
| --------------------------------- | --------------------------------- | ------------------------------------------------------------- |
| Talk outline                      | `docs/outline/README.md`          | Full talk order, K/M ownership, success criteria              |
| Slidev syntax                     | `slides/SLIDEV.md`                | Frontmatter, `src:` imports, layout patterns, prettier ignore |
| Radon segment (reference styling) | `slides/pages/02-radon-rnrepo.md` | Deck-wide visual patterns to align shell slides with          |

Repo-only for narrative copy — final title and speaker names come from owner QA.

## Goal

Polish **deck shell** content in `slides/slides.md`: presentation title, intro, talk order, closing slide, and any other **inter-topic** slides that are not owned by a feature `pages/` file.

Run **after** K segment slide tasks (or near the end of slide work) so shell copy matches finalized segment titles and handoffs.

## Acceptance (manual / QA)

| #   | Scenario                | Expected                                                                                                |
| --- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | `npm run slides:build`  | Completes without errors                                                                                |
| 2   | Frontmatter             | `title`, `author`, `info` consistent with on-slide presentation name; no placeholder stub copy          |
| 3   | Intro slide             | Clear title + subtitle; pair-talk context (K/M); speaker note for segment 1 handoff                     |
| 4   | Talk order slide        | All six segments listed with correct names and K/M labels; matches outline table                        |
| 5   | Visual consistency      | Shell slides use same layout/card pattern as Radon segment (`layout: full`, dark cards per `SLIDEV.md`) |
| 6   | Language                | One consistent language choice across shell slides (align with owner — Radon segment is RU)             |
| 7   | Closing slide           | Final slide (e.g. Q&A) — title, optional links; not a duplicate of mid-deck handoffs                    |
| 8   | `src:` stubs            | Import comments between segments remain clear; no accidental inline segment bodies duplicated in shell  |
| 9   | Segment files untouched | No edits to `slides/pages/*.md` unless fixing a broken import path — segment content is per-topic tasks |
| 10  | Presenter mode          | Speaker notes on intro and talk-order slides; shell readable on projector                               |

## Already OK (must not break)

- `src:` imports for wired segments (`02-radon-rnrepo.md`, future `04-`, `06-`).
- Segment content inside `slides/pages/` — owned by feature tasks.
- Assets under `slides/assets/`.
- WebGPU / keyframer inline blocks in `slides.md` until migrated to `pages/` (do not expand scope into full segment rewrites).

## Root cause / context

RADON-01 established per-topic files under `slides/pages/` and polished segment styling. The **shell** in `slides/slides.md` still mixes early stub copy, Russian frontmatter with evolving segment names, and inline WebGPU/keyframer stubs. Inter-topic slides need one coherent pass once segment titles stabilize.

## Implementation plan

### 1. Frontmatter (`slides/slides.md` top)

Review and align:

- `title` — final presentation name (browser tab / export metadata)
- `author` — speaker(s) as owner wants on deck
- `info` — pair talk note, repo scope
- `transition`, `theme`, `mdc` — keep unless owner asks to change

### 2. Intro slide

- Presentation title and subtitle (match or intentionally differ from `title` — document choice in speaker note)
- Pair talk / K-only deck context
- Speaker note: open → hand off to partner (Legend State) or rehearsal script

### 3. Talk order slide

- Sync segment names with outline and wired `pages/` titles (e.g. **Radon + RNRepo**, not stale “Radon IDE”)
- K / M labels
- Optional: total time budget line if owner provides numbers

### 4. Inter-segment shell (light touch)

Between `src:` imports, shell should only contain import stubs — no duplicate segment openers. If WebGPU/keyframer still inline, do **not** rewrite those blocks (WEBGPU / KEYFRAMER tasks). Only ensure transitions at `src:` boundaries are clean.

### 5. Closing slide

- Polish “Questions?” (or equivalent) — consistent styling
- Optional footer: demo app, repo, contact — per owner

### 6. Cross-check

- Walk deck start → end in `npm run slides` presenter mode
- Confirm talk order matches [outline README](README.md)

## Presentation notes

- **Timing:** run when owner says segment names are stable — typically after last K slide task or before full dry-run.
- **Out of scope for this task:** partner M segment content, demo app, per-topic narrative inside `pages/`.
- **Language:** shell slides in **Russian** (deck-wide default); align with Radon segment tone.

## Notes for the agent prompt

- Edit **only** `slides/slides.md` shell regions (frontmatter, intro, talk order, closing).
- Do not modify `slides/pages/02-radon-rnrepo.md`.
- Post **Source verification** in Russian before first edit.
- After `npm run slides:build`, set status to `awaiting QA`.

## Related files

- `slides/slides.md` — primary edit (shell only)
- `slides/SLIDEV.md` — syntax
- `docs/outline/README.md` — talk order source of truth

## Tests (lint / typecheck / manual)

- `npm run slides:build` — required
- Manual: presenter mode walkthrough of shell slides only

## Links

- [Talk outline](README.md)
- [Task automation](../task-automation/README.md)
