import type { ViewStyle } from "react-native";

export const VIDEO_EFFECT_VIGNETTE = 1;
export const VIDEO_EFFECT_INVERT = 2;
export const VIDEO_EFFECT_NOIR = 4;
export const VIDEO_EFFECT_NEON = 8;

export const FX_BTN_LEFT_UV = 0.09;
export const FX_BTN_HALF_W = 0.114;
export const FX_BTN_HALF_H = 0.032;
export const FX_BTN_CORNER = 0.032;

export const VIDEO_EFFECT_OPTIONS = [
  {
    flag: VIDEO_EFFECT_VIGNETTE,
    label: "Vignette",
    centerYFromBottom: 0.398,
  },
  {
    flag: VIDEO_EFFECT_INVERT,
    label: "Invert",
    centerYFromBottom: 0.476,
  },
  { flag: VIDEO_EFFECT_NOIR, label: "Noir", centerYFromBottom: 0.554 },
  { flag: VIDEO_EFFECT_NEON, label: "Neon", centerYFromBottom: 0.632 },
];

export const EDGE_MARGIN_UV = 0.06;
export const SCRUB_LEFT_UV = EDGE_MARGIN_UV;
export const SCRUB_CENTER_Y = 0.105;
export const SCRUB_HALF_H = 0.015;
export const SCRUB_THUMB_RADIUS = 0.034;

export const PLAY_BTN_CENTER_Y = SCRUB_CENTER_Y;
export const PLAY_BTN_RADIUS = 0.062;
export const PLAY_BTN_GAP_UV = 0.016;

export function getPlayButtonCenterXUv(aspect: number) {
  return 1 - EDGE_MARGIN_UV - PLAY_BTN_RADIUS / aspect;
}

export function getScrubRightUv(aspect: number) {
  const playRadiusUv = PLAY_BTN_RADIUS / aspect;
  return getPlayButtonCenterXUv(aspect) - PLAY_BTN_GAP_UV - playRadiusUv;
}

export function getScrubCenterXUv(aspect: number) {
  return SCRUB_LEFT_UV + (getScrubRightUv(aspect) - SCRUB_LEFT_UV) * 0.5;
}

export function getScrubHalfWUv(aspect: number) {
  return (getScrubRightUv(aspect) - SCRUB_LEFT_UV) * 0.5;
}

export function getScrubThumbXUv(progress: number, aspect: number) {
  const scrubRight = getScrubRightUv(aspect);
  return SCRUB_LEFT_UV + progress * (scrubRight - SCRUB_LEFT_UV);
}

export function toggleEffectFlags(flags: number, flag: number) {
  return flags ^ flag;
}

export function hasEffectFlags(flags: number, flag: number) {
  return (flags & flag) !== 0;
}

export function getPlayButtonStyle(aspect: number): ViewStyle {
  const centerX = getPlayButtonCenterXUv(aspect);
  const radiusUv = PLAY_BTN_RADIUS / aspect;
  const heightPct = PLAY_BTN_RADIUS * 2 * 100;
  const widthPct = radiusUv * 2 * 100;
  const bottomPct = (PLAY_BTN_CENTER_Y - PLAY_BTN_RADIUS) * 100;
  const leftPct = (centerX - radiusUv) * 100;

  return {
    position: "absolute",
    left: `${leftPct}%`,
    bottom: `${bottomPct}%`,
    width: `${widthPct}%`,
    height: `${heightPct}%`,
    borderRadius: 999,
  };
}

export function getEffectButtonStyle(
  centerYFromBottom: number,
  aspect: number,
): ViewStyle {
  const heightPct = FX_BTN_HALF_H * 2 * 100;
  const widthPct = ((FX_BTN_HALF_W * 2) / aspect) * 100;
  const leftPct = FX_BTN_LEFT_UV * 100 - widthPct / 2;
  const bottomPct = (centerYFromBottom - FX_BTN_HALF_H) * 100;

  return {
    position: "absolute",
    left: `${leftPct}%`,
    bottom: `${bottomPct}%`,
    width: `${widthPct}%`,
    height: `${heightPct}%`,
    borderRadius: 999,
  };
}
