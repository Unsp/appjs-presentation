# Radon + RNRepo

**Talk slot:** 2 (after Legend State, partner)  
**Owner:** K  
**Demo weight:** light

## Audience takeaway

**Radon** is a practical emulator wrapper inside VS Code / Cursor — preview, builds, inspection, and debugging without juggling separate tools. **RNRepo** is a separate closing beat: prebuilt native artifacts that can shorten EAS / CI builds (especially Android).

Radon and RNRepo are **not** one story; do not pitch them as a paired stack or monorepo solution.

## Positioning (Radon)

Do **not** frame Radon as “another RN IDE” or a generic editor upgrade — that undersells what it does.

**Do** frame it as a convenient **wrapper around iOS and Android emulators** in the editor:

- Integrated preview (not a separate Simulator window workflow)
- Handles emulator builds under the hood — reliably enough for day-to-day use
- Bundles tools that are missing, weak, or scattered in default Expo Dev Tools / Metro workflows

Angle for **business apps**: real API debugging, breakpoints, navigation across screens, and agent-assisted flows — not a toy IDE tour.

## Segment timing

| Block   | Budget   | Notes                                    |
| ------- | -------- | ---------------------------------------- |
| Radon   | ~5–7 min | Main segment                             |
| RNRepo  | ~1–2 min | Closing mention only — no setup on stage |
| Handoff | —        | → react-teleport (partner)               |

## What to cover — Radon

### Foundation

- iOS / Android preview inside VS Code / Cursor
- **Builds for emulators under the hood** — Radon drives native builds; no separate “wire up dev client yourself” story on stage
- **Multiple emulators in one window** with quick switching between devices

### Inspection and debugging (primary demo beats)

- **Right-click inspect on the preview** — jump from screenshot to component / source
- **Network inspector** — strong for typical HTTP / fetch traffic; better than the basic Expo Dev Tools network story. **Caveat:** WebSockets not supported yet — do not demo or claim WS inspection on slides
- **Debugger with breakpoints** — working end-to-end, not a demo-only path
- **TanStack DevTools** built in — mention on slides if space; **no dedicated screenshot** (skipped)

**Slide walkthrough order:** inspect → network → debug (screenshot-backed; live revisit optional at rehearsal).

### Painful tasks — built-in tools (text only)

Mention briefly on a bullet slide if space — **no screenshots** (skipped):

- Navigation via **address bar**, **deep links**, **local auth**
- Screen **recording** (bug reports, QA handoff)

**Out of scope / limitations:** network throttling — not available; network inspector — **no WebSocket support** (as of planning).

**License footnote (one line on hook or last Radon slide):** Commercial · install from **Cursor** marketplace · **14-day trial**

### Agents + MCP (text only)

Short beat (~1 min): **one bullet slide + speaker notes** — no live demo, no recording.

Describe the workflow in prose:

1. Agent reads **Figma** (design source)
2. Agent implements UI changes in the repo
3. Agent verifies via **Radon preview / screenshot** — “does it match?”

Angle: closed loop **design → code → visual verify** without leaving the editor. Optional reuse of `preview.png` as a static backdrop — no dedicated MCP asset.

## What to cover — RNRepo (closing only)

Independent from Radon; **do not** link as “same ecosystem” or monorepo tooling.

- **Prebuilt native artifacts** for popular RN libraries (`@rnrepo/build-tools`, `@rnrepo/expo-config-plugin`)
- **Own benchmark (Android EAS):** ~**30 min** baseline → **~20 min** with RNRepo (**~10 min saved** per build)
- Slide copy: lead with **~10 min saved** — strong ROI for ~2 min of setup; do not use vendor “up to 2×” marketing
- Honest constraints: **beta**, **New Architecture** only
- Delivery: one slide with timing numbers + EAS build-list screenshot (`slides/assets/radon-eas-rnrepo.png`)
- **Annotation:** draw the red cutoff line **in Slidev** (CSS overlay + label), not baked into the PNG — keeps the raw screenshot reusable and allows callouts (`RNRepo added`, `~30m → ~20m`)
- Cutoff in the screenshot: between build **1.0.17 (85)** (22m 4s) and **1.0.17 (84)** (31m 22s); older builds ~33–36m
- **No cold EAS on stage**, no live setup

## Presentation flow (draft)

