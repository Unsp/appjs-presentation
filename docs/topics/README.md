# Topics (K segments)

Each in-scope talk segment is a **feature** with a main doc in its folder. Implementation tasks (`<ID>.md`) are created by the planner when work is scoped — not pre-seeded here.

Partner (M) segments: [outline](../outline/README.md) only.

| Deck # | Feature                | Main doc                                   | Slide segment                     |
| ------ | ---------------------- | ------------------------------------------ | --------------------------------- |
| 1      | Radon + RNRepo         | [radon/README.md](radon/README.md)         | `slides/pages/02-radon-rnrepo.md` |
| 3      | WebGPU in React Native | [webgpu/README.md](webgpu/README.md)       | `slides/pages/04-webgpu.md`       |
| 5      | keyframer.dev          | [keyframer/README.md](keyframer/README.md) | `slides/pages/06-keyframer.md`    |

Deck shell and `src:` imports: `slides/slides.md`. Rules: [slides/SLIDEV.md](../../slides/SLIDEV.md).

## Folder layout

```text
docs/topics/
  README.md           <- this index
  <feature>/
    README.md         <- feature source of truth (scope, narrative, demo plan)
    <ID>.md           <- tasks (planner creates when needed)
```

**Planner:** read feature `README.md` + [outline](../outline/README.md), then add task files and generate prompts (`generate prompt for <ID>`).

**keyframer:** done (00 + 01); [KEYFRAMER-02](keyframer/KEYFRAMER-02.md) cancelled — Expo deferred to WebGPU segment

**WebGPU:** [WEBGPU-00](webgpu/WEBGPU-00.md) done → [WEBGPU-01](webgpu/WEBGPU-01.md) done → [WEBGPU-02](webgpu/WEBGPU-02.md) awaiting QA

**After K segment slides:** [DECK-01](../outline/DECK-01.md) (shell + full-bleed dark canvas) → [DECK-02](../outline/DECK-02.md) (handoffs + cross-topic polish).
