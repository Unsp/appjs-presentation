# TypeGPU + Redraw

Segment 4 · GPU for business UI

---

## Why GPU in business apps

Not games — product UI that must stay smooth:

- Frosted panels & **performant blur**
- Rich micro-interactions under lists, modals, tabs
- Scroll-linked effects, animated charts
- Effects that used to jank on **JS / UI thread**

---

## TypeGPU — dedicated GPU thread

Recent versions: work on a **dedicated GPU thread**

- Contrast with the old model (everything on JS + UI)
- **Shaders in TypeScript** — no GLSL-only team required
- Maintainable in a TS / React Native codebase

<!--
TODO: verify exact API + version via Context7 before final slides
-->

---

## Redraw (experimental)

Sibling package — exploratory:

- Scan for useful APIs / sample effects
- Show only what survives evaluation
- Do not over-promise

---

## Demo app

**Heavy segment** — switch to Expo demo:

- GPU blur / animation vs non-GPU baseline
- One “business screen” mock (modal + chart?)
- Fallback if GPU path fails on device

Hand off → **expo-observe** (partner)
