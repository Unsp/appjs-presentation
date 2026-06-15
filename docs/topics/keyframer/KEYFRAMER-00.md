# KEYFRAMER-00 — Owner prep: keyframer project from Figma

**Status:** done  
**Feature:** [docs/topics/keyframer/README.md](README.md)  
**Outline:** [docs/outline/README.md](../../outline/README.md) — talk slot 6  
**Blocks:** ~~KEYFRAMER-02~~ — cancelled (slides-only talk; Expo deferred to TypeGPU)

## Closure summary (owner confirmed)

Prep completed with **simplified scope** (owner decision):

- **Live demo:** generic keyframer project — simple **timeline** entrance + simple **node graph** (reactive/spring), not a Currency.com recreation in the editor.
- **Currency.com:** minimal on slides — one-liner that a mature tool will simplify designer ↔ developer collaboration; Figma link remains optional reference only.
- **Wallet Storybook:** optional for live; not required for KEYFRAMER-00 acceptance.

Owner has a **saved keyframer project** and understands the live export path. Export artifacts will be **copied into the repo during KEYFRAMER-02** (not committed in 00).

## Handoff to KEYFRAMER-02

### Demo content (from saved keyframer project)

| Scene | Mode         | Purpose on stage                                                                                 |
| ----- | ------------ | ------------------------------------------------------------------------------------------------ |
| 1     | **Timeline** | Staggered entrance (2–4 elements), `useAnimatedScene()` export                                   |
| 2     | **Graph**    | Simple reactive motion (e.g. tap + `withSpring` or pan + interpolate), `use{Name}Graph()` export |

**Relative layout mode** in code export (recommended for Expo integration).

### Target repo paths (KEYFRAMER-02)

```text
src/animations/keyframer/
  timelineScene.ts    # paste useAnimatedScene() export (rename as needed)
  graphScene.ts       # paste use{Name}Graph() export (optional second screen)
```

Owner copies fresh export from keyframer editor at integration time; filenames above are conventions for KEYFRAMER-02.

### Stack

- **Reanimated 4** + **react-native-worklets** + **New Architecture** (required — verify Expo SDK via Context7 at KEYFRAMER-02).
- Output is Reanimated hooks/worklets — **not Lottie**.

### Limitations found during prep (do not re-discover)

| Area                 | Finding                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Timeline easing      | Cubic-bezier only; no per-segment spring physics                                                                                          |
| Trigger sequences    | Multi-step onMount chain; **no spring** on steps                                                                                          |
| Node graph           | `withSpring` / `withSequence` nodes exist (Alpha); changelog positions graphs for **runtime reactive** input, not Figma prototype chains  |
| `progress` node      | Bridges timeline keyframe stops to `interpolate`; driver between stops is easing unless graph wires spring separately                     |
| Public docs          | No `/docs` site — [changelog](https://keyframer.dev/changelog) is primary reference                                                       |
| Figma spring handoff | Figma spring params (`mass` / `stiffness` / `damping`) → manual `withSpring` in Expo if pixel parity ever needed; not via timeline export |
| Account              | Free plan sufficient for prep and talk                                                                                                    |

### Slide assets

| Asset    | Path                                          | Status |
| -------- | --------------------------------------------- | ------ |
| Timeline | `slides/assets/keyframer/editor-timeline.png` | Ready  |
| Graph    | `slides/assets/keyframer/editor-graph.png`    | Ready  |
| Export   | `slides/assets/keyframer/editor-export.png`   | Ready  |

## Acceptance (as closed)

| #   | Scenario                | Result                                                 |
| --- | ----------------------- | ------------------------------------------------------ |
| 1   | Saved keyframer project | Yes — generic timeline + graph                         |
| 2   | Export                  | Owner can copy Reanimated-oriented export from editor  |
| 3   | Reanimated 4 / New Arch | Understood for demo stack                              |
| 4   | Live rehearsal path     | keyframer open → export in &lt; 3 min (editor portion) |
| 5   | Slide assets in repo    | Deferred to KEYFRAMER-01                               |
| 6   | Handoff note            | This section + feature README                          |
| 7   | Feature doc             | Updated                                                |

## Out of scope (unchanged)

- `slides/pages/06-keyframer.md` — KEYFRAMER-01
- Expo bootstrap — KEYFRAMER-02
- Wallet / Reanimated upgrade

## Links

- [Feature doc](README.md)
- Next: [KEYFRAMER-01](KEYFRAMER-01.md) (slides only). KEYFRAMER-02 cancelled.
