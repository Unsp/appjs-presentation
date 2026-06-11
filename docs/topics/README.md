# Topics (K segments)

Each in-scope talk segment is a **feature** with a main doc in its folder. Implementation tasks (`<ID>.md`) are created by the planner when work is scoped — not pre-seeded here.

Partner (M) segments: [outline](../outline/README.md) only.

| Talk slot | Feature | Main doc |
| --- | --- | --- |
| 2 | Radon IDE + rnrepo | [radon/README.md](radon/README.md) |
| 4 | TypeGPU + Redraw | [typegpu/README.md](typegpu/README.md) |
| 6 | keyframer.dev | [keyframer/README.md](keyframer/README.md) |

## Folder layout

```text
docs/topics/
  README.md           <- this index
  <feature>/
    README.md         <- feature source of truth (scope, narrative, demo plan)
    <ID>.md           <- tasks (planner creates when needed)
```

**Planner:** read feature `README.md` + [outline](../outline/README.md), then add task files and generate prompts (`generate prompt for <ID>`).
