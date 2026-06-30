# Presentation outline — goals and scope

High-level reference for the React Native / Expo talk. Detailed topic specs live in `docs/topics/`.

---

## Goals

1. **Showcase modern RN/Expo ecosystem tools** — libraries and workflows that improve DX, performance, or UI craft beyond “plain” React Native.
2. **Live-friendly delivery** — each segment should work on stage: short narrative, optional slide beats, and a demo or visual when it adds clarity.
3. **Pair presentation** — two speakers, alternating segments. Final deck and demo app combine both halves; this repo holds **Kirill’s segments only** until partner content is merged.
4. **Agent-ready backlog** — each K segment is a feature doc under `docs/topics/`; planner adds task specs when scoping work.

---

## Format

| Aspect        | Plan                                                                             |
| ------------- | -------------------------------------------------------------------------------- |
| Speakers      | 2 (pair talk)                                                                    |
| Stack         | React Native + Expo + TypeScript                                                 |
| Deliverables  | Shared slide narrative + unified demo app (when built)                           |
| This repo     | Kirill’s topics, speaker notes, demos, and integration hooks for partner content |
| Slides        | [Slidev](https://sli.dev/) — markdown in `slides/`, version-controlled           |
| Deck language | **Russian** — on-slide copy and speaker notes (default for entire presentation)  |

---

## Deck language

- **Slides and speaker notes:** Russian by default (`slides/slides.md`, `slides/pages/*`).
- **Repository docs** (`docs/`, task specs, `AGENTS.md`): English.
- **Agent–owner chat:** Russian.
- Technical identifiers on slides (package names, APIs, `Reanimated 4`) stay in English where conventional.

Partner M-segments follow the same deck language when merged unless agreed otherwise.

---

## Slide toolchain — Slidev

Slides live in the repo as Markdown (not PowerPoint / Google Slides).

```text
slides/
  slides.md                 # deck shell: frontmatter, intro, src: imports, closing
  SLIDEV.md                 # syntax pitfalls — read before editing
  pages/                    # one file per talk segment (K topics + partner M later)
  assets/                   # images per segment (e.g. assets/radon/)
```

**Per-topic segments:** each K (and later M) block lives in `slides/pages/<slot>-<feature>.md` and is pulled into the deck via Slidev `src:` from `slides.md`. Edit the **page file** for segment content; edit `slides.md` only for shell + import stub.

| Deck # | Segment file                 | In deck                                                                      |
| ------ | ---------------------------- | ---------------------------------------------------------------------------- |
| 1      | `pages/02-radon-rnrepo.md`   | imported (`src:`)                                                            |
| 2      | `pages/01-legend-state.md`   | imported (`src:`) — partner                                                  |
| 3      | `pages/04-webgpu.md`         | imported (`src:`) — [WEBGPU-02](../topics/webgpu/WEBGPU-02.md) awaiting QA   |
| 4      | `pages/03-react-teleport.md` | placeholder — partner                                                        |
| 5      | `pages/06-keyframer.md`      | imported (`src:`) — [KEYFRAMER-01](../topics/keyframer/KEYFRAMER-01.md) done |

_File prefixes (`02-`, `04-`, …) are historical; **deck order** is 1→5 above._

See [slides/SLIDEV.md](../../slides/SLIDEV.md) for `src:` syntax and asset paths (`../assets/...` from page files).

Commands:

```bash
npm install
npm run slides              # dev server + browser
npm run slides:export       # PDF backup
```

Presenter mode: `http://localhost:3030/presenter` (speaker notes in HTML comments).

---

## Full talk order (agreed sequence — owner 2026-06)

**Five segments.** **expo-observe** dropped. **K** = Kirill (in scope for this repo). **M** = partner.

| #   | Topic                                   | Owner | In this repo                         |
| --- | --------------------------------------- | ----- | ------------------------------------ |
| 1   | Radon + RNRepo                          | K     | **Yes**                              |
| 2   | Legend State                            | M     | Wired (`01-legend-state.md`)         |
| 3   | WebGPU in React Native                  | K     | **Yes**                              |
| 4   | react-teleport                          | M     | Placeholder (`03-react-teleport.md`) |
| 5   | [keyframer.dev](https://keyframer.dev/) | K     | **Yes**                              |

**Handoff chain:** Radon → Legend State → WebGPU → react-teleport → keyframer → Q&A.

---

## In-scope topics (K)

Each segment has a **feature doc** under `docs/topics/<feature>/README.md`. Scoped **tasks** (`<ID>.md`) are created by the planner when breaking down work.

| Deck # | Feature                | Doc                                                  | Demo weight         |
| ------ | ---------------------- | ---------------------------------------------------- | ------------------- |
| 1      | Radon + RNRepo         | [radon/README.md](../topics/radon/README.md)         | Light               |
| 3      | WebGPU in React Native | [webgpu/README.md](../topics/webgpu/README.md)       | **Heavy**           |
| 5      | keyframer.dev          | [keyframer/README.md](../topics/keyframer/README.md) | Light (slides only) |

---

## Partner content (M) — integration later

Not implemented here. Track for merge planning:

| Topic          | Owner | Expected from partner                       |
| -------------- | ----- | ------------------------------------------- |
| Legend State   | M     | Slides — `01-legend-state.md` wired         |
| react-teleport | M     | Slides — `03-react-teleport.md` placeholder |

**Dropped:** expo-observe — not in talk order (owner 2026-06).

**Integration checklist (when partner material arrives):**

1. Agree single demo app entry and segment routing (one Expo app, five chapters or equivalent).
2. Drop partner assets into agreed paths (`slides/`, `src/segments/m/`, etc.) — paths TBD when repo structure is bootstrapped.
3. Reconcile talk timing and transitions between K and M blocks.
4. Full dry-run: order 1 → 5 without handoff gaps.

Until then, K segments should not block on M content but should **avoid hard dependencies** on partner modules.

---

## Success criteria (talk-level)

- [ ] All five segments fit total time budget (set duration when rehearsed).
- [ ] K segments: technically accurate (Context7 / official docs verified), demo path rehearsed.
- [ ] M segments: integrated without breaking K demos.
- [ ] One coherent story from “state & architecture” through “animation craft” — not six disconnected product pitches.

---

## Next steps

1. Set time budget per segment and total talk length.
2. Planner: break features into tasks in `docs/topics/<feature>/<ID>.md` when ready to implement.
3. Fill slide content in `slides/pages/<slot>-<feature>.md`; wire via `src:` in `slides/slides.md` (see `slides/SLIDEV.md`).
4. Bootstrap Expo demo app — [WEBGPU-00](../topics/webgpu/WEBGPU-00.md) then [WEBGPU-01](../topics/webgpu/WEBGPU-01.md); slides after demo ([WEBGPU-02](../topics/webgpu/WEBGPU-02.md)).
5. Partner: confirm delivery format and timeline for M segments.
6. **Last (slides):** [DECK-02](DECK-02.md) — cross-topic polish (shell, handoffs, M placeholders, visual coherence) after K segment slides stable. [DECK-01](DECK-01.md) — shell-only subset.
