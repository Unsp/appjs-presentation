# WEBGPU-02 — WebGPU segment slide deck (from demo results)

**Status:** awaiting QA  
**Feature:** [docs/topics/webgpu/README.md](README.md)  
**Outline:** [docs/outline/README.md](../../outline/README.md) — talk slot 4  
**Depends on:** [WEBGPU-01](WEBGPU-01.md) — runnable demo + README slide inputs (**done** 2026-06-18)  
**Related docs:** [slides/SLIDEV.md](../../../slides/SLIDEV.md), [slides/pages/02-radon-rnrepo.md](../../../slides/pages/02-radon-rnrepo.md) (layout reference)

## Source links (mandatory re-read)

| Source            | Link / key                                                   | What to verify                             |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------ |
| Demo outcomes     | `docs/topics/webgpu/README.md` — Slide inputs, limitations   | Only claim what demo proved                |
| WEBGPU-01 runbook | Same README — Artifacts                                      | Paths, commands for speaker notes          |
| TypeGPU docs      | https://docs.swmansion.com/TypeGPU/integration/react-native/ | Footnotes still accurate                   |
| Slidev            | `slides/SLIDEV.md`                                           | `src:`, `layout: full`, `../assets/` paths |
| Radon segment     | `slides/pages/02-radon-rnrepo.md`                            | Dark card layout pattern                   |

## Goal

Replace the inline **WebGPU в React Native** stub in `slides/slides.md` with finalized segment in `slides/pages/04-webgpu.md`, wired via `src:`.

Narrative and screenshots must reflect **WEBGPU-01 demo reality** — no aspirational copy left from planning stub. Segment title is **WebGPU**, not TypeGPU; TypeGPU gets its own slide. Redraw / Skia Graphite appear as ecosystem slides only if README slide inputs include them.

Content-only for deck; demo app code changes only if slide accuracy requires tiny doc fixes (prefer README/speaker notes).

## Acceptance (manual / QA)

| #   | Scenario               | Expected                                                                                                             |
| --- | ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1   | `npm run slides:build` | Completes without errors                                                                                             |
| 2   | `src:` migration       | Inline TypeGPU block removed; `src: ./pages/04-webgpu.md` stub in `slides/slides.md`                                 |
| 3   | Language               | On-slide copy and speaker notes in **Russian**                                                                       |
| 4   | Demo-aligned           | Bullets match implemented GPU effects; baseline comparison mentioned if in demo                                      |
| 5   | Redraw                 | Separate slide **only** if WEBGPU-01 shipped Redraw; else cut with one-line “explored, not in demo” in notes or omit |
| 6   | Honesty                | Native build / New Architecture / stack maturity caveats from demo build                                             |
| 7   | Not games              | Business UI framing preserved                                                                                        |
| 8   | Thread story           | Consistent with WEBGPU-00 research + demo (no stale PoC claims)                                                      |
| 9   | Live demo slide        | Speaker notes: when to switch to Expo app; ~3–5 min live budget                                                      |
| 10  | Assets                 | Screenshots or captures from demo under `slides/assets/webgpu/` if needed — no placeholder lorem                     |
| 11  | Handoff                | Last slide → **expo-observe** (partner)                                                                              |
| 12  | Regression             | Radon, keyframer, talk order, «Вопросы?» unchanged except slot 4 label if needed                                     |
| 13  | Layout                 | Radon-style `layout: full` dark cards per SLIDEV.md                                                                  |

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
src: ./pages/04-webgpu.md
---
```

Primary edit: `slides/pages/04-webgpu.md`.

### 2. Slide sequence (Russian — owner order, tune after WEBGPU-01)

**Block A — WebGPU в React Native (2–4 slides):** opener → зачем GPU в business UI → `react-native-webgpu` stack → runtime/threading → limitations

**Block B — TypeGPU (1–2 slides):** DX layer (`'use gpu'`, `@typegpu/react`) → demo case study (stress test)

**Block C — Skia Graphite `@next` (1 slide):** Graphite vs Ganesh, SKSL vs TypeGPU, experimental; optional Redraw one-liner

**Block D — Live demo + handoff → expo-observe**

Full beat copy and open questions: feature README **Slide beat plan (discussion)**.

Do **not** edit `slides/**` until WEBGPU-01 slide inputs are ready.

Use `<img src="../assets/webgpu/...">` for captures taken from WEBGPU-01.

### 3. Assets

Add PNGs only if demo captures improve clarity; prefer minimal set (1–3). Do not modify demo source to generate marketing-only assets.

### 3b. Slide code examples (prepared — wire in this task)

Readable snippets for projector code slides — **not** wired into `slides/pages/04-webgpu.md` yet.

| Snippet                                                    | Path                                    | Use on slide                                     |
| ---------------------------------------------------------- | --------------------------------------- | ------------------------------------------------ |
| Fragment shader (cover UV → sample → grade → toggle)       | `slides/examples/video-shader-slide.ts` | TypeGPU block — `'use gpu'` + `texture_external` |
| JS frame loop (`importExternalTexture` → draw → `present`) | `slides/examples/video-frame-slide.ts`  | Companion slide or speaker notes                 |

**Slidev import (from `slides/pages/04-webgpu.md`):**

```markdown
<<< ../examples/video-shader-slide.ts{17-48}
<<< ../examples/video-frame-slide.ts
```

Full live shader stays in `src/features/typegpu/lib/videoEffectPipeline.ts` (~1200 lines, ripples + glass UI) — **do not** put on slides; snippets are simplified extracts only.

### 4. Feature doc

Update README Artifacts table: slides **done** / awaiting QA; link this task.

## Presentation notes

- Slides **follow** demo — invert order from planning stub (demo first in repo, slides last).
- Speaker notes: rehearse app launch before this segment; fallback if GPU fails.
- Segment total ~8–12 min (slides + live) — timing in HTML comments.

## Notes for the agent prompt

- If WEBGPU-01 slide inputs missing, stop and ask owner — do not invent effects.
- Post Source verification in Russian before edit.
- Status → `awaiting QA` after build.

## Related files

- `slides/pages/04-webgpu.md`
- `slides/slides.md`
- `slides/examples/video-shader-slide.ts` — slide code snippet (fragment)
- `slides/examples/video-frame-slide.ts` — slide code snippet (frame loop)
- `slides/assets/webgpu/` (if added)
- `docs/topics/webgpu/README.md`

## Tests

- `npm run slides:build`
- Manual: presenter mode segment 4 + live app handoff rehearsal

## Links

- [WEBGPU-01](WEBGPU-01.md)
- [Feature doc](README.md)
