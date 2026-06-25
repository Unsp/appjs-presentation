# Slidev syntax (read before editing)

**Canonical deck:** `slides.md` in this folder.

**Language:** on-slide copy and HTML comments (speaker notes) are **Russian** by default for the whole deck. Keep API/package names in English where conventional. Docs in `docs/` stay English.

## Slide separator

Use `---` on its own line between slides.

## Per-slide layout (center, cover, …)

Frontmatter must start **immediately** after `---` — no blank line between `---` and `layout:`:

```markdown
---
layout: center
---

# Title on centered slide
```

**Wrong** — blank line after `---` creates a separate slide with `layout: …` as visible text; image layouts will not apply:

```markdown
---
layout: center
---
```

**Do not run Markdown reformat on save** for `slides.md` — WebStorm/Prettier turns `layout:` into `## layout:` and breaks layouts. `slides/slides.md` is in `.prettierignore`.

**Images in presenter mode:** use `<img src="./assets/...">` (Vite resolves to absolute paths). Avoid `layout: image-right` with `image:` in frontmatter — CSS `url(./assets/...)` breaks on the `/presenter` route.

**Deck-wide content slides:** `layout: full` + `bg-[#1e1e1e]` + content in `rounded-xl bg-black/88 text-white shadow-2xl` cards. Screenshot slides use the Radon layout variants documented below.

**Portrait Radon panel:** text left + `object-contain` image right (`max-w-[58%]`). **Horizontal panel (Network):** `grid-rows-[auto_1fr]` — text block on top, wide screenshot anchored to bottom (`object-contain object-bottom`). **Wide 3-column (Debug):** full-bleed screenshot + text overlay `left-1/2 -translate-x-1/2 top-5` over code editor header — leaves debug panel and emulator visible.

**Wrong** — `## layout: center` is a markdown heading, not Slidev frontmatter:

```markdown
---

## layout: center

# Title
```

## Split segments via `src:`

Each talk segment belongs in **`slides/pages/<slot>-<feature>.md`**. The deck shell `slides.md` imports segments with Slidev `src:` — do not paste long segment bodies into `slides.md`.

| File                         | Segment                                  |
| ---------------------------- | ---------------------------------------- |
| `pages/02-radon-rnrepo.md`   | Radon + RNRepo (slot 2) — **wired**      |
| `pages/04-webgpu.md` | WebGPU (slot 4) — migrate from inline    |
| `pages/06-keyframer.md`      | keyframer (slot 6) — migrate from inline |

Import stub in `slides.md`:

```markdown
---
src: ./pages/02-radon-rnrepo.md
---

<!-- segment content lives in the page file -->
```

Paths in imported files are relative to that file — assets use `../assets/...`. Both `slides.md` and `slides/pages/` are in `.prettierignore`.
