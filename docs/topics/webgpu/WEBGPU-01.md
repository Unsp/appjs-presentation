# WEBGPU-01 — Expo demo app (WebGPU segment)

**Status:** done  
**Closed:** 2026-06-18 (owner QA — video shader demo ready)  
**Feature:** [docs/topics/webgpu/README.md](README.md)  
**Outline:** [docs/outline/README.md](../../outline/README.md) — talk slot 4  
**Depends on:** [WEBGPU-00](WEBGPU-00.md) — owner-approved demo scope in README  
**Blocks:** [WEBGPU-02](WEBGPU-02.md) (slides)  
**Related:** [KEYFRAMER-02](../keyframer/KEYFRAMER-02.md) — N/A (no keyframer screen)

## Source links (mandatory re-read)

| Source              | Link / key                                                                                    | What to verify                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Approved scope      | `docs/topics/webgpu/README.md` — **Demo scope decision**                                      | Exact beats, Redraw in/out, version pins                                       |
| RN integration      | https://docs.swmansion.com/TypeGPU/integration/react-native/                                  | Install, babel plugin, triangle example                                        |
| @typegpu/react      | https://docs.swmansion.com/TypeGPU/ecosystem/typegpu-react/                                   | Hooks used in demo components                                                  |
| react-native-wgpu   | https://github.com/wcandillon/react-native-webgpu                                             | Canvas, `present()`, worklets if used                                          |
| typegpu-rn-examples | https://github.com/software-mansion-labs/typegpu-rn-examples                                  | Reference implementations                                                      |
| Redraw              | —                                                                                             | **Out** — slides only                                                          |
| Expo + New Arch     | Context7 Expo docs                                                                            | SDK version matching 00 pins                                                   |
| Context7            | typegpu, react-native-wgpu, expo                                                              | Fresh install steps at implementation time                                     |
| Reference project   | `cx-mobile-app-wallet` — see [Reference bootstrap](#reference-bootstrap-cx-mobile-app-wallet) | FSD + Tamagui layout; **read only**, copy patterns in WEBGPU-01 implementation |

## Goal

Bootstrap the **first Expo demo app** at **repo root** (standard `create-expo-app` layout) and ship a **TypeGPU live demo** for talk slot 4.

**Delivered (owner, 2026-06-18):** fullscreen **video shader** — `importExternalTexture` + fragment grade/effects + glass UI in one pass (`VideoEffectCanvas`). Original WEBGPU-00 stress-test pitch deferred; video case study better fits `'use gpu'` + `texture_external` narrative on slides.

**Layout decision (owner, 2026-06-16):** Expo at root — **no conflict with slides** (`slides/` is isolated; separate npm scripts). Do **not** nest demo under `slides/`.

## Acceptance (manual / QA)

| #   | Scenario         | Expected                                                                                                           | Status                                      |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| 1   | Scope match      | Demo matches **Demo scope decision** in feature README — no scope creep                                            | OK                                          |
| 2   | Bootstrap        | Expo at **repo root**; extend root `package.json` with `start`, `lint`, `typecheck`, `ios`, etc.                   | OK                                          |
| 3   | TypeGPU path     | At least one effect runs via `react-native-wgpu` + TypeGPU stack per official RN guide                             | OK — video shader + `importExternalTexture` |
| 4   | Live viz         | Programmable GPU effect visible on device (not stock RN views only)                                                | OK — grade / toggles / glass UI in shader   |
| 5   | Redraw           | **Absent** — out of scope per WEBGPU-00                                                                            | OK                                          |
| 6   | New Architecture | Config matches WEBGPU-00 version pins; prebuild documented                                                         | OK — `app.config.ts` + README runbook       |
| 7   | Native build     | README documents prebuild / `expo run:ios`; native module requirement clear                                        | OK                                          |
| 8   | Runbook          | README section: install, prebuild, **iOS device** run, rehearsal checklist                                         | OK                                          |
| 8b  | Devices          | Demo verified on **physical iOS** (Radon restart, not hot reload after shader changes)                             | **Owner OK** — 2026-06-18                   |
| 9   | Fallback         | Documented degraded path if GPU init fails (message UI)                                                            | OK — `VideoEffectFallback`                  |
| 10  | KEYFRAMER        | **N/A** — no keyframer screen per WEBGPU-00                                                                        | OK                                          |
| 11  | Tamagui UI       | Shell uses Tamagui (pattern from wallet); validates Tamagui on **Expo SDK 56**                                     | OK                                          |
| 12  | Import aliases   | `~app`, `~app-root`, `~screens`, `~features`, `~shared` — synced in **babel + tsconfig + eslint** (wallet pattern) | OK                                          |
| 13  | Lint             | `eslint.config.mjs` from wallet (simplified); `npm run lint` + `npm run typecheck` pass; **`slides/**` ignored     | OK                                          |
| 14  | Quality          | Above checks green on `src/**`                                                                                     | OK                                          |
| 15  | Slides untouched | Segment stub in `slides/slides.md`; code examples in `slides/examples/` for WEBGPU-02                              | OK                                          |

## Already OK (must not break)

- Slide deck: Radon + keyframer `src:` imports, talk order, «Вопросы?» closing.
- `slides/pages/04-webgpu.md` — do not create or edit (WEBGPU-02).
- Feature README research sections from WEBGPU-00 — extend, do not delete findings.

## Implementation plan

### 1. Preconditions

Do not start until WEBGPU-00 is **done** — closed 2026-06-16.

### 2. Repo layout

**Expo at repo root** (owner-approved) — same **family** as `cx-mobile-app-wallet`, simplified for talk demo.

**Reference (read-only):** `/Users/kirillgolubev/WebstormProjects/cx-mobile-app-wallet`  
Docs: `docs/PROJECT_STRUCTURE.md`, `docs/UI_COMPONENTS.md`, `AGENTS.md`.

```text
app-js-presentation/
├── src/
│   ├── app/                    # Expo Router — thin routes
│   ├── app-root/
│   │   └── providers/          # Minimal AppProviders (Tamagui + Reanimated essentials)
│   ├── screens/
│   │   └── StressTestScreen/   # Single talk screen
│   ├── features/
│   │   └── typegpu/            # GPU lane, baseline lane, JS load control
│   └── shared/
│       ├── ui/theme/           # Tamagui tokens/themes (borrow pattern from wallet)
│       └── ui/components/      # Button, Stacks — copy/adapt as needed
├── tamagui.config.ts           # Root config (wallet pattern)
├── babel.config.js             # module-resolver aliases + tamagui + unplugin-typegpu + reanimated (last)
├── eslint.config.mjs           # from wallet — simplified; ignore slides/**
├── tsconfig.json               # paths mirror babel aliases
├── slides/                     # Slidev — untouched by Expo; **eslint ignore**
├── ios/ android/               # after prebuild (gitignore)
└── package.json                # slides:* + expo scripts
```

**No conflict with slides:** `npm run slides` / `slides:build` use Slidev + `slides/` only; `npx expo start` uses Metro + `src/`. Shared root `package.json` is fine.

**`.gitignore` additions:** `.expo/`, `ios/`, `android/`, `.tamagui/`, Expo build artifacts.

**SDK note:** wallet pins **Expo SDK 54** today; this demo targets **SDK 56** per WEBGPU-00 — document Tamagui + TypeGPU + wgpu on 56 as a **finding** in README.

#### Reference bootstrap (`cx-mobile-app-wallet`)

**Owner decision (2026-06-16):** reuse wallet **structure + Tamagui UI**; **selectively copy** during WEBGPU-01 implementation. Planning = docs only.

**Borrow:**

| Area       | Wallet source                                           | Demo use                                                                                                             |
| ---------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| FSD layout | `docs/PROJECT_STRUCTURE.md`                             | Minimal `src/` layers only                                                                                           |
| Tamagui    | `tamagui.config.ts`, `src/shared/ui/theme/**`           | Shell + stress screen + button                                                                                       |
| Providers  | `AppProviders.tsx`                                      | Subset: GestureHandler, SafeArea, Tamagui — no wallet business providers                                             |
| UI         | `shared/ui/components/layout/Stacks`, `controls/Button` | Screen chrome                                                                                                        |
| Babel      | `babel.config.js`                                       | `babel-plugin-module-resolver` aliases + `@tamagui/babel-plugin` + **`unplugin-typegpu/babel`**; reanimated **last** |
| TS paths   | `tsconfig.json`                                         | Same aliases as babel — see [Import aliases](#import-aliases--lint)                                                  |
| ESLint     | `eslint.config.mjs`, `.prettierrc.js` (optional)        | Wallet flat config — simplified; FSD boundaries for layers in use only                                               |
| New Arch   | `app.config.ts`                                         | `newArchEnabled: true`                                                                                               |

**Do not pull:** Skia (`@shopify/react-native-skia`, `SkiaFontManagerProvider`), `victory-native`, auth/passkeys/MFA/Sentry/AppsFlyer/Sumsub/Kubb, full provider stack, Storybook/EAS/env matrix, wallet product screens, wallet `~env` / Kubb / jest setup unless needed.

**Add fresh (TypeGPU):** `react-native-wgpu`, `typegpu`, `@typegpu/react`, `unplugin-typegpu`, `@webgpu/types`; `src/features/typegpu/**`.

#### Import aliases + lint

**Owner decision (2026-06-16):** borrow wallet **path aliases** and **ESLint** setup — keep all three in sync.

**Path aliases** (minimal for demo — wallet uses more; add layers only when a slice exists):

| Alias       | Babel (`module-resolver`) | TS (`paths`)             |
| ----------- | ------------------------- | ------------------------ |
| `~app`      | `./src/app`               | `~app/*` → `./src/app/*` |
| `~app-root` | `./src/app-root`          | `~app-root/*` → …        |
| `~screens`  | `./src/screens`           | `~screens/*` → …         |
| `~features` | `./src/features`          | `~features/*` → …        |
| `~shared`   | `./src/shared`            | `~shared/*` → …          |

Reference: wallet `babel.config.js` + `tsconfig.json` + `docs/PROJECT_STRUCTURE.md` (Path Aliases).

**Import style:** slice public API via `index.ts`; import `from "~features/typegpu"`, not deep paths — wallet FSD convention.

**ESLint** — copy/adapt from wallet `eslint.config.mjs`:

| Piece   | Wallet                                                                                                        | Demo                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Config  | Flat `eslint.config.mjs`                                                                                      | Same format                                                                   |
| Core    | `typescript-eslint` strict + stylistic, `react`, `react-hooks`                                                | Keep                                                                          |
| Imports | `eslint-plugin-import`, `eslint-import-resolver-typescript`, `simple-import-sort`, `no-relative-import-paths` | Keep — resolver must see tsconfig paths                                       |
| FSD     | `eslint-plugin-boundaries` + `boundaries/elements`                                                            | **Subset:** only layers present (`app-root`, `screens`, `features`, `shared`) |
| Ignores | `.expo/`, `ios/`, `android/`, scripts, …                                                                      | **Add `slides/**`, `slides/dist/**`** — do not lint Slidev markdown/build     |
| Scripts | `"lint": "eslint ."`, `"typecheck": "tsc --noEmit"`                                                           | Extend root `package.json`; keep existing `slides:*` scripts                  |

Optional: `.prettierrc.js` from wallet if formatting parity matters; not required for acceptance if eslint alone passes.

**Do not** run eslint on `slides/` — presentation markdown is out of demo lint scope.

---

### 3. Demo content (locked — WEBGPU-00)

Single **stress-test** screen — side-by-side or stacked:

| Lane         | Implementation                                                  |
| ------------ | --------------------------------------------------------------- |
| **GPU**      | Shimmer/mini-chart via `'use gpu'`; `runOnUI` + `installWebGPU` |
| **Baseline** | Same visual intent via Reanimated                               |
| **Control**  | «Нагрузить JS» — CPU on JS thread only                          |

Smoke path first: blue triangle per official RN guide. Then stress screen.

Stage time: ~3–5 min live segment.

### 4. Documentation sync

Update `docs/topics/webgpu/README.md`:

- **Artifacts:** demo app path, run commands, known device quirks.
- **Demo scope decision:** mark implemented vs deferred items.
- Capture **what worked / what failed** — feeds WEBGPU-02 slide copy.

### 5. Handoff to WEBGPU-02

Leave a short **Slide inputs** bullet list in README: screenshot candidates, metrics (if measured), honest limitations discovered during build.

## Presentation notes

- Heavy segment — demo is the proof; slides come after.
- Rehearse on **physical iOS device**; simulator allowed for dev (Metal API Validation off). Android smoke optional — document quirks only if tested.
- Do not oversell thread model — use wording validated in WEBGPU-00.

## Notes for the agent prompt

- Read approved scope in README first — it overrides generic demo plan in this file.
- Post Source verification in Russian before first `src/` edit.
- **Reference project:** read `cx-mobile-app-wallet` docs/files; copy **selectively** per [Reference bootstrap](#reference-bootstrap-cx-mobile-app-wallet) — do not import Skia or wallet product features.
- Status → `awaiting QA` after lint/typecheck + owner device smoke.

## Related files

- `src/features/typegpu/` — `VideoEffectCanvas`, `videoEffectPipeline.ts`, `useVideoEffectFrame.ts`, `useNativeVideoPlayer.ts`
- `src/screens/DemoScreen/` — entry screen
- `slides/examples/video-shader-slide.ts`, `slides/examples/video-frame-slide.ts` — slide code snippets (WEBGPU-02)
- `tamagui.config.ts`, `babel.config.js`, `tsconfig.json`, `eslint.config.mjs`, `app.config.ts`
- `package.json` — scripts
- `docs/topics/webgpu/README.md` — runbook + slide inputs

## Tests

- `npm run lint` / `npm run typecheck` — when added
- Manual: owner runs app on device per runbook

## Links

- [WEBGPU-00](WEBGPU-00.md)
- [Feature doc](README.md)
