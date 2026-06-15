# TYPEGPU-00 — Research: TypeGPU + Redraw feasibility for talk

**Status:** open  
**Feature:** [docs/topics/typegpu/README.md](README.md)  
**Outline:** [docs/outline/README.md](../../outline/README.md) — talk slot 4  
**Blocks:** [TYPEGPU-01](TYPEGPU-01.md) (Expo demo), [TYPEGPU-02](TYPEGPU-02.md) (slides)  
**Related:** [KEYFRAMER-02](../keyframer/KEYFRAMER-02.md) (cancelled — Expo bootstrap moves here)

## Source links (mandatory re-read)

| Source            | Link / key                                                   | What to verify                                                            |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| TypeGPU docs      | https://docs.swmansion.com/TypeGPU/                          | Positioning, RN path, type-safe shaders                                   |
| RN integration    | https://docs.swmansion.com/TypeGPU/integration/react-native/ | Install stack, Expo Go vs prebuild, triangle smoke test                   |
| @typegpu/react    | https://docs.swmansion.com/TypeGPU/ecosystem/typegpu-react/  | Hooks: `useRoot`, `useFrame`, `useConfigureContext`, uniforms             |
| react-native-wgpu | https://github.com/wcandillon/react-native-webgpu            | RN version floor, New Architecture, Reanimated/worklets integration       |
| TypeGPU GitHub    | https://github.com/software-mansion/TypeGPU                  | Package monorepo, ecosystem packages                                      |
| RN examples       | https://github.com/software-mansion-labs/typegpu-rn-examples | Runnable patterns to borrow (not copy wholesale)                          |
| Redraw            | https://wcandillon.github.io/redraw/                         | 2D vector GPU effects — demo-worthy for business UI?                      |
| App.js 2025 talk  | https://www.youtube.com/watch?v=QlOnC3JOjnE                  | Thread / worklets narrative (may be outdated vs current docs — reconcile) |
| Context7          | TypeGPU + react-native-wgpu                                  | Current install steps, deprecations                                       |

## Goal

**Research and scope lock only** — no `src/` bootstrap, no slide edits.

Produce an owner-reviewable feasibility report: what is realistically demoable on stage for a **business UI** segment (blur, frosted panels, scroll-linked micro-interactions), what is experimental, and whether **Redraw** earns a slide beat or should be cut.

Output lives in `docs/topics/typegpu/README.md` (Research findings + Demo scope decision sections). Owner confirms scope in chat before TYPEGPU-01 starts.

## Acceptance (manual / QA)

| #   | Scenario            | Expected                                                                                          |
| --- | ------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | Sources re-read     | Context7 + all URLs above opened; conflicts noted                                                 |
| 2   | Feasibility matrix  | README table: capability vs RN today vs talk-ready vs risk (Expo Go, device, New Arch)            |
| 3   | Thread story        | Plain-language CPU/GPU/worklets model aligned with **current** docs (not stale PoC-only APIs)     |
| 4   | Redraw decision     | Explicit **include** or **cut** with rationale — no “maybe” left for TYPEGPU-01                   |
| 5   | Demo scope proposal | One recommended “business screen” mock + optional second beat; GPU vs baseline toggle             |
| 6   | Version pins        | Proposed Expo SDK, `react-native-wgpu`, `typegpu`, `@typegpu/react`, Reanimated/worklets versions |
| 7   | Fallback plan       | Simulator vs physical device; what to show if GPU path fails on stage                             |
| 8   | Out of scope list   | What **not** to promise on slides (games, full Skia replacement, etc.)                            |
| 9   | KEYFRAMER handoff   | Note whether keyframer export screen fits TYPEGPU-01 or stays post-talk (see KEYFRAMER-02)        |
| 10  | No code             | No `src/`, no `slides/pages/` edits in this task                                                  |
| 11  | Owner gate          | Agent posts report in Russian; owner replies with approved scope before TYPEGPU-01                |

## Already OK (must not break)

- Inline TypeGPU stub in `slides/slides.md` — unchanged.
- Radon and keyframer `src:` imports — unchanged.
- `slides/assets/` — no new assets required in 00.

## Implementation plan

### 1. Source verification (chat, Russian)

Post **Source verification** before writing README sections.

### 2. Research checklist

- Install requirements: prebuild, babel/unplugin-typegpu, New Architecture.
- Expo Go: supported or not (document official stance).
- Minimal smoke path: blue triangle or equivalent from official RN guide.
- Ecosystem packages worth evaluating: `typegpu-confetti`, compute examples, Redraw frosted-glass sample.
- Compare “dedicated GPU thread” marketing vs actual integration (`useFrame`, worklets, UI thread) — cite docs.
- Review `typegpu-rn-examples` for patterns close to talk narrative.

### 3. Write README sections

Add or update in feature README:

- **Research findings** — dated summary + feasibility matrix.
- **Demo scope decision** — owner-approved target (placeholder until owner confirms).
- **Open questions** — move resolved items to Closed; leave only blockers for 01.

### 4. Owner discussion

End with a short **recommended scope** bullet list and ask owner to confirm or adjust. Do not mark task `done` until owner approves scope text in README.

## Presentation notes

- This task is **planner + owner alignment**, not implementation.
- Prefer honest “alpha / prebuild required” over aspirational App.js 2025 thread claims if docs moved on.
- Business UI angle: frosted modal, chart animation, confetti — rank by rehearsal effort vs wow factor.

## Notes for the agent prompt

- **No implementation** — documentation and chat report only.
- If Redraw docs are thin vs TypeGPU, say so; default recommendation is **cut Redraw** unless one example is clearly talk-ready in &lt;1 day integration.
- Post Source verification in Russian before editing README.

## Related files

- `docs/topics/typegpu/README.md` — primary deliverable
- `docs/outline/README.md` — slot 4 timing context

## Tests

- Manual: owner reads README sections and confirms scope in chat
- No `npm run slides:build` required

## Links

- [Feature doc](README.md)
- [Talk outline](../../outline/README.md)
