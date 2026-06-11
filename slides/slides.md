---
theme: default
title: React Native & Expo — ecosystem tools
author: Kirill Golubev
info: |
  Pair talk. This deck covers Kirill's segments (K).
  Partner segments (M) will be merged later.
transition: slide-left
mdc: true
---

# React Native & Expo

## Ecosystem tools for business apps

Pair presentation · Kirill's segments (K)

<!--
Speaker note: intro — hand off to partner for Legend State (segment 1).
-->

---

## layout: center

# Talk order

1. Legend State — **M** (partner)
2. Radon IDE + rnrepo — **K**
3. react-teleport — **M** (partner)
4. TypeGPU + Redraw — **K**
5. expo-observe — **M** (partner)
6. keyframer.dev — **K**

---

# Radon IDE + rnrepo

Segment 2 · after Legend State

---

## Why Radon IDE

- RN-aware editor — not a generic VS Code setup
- Faster navigation across **JS + native** layers
- Debugging and project introspection tuned for mobile
- Pays off in **business apps** with real native surface area

---

## rnrepo — build time win

Short mention, concrete benefit:

- Monorepo / workspace tooling from the same ecosystem
- **Shorter Android builds in EAS** (and similar CI)
- One slide or cached timing screenshot — avoid cold EAS on stage

---

## layout: center

## Demo · Radon

Slides + screen recording

Optional: Radon IDE walkthrough

Hand off → **react-teleport** (partner)

---

# TypeGPU + Redraw

Segment 4 · GPU for business UI

---

## Why GPU in business apps

Not games — product UI that must stay smooth:

- Frosted panels & **performant blur**
- Rich micro-interactions under lists, modals, tabs
- Scroll-linked effects, animated charts
- Effects that used to jank on **JS / UI thread**

---

## TypeGPU — dedicated GPU thread

Recent versions: work on a **dedicated GPU thread**

- Contrast with the old model (everything on JS + UI)
- **Shaders in TypeScript** — no GLSL-only team required
- Maintainable in a TS / React Native codebase

---

## Redraw (experimental)

Sibling package — exploratory:

- Scan for useful APIs / sample effects
- Show only what survives evaluation
- Do not over-promise

---

## Demo app · TypeGPU

**Heavy segment** — switch to Expo demo:

- GPU blur / animation vs non-GPU baseline
- One “business screen” mock (modal + chart?)
- Fallback if GPU path fails on device

Hand off → **expo-observe** (partner)

---

# keyframer.dev

Segment 6 · designer ↔ developer handoff

---

## The problem

Complex **Reanimated** interactions:

- Hard to spec in Figma alone
- Engineers reverse-engineer from video / static frames
- Slow iteration, mismatched expectations

---

## keyframer.dev

Graphical editor → **Reanimated output**

**For designers**

- After Effects–like timeline / keyframes
- **Node graphs** for non-trivial interaction logic

**For developers**

- Near-ready animation code on export
- Less translation, fewer “that’s not what I meant” loops

---

## Business-app angle

Onboarding, bottom sheets, guided tours, in-app marketing moments — motion authored **with** design, not after.

---

## Demo · keyframer

1. Editor walkthrough (live or recording)
2. Export → drop into Expo app
3. One integrated screen in shared demo app

---

## layout: center

# Questions?

Demo app · Slidev deck · `docs/outline/`
