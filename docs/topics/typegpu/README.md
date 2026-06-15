# TypeGPU + Redraw

**Talk slot:** 4 (after react-teleport, partner)  
**Owner:** K  
**Demo weight:** heavy — core technical showcase

## Audience takeaway

GPU is becoming practical for **business UI** — blur, rich animations, and effects that used to be too janky on the JS/UI thread — with TypeScript shaders and WebGPU on React Native via TypeGPU + `react-native-wgpu`.

## What to cover

### Why GPU for business apps

Not games — product UI that must stay smooth:

- Frosted panels, performant blur / backdrop
- Animated charts, scroll-linked effects
- Micro-interactions at 60fps under lists, modals, tabs

### TypeGPU (main focus)

- **Type-safe WebGPU** — shaders in TypeScript (`unplugin-typegpu`)
- **`@typegpu/react`** — `useRoot`, `useFrame`, `useConfigureContext` on RN
- **Prebuild required** — not Expo Go (verify at TYPEGPU-00)
- What is realistic in production vs experimental — **lock in TYPEGPU-00**

### Redraw (exploratory)

- GPU 2D vector toolkit (William Candillon) — frosted glass, variable strokes
- Include on slides **only** if TYPEGPU-00 + demo prove one effect is talk-ready
- Default until research: **candidate to cut** if integration cost is high

## Demo plan

- **Substantial Expo demo app** — first `src/` bootstrap ([TYPEGPU-01](TYPEGPU-01.md))
- Multiple screens or toggles: GPU effect vs non-GPU baseline
- Target: one “business screen” mock (e.g. modal with blur + chart animation)
- Runnable on device during talk; fallback documented in README

## Work order

```text
TYPEGPU-00  research + owner scope lock  (docs only)
     ↓
TYPEGPU-01  Expo demo app               (src/)
     ↓
TYPEGPU-02  slides from demo results    (slides/pages/)
```

Slides stay **inline stub** in `slides/slides.md` until TYPEGPU-02.

## Research findings

_Pending [TYPEGPU-00](TYPEGPU-00.md)._ Agent fills after mandatory source re-read:

- Feasibility matrix (capability / RN today / talk-ready / risk)
- Thread model aligned with current docs
- Version pins (Expo SDK, wgpu, typegpu, Reanimated/worklets)
- Redraw include vs cut

## Demo scope decision

_Owner approval required before TYPEGPU-01._ Placeholder:

- [ ] Approved demo beats (GPU vs baseline)
- [ ] Redraw in or out
- [ ] KEYFRAMER export screen in demo or deferred (see [KEYFRAMER-02](../keyframer/KEYFRAMER-02.md))
- [ ] Target devices (physical / simulator)

## Slide inputs (for TYPEGPU-02)

_Pending TYPEGPU-01._ Demo agent leaves bullet list here: screenshots, honest limits, live script.

## Artifacts in repo

| Artifact | Location                                     | Status                   |
| -------- | -------------------------------------------- | ------------------------ |
| Research | This README — sections above                 | TYPEGPU-00 open          |
| Demo app | `src/`                                       | Not started — TYPEGPU-01 |
| Slides   | `slides/pages/04-typegpu-redraw.md` + `src:` | Inline stub — TYPEGPU-02 |

## Open questions

### For TYPEGPU-00

- Exact package versions and New Architecture requirement
- Redraw: keep or cut after doc + examples review
- “Dedicated GPU thread” vs `useFrame` / worklets — accurate talk wording
- Fallback UI (simulator vs physical device)
- Optional keyframer screen in same Expo app

### Deferred to TYPEGPU-01 / 02

- Performance metrics for slides (frame time, thread diagram)
- Screenshot assets under `slides/assets/typegpu/`

## Sources (verify via Context7 before implementation)

- https://docs.swmansion.com/TypeGPU/
- https://docs.swmansion.com/TypeGPU/integration/react-native/
- https://docs.swmansion.com/TypeGPU/ecosystem/typegpu-react/
- https://github.com/wcandillon/react-native-webgpu
- https://github.com/software-mansion-labs/typegpu-rn-examples
- https://wcandillon.github.io/redraw/

## Tasks

| ID                          | Title                 | Status | Notes                     |
| --------------------------- | --------------------- | ------ | ------------------------- |
| [TYPEGPU-00](TYPEGPU-00.md) | Research + scope lock | open   | Docs only; owner gate     |
| [TYPEGPU-01](TYPEGPU-01.md) | Expo demo app         | open   | Blocked until 00 approved |
| [TYPEGPU-02](TYPEGPU-02.md) | Slide deck from demo  | open   | Blocked until 01          |

## Links

- [Talk outline](../../outline/README.md)
- [KEYFRAMER-02](../keyframer/KEYFRAMER-02.md) — optional keyframer paths in demo
