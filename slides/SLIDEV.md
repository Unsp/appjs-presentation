# Slidev syntax (read before editing)

**Canonical deck:** `slides.md` in this folder.

## Slide separator

Use `---` on its own line between slides.

## Per-slide layout (center, cover, …)

Frontmatter must start **immediately** after `---` — no blank line, no extra `---` before it:

```markdown
---
layout: center
---

# Title on centered slide
```

**Wrong** — renders `layout: center` as visible text:

```markdown
---
layout: center
---
```

## Do not use `src:` imports yet

Split files under `pages/` are drafts only. Edit `slides.md` directly until we add a safe import setup.
