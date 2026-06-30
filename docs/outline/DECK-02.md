# DECK-02 — Cross-topic slide polish (full deck pass)

**Status:** cancelled  
**Scope:** talk-level — all segments + shell coherence  
**Cancelled reason:** Owner decision (2026-06) — deck satisfies QA after [DECK-01](DECK-01.md); handoff slides and cross-segment polish not needed.  
**Outline:** [README.md](README.md)  
**Depends on:** K segment slide tasks done or stable; M segments wired or placeholder  
**Related:** [DECK-01](DECK-01.md) (completed — shell + full-bleed dark canvas)  
**Related docs:** [slides/SLIDEV.md](../../slides/SLIDEV.md), [docs/topics/README.md](../topics/README.md)

## Talk order (locked — owner 2026-06)

Five segments; **expo-observe** dropped. See [DECK-01](DECK-01.md).

| #   | Topic          | Owner |
| --- | -------------- | ----- |
| 1   | Radon + RNRepo | K     |
| 2   | Legend State   | M     |
| 3   | WebGPU         | K     |
| 4   | react-teleport | M     |
| 5   | keyframer      | K     |

**Handoff chain:** Radon → Legend State → WebGPU → react-teleport → keyframer → «Вопросы?»  
**`src:` file order:** `02` → `01` → `04` → `03` → `06`

## Source links (mandatory re-read)

| Source            | Link / key                        | What to verify                                                           |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------ |
| Talk outline      | `docs/outline/README.md`          | Full talk order 1→5, K/M ownership, handoff chain                        |
| Slidev syntax     | `slides/SLIDEV.md`                | Frontmatter, `src:`, layout full, dark cards, img paths, prettier ignore |
| Reference styling | `slides/pages/02-radon-rnrepo.md` | Deck-wide visual baseline for K segments                                 |
| Segment files     | `slides/pages/*.md`               | Current state per slot — do not rewrite narratives                       |
| Deck shell        | `slides/slides.md`                | `src:` order, empty slides, closing                                      |

Repo-only for copy tweaks — no external API docs required unless fixing a factual footnote spotted during walkthrough.

## Goal

One **cross-cutting polish pass** after per-topic slide tasks: make the full deck feel like **one presentation**, not four independent segments stitched together.

**In scope:** visual consistency, segment openers/closings, K↔M handoffs, shell hygiene, Slidev syntax fixes, minimal M placeholders for missing slots, speaker-note timing hints.

**Out of scope:** rewriting segment narratives, new screenshots, demo app, partner content authoring beyond placeholder stubs.

## Acceptance (manual / QA)

| #   | Scenario                           | Expected                                                                                                                                     |
| --- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `npm run slides:build`             | Completes without errors                                                                                                                     |
| 2   | Full walkthrough                   | Presenter mode 1→5 + closing — no blank slides, no broken layouts                                                                            |
| 3   | `src:` order in `slides/slides.md` | `02` → `01` → `04` → `03` → `06` → closing; only import stubs between segments                                                               |
| 4   | No empty slides                    | No accidental blank slides between `src:` imports                                                                                            |
| 5   | Shell (DECK-01 subset)             | Intro + closing — full-bleed dark canvas; **no** talk-order list slide (see [DECK-01](DECK-01.md))                                           |
| 6   | K segment styling                  | `02-radon-rnrepo`, `04-webgpu`, `06-keyframer` — aligned opener pattern: title, subtitle, «Сегмент N»                                        |
| 7   | M segment styling                  | `01-legend-state` — light touch only: readability on projector; optional card wrapper on text-only slides **without** rewriting partner copy |
| 8   | M placeholders                     | `03-react-teleport.md` placeholder wired; **no** expo-observe                                                                                |
| 9   | Handoff chain                      | Radon→Legend State→WebGPU→react-teleport→keyframer→«Вопросы?»                                                                                |
| 10  | Speaker notes                      | HTML comments on segment openers + handoff slides; timing hints where missing (~N min)                                                       |
| 11  | Language                           | Russian on-slide + notes; API names in English                                                                                               |
| 12  | SLIDEV compliance                  | No `## layout:` headings; no blank line after `---` before `layout:`; img `../assets/...` from page files                                    |
| 13  | Content preservation               | No change to technical claims, demo steps, or screenshot assets unless fixing obvious typo                                                   |
| 14  | Feature tasks                      | Do not reopen RADON-01 / WEBGPU-02 / KEYFRAMER-01 scope — polish only                                                                        |

