# Slidev syntax (read before editing)

**Canonical deck:** `slides.md` in this folder.

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

## Do not use `src:` imports yet

Split files under `pages/` are drafts only. Edit `slides.md` directly until we add a safe import setup.
