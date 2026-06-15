# app-js-presentation

Technical presentation about React Native and Expo ecosystem tools. Pair talk — this repo holds Kirill's segments (K), slides, and (later) demo app.

**Outline:** [docs/outline/README.md](docs/outline/README.md)  
**Topics:** [docs/topics/README.md](docs/topics/README.md) — feature docs; tasks added by planner  
**Agent workflow:** [AGENTS.md](AGENTS.md)

## Slides (Slidev)

```bash
npm install
npm run slides
```

- Dev server: http://localhost:3030
- Presenter mode: http://localhost:3030/presenter
- Export PDF: `npm run slides:export`

Slide source: `slides/slides.md` (shell) + `slides/pages/<slot>-<feature>.md` per segment — see `slides/SLIDEV.md`.
