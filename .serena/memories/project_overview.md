# app-js-presentation

Technical presentation about React Native & Expo ecosystem tools. Pair talk — this repo holds Kirill's segments (K): slides (Slidev) + Expo demo app.

## Purpose
- Live-friendly talk: 6 segments (3 K + 3 partner M)
- K topics: Radon/RNRepo (#2), WebGPU/TypeGPU (#4), keyframer.dev (#6)
- Partner M: Legend State, react-teleport, expo-observe

## Tech stack
- **Slides:** Slidev (markdown in `slides/`)
- **Demo app:** Expo SDK 56, React Native 0.85, React 19, expo-router, TypeScript 5.9
- **UI:** Tamagui 1.135
- **WebGPU demo:** react-native-webgpu, typegpu, @typegpu/react, unplugin-typegpu
- **Animation:** react-native-reanimated 4, gesture-handler

## Repo structure
```
slides/           # Slidev deck (slides.md shell + pages/*.md)
src/              # Expo demo app (FSD-ish)
  app/            # expo-router routes (~app alias)
  app-root/       # providers (~app-root alias)
  screens/        # screen compositions (~screens/*)
  features/       # feature modules (~features/*) — typegpu is main demo
  shared/         # shared UI/theme (~shared/*)
docs/             # English docs: outline, topics, task specs
AGENTS.md         # Agent workflow rules
```

## Path aliases (tsconfig)
~app, ~app-root, ~screens/*, ~features/*, ~shared/*

## Current demo state
- Single route: `src/app/index.tsx` → `DemoScreen` → `VideoEffectCanvas` (WebGPU video shader)
- Requires native prebuild + New Architecture
- WEBGPU-01 done, WEBGPU-02 slides awaiting QA
