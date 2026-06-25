# WebGPU in React Native

**Talk slot:** 4 (after react-teleport, partner)  
**Owner:** K  
**Demo weight:** heavy — core technical showcase  
**Slide segment title:** **WebGPU в React Native** — TypeGPU is a **separate slide**, not in the segment header  
**Repo folder:** `docs/topics/webgpu/` · task IDs `WEBGPU-*`

## Audience takeaway

**WebGPU has landed on React Native** — and the ecosystem is already moving: **`react-native-webgpu`** as the foundation, **popular libraries** (e.g. Skia Graphite preview) migrating onto the same stack, plus **new DX layers** like **TypeGPU** for TypeScript shaders. Live demo = **TypeGPU stress test** only; Skia / Redraw = **slides context**, no Skia demo.

## What to cover

### Why WebGPU for business apps

Not games — **programmable GPU** in product UI:

- Custom live viz (charts, heatmaps) — beyond stock chart libs
- GPU lane that stays smooth **under busy JS** (sync, analytics, heavy lists)
- Branded canvas effects (shimmer, glow) — TS shaders, no GLSL team

_Blur / frosted glass — already solved by stable Skia; mention as GPU-heavy UI context, **not** as WebGPU novelty. See [TypeGPU business use cases](#typegpu-business-use-cases-demo-mapping)._

### WebGPU on React Native (foundation — segment opener)

- **`react-native-wgpu`** — WebGPU (Dawn) bridge to iOS / Android
- **Native build** — `expo prebuild` (native module)
- **New Architecture** — RN ≥ 0.81; legacy arch not supported
- **Maturity** — young but real stack; see [Stack maturity](#stack-maturity-not-alpha)

### Ecosystem on the same stack (slides)

- **Skia Graphite** (`@shopify/react-native-skia@next`) — Skia backend on WebGPU; not TypeGPU — see [Skia Graphite](#skia-graphite--next-not-a-typegpu-migration)
- **Redraw** — TypeGPU-based 2D UI toolkit; **out of live demo** (subscriber preview) — [Redraw decision](#redraw-decision)
- Optional one-liner: raw WebGPU vs DX layers (TypeGPU, Skia, Redraw)

### TypeGPU (dedicated slide + live demo)

**Not the segment title** — one slide in the deck, then live handoff:

- Type-safe shaders in TypeScript (`unplugin-typegpu`, `'use gpu'`)
- `@typegpu/react` — `useRoot`, `useFrame`, `useConfigureContext` on RN
- Demo proves thread story: GPU lane via `runOnUI` vs Reanimated baseline under JS load

## Demo plan

- **Expo demo app** — repo root, **`src/` FSD layout** + **Tamagui** (pattern from `cx-mobile-app-wallet`) — [WEBGPU-01](WEBGPU-01.md)
- Multiple screens or toggles: GPU effect vs non-GPU baseline
- Target: **stress-test** screen only; Redraw / Skia Graphite — slides (WEBGPU-02)
- Runnable on device during talk; fallback documented below

## Work order

```text
WEBGPU-00  research + owner scope lock  (docs only)     → scope locked 2026-06-16
     ↓
WEBGPU-01  Expo demo app               (repo root)       → open
     ↓
WEBGPU-02  slides from demo results    (slides/pages/)   → open
```

Slides stay **inline stub** in `slides/slides.md` until WEBGPU-02.

---

## Research findings

**Date:** 2026-06-16 (Redraw RN docs re-checked after owner request)
**Task:** [WEBGPU-00](WEBGPU-00.md) — sources re-read via official docs, GitHub READMEs, `typegpu-rn-examples` package.json, Context7 (`/software-mansion/typegpu`, `/software-mansion-labs/typegpu-confetti`), Redraw site, App.js / debrief transcripts.

### Executive summary

TypeGPU on React Native is **feasible as a WebGPU case study** for a live talk demo with honest constraints: **native build (prebuild)**, **New Architecture**, physical **iOS device** preferred. The official path (`react-native-wgpu` + `@typegpu/react` + `typegpu`) is documented and has a blue-triangle smoke test.

For a **business UI** narrative framed as **WebGPU on mobile**: **stress test** is the live demo. **Redraw out** (no subscriber access). **Confetti out.** Richer chart on tab 1 is an **optional stretch**. [Skia Graphite](#skia-graphite--next-not-a-typegpu-migration) — ecosystem slide, not WEBGPU-01 scope.

Thread wording for slides: avoid “dedicated GPU thread” as a default claim. Default `@typegpu/react` path runs `useFrame` on the **JS thread** via `requestAnimationFrame`; GPU executes shaders. Advanced paths can move orchestration to **Reanimated UI** or **background worklet** runtimes via `react-native-wgpu` / `react-native-webgpu-worklets` — see [Thread story](#thread-story).

### Install stack (confirmed)

| Step                  | Source                                                                               | Notes                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Packages              | [RN integration guide](https://docs.swmansion.com/TypeGPU/integration/react-native/) | `react-native-wgpu`, `typegpu`, `@typegpu/react`; dev: `unplugin-typegpu`, `@webgpu/types`     |
| Reanimated + worklets | Same guide                                                                           | Upgrade to newest before TypeGPU install                                                       |
| Babel                 | Same guide                                                                           | `unplugin-typegpu/babel` in `babel.config.js`; `npx expo customize babel.config.js` if missing |
| tsconfig              | Same guide                                                                           | `"types": ["@webgpu/types"]`                                                                   |
| Prebuild              | Same guide                                                                           | Native module — `npx expo prebuild` required                                                   |
| New Architecture      | [react-native-webgpu README](https://github.com/wcandillon/react-native-webgpu)      | RN **≥ 0.81**; **legacy architecture not supported**                                           |
| iOS simulator         | RN integration guide                                                                 | Disable Metal API Validation in Xcode scheme                                                   |
| Smoke test            | RN integration guide                                                                 | Blue triangle via `useRoot` + `useConfigureContext` + `useFrame` + `ctx.present?.()`           |
| Redraw (preview)      | —                                                                                    | **Out** — not in `vendors/`                                                                    |

Package rename note: npm publishes both `react-native-wgpu` and `react-native-webgpu` (shim re-export). TypeGPU docs still use `react-native-wgpu` import path — use that for consistency with official examples.

### Stack maturity (not “alpha”)

Neither **`react-native-webgpu`** nor the **TypeGPU RN path** is officially branded **alpha** (contrast: [keyframer.dev](../keyframer/README.md)). Docs treat them as **real, constrained integrations** — not a lab PoC.

| Layer                 | Official stance (Jun 2026)                                                                                                                   | Talk wording                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `react-native-webgpu` | WebGPU via Dawn; API **symmetric with the Web**; Expo template `with-webgpu`; RN **≥ 0.81**, New Arch only                                   | **Молодой, но рабочий native-стек** — triangle / R3F / camera demos exist |
| TypeGPU **0.11.x**    | [RN integration guide](https://docs.swmansion.com/TypeGPU/integration/react-native/) — full install + triangle                               | **Ранняя интеграция для product UI** — часть API ещё `~unstable`          |
| `@typegpu/react`      | Documented hooks; `useFrame` on JS thread by default                                                                                         | Demo shows advanced path (`runOnUI`) explicitly                           |
| Skia Graphite `@next` | **Highly experimental** — not for production ([RN Skia docs](https://shopify.github.io/react-native-skia/docs/getting-started/installation)) | **Experimental** — ecosystem slide only                                   |
| Redraw                | Subscriber technical preview                                                                                                                 | **Preview** — slides / web only                                           |

**Slides:** one **limitations** beat — native build, New Arch, iOS primary, APIs still evolving. **Do not** mirror keyframer’s “сегодня — alpha” tone for this segment; stack is past toy-demo stage.

**Not production blanket claims:** business blur behind arbitrary RN views, every Android device, zero integration cost — out of scope per [Out of scope](#out-of-scope-do-not-promise-on-slides-or-demo).

### Feasibility matrix

| Capability                               | RN today (docs / examples)                                                                                | Talk-ready (Jun 2026)                 | Risk                                                       |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| Blue triangle / pipeline smoke           | Official RN guide + `typegpu-rn-examples`                                                                 | Yes — day-0 sanity check              | Low; sim needs Metal validation off                        |
| Type-safe shaders (`'use gpu'`)          | `unplugin-typegpu` + TypeGPU 0.11.x                                                                       | Yes                                   | Babel cache — `expo start --clear`                         |
| `@typegpu/react` hooks                   | Documented (`useRoot`, `useFrame`, `useConfigureContext`, `useUniform`)                                   | Yes                                   | `useFrame` = JS-thread rAF, not UI worklet by default      |
| GPU confetti micro-interaction           | `typegpu-confetti`                                                                                        | **Out** (owner)                       | —                                                          |
| Animated chart / function plot           | `FunctionVisualizer` in `typegpu-rn-examples`                                                             | **Optional stretch** (tab 1 only)     | If stress test leaves time in WEBGPU-01                    |
| Reanimated UI-thread WebGPU              | `react-native-wgpu` README — `runOnUI` + `installWebGPU`                                                  | **Required** for stress-test GPU lane | Extra setup vs default `useFrame`                          |
| Background worklet GPU                   | `react-native-webgpu-worklets` — `runOnBackground`, `enableGPUForWorklets`                                | Experimental for talk                 | Scope creep for WEBGPU-01 unless owner insists             |
| Redraw frosted glass / vector feathering | [Redraw docs](https://wcandillon.github.io/redraw/docs/)                                                  | **Out** (owner)                       | Subscriber `.tgz` only; web on slides                      |
| Skia Graphite (`@next`)                  | [RN Skia Graphite preview](https://shopify.github.io/react-native-skia/docs/getting-started/installation) | Slides only                           | WebGPU backend; not TypeGPU; experimental                  |
| Android emulator                         | WebGPU varies by GPU/driver                                                                               | Optional smoke                        | `rnwebgpu/native-texture` may be missing on some emulators |
| Physical iOS device                      | Recommended in RN guide + wgpu README                                                                     | **Primary stage target**              | Low when prebuild + New Arch correct                       |

### Ecosystem ranking (business UI talk)

| Candidate                                             | Wow                   | Rehearsal effort | RN path                        | Recommendation                   |
| ----------------------------------------------------- | --------------------- | ---------------- | ------------------------------ | -------------------------------- |
| **Stress test** (custom `'use gpu'` + worklet)        | High (thread story)   | Medium           | TypeGPU + `runOnUI`            | **Include** — only live demo     |
| **Redraw frosted panel**                              | Very high             | —                | Subscriber preview             | **Out** — slides only            |
| **Skia Graphite** (`@shopify/react-native-skia@next`) | High (blur/UI)        | High             | Public `@next` npm             | **Out of demo** — slides context |
| **Richer chart** (`FunctionVisualizer` ideas)         | Medium                | Medium           | `typegpu-rn-examples` patterns | **Optional stretch** on tab 1    |
| Fluid / boids                                         | High (wrong audience) | Medium           | Examples repo                  | Out of scope                     |

### Patterns to borrow from `typegpu-rn-examples`

Reference app: Expo 54, `newArchEnabled: true`, gesture + Reanimated wiring in `App.tsx`.

| Example                                      | Borrow for talk? | Notes                                                    |
| -------------------------------------------- | ---------------- | -------------------------------------------------------- |
| `FunctionVisualizer.tsx`                     | Maybe            | Closest to “business chart” — 2D plot, not Skia/Recharts |
| `Boids`, `Fish`, `Jelly`, fluid sims         | No               | Compute-heavy; reads as graphics demo not product UI     |
| `GameOfLife`                                 | No               | Toy cellular automata                                    |
| `useWebGPU.ts`                               | Maybe            | Lower-level init if hooks path insufficient              |
| App shell (emoji picker + `GestureDetector`) | Yes              | Minimal pattern for switching demo modes on stage        |

Do **not** copy wholesale — extract smoke path, chart idea, and navigation shell only.

### Redraw decision

**Out of WEBGPU-01 live demo** (owner, Jun 2026 — not subscribing to [start-react-native.dev](https://start-react-native.dev/)).

| Factor              | Finding                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Public web          | [Redraw site](https://wcandillon.github.io/redraw/) — demos, frosted-glass editor                                                    |
| RN packages         | **Not public npm** — real builds are subscriber `.tgz` only ([installation](https://wcandillon.github.io/redraw/docs/installation/)) |
| Talk fallback       | **WEBGPU-02 slides:** Redraw web screenshot + one line on preview access model                                                       |
| Relation to TypeGPU | Redraw _uses_ TypeGPU for custom `'use gpu'` materials — sibling library, not our demo stack                                         |

### Skia Graphite / `@next` (not a TypeGPU migration)

**Confirmed from official sources (Jun 2026):** React Native Skia is **not** “moving to TypeGPU.” It is adding an experimental **Skia Graphite** backend on **WebGPU** (Dawn), parallel to the default **Ganesh** backend (OpenGL / Metal).

| Topic              | Official fact                                                                                                                                                           | Source                                                                                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What is `@next`    | `@shopify/react-native-skia@next` — **Graphite** preview, not a separate product name “skia-next”                                                                       | [Installation — Graphite](https://shopify.github.io/react-native-skia/docs/getting-started/installation), [GitHub `next` branch README](https://github.com/Shopify/react-native-skia/tree/next) |
| Default today      | **Ganesh** remains default on stable (`2.6.x`); shaders = **SKSL** (GLSL-like), not TypeScript `'use gpu'`                                                              | [Shading language](https://shopify.github.io/react-native-skia/docs/shaders/overview)                                                                                                           |
| Graphite stack     | Skia **Graphite** → **WebGPU** via **Dawn** (same family as `react-native-wgpu`)                                                                                        | [Shopify engineering (Jun 2025)](https://shopify.engineering/webgpu-skia-web-graphics)                                                                                                          |
| TypeGPU role       | **Separate library** — TypeScript → WGSL via `unplugin-typegpu`; used by Redraw, `typegpu-confetti`, raw demos. **Not** Skia’s internal shader compiler                 | [TypeGPU RN guide](https://docs.swmansion.com/TypeGPU/integration/react-native/)                                                                                                                |
| Interop            | Demos show **composition**: Skia drawings can sample **WebGPU textures** (e.g. ComputeToys compute output); 2D/3D texture sharing — **not** “Skia rewritten in TypeGPU” | Shopify engineering article                                                                                                                                                                     |
| Threading          | Graphite + WebGPU: canvases can run on a **dedicated thread** “out of the box” (William Candillon / Shopify messaging)                                                  | Same article                                                                                                                                                                                    |
| Production         | **Highly experimental** — “not recommended for production”; Android **API 26+** for Graphite                                                                            | RN Skia docs + GitHub README                                                                                                                                                                    |
| Maintainer overlap | William Candillon leads **both** `react-native-wgpu` and RN Skia — shared WebGPU direction, different APIs                                                              | Ecosystem context                                                                                                                                                                               |

**For this talk:** segment title **WebGPU в React Native**; live demo = **TypeGPU** stress test on `react-native-wgpu`. Stable **RN Skia `BackdropBlur`** could be a **baseline** comparison on slides (“how blur works today”) — optional WEBGPU-02 beat, **not** WEBGPU-01 unless owner later asks. **`@shopify/react-native-skia@next`** is too experimental to add alongside SDK 56 + WebGPU spike in one rehearsal cycle.

**Slide one-liner (accurate):** “Skia Graphite moves Skia’s **backend** to WebGPU; TypeGPU is a **shader toolkit** on the same stack — complementary layers, not one migration.”

### App.js 2025 / 2026 narrative reconciliation

| Talk / marketing claim      | Current docs (Jun 2026)                                                                  | Slide wording                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| “Dedicated GPU thread”      | No separate OS thread — GPU commands from JS/UI/worklet runtimes; GPU executes shaders   | Say **GPU-accelerated**, not “free dedicated thread”                    |
| WebGPU on UI thread         | Supported via Reanimated `runOnUI` + `installWebGPU`                                     | Optional advanced note                                                  |
| WebGPU on background thread | `react-native-webgpu-worklets` `runOnBackground`                                         | Experimental; not default demo path                                     |
| `useFrame` default          | Runs on **CPU/JS** via `requestAnimationFrame`; uniforms written on CPU; fragment on GPU | Accurate default story for `@typegpu/react`                             |
| Redraw + RN frosted glass   | Subscriber preview only — **out of demo**                                                | Web screenshot on slides; mention Skia Graphite as parallel WebGPU path |

YouTube [App.js 2025 talk](https://www.youtube.com/watch?v=QlOnC3JOjnE) and [Redraw debrief](https://www.youtube.com/watch?v=aP8GSJ7oTuc) inform **direction**; implementation claims must follow docs above.

### Thread story

Plain-language model for future slides (WEBGPU-02):

React Native still runs your React tree and most app logic on the **JavaScript thread**. With TypeGPU + `react-native-wgpu`, you add a **WebGPU canvas**. By default, `@typegpu/react`’s `useFrame` runs on the **JS thread** (`requestAnimationFrame`): each frame you write uniforms on CPU, record draw commands, then call `ctx.present()`. Code inside `'use gpu'` (fragment / compute) is compiled to WGSL and runs on the **GPU** — often thousands of parallel invocations per dispatch; that is separate from which JS runtime schedules the frame.

For the **stress-test demo beat** (owner request): GPU animation should stay smooth while the **JS thread** is artificially loaded. That requires moving the render loop off main JS — e.g. `runOnUI` + `installWebGPU` from `react-native-wgpu` (documented Reanimated integration), not default `useFrame` alone. If `useFrame` stays on JS and JS is blocked, the animation **will** stutter — that contrast is useful for the baseline side, not the GPU proof.

Optional: `react-native-webgpu-worklets` (`runOnBackground`) for a dedicated worklet runtime — heavier setup; only if `runOnUI` path is insufficient in WEBGPU-01.

**CPU (JS):** React, stress button, business logic. **CPU (UI worklet):** optional encode + `present()` per frame. **GPU:** `'use gpu'` shader bodies. Do not conflate GPU invocations with “a dedicated OS GPU thread.”

### Version pins (proposed for WEBGPU-01)

Align with proven `typegpu-rn-examples` pins; bump patch versions at install time.

| Package                          | Proposed pin                                                      | Rationale                                                          |
| -------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| Expo SDK                         | **56** (`expo@~56.x` — owner choice)                              | Spike for main-project upgrade; validate WebGPU stack in WEBGPU-01 |
| React Native                     | **0.85.3** (Expo SDK 56 resolved; research pin 0.81.5 superseded) |
| `react-native-wgpu`              | **^0.5.15**                                                       | Matches npm latest; same as `react-native-webgpu`                  |
| `typegpu`                        | **^0.11.8**                                                       | Latest npm; examples on 0.11.3                                     |
| `@typegpu/react`                 | **^0.11.1**                                                       | Matches TypeGPU 0.11 line                                          |
| `unplugin-typegpu`               | **^0.11.5** (npm latest; research proposed ^0.11.x)               |
| `@webgpu/types`                  | **^0.1.69**                                                       | Examples pin                                                       |
| `react-native-reanimated`        | **^4.3.0** (npm latest 4.4.x OK)                                  | Required peer; examples use 4.3                                    |
| `react-native-worklets`          | **^0.8.1** (npm latest 0.9.x — verify in 01)                      | TypeGPU RN guide says newest                                       |
| `typegpu-confetti`               | —                                                                 | **Out** (owner)                                                    |
| `redraw` + `react-native-redraw` | —                                                                 | **Out**                                                            |
| `typescript` (optional)          | **`npm:tsover@^5.9.11`**                                          | If Redraw/TypeGPU GPU code uses `+` on vectors                     |
| `expo` New Architecture          | **`newArchEnabled: true`**                                        | Required                                                           |

Owner chose **SDK 56** (Jun 2026) to dogfood upgrade — `typegpu-rn-examples` pins SDK 54; treat compatibility gaps as WEBGPU-01 findings in README.

### Fallback plan

| Scenario                           | Action                                                                                                   |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Primary rehearsal / stage          | **Physical iOS device** — `expo run:ios` after prebuild                                                  |
| iOS Simulator                      | Allowed for dev; disable **Metal API Validation**; stage prefers physical device                         |
| Android                            | **Best-effort** — run if `expo run:android` works without extra spike; not a rehearsal blocker           |
| Android emulator                   | Optional smoke only — WebGPU varies by GPU/driver                                                        |
| GPU init failure                   | Show inline error + **baseline-only** screen (no crash); speaker narrates “prebuild + New Arch required” |
| Redraw / Skia Graphite not in demo | Slides: Redraw web + Skia Graphite one-liner; live = stress test only                                    |
| GPU canvas fails mid-talk          | Baseline lane + triangle smoke (~10 s)                                                                   |

### Out of scope (do not promise on slides or demo)

- Full custom Gaussian blur in raw TypeGPU — mention Redraw / Skia Graphite on slides only
- Legacy React Native architecture
- 3D games, Three.js scenes, or Vision Camera pipelines (unless owner expands scope)
- Replacing **Skia** / **Reanimated** for all UI — GPU complements, not drop-in replacement
- Production-grade blur behind arbitrary RN views without compositing strategy
- **`react-native-webgpu-worklets`** `runOnBackground` demo unless `runOnUI` stress path is insufficient in WEBGPU-01
- Performance benchmarks as hard numbers (defer honest qualitative comparison to WEBGPU-01/02)
- **KEYFRAMER** — not part of TypeGPU segment ([keyframer slides done](../keyframer/README.md)); no Expo screen in this demo

---

## Demo scope decision

**Owner-confirmed scope (Jun 2026).** WEBGPU-01 unblocked.

### Demo beats (final)

| Tab   | Beat                      | Status                                                                   |
| ----- | ------------------------- | ------------------------------------------------------------------------ |
| **1** | **Stress test**           | **Implemented** — `src/screens/StressTestScreen`, `src/features/typegpu` |
| —     | **Redraw**                | **Out** — slides only (subscriber preview)                               |
| —     | **Confetti**              | **Out**                                                                  |
| —     | **Skia Graphite `@next`** | **Out of demo** — slides context only                                    |

**Optional stretch (tab 1):** richer chart from `FunctionVisualizer` patterns if time allows.

### TypeGPU business use cases (demo mapping)

Owner-approved pitch — **one stress-test screen** proves all three on stage:

| #   | Business pitch                                                       | Demo implementation                                                | Status                      |
| --- | -------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------- |
| 1   | **Custom live viz** — mini chart / animated data strip in TS shaders | GPU lane: `'use gpu'` fragment + `time` / data uniforms            | Implemented (shimmer bands) |
| 2   | **GPU under busy JS** — viz stays smooth when app is busy            | `runOnUI` + `installWebGPU` vs Reanimated baseline; «Нагрузить JS» | Implemented                 |
| 3   | **Branded canvas effects** — shimmer / glow polish                   | Same GPU shader (shimmer simpler than full chart)                  | Implemented (shimmer)       |

**Not in demo:** blur/glass live, Redraw, Skia Graphite, confetti, separate tabs.

**Slide pitch one-liner:** «TypeGPU — свой GPU-виджет в TS: не blur (он уже есть), а programmable viz и анимация под нагрузкой JS.»

### Beat A — Stress test (TypeGPU thread story)

Side-by-side or stacked on one screen:

| Lane         | What runs                                                                                                                           | Under JS load                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **GPU**      | Small animated chart / shimmer (`'use gpu'` fragment + `time` uniform); render loop on **UI worklet** (`runOnUI` + `installWebGPU`) | Should stay **smooth** — encode/`present` not blocked by JS busy-loop |
| **Baseline** | Same visual intent via **Reanimated** (or JS-driven `useFrame` canvas) on main JS scheduling                                        | Should **jank** visibly when JS is loaded                             |

**Control:** button «Нагрузить JS» — CPU work on **JS thread** only.

**Optional stretch:** richer plot from `FunctionVisualizer.tsx` patterns — same tab, if time in WEBGPU-01.

#### Navigation

Single-screen or minimal shell — stress test only; ~3–5 min live segment.

**Redraw:** **Out** (owner — no subscriber).  
**Expo SDK:** **56**.  
**KEYFRAMER:** **N/A**.  
**Devices:** **iOS primary** (physical device for stage); Android — **best-effort**.

**Bootstrap:** repo root, **`src/` FSD + Tamagui + ESLint + `~` aliases** — pattern from `cx-mobile-app-wallet`; **no Skia**; SDK **56** (wallet is 54).

### Owner checklist

- [x] Stress test only — **approved**
- [x] Redraw — **out** (no subscriber)
- [x] Confetti — **out**
- [x] Expo SDK **56**
- [x] KEYFRAMER — **N/A**
- [x] Bootstrap — **FSD + Tamagui + ESLint + aliases** from `cx-mobile-app-wallet` pattern; no Skia
- [x] Target devices — **iOS primary**; Android best-effort
- [x] Segment narrative + slide beat plan — **approved** (2026-06-16)
- [x] TypeGPU top-3 business pitch → single stress screen — **approved**

---

## Slide beat plan (discussion — WEBGPU-02 only)

### Segment thesis (owner, Jun 2026)

**One-liner for the room:** WebGPU теперь есть в React Native — и экосистема уже подтягивается: популярные либы переезжают на WebGPU, плюс появляются интересные слои вроде TypeGPU.

| Layer                                | Slides                        | Live demo               |
| ------------------------------------ | ----------------------------- | ----------------------- |
| WebGPU on RN (`react-native-webgpu`) | Block A — foundation          | —                       |
| TypeGPU                              | Block B — DX + threading      | **Yes** — stress test   |
| Skia Graphite `@next`                | Block C — ecosystem migration | **No** — slides only    |
| Redraw                               | Optional one-liner on C       | **No** — web screenshot |

**Owner order:** Block A → B → C → live demo (D).  
**Agent scope:** research lives here; **`slides/**` edits only in WEBGPU-02\*\* (earlier inline stub edits left as-is per owner).

_Estimated segment: ~8–12 min slides + ~3–5 min live demo._

### Block A — WebGPU в React Native (3–4 slides)

**A1 · Opener**

- Заголовок: **WebGPU в React Native**
- Подзаголовок (опционально): экосистема уже движется — не только low-level API

**A2 · Зачем programmable GPU в product UI** _(отдельный слайд — owner; merge TBD in WEBGPU-02)_

- Custom viz, perf под busy JS, branded canvas effects — не «новый blur»
- Боль: тяжёлая анимация/viz дёргается, когда JS thread занят
- Blur/glass — **контекст** (Skia уже умеет); WebGPU = новый GPU pipeline

**A3 · Стек на RN** _(отдельный слайд — owner; merge TBD in WEBGPU-02)_

- **`react-native-webgpu`** (npm alias `react-native-wgpu`) — WebGPU через **Dawn** на iOS / Android
- API **симметричен вебу** (`navigator.gpu`, canvas, WGSL)
- Expo-шаблон `with-webgpu`; Three.js / R3F — ecosystem beat, **не в нашем демо**
- **Native build** (`expo prebuild`) + **New Architecture** (RN ≥ 0.81)

**A4 · Limitations**

- **Молодой native-стек** — не keyframer-alpha, но API и ecosystem ещё растут
- **iOS primary** для сцены; Android — best-effort
- Не обещать: blur поверх произвольных native views без compositing; production-ready на всех Android

_Threading / `present()` / worklets — **не отдельный слайд в A**; перенесено в Block B (TypeGPU)._

---

### Block B — TypeGPU (1–2 slides + threading)

**B1 · Что это + зачем в экосистеме**

- Слой **DX поверх WebGPU**: TypeScript → WGSL (`'use gpu'`, `unplugin-typegpu`)
- **`@typegpu/react`**: `useRoot`, `useConfigureContext`, `useFrame`
- Пример «интересной штуки» поверх того же стека, что и Skia Graphite — но **другой API** (не SKSL, не часть Skia)
- Redraw / confetti — sibling libs на TypeGPU; **не в live demo**

**B2 · Threading + live demo preview** _(top-3 business pitch → один экран)_

- `context.present()`; GPU lane через **`runOnUI` + `installWebGPU`** vs default JS `useFrame`
- Stress test: shimmer/mini-chart (`'use gpu'`) vs **Reanimated baseline**; «Нагрузить JS»
- Pitch: custom viz + branded shimmer + perf under load — **один stress screen**
- Optional stretch: `FunctionVisualizer` patterns

---

### Block C — Skia Graphite `@next` (1 slide, slides only)

**Посыл:** популярная либа (**react-native-skia**) уже **переезжает на WebGPU** — тот же вектор, что и наш сегмент.

- Stable today: **Ganesh** (Metal / GL) — production Skia как все знают
- `@next`: **Graphite** backend → WebGPU (Dawn) — **highly experimental**, not for production
- Тот же `<Canvas>`, те же примитивы; меняется **бэкенд**, не React API
- Шейдеры = **SKSL** — не TypeGPU `'use gpu'`
- One-liner: «Skia идёт на WebGPU снизу; TypeGPU — шейдеры на TypeScript сверху того же стека»
- **No demo** — контекст + optional скрин из docs / Shopify article
- Redraw (optional): preview на TypeGPU, subscriber-only — одна строка или web screenshot

---

### Block D — Live demo + closing

**D1 · Демо-приложение** — **TypeGPU stress test only** (~3–5 min)

**D2 · Handoff** → **expo-observe** (партнёр)

---

### Assets (after WEBGPU-01)

| Asset                     | Source                                    |
| ------------------------- | ----------------------------------------- |
| Stress test screenshot    | WEBGPU-01                                 |
| Thread diagram (optional) | WEBGPU-02                                 |
| Redraw web screenshot     | wcandillon.github.io/redraw               |
| Skia Graphite             | optional — docs / Shopify article diagram |

### Legacy seeds (superseded by blocks above)

- Bullets: native build ✅, New Arch ✅, iOS primary ✅

---

## Artifacts in repo

| Artifact | Location                             | Status                                         |
| -------- | ------------------------------------ | ---------------------------------------------- |
| Research | This README — sections above         | WEBGPU-00 done                                 |
| Demo app | Repo root — `src/` FSD + Tamagui     | **WEBGPU-01 implemented** — awaiting device QA |
| Slides   | `slides/pages/04-webgpu.md` + `src:` | Inline stub — WEBGPU-02                        |

### Demo app layout

```text
src/
├── app/                 # Expo Router — index (stress test), triangle (smoke)
├── app-root/providers/  # AppProviders (GestureHandler, SafeArea, Tamagui)
├── screens/StressTestScreen/
├── features/typegpu/    # GpuLane, BaselineLane, TriangleSmoke, jsLoad
└── shared/ui/           # Button, Stacks, theme shorthands
```

### Runbook (iOS primary)

**Prerequisites:** Xcode, physical iOS device (stage target), Node 20+.

```bash
npm install --legacy-peer-deps   # SDK 56 peer resolution; see findings below
npx expo prebuild                # native module — not Expo Go
npm run ios                      # expo run:ios — pick physical device
```

**Rehearsal checklist:**

1. App opens to stress-test screen (GPU lane + baseline + «Нагрузить JS»).
2. In `__DEV__`, blue triangle smoke block visible at top; route `/triangle` also works.
3. Tap «Нагрузить JS» (~3 s) — baseline lane should jank; GPU lane should stay smoother.
4. If GPU init fails: inline error in GPU lane; baseline still runs (fallback per scope).

**Simulator:** allowed for dev; disable **Metal API Validation** in Xcode scheme (Edit Scheme → Diagnostics). Stage prefers physical device.

**Android:** best-effort — `npm run android` after prebuild; not a WEBGPU-01 blocker.

**Metro cache:** after babel / TypeGPU changes: `npm run start` (includes `-c` clear).

### WEBGPU-01 findings (implementation)

| Topic                      | Result                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expo SDK 56                | `expo@~56`; `expo install --fix` resolves **RN 0.85.3** (not 0.81.5 from research pins) — `react-native-wgpu` README floor ≥ 0.81 still satisfied |
| npm install                | `npm install --legacy-peer-deps` required when mixing Slidev + Expo 56 in one root `package.json`                                                 |
| `unplugin-typegpu`         | Latest on npm is **0.11.5** (not 0.11.8) — pinned in `package.json`                                                                               |
| Tamagui on SDK 56          | `@tamagui/config` v4 `defaultConfig` + `@tamagui/core` 1.135.2 — works; wallet custom fonts skipped; full style props used for strict TS          |
| GPU lane                   | TypeGPU `useRootWithStatus` + shimmer pipeline; render loop via `runOnUI` + `installWebGPU` + `requestAnimationFrame` on UI worklet               |
| Baseline                   | Reanimated `useSharedValue` updated from `setInterval` on **JS thread** — janks under `blockJsThread()`                                           |
| Triangle smoke             | Official blue triangle via `useFrame` (JS-thread rAF) — dev block + `/triangle` route                                                             |
| FunctionVisualizer stretch | **Deferred** — shimmer-only GPU viz for WEBGPU-01 time box                                                                                        |
| New Arch                   | `app.json` → `expo.newArchEnabled: true`                                                                                                          |

### Slide inputs (handoff → WEBGPU-02)

- Screenshot: stress screen with both lanes + «Нагрузить JS» (capture during/after JS load).
- Screenshot: blue triangle smoke (`/triangle` or `__DEV__` block).
- Narrative: GPU lane = `runOnUI` path; do **not** claim dedicated GPU OS thread.
- Honest limitation bullets: prebuild required, no Expo Go, iOS primary, SDK 56 bumped RN to 0.85.
- Optional: side-by-side video/GIF of baseline jank vs GPU lane under JS load (owner capture on device).
- Redraw / Skia Graphite / confetti: **absent** — slides-only context unchanged.

---

## Open questions

### Blockers for WEBGPU-01

_None — scope locked (Jun 2026)._

### Closed (resolved)

- ~~Devices~~ → **iOS primary**; Android best-effort (no dedicated spike)
- ~~Segment narrative + slide beats~~ → locked 2026-06-16
- ~~TypeGPU top-3 business pitch → demo~~ → single stress screen
- ~~Blur as WebGPU novelty~~ → context only; Skia today

- ~~Redraw~~ → **out** (no subscriber)
- ~~Confetti~~ → **out**
- ~~Expo SDK~~ → **56**
- ~~KEYFRAMER~~ → **N/A**
- ~~Standalone chart tab~~ → optional stretch on tab 1
- ~~Skia Graphite in demo~~ → slides only — [researched](#skia-graphite--next-not-a-typegpu-migration)
- ~~Exact package versions / New Arch~~ → [Version pins](#version-pins-proposed-for-typegpu-01)
- ~~Thread story~~ → [Thread story](#thread-story)
- ~~Fallback plan~~ → [Fallback plan](#fallback-plan)

### Deferred to WEBGPU-01 / 02

- Performance metrics for slides (frame time, thread diagram asset)
- Screenshot assets under `slides/assets/webgpu/`
- ~~Slide beat plan~~ → locked 2026-06-16; see [Slide beat plan](#slide-beat-plan-discussion--typegpu-02-only)
- ~~TypeGPU top-3 → demo~~ → [TypeGPU business use cases](#typegpu-business-use-cases-demo-mapping)

---

## Sources (verify via Context7 before implementation)

- https://docs.swmansion.com/TypeGPU/
- https://docs.swmansion.com/TypeGPU/integration/react-native/
- https://docs.swmansion.com/TypeGPU/ecosystem/typegpu-react/
- https://github.com/wcandillon/react-native-webgpu
- https://github.com/software-mansion/TypeGPU
- https://github.com/software-mansion-labs/typegpu-rn-examples
- https://github.com/software-mansion-labs/typegpu-confetti
- https://shopify.engineering/webgpu-skia-web-graphics
- https://shopify.github.io/react-native-skia/docs/getting-started/installation

---

## Tasks

| ID                        | Title                 | Status      | Notes                           |
| ------------------------- | --------------------- | ----------- | ------------------------------- |
| [WEBGPU-00](WEBGPU-00.md) | Research + scope lock | done        | Closed 2026-06-16               |
| [WEBGPU-01](WEBGPU-01.md) | Expo demo app         | awaiting QA | FSD + Tamagui; SDK 56 + RN 0.85 |
| [WEBGPU-02](WEBGPU-02.md) | Slide deck from demo  | open        | Blocked until 01                |

---

## Links

- [Talk outline](../../outline/README.md)
- [KEYFRAMER-02](../keyframer/KEYFRAMER-02.md) — optional keyframer paths in demo
