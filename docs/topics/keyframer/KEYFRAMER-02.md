# KEYFRAMER-02 — Expo demo + keyframer export

**Status:** cancelled  
**Feature:** [docs/topics/keyframer/README.md](README.md)  
**Cancelled reason:** Owner decision — **slides only** for keyframer segment; tool too alpha for live demo. Runnable Expo deferred to **WebGPU segment** demo ([WEBGPU-01](../webgpu/WEBGPU-01.md)) — first `src/` in repo.

## Original goal

Minimal Expo app under `src/` with keyframer export for live talk (~1–2 min on stage).

## Why cancelled (not deleted)

Handoff from [KEYFRAMER-00](KEYFRAMER-00.md) remains useful when [WEBGPU-01](../webgpu/WEBGPU-01.md) creates the demo app:

- Export conventions: `src/animations/keyframer/timelineScene.ts`, optional `graphScene.ts`
- Stack: Reanimated 4 + New Architecture + react-native-worklets
- Generic timeline + graph export from saved keyframer project

## If revived later

- Attach to [WEBGPU-01](../webgpu/WEBGPU-01.md) or a dedicated demo-bootstrap task — not keyframer talk slot.
- Owner pastes export from saved keyframer project at integration time.

## Links

- [Feature doc](README.md)
- Active work: [WEBGPU-01](../webgpu/WEBGPU-01.md) (Expo demo) — see [WEBGPU-00](../webgpu/WEBGPU-00.md) research first
