# DECK-01 — Deck shell, global styling, and inter-topic slides

**Status:** done  
**Scope:** talk-level (not a feature topic)  
**Outline:** [README.md](README.md)  
**Related docs:** [slides/SLIDEV.md](../../slides/SLIDEV.md), [docs/topics/README.md](../topics/README.md)

## Talk order (locked — owner 2026-06)

**Five segments.** **expo-observe** dropped.

| #   | Topic                 | Owner |
| --- | --------------------- | ----- |
| 1   | Radon + RNRepo        | K     |
| 2   | Legend State          | M     |
| 3   | WebGPU в React Native | K     |
| 4   | react-teleport        | M     |
| 5   | keyframer.dev         | K     |

**`src:` order in `slides/slides.md`:** `02-radon` → `01-legend-state` → `04-webgpu` → `03-react-teleport` → `06-keyframer` → closing.

**Handoffs:** Radon → Legend State → WebGPU → react-teleport → keyframer → «Вопросы?».

**No talk-order slide:** segment list is **not** shown on a dedicated shell slide — order is implied by `src:` sequence and segment openers only (owner 2026-06).

## Source links (mandatory re-read)

| Source                            | Link / key                        | What to verify                                                                    |
| --------------------------------- | --------------------------------- | --------------------------------------------------------------------------------- |
| Talk outline                      | `docs/outline/README.md`          | Full talk order 1→5, K/M ownership, pair-talk format                              |
| Slidev syntax                     | `slides/SLIDEV.md`                | Frontmatter, `src:` imports, layout patterns, deck `background`, prettier ignore  |
| Radon segment (reference styling) | `slides/pages/02-radon-rnrepo.md` | Card overlays and screenshot layouts — preserve; fix slide canvas background only |
| All segment pages                 | `slides/pages/*.md`               | Current wrappers — apply full-bleed dark canvas without changing narratives       |

Repo-only for narrative copy — final title and speaker names come from owner QA.

## Goal

1. **Deck shell** (`slides/slides.md`): presentation title, intro, closing, `src:` import stubs — **no** «Порядок доклада» slide.
2. **Pair talk framing:** deck is a **pair presentation** (K + M); intro/frontmatter must not read as «K-only deck».
3. **Global slide canvas:** eliminate the **light gray Slidev default background** visible as a margin/halo around dark content (`layout: full` + inner `bg-[#1e1e1e]` + `p-8` pattern). Slides should read as **full-bleed dark** on projector.
4. **Canonical pattern** in `slides/SLIDEV.md` so segment tasks and DECK-02 follow the same rule.

Run when segment titles are stable (after K slide tasks or in parallel with final WebGPU QA).

**Note:** Optional cross-topic polish was scoped in [DECK-02](DECK-02.md) — **cancelled**; owner satisfied with deck after DECK-01.

## Acceptance (manual / QA)

| #   | Scenario               | Expected                                                                                                       |
| --- | ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| 1   | `npm run slides:build` | Completes without errors                                                                                       |
| 2   | Frontmatter            | `title`, `author`, `info` — pair talk; no placeholder stub copy; deck-level dark background configured         |
| 3   | Intro slide            | Title + subtitle; **pair talk** (K + M); speaker note: open → **Radon + RNRepo** (segment 1)                   |
| 4   | No talk-order slide    | Shell has **no** «Порядок доклада» / segment list slide — remove if present                                    |
| 5   | `src:` order           | `02` → `01` → `04` → `03` → `06` — matches locked five-segment table above                                     |
| 6   | Full-bleed dark canvas | No light gray ring/margin around slide content on shell slides and segment slides with dark wrappers           |
| 7   | Card pattern preserved | Text cards stay `rounded-xl bg-black/88 text-white shadow-2xl`; screenshot overlay layouts unchanged           |
| 8   | Language               | Russian on-slide + speaker notes; API/package names in English                                                 |
| 9   | Closing slide          | «Вопросы?» (or equivalent) — consistent styling; not a duplicate mid-deck handoff                              |
| 10  | `src:` stubs           | Import comments only between segments — no inline segment bodies in shell                                      |
| 11  | Content preservation   | No changes to segment narratives, technical claims, screenshots, or handoff wording beyond canvas/CSS wrappers |
| 12  | Presenter mode         | Speaker notes on intro + closing; shell readable on projector                                                  |