```text
1. Hook: emulator wrapper in the editor — not “another IDE” (preview.png)
2. Multi-emulator switching (multi-emulator.png)
3. Inspect → Network → Debug (inspect.png, network.png, debug.png)
4. MCP: Figma → implement → Radon verify (text slide only)
5. RNRepo closing (1–2 min, radon-eas-rnrepo.png)
6. Handoff → react-teleport
```

## Demo plan

| Format    | Radon                                        | RNRepo                                         |
| --------- | -------------------------------------------- | ---------------------------------------------- |
| Slides    | Required                                     | One closing slide                              |
| Live      | No — screenshots only (revisit at rehearsal) | No                                             |
| Recording | —                                            | EAS build-list screenshot (RNRepo cutoff line) |

No Expo demo app in `src/` for this feature.

## Slide assets (Radon screenshots)

All from **currency.com wallet** app in Cursor. Order matches slide flow:

| #   | File                                     | Slide beat                           |
| --- | ---------------------------------------- | ------------------------------------ |
| 1   | `slides/assets/radon/preview.png`        | Hook — editor + emulator preview     |
| 2   | `slides/assets/radon/inspect.png`        | Right-click inspect, component stack |
| 3   | `slides/assets/radon/network.png`        | Network panel (HTTP; no WebSockets)  |
| 4   | `slides/assets/radon/debug.png`          | Breakpoint paused in real app        |
| 5   | `slides/assets/radon/multi-emulator.png` | Device picker, iOS + Android         |

**Skipped (no assets):** TanStack DevTools screenshot, address bar / deep links / local auth composite.

## Artifacts in repo

| Artifact              | Location                             | Status                    |
| --------------------- | ------------------------------------ | ------------------------- |
| Radon screenshots     | `slides/assets/radon/*.png`          | Ready (5 files)           |
| RNRepo EAS screenshot | `slides/assets/radon-eas-rnrepo.png` | Ready; annotate in Slidev |
| Slides                | `slides/slides.md`                   | Done (RADON-01)           |
| Slide draft           | `slides/pages/02-radon-rnrepo.md`    | Synced with slides.md     |
| MCP                   | —                                    | Text only — no asset      |
| Demo app              | —                                    | Not required              |

## Open questions

All planning decisions for `RADON-01` are **closed** (MCP text only, license footnote, screenshots-only, version-agnostic copy).

### 1. ~~Radon on stage: live vs screenshots only~~ — closed

**Decision:** **screenshots only** for now. Revisit live / hybrid during rehearsal if it feels flat.

**Delivery:** narrate over the five PNGs in `slides/assets/radon/` — no Radon / Cursor on projector for segment 2.

### 2. ~~MCP beat~~ — closed

**Decision:** text slide + speaker notes. No Figma frame, no recording, no `radon-mcp` demo on stage.

### 3. ~~Radon commercial license / trial~~ — closed

**Decision:** one-line footnote on slides.

**Slide line:** `Commercial · Cursor marketplace · 14-day trial`

**Speaker note (owner experience):** install the extension in Cursor and start using — no payment friction at install time. Do **not** mention credit card on slides.

**Verify before talk (agent / owner):** [pricing](https://ide.swmansion.com/pricing) — Pro trial is **14 days** (not 2 months; Expo blog “30 days” is stale). [Free license](https://portal.ide.swmansion.com/free) = email signup, non-commercial. Pro trial legal terms mention card on web signup — if licensing flow changed again, re-check; slide copy stays “install · try”.

### 4. ~~Expo SDK / RN version on slides~~ — closed

**Decision:** **version-agnostic** — do not name Expo SDK or RN version on Radon slides.

Use “our production app” / “current stack” only. **Exception:** RNRepo closing slide still needs **beta + New Architecture** disclaimer (product constraint, not a version number).

## Sources (verify before claims on slides)

- Radon — https://ide.swmansion.com/ (features, compatibility)
- Radon pricing / trial — https://ide.swmansion.com/pricing , https://ide.swmansion.com/legal/pro-license-terms
- RNRepo — https://rnrepo.org/ , https://github.com/software-mansion/rnrepo
- Expo EAS Build — only if citing RNRepo CI / Android build context (not monorepo)

## Tasks

| ID                      | Title                     | Status |
| ----------------------- | ------------------------- | ------ |
| [RADON-01](RADON-01.md) | Radon + RNRepo slide deck | done   |
