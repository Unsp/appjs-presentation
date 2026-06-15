# TYPEGPU-01 — Expo demo app (TypeGPU segment)

**Status:** open  
**Feature:** [docs/topics/typegpu/README.md](README.md)  
**Outline:** [docs/outline/README.md](../../outline/README.md) — talk slot 4  
**Depends on:** [TYPEGPU-00](TYPEGPU-00.md) — owner-approved demo scope in README  
**Blocks:** [TYPEGPU-02](TYPEGPU-02.md) (slides)  
**Related:** [KEYFRAMER-02](../keyframer/KEYFRAMER-02.md) (optional keyframer screen — only if 00 approves)

## Source links (mandatory re-read)

| Source              | Link / key                                                   | What to verify                             |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| Approved scope      | `docs/topics/typegpu/README.md` — **Demo scope decision**    | Exact beats, Redraw in/out, version pins   |
| RN integration      | https://docs.swmansion.com/TypeGPU/integration/react-native/ | Install, babel plugin, triangle example    |
| @typegpu/react      | https://docs.swmansion.com/TypeGPU/ecosystem/typegpu-react/  | Hooks used in demo components              |
| react-native-wgpu   | https://github.com/wcandillon/react-native-webgpu            | Canvas, `present()`, worklets if used      |
| typegpu-rn-examples | https://github.com/software-mansion-labs/typegpu-rn-examples | Reference implementations                  |
| Redraw              | https://wcandillon.github.io/redraw/                         | Only if TYPEGPU-00 approved Redraw beat    |
| Expo + New Arch     | Context7 Expo docs                                           | SDK version matching 00 pins               |
| Context7            | typegpu, react-native-wgpu, expo                             | Fresh install steps at implementation time |

## Goal

Bootstrap the **first Expo demo app** in this repo under `src/` and implement the owner-approved scope from TYPEGPU-00.

Deliver a runnable app for rehearsal: at least one **business UI** screen with **GPU path vs baseline** comparison (toggle or side-by-side). Document run instructions (prebuild, device vs simulator) and stage fallback in README.

Slides are **out of scope** — TYPEGPU-02 consumes demo results.

## Acceptance (manual / QA)

| #   | Scenario           | Expected                                                                                               |
| --- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| 1   | Scope match        | Demo matches **Demo scope decision** in feature README — no scope creep                                |
| 2   | Bootstrap          | `src/` Expo app created; root `package.json` scripts extended if needed (`lint`, `typecheck`, `start`) |
| 3   | TypeGPU path       | At least one effect runs via `react-native-wgpu` + TypeGPU stack per official RN guide                 |
| 4   | Baseline           | Non-GPU or JS-thread fallback visible for comparison on same screen                                    |
| 5   | Redraw             | Present **only** if TYPEGPU-00 said include; otherwise no Redraw dependency                            |
| 6   | New Architecture   | Config matches TYPEGPU-00 version pins; prebuild documented                                            |
| 7   | Expo Go            | README states Expo Go limitation if still true — no false “works in Go”                                |
| 8   | Runbook            | README section: install, prebuild, run on device, rehearsal checklist                                  |
| 9   | Fallback           | Documented degraded path if GPU init fails (message UI or skip to baseline)                            |
| 10  | KEYFRAMER optional | If 00 included keyframer screen: paths per KEYFRAMER-02 conventions under `src/animations/keyframer/`  |
| 11  | Quality            | `npm run lint` and `npm run typecheck` pass when scripts exist                                         |
| 12  | Slides untouched   | Inline TypeGPU block in `slides/slides.md` unchanged                                                   |

## Already OK (must not break)

- Slide deck: Radon + keyframer `src:` imports, talk order, «Вопросы?» closing.
- `slides/pages/04-typegpu-redraw.md` — do not create or edit (TYPEGPU-02).
- Feature README research sections from TYPEGPU-00 — extend, do not delete findings.

## Implementation plan

### 1. Preconditions

Do not start until TYPEGPU-00 is **done** and **Demo scope decision** is owner-approved in README.

### 2. Repo layout (suggested)

```text
src/                          # Expo app root (or app/ — pick one, document in README)
  app/ or screens/            # segment routing — TypeGPU chapter entry
  components/typegpu/         # GPU + baseline pairs
  animations/keyframer/       # optional — if in approved scope
package.json                  # workspace scripts at repo root if monorepo-style
```

Keep structure minimal and readable on projector — not production app scale.

### 3. Demo content (default if 00 silent — ask owner)

Align with feature README demo plan unless 00 overrides:

- One mock “business screen” (e.g. modal with frosted blur + simple animated chart or confetti burst).
- Toggle or tabs: **GPU on / baseline**.
- Stage time target: ~3–5 min live segment within ~8–12 min total K block (speaker notes in README, not slides yet).

### 4. Documentation sync

Update `docs/topics/typegpu/README.md`:

- **Artifacts:** demo app path, run commands, known device quirks.
- **Demo scope decision:** mark implemented vs deferred items.
- Capture **what worked / what failed** — feeds TYPEGPU-02 slide copy.

### 5. Handoff to TYPEGPU-02

Leave a short **Slide inputs** bullet list in README: screenshot candidates, metrics (if measured), honest limitations discovered during build.

## Presentation notes

- Heavy segment — demo is the proof; slides come after.
- Rehearse on **physical device** if docs require it; note GPU behavior on simulator in README.
- Do not oversell thread model — use wording validated in TYPEGPU-00.

## Notes for the agent prompt

- Read approved scope in README first — it overrides generic demo plan in this file.
- Post Source verification in Russian before first `src/` edit.
- Status → `awaiting QA` after lint/typecheck + owner device smoke.

## Related files

- `src/**` — created in this task
- `package.json` — scripts
- `docs/topics/typegpu/README.md` — runbook + slide inputs

## Tests

- `npm run lint` / `npm run typecheck` — when added
- Manual: owner runs app on device per runbook

## Links

- [TYPEGPU-00](TYPEGPU-00.md)
- [Feature doc](README.md)