## Already OK (must not break)

- `src:` imports — order: `02` → `01` → `04` → `03` → `06` (see locked talk order above).
- Segment narratives, facts, demo steps, and assets under `slides/assets/**`.
- Screenshot slide layouts (Radon portrait/horizontal/wide variants per `SLIDEV.md`).
- WebGPU / keyframer / radon content inside `pages/` — styling wrappers only.

## Root cause / context

- Shell still had an early **talk-order list slide**; owner dropped it — five-topic order lives in `src:` sequence and segment openers only.
- **Gray halo:** Slidev `theme: default` light canvas shows through when content uses `p-8` on a nested `bg-[#1e1e1e]` div instead of painting the slide viewport edge-to-edge.
- Frontmatter `info` still described this repo copy as «K segments only» — misleading for a pair talk deck.

## Implementation plan

### 1. Deck frontmatter (`slides/slides.md` top)

- `title` — final presentation name.
- `author` — both speakers as owner wants (pair talk).
- `info` — pair talk note; five segments K/M; not «K-only deck».
- **Deck-wide dark canvas** — e.g. `background: '#1e1e1e'` (or equivalent Slidev frontmatter) so default gray never shows at slide edges.
- Keep `transition`, `theme`, `mdc` unless a theme switch is required to kill the gray (prefer minimal change).

### 2. Intro slide

- Title + subtitle.
- Pair talk line (both speakers / K+M), not «сегменты Кирилла (K)» only.
- Speaker note: open → **Radon + RNRepo** (segment 1, K).

### 3. Remove talk-order slide

- Delete the «Порядок доклада» slide block from `slides/slides.md` if present.
- Do **not** add a replacement list slide.

### 4. Full-bleed dark canvas (deck-wide)

Apply the same mechanical fix everywhere a gray halo appears:

- Prefer **slide-level** dark background (frontmatter per slide or inherited deck `background`) over nested `p-8` + inner `bg-[#1e1e1e]` that leaves margins.
- Where padding is needed, pad **content inside** a full-size dark root (`w-full h-full` without exposing default theme).
- Update `slides/SLIDEV.md` — replace «`layout: full` + `bg-[#1e1e1e]` + cards» with the canonical full-bleed pattern and anti-pattern (nested padding exposing default gray).

**Files:** `slides/slides.md`, `slides/pages/*.md` (wrapper divs / frontmatter only).

### 5. Closing slide

- Polish «Вопросы?» — same full-bleed dark canvas as intro.
- Optional footer: demo app, repo — per owner.

### 6. Cross-check

- `npm run slides` presenter mode: intro → segment 1 opener → spot-check one slide per segment → closing.
- Confirm no «Порядок доклада» slide in deck.
- Confirm `src:` order matches [outline README](README.md).

## Presentation notes

- **Timing:** run when owner says segment names are stable.
- **Out of scope:** partner M narrative authoring, new screenshots, demo app. (Optional handoff polish was [DECK-02](DECK-02.md) — cancelled.)
- **Language:** shell slides in **Russian** (deck-wide default).

## Notes for the agent prompt

- Edit `slides/slides.md` (shell) + `slides/pages/*.md` (canvas wrappers only) + `slides/SLIDEV.md` (pattern doc).
- **Remove** talk-order slide from shell.
- **Do not** rewrite segment narratives or change screenshot assets.
- Post **Source verification** in Russian before first edit.
- After `npm run slides:build`, set status to `awaiting QA`.

## Related files

- `slides/slides.md` — frontmatter, intro, closing, `src:` stubs
- `slides/pages/*.md` — full-bleed dark canvas wrappers
- `slides/SLIDEV.md` — canonical styling rules
- `docs/outline/README.md` — talk order source of truth

## Tests (lint / typecheck / manual)

- `npm run slides:build` — required
- Manual: presenter mode — intro, spot-check segments for gray halo, closing

## Links

- [Talk outline](README.md)
- [DECK-02](DECK-02.md) — cross-topic polish (cancelled)
- [Task automation](../task-automation/README.md)
