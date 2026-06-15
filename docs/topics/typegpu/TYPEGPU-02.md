# TYPEGPU-02 — TypeGPU slide deck (from demo results)

**Status:** open  
**Feature:** [docs/topics/typegpu/README.md](README.md)  
**Outline:** [docs/outline/README.md](../../outline/README.md) — talk slot 4  
**Depends on:** [TYPEGPU-01](TYPEGPU-01.md) — runnable demo + README slide inputs  
**Related docs:** [slides/SLIDEV.md](../../../slides/SLIDEV.md), [slides/pages/02-radon-rnrepo.md](../../../slides/pages/02-radon-rnrepo.md) (layout reference)

## Source links (mandatory re-read)

| Source             | Link / key                                                   | What to verify                             |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| Demo outcomes      | `docs/topics/typegpu/README.md` — Slide inputs, limitations  | Only claim what demo proved                |
| TYPEGPU-01 runbook | Same README — Artifacts                                      | Paths, commands for speaker notes          |
| TypeGPU docs       | https://docs.swmansion.com/TypeGPU/integration/react-native/ | Footnotes still accurate                   |
| Slidev             | `slides/SLIDEV.md`                                           | `src:`, `layout: full`, `../assets/` paths |
| Radon segment      | `slides/pages/02-radon-rnrepo.md`                            | Dark card layout pattern                   |

## Goal

Replace the inline **TypeGPU + Redraw** stub in `slides/slides.md` with finalized segment in `slides/pages/04-typegpu-redraw.md`, wired via `src:`.

Narrative and screenshots must reflect **TYPEGPU-01 demo reality** — no aspirational copy left from planning stub. Redraw appears **only** if demo included it.

Content-only for deck; demo app code changes only if slide accuracy requires tiny doc fixes (prefer README/speaker notes).

## Acceptance (manual / QA)

| #   | Scenario               | Expected                                                                                                              |
| --- | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | `npm run slides:build` | Completes without errors                                                                                              |
| 2   | `src:` migration       | Inline TypeGPU block removed; `src: ./pages/04-typegpu-redraw.md` stub in `slides/slides.md`                          |
| 3   | Language               | On-slide copy and speaker notes in **Russian**                                                                        |
| 4   | Demo-aligned           | Bullets match implemented GPU effects; baseline comparison mentioned if in demo                                       |
| 5   | Redraw                 | Separate slide **only** if TYPEGPU-01 shipped Redraw; else cut with one-line “explored, not in demo” in notes or omit |
| 6   | Honesty                | Prebuild / no Expo Go / New Architecture caveats if demo required them                                                |
| 7   | Not games              | Business UI framing preserved                                                                                         |
| 8   | Thread story           | Consistent with TYPEGPU-00 research + demo (no stale PoC claims)                                                      |
| 9   | Live demo slide        | Speaker notes: when to switch to Expo app; ~3–5 min live budget                                                       |
| 10  | Assets                 | Screenshots or captures from demo under `slides/assets/typegpu/` if needed — no placeholder lorem                     |
| 11  | Handoff                | Last slide → **expo-observe** (partner)                                                                               |
| 12  | Regression             | Radon, keyframer, talk order, «Вопросы?» unchanged except slot 4 label if needed                                      |
| 13  | Layout                 | Radon-style `layout: full` dark cards per SLIDEV.md                                                                   |

## Already OK (must not break)

- Deck frontmatter in `slides/slides.md`.
- Radon `src:` import; keyframer `src:` import; closing «Вопросы?» slide stays in shell.
- `src/` demo app behavior — no refactors unless fixing a demo bug found during slide prep.
- PNGs committed in other segments — untouched.

## Implementation plan

### 1. `src:` migration

Replace inline TypeGPU section in `slides/slides.md` (segment opener through demo handoff) with:

```text
---
src: ./pages/04-typegpu-redraw.md
---
```

Primary edit: `slides/pages/04-typegpu-redraw.md`.

### 2. Slide sequence (Russian — tune to demo)

Suggested flow; adjust to TYPEGPU-01 **Slide inputs**:

1. **Opener** — TypeGPU + optional Redraw subtitle · segment 4 · GPU для бизнес-UI
2. **Hook** — JS/UI thread pain for blur, charts, micro-interactions
3. **Why GPU** — product UI, not games (reuse stub bullets if still accurate)
4. **TypeGPU** — TypeScript shaders, `@typegpu/react`, what demo actually shows
5. **Thread / architecture** — one slide, wording from 00/01 (no oversell)
6. **Redraw** — conditional slide or skip
7. **Demo** — screenshot(s) from app + live handoff steps in speaker notes
8. **Limitations** — prebuild, device, alpha honesty from demo build
9. **Closing** — handoff → expo-observe

Use `<img src="../assets/typegpu/...">` for captures taken from TYPEGPU-01.

### 3. Assets

Add PNGs only if demo captures improve clarity; prefer minimal set (1–3). Do not modify demo source to generate marketing-only assets.

### 4. Feature doc

Update README Artifacts table: slides **done** / awaiting QA; link this task.

## Presentation notes

- Slides **follow** demo — invert order from planning stub (demo first in repo, slides last).
- Speaker notes: rehearse app launch before this segment; fallback if GPU fails.
- Segment total ~8–12 min (slides + live) — timing in HTML comments.

## Notes for the agent prompt

- If TYPEGPU-01 slide inputs missing, stop and ask owner — do not invent effects.
- Post Source verification in Russian before edit.
- Status → `awaiting QA` after build.

## Related files

- `slides/pages/04-typegpu-redraw.md`
- `slides/slides.md`
- `slides/assets/typegpu/` (if added)
- `docs/topics/typegpu/README.md`

## Tests

- `npm run slides:build`
- Manual: presenter mode segment 4 + live app handoff rehearsal

## Links

- [TYPEGPU-01](TYPEGPU-01.md)
- [Feature doc](README.md)
