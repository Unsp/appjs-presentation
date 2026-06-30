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

## Full-bleed dark canvas (deck-wide)

**Goal:** no light gray Slidev default theme showing as a margin/halo around slide content on projector.

**Deck frontmatter** (`slides.md`):

```yaml
background: "#1e1e1e"
```

**Per-slide pattern** — `layout: full` + full-size root, padding on content inside.

**Text-only slides** (no screenshot) — content directly on deck background, no card wrapper:

```html
<div
  class="flex flex-col justify-center w-full h-full p-8 box-border max-w-2xl leading-snug"
>
  <h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Заголовок</h2>
  <ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
    <li>Пункт</li>
  </ul>
</div>
```

**Full-bleed screenshot** (text overlay on the image) — semi-transparent card for readability:

```html
<img
  src="../assets/..."
  class="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] rounded-lg object-cover object-center"
  alt=""
/>
<div
  class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[44%] max-w-xl p-5 rounded-xl bg-black/88 text-white shadow-2xl leading-snug"
>
  <!-- text on screenshot -->
</div>
```

**Portrait panel** (text left on deck canvas, screenshot right) — no card:

```html
<div
  class="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-[36%] max-w-md p-5 leading-snug"
>
  <h2 class="!text-white !mt-0 !mb-3 text-xl font-bold">Заголовок</h2>
  <ul class="!text-white text-sm space-y-2 list-disc pl-4 m-0">
    <li>Пункт</li>
  </ul>
</div>
<img
  src="../assets/..."
  class="absolute right-4 top-1/2 -translate-y-1/2 max-h-[calc(100%-2rem)] w-auto max-w-[58%] object-contain rounded-lg"
  alt=""
/>
```

**Text over busy screenshot** (full-bleed image, overlay on code/UI) — optional semi-transparent card for readability only when text sits on the image:

```html
<div
  class="absolute left-1/2 -translate-x-1/2 top-5 z-10 w-[40%] max-w-lg px-4 py-4 rounded-xl bg-black/88 text-white shadow-2xl leading-snug"
>
  <!-- text on screenshot -->
</div>
```

**Anti-pattern** — black card on plain text slides (unnecessary box on dark canvas):

```html
<!-- Wrong -->
<div class="max-w-2xl p-6 rounded-xl bg-black/88 text-white shadow-2xl">
  ...
</div>
```

**Anti-pattern** — nested inner `bg-[#1e1e1e]` with outer `p-8` exposes the default light theme in the padding band:

```html
<!-- Wrong: gray halo around dark inner box -->
<div class="w-full h-full p-8 box-border bg-[#1e1e1e]">...</div>
```

Prefer deck-level `background` + `w-full h-full` root without a separate canvas `bg-[#1e1e1e]` on wrappers.

**Screenshot slides** use the Radon layout variants documented below — preserve overlay positions and card classes; only fix slide canvas (deck background + root `w-full h-full`).

**Portrait Radon panel:** text left + `object-contain` image right (`max-w-[58%]`). **Horizontal panel (Network):** `grid-rows-[auto_1fr]` — text block on top, wide screenshot anchored to bottom (`object-contain object-bottom`). **Wide 3-column (Debug):** full-bleed screenshot + text overlay `left-1/2 -translate-x-1/2 top-5` over code editor header — leaves debug panel and emulator visible.

**Wrong** — `## layout: center` is a markdown heading, not Slidev frontmatter:

```markdown
---

## layout: center

# Title
```

## Split segments via `src:`

Each talk segment belongs in **`slides/pages/<slot>-<feature>.md`**. The deck shell `slides.md` imports segments with Slidev `src:` — do not paste long segment bodies into `slides.md`.

| File                         | Segment                                |
| ---------------------------- | -------------------------------------- |
| `pages/02-radon-rnrepo.md`   | Radon + RNRepo (deck #1) — **wired**   |
| `pages/01-legend-state.md`   | Legend State (deck #2) — partner       |
| `pages/04-webgpu.md`         | WebGPU (deck #3) — **wired**           |
| `pages/03-react-teleport.md` | react-teleport (deck #4) — placeholder |
| `pages/06-keyframer.md`      | keyframer (deck #5) — **wired**        |

Import stub in `slides.md`:

```markdown
---
src: ./pages/02-radon-rnrepo.md
---

<!-- segment content lives in the page file -->
```

Paths in imported files are relative to that file — assets use `../assets/...`. Both `slides.md` and `slides/pages/` are in `.prettierignore`.