## Already OK (must not break)

- Technical narrative inside each segment (facts, numbers, RNRepo overlay, keyframer alpha honesty, WebGPU limitations).
- Assets under `slides/assets/**` — do not modify PNGs.
- `src/` demo app — no changes.
- Per-topic feature READMEs — update only Artifacts row if deck structure changes (e.g. new M stub files).

## Known issues (audit starting point)

1. **Visual drift:** `01-legend-state.md` uses `p-3` text slides; K segments use dark cards — optional readability pass.
2. **react-teleport** — placeholder only; partner replaces content later.
3. **Segment numbers** on openers — verify «Сегмент N» matches deck order 1–5.

## Implementation plan

### 1. Deck shell (`slides/slides.md`)

- Fix frontmatter if needed (`title`, `author`, `info`).
- Shell intro + closing only — no talk-order slide (see [DECK-01](DECK-01.md)); full-bleed dark canvas from DECK-01.
- Ensure segment import order:

```text
src: ./pages/02-radon-rnrepo.md
src: ./pages/01-legend-state.md
src: ./pages/04-webgpu.md
src: ./pages/03-react-teleport.md
src: ./pages/06-keyframer.md
closing «Вопросы?»
```

### 2. M placeholder pages

- **03-react-teleport** — placeholder exists; partner replaces content.
- **expo-observe** — **dropped**; no `05-expo-observe.md`.

### 3. K segment light polish (`02`, `04`, `06`)

Without changing narratives:

- Opener subtitles consistent (`Сегмент N · …`).
- Handoff slides same card pattern as Radon closing.
- Speaker notes: segment timing + live/demo cue where applicable.
- Verify last slide handoff target matches outline chain.

### 4. M segment light polish (`01`)

**Minimal diff** — partner-owned content:

- Fix Slidev syntax bugs if any (`layout:` frontmatter).
- Optional: wrap bare text slides in dark card for projector readability — **ask owner** if large restyle needed.
- Add handoff slide → WebGPU **done** (owner 2026-06).

### 5. Cross-check

- `npm run slides` presenter mode: full deck start → end.
- No talk-order list slide in shell; `src:` sequence matches locked order 1→5.
- Update `docs/outline/README.md` segment table if stub files added.
- Update `slides/SLIDEV.md` pages table if new files.

## Presentation notes

- Run when owner says **K segments stable** (WEBGPU-02 QA passed).
- **Estimated effort:** one focused pass — not a rewrite of Legend State or Radon narratives.
- **Pair talk:** M placeholders prevent awkward jumps during rehearsal; partner replaces later.
- **DECK-01:** if not run separately, shell items from DECK-01 are included here; do not duplicate work in two chats.

## Notes for the agent prompt

- Polish pass — **no narrative expansion**, no new technical claims.
- Post **Source verification** in Russian (repo-only OK).
- Prefer smallest diff that fixes coherence issues.
- Status → `awaiting QA` after `npm run slides:build`.

## Related files

- `slides/slides.md` — shell + `src:` order
- `slides/pages/*.md` — all segment files
- `slides/SLIDEV.md` — syntax + pages table
- `docs/outline/README.md` — talk order source of truth

## Tests

- `npm run slides:build` — required
- Manual: full-deck presenter walkthrough 1→5 + Q&A

## Links

- [DECK-01](DECK-01.md) — shell-only (subset)
- [Talk outline](README.md)
- [Task automation](../task-automation/README.md)
