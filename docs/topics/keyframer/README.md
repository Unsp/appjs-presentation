# keyframer.dev

**Talk slot:** 5 (deck order — after react-teleport, partner)  
**Owner:** K  
**Demo weight:** light — **slides only** (no live keyframer, no live Expo)

## Audience takeaway

Designers deliver **Figma keyframes**; engineers still hand-roll **Reanimated**. keyframer.dev targets that gap — but the tool is still **alpha**. We show the idea, honest limits, and a **generic editor demo on slides** — not a live stage demo.

## Case study (speaker notes only — no Figma slide)

**Optional one-liner in speech or on problem slide:** Currency.com wallet had complex motion — manually implemented in Reanimated. Not recreated in keyframer (tool too alpha).

**On slides:** generic demo project **«Lively Flicker»** — timeline + graph + export screenshots only. **No Figma asset.**

## Positioning

- **Not Lottie** — output targets **Reanimated** (worklets / hooks), not generic motion JSON.
- **Reanimated 4** — mention on slides; real dependency (**New Architecture**).
- **Alpha honesty** — timeline = easing keyframes; node graph = reactive/spring (see limitations). Tool not ready for complex Figma spring handoff yet.
- **Problem slide:** Figma describes motion; it does not ship runnable Reanimated.

## Segment timing

| Block   | Budget   | Notes                                                        |
| ------- | -------- | ------------------------------------------------------------ |
| Slides  | ~5–7 min | Pain, alpha, editor screenshots, export snippet, limitations |
| Live    | **None** | Revisit at rehearsal if tool matures — default off           |
| Closing | —        | Q&A / end of K block                                         |

## Delivery

| Format         | Decision                                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Slides         | Required — narrative + screenshots + optional export code on slide                                                     |
| Live keyframer | **No** — tool too raw; saved project used for assets only                                                              |
| Live Expo      | **No** — deferred; first Expo bootstrap in [WebGPU segment](../webgpu/README.md) ([WEBGPU-01](../webgpu/WEBGPU-01.md)) |
| Recording      | Optional owner asset for rehearsal; not required for talk                                                              |

## Presentation flow

```text
1. Hook — motion from design ≠ Reanimated code
2. Problem — handoff pain; optional Currency one-liner (text only)
3. Timeline — editor-timeline.png (Lively Flicker)
4. Graph — editor-graph.png (Drag to Move)
5. Export — editor-export.png (Generated Code)
6. Limitations — alpha table
7. Reanimated 4 + New Architecture
8. Closing — when tool matures
```

No Storybook live. No keyframer live. No Expo live.

## Owner prep — done ([KEYFRAMER-00](KEYFRAMER-00.md))

- [x] Saved keyframer project: simple **timeline** + simple **node graph** (generic, not Currency).
- [x] Export understood; can paste snippet for KEYFRAMER-01 slides.
- [x] Screenshots → `slides/assets/keyframer/` (timeline, graph, export).
- [x] Export on slide via `editor-export.png` (no separate code fence required).

## keyframer limitations (from KEYFRAMER-00 prep)

| Topic                 | Notes                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------- |
| Docs                  | No public docs site; [changelog](https://keyframer.dev/changelog) is the main reference |
| Timeline              | Easing = cubic-bezier; no spring on keyframe segments                                   |
| Trigger sequences     | onMount multi-step; no spring on steps                                                  |
| Node graph (Alpha)    | `withSpring`, `withSequence`, `interpolate`, gesture nodes; export `use{Name}Graph()`   |
| `progress`            | Timeline keyframe stops → interpolate; not a substitute for Figma spring chains         |
| Figma springs         | Manual `withSpring({ mass, stiffness, damping })` in Expo if parity needed later        |
| Currency-scale motion | Not feasible in editor today — why live demo was dropped                                |

## Slide assets

| Asset           | Path                                          | Status                            |
| --------------- | --------------------------------------------- | --------------------------------- |
| Timeline editor | `slides/assets/keyframer/editor-timeline.png` | Ready — Lively Flicker, keyframes |
| Graph editor    | `slides/assets/keyframer/editor-graph.png`    | Ready — Drag to Move nodes        |
| Export panel    | `slides/assets/keyframer/editor-export.png`   | Ready — Generated Code            |

**No Figma slide.** Currency — text one-liner only (optional).

## Artifacts in repo

| Artifact | Location                                                      | Status                                                                               |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Slides   | `slides/pages/06-keyframer.md` + `src:` in `slides/slides.md` | done — KEYFRAMER-01                                                                  |
| Demo app | `src/`                                                        | **Deferred** — [WEBGPU-01](../webgpu/WEBGPU-01.md) (KEYFRAMER-02 cancelled for talk) |

## Open questions

### Closed

- Delivery: **slides only** (owner decision after KEYFRAMER-00).
- Demo content: generic **Lively Flicker** screenshots; no Figma on slides.
- Live keyframer / Expo: **no**.
- Reanimated 4 + New Architecture on slides.
- Slide language: **Russian**.
- KEYFRAMER-00: **done**.
- KEYFRAMER-01: **done**.

### Deferred

- Runnable Expo demo — [WebGPU segment](../webgpu/README.md) or post-talk; see [KEYFRAMER-02](KEYFRAMER-02.md).

## Sources

- https://keyframer.dev/
- https://keyframer.dev/changelog
- react-native-reanimated 4 — New Architecture, worklets
- Expo SDK — for future demo only

## Tasks

| ID                              | Title                         | Status    | Notes                                           |
| ------------------------------- | ----------------------------- | --------- | ----------------------------------------------- |
| [KEYFRAMER-00](KEYFRAMER-00.md) | Owner prep: keyframer project | done      | Generic demo; export for slide snippet          |
| [KEYFRAMER-01](KEYFRAMER-01.md) | keyframer slide deck          | done      | Slides-only narrative wired via `src:`          |
| [KEYFRAMER-02](KEYFRAMER-02.md) | Expo demo + export            | cancelled | Deferred to WebGPU segment; not needed for talk |
