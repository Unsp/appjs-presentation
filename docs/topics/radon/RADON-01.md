# RADON-01 — Radon + RNRepo slide deck

**Status:** done  
**Feature:** [docs/topics/radon/README.md](README.md)  
**Outline:** [docs/outline/README.md](../../outline/README.md) — talk slot 2  
**Related docs:** [slides/SLIDEV.md](../../../slides/SLIDEV.md), [slides/pages/02-radon-rnrepo.md](../../../slides/pages/02-radon-rnrepo.md) (Radon segment — imported via `src:`)

## Source links (mandatory re-read)

| Source                | Link / key                                 | What to verify                                                                       |
| --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| Radon features        | https://ide.swmansion.com/                 | Positioning, feature names, compatibility — do not oversell as “generic IDE”         |
| Radon pricing / trial | https://ide.swmansion.com/pricing          | **14-day** trial wording (not 2 months / not stale “30 days” from third-party blogs) |
| RNRepo                | https://rnrepo.org/                        | Prebuilt artifacts pitch; beta + New Architecture constraints                        |
| RNRepo repo           | https://github.com/software-mansion/rnrepo | Package names `@rnrepo/expo-config-plugin`, `@rnrepo/build-tools`                    |
| Slidev syntax         | `slides/SLIDEV.md`                         | Frontmatter rules, slide separators                                                  |

## Goal

Replace the stub **Radon + RNRepo** block in `slides/slides.md` with the finalized narrative, committed screenshots, speaker notes, and RNRepo EAS visual (red cutoff line via Slidev overlay — not baked into PNG).

Content-only task: no demo app, no live Radon on stage.

## Acceptance (manual / QA)

| #   | Scenario               | Expected                                                                                                                                     |
| --- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `npm run slides:build` | Completes without errors                                                                                                                     |
| 2   | Radon hook slide       | Frames Radon as **emulator wrapper in Cursor**, not “another RN IDE”                                                                         |
| 3   | License footnote       | Visible one-liner: `Commercial · Cursor marketplace · 14-day trial` — no credit card mention                                                 |
| 4   | Screenshot slides      | All five PNGs under `slides/assets/radon/` used in presentation order (see Implementation plan)                                              |
| 5   | Network slide          | Speaker notes or slide caveat: **no WebSocket support** — do not claim WS inspection                                                         |
| 6   | MCP slide              | Text-only workflow: Figma → implement → Radon verify — no demo asset                                                                         |
| 7   | RNRepo slide           | Separate closing beat; **not** linked to Radon as one stack; **no monorepo** copy                                                            |
| 8   | RNRepo numbers         | **~30 min → ~20 min**, **~10 min saved**; ROI line for ~2 min setup — not vendor “up to 2×”                                                  |
| 9   | RNRepo disclaimer      | **beta** + **New Architecture** on slide                                                                                                     |
| 10  | RNRepo EAS image       | `slides/assets/radon-eas-rnrepo.png` with Slidev overlay: red line between build **(85)** and **(84)**; labels `RNRepo added`, `~30m → ~20m` |
| 11  | Version copy           | **Version-agnostic** — no Expo SDK / RN version numbers on Radon slides                                                                      |
| 12  | Handoff                | Last slide hands off to **react-teleport** (partner)                                                                                         |
| 13  | Deck regression        | Talk order slide + WebGPU + keyframer segments unchanged except talk-order label `Radon + RNRepo` if updated                                 |
| 14  | Speaker notes          | HTML comments on key slides — timing hints (~5–7 min Radon, ~1–2 min RNRepo)                                                                 |

## Already OK (must not break)

- Deck frontmatter and global config in `slides/slides.md` (theme, title, author, transition).
- Segments **outside** Radon block: talk order list structure, WebGPU, keyframer slides.
- Asset files: do not modify PNGs in `slides/assets/radon/` or `slides/assets/radon-eas-rnrepo.png`.
- Radon segment: `slides/pages/02-radon-rnrepo.md` imported via `src:` in `slides/slides.md`.
- No `src/` demo app changes.

## Root cause / context

Planning is complete in [README.md](README.md). The current Radon stub uses outdated copy (“RN-aware IDE”, monorepo for RNRepo, broken `## layout: center` pattern). Assets and decisions are ready; this task is slide implementation only.

