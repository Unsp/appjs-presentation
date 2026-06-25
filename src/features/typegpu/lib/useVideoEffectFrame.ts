import { useFrame } from "@typegpu/react";
import type { TgpuRoot } from "typegpu";
import { type RefObject, useRef } from "react";

import {
  NATIVE_TEXTURE_FEATURE,
  readCanvasAspect,
} from "~features/typegpu/lib/videoCanvasUtils";
import {
  fillVideoParamsArray,
  videoEffectLayout,
  VIDEO_PARAMS_FLOAT_COUNT,
} from "~features/typegpu/lib/videoEffectParams";
import type { VideoGpuResources } from "~features/typegpu/lib/videoGpuResources";
import {
  getScrubThumbXUv,
  SCRUB_CENTER_Y,
} from "~features/typegpu/lib/videoEffectModes";
import type { useNativeVideoPlayer } from "~features/typegpu/lib/useNativeVideoPlayer";
import type { VideoTextureRotation } from "~features/typegpu/lib/useScreenLayout";
import {
  type RippleImpulse,
  updateWakeSimulation,
  type WakeState,
} from "~features/typegpu/lib/videoRippleImpulses";

const RIPPLE_FRAME_SEC = 1 / 60;

type RipplePushState = {
  progress: number;
  thumbX: number;
  time: number;
  vx: number;
};

type WgpuCanvasContext = GPUCanvasContext & {
  present?: () => void;
};

type UseVideoEffectFrameOptions = {
  active: boolean;
  root: TgpuRoot | null;
  gpuResources: VideoGpuResources | null;
  ctxRef: RefObject<GPUCanvasContext | null>;
  videoPlayer: ReturnType<typeof useNativeVideoPlayer>;
  videoRotationRef: RefObject<VideoTextureRotation>;
  videoAspect: number;
  effectFlagsRef: RefObject<number>;
  scrubProgressRef: RefObject<number>;
  rippleImpulsesRef: RefObject<RippleImpulse[]>;
  rippleLastPushRef: RefObject<RipplePushState>;
  wakeStateRef: RefObject<WakeState>;
};

export function useVideoEffectFrame({
  active,
  root,
  gpuResources,
  ctxRef,
  videoPlayer,
  videoRotationRef,
  videoAspect,
  effectFlagsRef,
  scrubProgressRef,
  rippleImpulsesRef,
  rippleLastPushRef,
  wakeStateRef,
}: UseVideoEffectFrameOptions) {
  const lastFrameTimeRef = useRef(0);
  const paramsArrayRef = useRef<Float32Array | null>(null);

  useFrame(({ elapsedSeconds }) => {
    if (!active || !root || !gpuResources) {
      return;
    }

    const ctx = ctxRef.current;
    if (!ctx) {
      return;
    }

    if (!root.device.features.has(NATIVE_TEXTURE_FEATURE)) {
      return;
    }

    const needsFreshFrame =
      videoPlayer.isPlayingRef.current || videoPlayer.isScrubbingRef.current;
    const frame = needsFreshFrame
      ? videoPlayer.copyLatestFrame()
      : (videoPlayer.peekHeldFrame() ?? videoPlayer.copyLatestFrame());

    if (!frame) {
      return;
    }

    const deltaSec = Math.min(
      Math.max(elapsedSeconds - lastFrameTimeRef.current, 0),
      RIPPLE_FRAME_SEC,
    );
    lastFrameTimeRef.current = elapsedSeconds;

    const canvasAspect = readCanvasAspect(
      ctx.canvas as unknown as Parameters<typeof readCanvasAspect>[0],
    );

    let externalTexture: GPUExternalTexture | null = null;

    try {
      externalTexture = root.device.importExternalTexture({
        source: frame,
        rotation: videoRotationRef.current,
      });

      const bindGroup = root.createBindGroup(videoEffectLayout, {
        params: gpuResources.paramsBuffer,
        sampler: gpuResources.sampler,
        video: externalTexture,
      });

      updateWakeSimulation({
        impulses: rippleImpulsesRef.current,
        wake: wakeStateRef.current,
        isScrubbing: videoPlayer.isScrubbingRef.current,
        progress: scrubProgressRef.current,
        thumbX: getScrubThumbXUv(scrubProgressRef.current, canvasAspect),
        thumbY: SCRUB_CENTER_Y,
        time: elapsedSeconds,
        deltaSec,
        lastPush: rippleLastPushRef.current,
      });

      if (!paramsArrayRef.current) {
        paramsArrayRef.current = new Float32Array(VIDEO_PARAMS_FLOAT_COUNT);
      }

      fillVideoParamsArray(paramsArrayRef.current, {
        elapsedSeconds,
        effectFlags: effectFlagsRef.current,
        canvasAspect,
        videoAspect,
        isPlaying: videoPlayer.isPlayingRef.current,
        videoProgress: scrubProgressRef.current,
        wake: wakeStateRef.current,
        impulses: rippleImpulsesRef.current,
      });

      root.device.queue.writeBuffer(
        gpuResources.paramsGpuBuffer,
        0,
        paramsArrayRef.current,
      );

      gpuResources.pipeline
        .with(bindGroup)
        .withColorAttachment({ view: ctx })
        .draw(3);

      (ctx as WgpuCanvasContext).present?.();
      videoPlayer.tickScrubSeek(elapsedSeconds);
    } catch {
      return;
    } finally {
      externalTexture?.destroy();
    }
  });
}
