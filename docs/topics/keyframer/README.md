# keyframer.dev

**Talk slot:** 6 (after expo-observe, partner)  
**Owner:** K  
**Demo weight:** medium

## Audience takeaway

Designers and developers can collaborate on **Reanimated** animations without a painful handoff — familiar visual tool for design, near-ready code for engineering.

## What to cover

### Problem

- Complex Reanimated interactions hard to spec in Figma alone
- Engineers reverse-engineer motion from video / static frames
- Slow iteration, mismatched expectations

### keyframer.dev solution

- Graphical editor → **Reanimated** output (not generic Lottie)
- **Designers:** After Effects–like timeline + **node graphs** for non-trivial logic
- **Developers:** exportable animation code; less translation work

### Business-app angle

Onboarding, bottom sheets, guided tours, in-app marketing — motion authored with design, not after the fact.

## Demo plan

- Editor walkthrough (live or recording) → export → one screen in shared demo app
- Prefer **committed export sample** in repo for offline rehearsal
- Document fallback if live editor unavailable (network, account)

## Artifacts in repo

| Artifact | Location |
| --- | --- |
| Slides (stub) | `slides/slides.md` — keyframer section |
| Demo integration | `src/` (when demo app exists) |
| Export sample | TBD — commit when available |

## Open questions

- Live editor on stage vs pre-recorded
- Canonical export sample path in repo
- Reanimated / Expo SDK version compatibility for demo app

## Sources (verify before implementation)

- https://keyframer.dev/
- react-native-reanimated — export compatibility
- Expo SDK — demo app target version

## Tasks

None yet. Planner creates scoped task files in this folder (e.g. `KEYFRAMER-01.md`) when breaking down work.
