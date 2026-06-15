# KEYFRAMER-01 — keyframer slide deck (slides only)

**Status:** done  
**Feature:** [docs/topics/keyframer/README.md](README.md)  
**Outline:** [docs/outline/README.md](../../outline/README.md) — talk slot 6  
**Depends on:** [KEYFRAMER-00](KEYFRAMER-00.md) — editor screenshots in `slides/assets/keyframer/`  
**Related docs:** [slides/SLIDEV.md](../../../slides/SLIDEV.md), [slides/pages/02-radon-rnrepo.md](../../../slides/pages/02-radon-rnrepo.md) (layout reference)

## Source links (mandatory re-read)

| Source              | Link / key                                                      | What to verify                 |
| ------------------- | --------------------------------------------------------------- | ------------------------------ |
| keyframer.dev       | https://keyframer.dev/                                          | Positioning, alpha status      |
| keyframer changelog | https://keyframer.dev/changelog                                 | Timeline vs graph capabilities |
| Reanimated 4        | Context7 or https://docs.swmansion.com/react-native-reanimated/ | New Architecture for footnote  |
| Limitations         | `docs/topics/keyframer/README.md`                               | Alpha table — use on slides    |
| Slidev              | `slides/SLIDEV.md`                                              | `src:`, layouts, RU default    |

## Goal

Move keyframer segment into `slides/pages/06-keyframer.md`, wire via `src:`, implement **slides-only** narrative. Three committed editor screenshots (timeline, graph, export) — **no Figma asset**.

Content-only: no `src/` demo app.

## Acceptance (manual / QA)

| #   | Scenario               | Expected                                                                                  |
| --- | ---------------------- | ----------------------------------------------------------------------------------------- |
| 1   | `npm run slides:build` | Completes without errors                                                                  |
| 2   | `src:` import          | Inline keyframer block removed from `slides/slides.md`; imports `./pages/06-keyframer.md` |
| 3   | Language               | On-slide copy and speaker notes in **Russian**                                            |
| 4   | Slides only            | **No** live demo steps                                                                    |
| 5   | No Figma slide         | **No** `figma.png`; Currency mention text-only one-liner if used                          |
| 6   | Timeline               | `../assets/keyframer/editor-timeline.png` — project «Lively Flicker», keyframes           |
| 7   | Graph                  | `../assets/keyframer/editor-graph.png` — «Drag to Move» node graph                        |
| 8   | Export                 | `../assets/keyframer/editor-export.png` — Generated Code panel                            |
| 9   | Alpha honesty          | Limitations slide: tool raw; timeline vs springs                                          |
| 10  | Not Lottie             | Reanimated / worklets output stated                                                       |
| 11  | Reanimated 4           | **Reanimated 4** + **New Architecture** footnote                                          |
| 12  | Layout                 | Radon-style `layout: full` dark cards per `SLIDEV.md`                                     |
| 13  | Timing                 | Speaker notes ~5–7 min; no live budget                                                    |
| 14  | Deck regression        | Radon, TypeGPU inline, «Вопросы?» shell unchanged                                         |

## Already OK (must not break)

- Deck frontmatter in `slides/slides.md`.
- Radon `src:` import; TypeGPU inline block; closing «Вопросы?» slide.
- Asset PNGs: do not modify files in `slides/assets/keyframer/`.
- No `src/` demo app changes.

## Implementation plan

### 1. `src:` migration

Replace inline keyframer in `slides/slides.md` (through «Демо · keyframer», before «Вопросы?») with `src: ./pages/06-keyframer.md` stub.

### 2. Slide sequence (Russian)

1. **Opener** — keyframer.dev · сегмент 6 · handoff дизайнер ↔ разработчик
2. **Hook** — motion из дизайна ≠ готовый Reanimated-код
3. **Проблема** — handoff pain; optional one-liner: Currency wallet, руками в прошлый раз (**без** Figma-скрина)
4. **Timeline** — `editor-timeline.png` + bullets: keyframes, easing, tracks
5. **Graph** — `editor-graph.png` + bullets: Pan Gesture → position → Animated Style; Alpha
6. **Export** — `editor-export.png` + bullets: worklets, `useAnimatedStyle`, Copy в проект
7. **Limitations / alpha** — bullets из README
8. **Reanimated 4** — New Architecture
9. **Closing** — когда tool созреет; сегодня alpha

### 3. Assets (ready)

```text
slides/assets/keyframer/
  editor-timeline.png   # Timeline tab, Lively Flicker
  editor-graph.png      # Node Graph, Drag to Move
  editor-export.png     # Generated Code panel
```

### 4. Feature doc

Update README Artifacts when complete.

## Presentation notes

- Narrator walks slides only.
- Demo project on screenshots: **Lively Flicker** (generic, not Currency).
- Internal audience.

## Notes for the agent prompt

- **No Figma** image or slide.
- Post Source verification in Russian before edit.
- Status → `awaiting QA` after build.

## Related files

- `slides/pages/06-keyframer.md`
- `slides/slides.md`
- `slides/assets/keyframer/*.png`
- `docs/topics/keyframer/README.md`

## Tests

- `npm run slides:build`
- Presenter mode walkthrough segment 6

## Links

- [Feature doc](README.md)
- [KEYFRAMER-00](KEYFRAMER-00.md)
