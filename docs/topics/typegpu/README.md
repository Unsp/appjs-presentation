# TypeGPU + Redraw

**Talk slot:** 4 (after react-teleport, partner)  
**Owner:** K  
**Demo weight:** heavy — core technical showcase

## Audience takeaway

GPU is becoming practical for **business UI** — blur, rich animations, and effects that used to be too janky on the JS/UI thread — with TypeScript shaders and a dedicated GPU thread in recent TypeGPU.

## What to cover

### Why GPU for business apps

Not games — product UI that must stay smooth:

- Frosted panels, performant blur / backdrop
- Animated charts, scroll-linked effects
- Micro-interactions at 60fps under lists, modals, tabs

### TypeGPU (main focus)

- **Dedicated GPU thread** in recent versions (vs overloading JS + UI thread)
- **Shaders in TypeScript** — lower barrier without GLSL specialists; maintainable in RN codebase
- What is realistic in production vs experimental

### Redraw (exploratory)

- Experimental sibling package in the same family
- Include only if evaluation finds something demo-worthy
- Do not over-promise — “what we found worth trying”

## Demo plan

- **Substantial Expo demo app** required
- Multiple screens or toggles: GPU effect vs non-GPU baseline
- Target: one “business screen” mock (e.g. modal with blur + chart animation)
- Runnable on device during talk; document fallback if GPU path fails

## Artifacts in repo

| Artifact | Location |
| --- | --- |
| Slides (stub) | `slides/slides.md` — TypeGPU section |
| Demo app | `src/` (to be created) |

## Open questions

- Exact TypeGPU version and GPU-thread API to demo
- Redraw: keep or cut after evaluation
- Fallback UI (simulator vs physical device)
- Performance story: frame time, thread model diagram

## Sources (verify via Context7 before implementation)

- TypeGPU — GPU thread, RN integration, TS shader API
- Redraw — package repo, experimental status
- React Native — thread / performance context for narrative

## Tasks

None yet. Planner creates scoped task files in this folder (e.g. `TYPEGPU-01.md`) when breaking down work.