## Implementation plan

### 1. Radon segment file + `src:` import

Primary edit: `slides/pages/02-radon-rnrepo.md`. In `slides/slides.md`, replace inline Radon stub with `src: ./pages/02-radon-rnrepo.md` import stub only.

**Suggested slide sequence:**

1. **Segment opener** — title `Radon`, subtitle “emulator wrapper in Cursor — not another IDE”. License footnote line on slide or subline.
2. **Preview** — `slides/assets/radon/preview.png` + 2–3 bullets: preview in editor, builds under the hood, business-app angle.
3. **Multi-emulator** — `slides/assets/radon/multi-emulator.png` + short copy on iOS/Android switching.
4. **Inspect** — `slides/assets/radon/inspect.png` + right-click inspect → source.
5. **Network** — `slides/assets/radon/network.png` + HTTP/fetch vs weak Expo Dev Tools story; WS limitation in notes.
6. **Debug** — `slides/assets/radon/debug.png` + breakpoints end-to-end.
7. **Built-in tools** (optional, compact bullet slide if deck not too long) — address bar, deep links, local auth, screen recording — text only, no screenshots. TanStack DevTools: one bullet max if space.
8. **MCP** (text only) — three-step: Figma → agent implements → Radon screenshot verify. Optional: reuse `preview.png` small — not required.
9. **RNRepo closing** — separate slide; bullets + EAS screenshot with overlay (step 2 below).
10. **Handoff** — `layout: center`, hand off → **react-teleport**.

Use correct Slidev frontmatter (`---` immediately before `layout:` — see `SLIDEV.md`). Prefer `two-cols` or image-right layouts where screenshots need room; keep text readable on projector.

### 2. RNRepo EAS overlay (Slidev, not PNG edit)

On the RNRepo slide, embed `slides/assets/radon-eas-rnrepo.png` and add a **red horizontal line** between the 7th and 8th build rows (between **1.0.17 (85)** 22m 4s and **1.0.17 (84)** 31m 22s). Add text callouts: `RNRepo added`, `~30m → ~20m`.

Use relative/absolute CSS or Slidev-compatible HTML — tune percentages at build/preview time. Do not edit the PNG.

### 3. Talk order line (minor)

On the talk order slide, rename entry 2 to **Radon + RNRepo** (drop “IDE” if present) — align with feature doc title.

### 4. ~~Sync draft~~ — done

`slides/pages/02-radon-rnrepo.md` is the canonical Radon segment (not a mirror).

### 5. Feature doc

In `docs/topics/radon/README.md`: mark slides stub status **done** in Artifacts table after implementation; link this task under **Tasks**.

## Presentation notes

- **Delivery:** screenshots only — owner narrates; no live Cursor/Radon on projector for this segment.
- **Radon block:** ~5–7 min. **RNRepo:** ~1–2 min closing — independent story.
- **Do not** pitch Radon + RNRepo as paired ecosystem or monorepo tooling.
- **Do not** mention network throttling (not available).
- **RNRepo speaker note:** ~2 min setup effort vs ~10 min saved per Android EAS build.
- **License speaker note:** install extension in Cursor and try — do not mention credit card on slides.
- Rehearsal may revisit live demo — out of scope for this task unless owner asks later.

## Notes for the agent prompt

- Read `@docs/topics/radon/README.md` for full narrative; task spec is the implementation brief.
- All screenshot paths are relative to `slides/` (e.g. `./assets/radon/preview.png`).
- If RNRepo overlay positioning is fiddly, document final CSS percentages in speaker notes for owner tuning.
- Post **Source verification** in Russian before first edit.
- After `npm run slides:build`, set status to `awaiting QA`.

## Related files

- `slides/pages/02-radon-rnrepo.md` — primary segment edit
- `slides/slides.md` — `src:` import + talk-order line only
- `docs/topics/radon/README.md` — artifact status update

## Tests (lint / typecheck / manual)

- `npm run slides:build` — required
- Manual: open `npm run slides` and walk slides 2–RNRepo handoff per acceptance table
- No `npm run lint` / `typecheck` (no app code)

## Links

- Feature doc: [README.md](README.md)
- Talk outline: [docs/outline/README.md](../../outline/README.md)
- Task automation: [docs/task-automation/README.md](../../task-automation/README.md)
