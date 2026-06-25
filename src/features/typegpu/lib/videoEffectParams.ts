import tgpu, { d } from "typegpu";
import type { InferInput } from "typegpu/data";

import { DEMO_VIDEO_ASPECT } from "~features/typegpu/lib/demoVideoMeta";
import {
  RIPPLE_IMPULSE_COUNT,
  RIPPLE_IDLE_TIME,
  type RippleImpulse,
  type WakeState,
  rippleImpulsesToUniforms,
  wakeToUniforms,
} from "~features/typegpu/lib/videoRippleImpulses";

export const videoParamsSchema = d.struct({
  time: d.f32,
  effectMask: d.f32,
  canvasAspect: d.f32,
  videoAspect: d.f32,
  playing: d.f32,
  videoProgress: d.f32,
  wakeThumbX: d.f32,
  wakeThumbY: d.f32,
  wakeThumbVelX: d.f32,
  wakeEnergy: d.f32,
  ripple0x: d.f32,
  ripple0y: d.f32,
  ripple0t: d.f32,
  ripple0vx: d.f32,
  ripple1x: d.f32,
  ripple1y: d.f32,
  ripple1t: d.f32,
  ripple1vx: d.f32,
  ripple2x: d.f32,
  ripple2y: d.f32,
  ripple2t: d.f32,
  ripple2vx: d.f32,
  ripple3x: d.f32,
  ripple3y: d.f32,
  ripple3t: d.f32,
  ripple3vx: d.f32,
  ripple4x: d.f32,
  ripple4y: d.f32,
  ripple4t: d.f32,
  ripple4vx: d.f32,
  ripple5x: d.f32,
  ripple5y: d.f32,
  ripple5t: d.f32,
  ripple5vx: d.f32,
  ripple6x: d.f32,
  ripple6y: d.f32,
  ripple6t: d.f32,
  ripple6vx: d.f32,
  ripple7x: d.f32,
  ripple7y: d.f32,
  ripple7t: d.f32,
  ripple7vx: d.f32,
  ripple8x: d.f32,
  ripple8y: d.f32,
  ripple8t: d.f32,
  ripple8vx: d.f32,
  ripple9x: d.f32,
  ripple9y: d.f32,
  ripple9t: d.f32,
  ripple9vx: d.f32,
});

export type VideoParamsInput = InferInput<typeof videoParamsSchema>;

export const videoEffectLayout = tgpu.bindGroupLayout({
  params: { uniform: videoParamsSchema },
  video: { externalTexture: d.textureExternal() },
  sampler: { sampler: "filtering" },
});

export const VIDEO_PARAMS_FLOAT_COUNT = 6 + 4 + RIPPLE_IMPULSE_COUNT * 4;

function idleRippleFields() {
  const fields: Record<string, number> = {};

  for (let index = 0; index < RIPPLE_IMPULSE_COUNT; index += 1) {
    fields[`ripple${index}x`] = 0;
    fields[`ripple${index}y`] = 0;
    fields[`ripple${index}t`] = RIPPLE_IDLE_TIME;
    fields[`ripple${index}vx`] = 0;
  }

  return fields;
}

export function createDefaultVideoParams(
  wakeThumbY: number,
  videoAspect = DEMO_VIDEO_ASPECT,
): VideoParamsInput {
  return {
    time: 0,
    effectMask: 0,
    canvasAspect: 1,
    videoAspect,
    playing: 1,
    videoProgress: 0,
    wakeThumbX: 0,
    wakeThumbY,
    wakeThumbVelX: 0,
    wakeEnergy: 0,
    ...idleRippleFields(),
  } as VideoParamsInput;
}

export type VideoParamsFrameInput = {
  elapsedSeconds: number;
  effectFlags: number;
  canvasAspect: number;
  videoAspect: number;
  isPlaying: boolean;
  videoProgress: number;
  wake: WakeState;
  impulses: RippleImpulse[];
};

export function fillVideoParamsArray(
  target: Float32Array,
  input: VideoParamsFrameInput,
) {
  target[0] = input.elapsedSeconds;
  target[1] = input.effectFlags;
  target[2] = input.canvasAspect;
  target[3] = input.videoAspect;
  target[4] = input.isPlaying ? 1 : 0;
  target[5] = input.videoProgress;

  const wakeUniforms = wakeToUniforms(input.wake);
  target[6] = wakeUniforms[0];
  target[7] = wakeUniforms[1];
  target[8] = wakeUniforms[2];
  target[9] = wakeUniforms[3];
  target.set(rippleImpulsesToUniforms(input.impulses), 10);
}
