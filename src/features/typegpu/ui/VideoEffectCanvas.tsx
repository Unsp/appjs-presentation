import { useConfigureContext, useRootWithStatus } from "@typegpu/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Canvas } from "react-native-wgpu";

import { DEMO_VIDEO_ASPECT } from "~features/typegpu/lib/demoVideoMeta";
import { supportsNativeVideoTexture } from "~features/typegpu/lib/videoCanvasUtils";
import { createVideoGpuResources } from "~features/typegpu/lib/videoGpuResources";
import {
  getEffectButtonStyle,
  getPlayButtonStyle,
  getScrubRightUv,
  hasEffectFlags,
  SCRUB_CENTER_Y,
  SCRUB_LEFT_UV,
  toggleEffectFlags,
  VIDEO_EFFECT_OPTIONS,
} from "~features/typegpu/lib/videoEffectModes";
import { useNativeVideoPlayer } from "~features/typegpu/lib/useNativeVideoPlayer";
import { useVideoTextureRotation } from "~features/typegpu/lib/useScreenLayout";
import { useVideoEffectFrame } from "~features/typegpu/lib/useVideoEffectFrame";
import {
  createRippleImpulses,
  createWakeState,
} from "~features/typegpu/lib/videoRippleImpulses";
import { VideoEffectFallback } from "~features/typegpu/ui/VideoEffectFallback";
import { VideoScrubber } from "~features/typegpu/ui/VideoScrubber";

type VideoEffectCanvasProps = {
  active?: boolean;
};

const EMPTY_RIPPLE_PUSH = {
  progress: -1,
  thumbX: 0,
  time: -1,
  vx: 0,
};

function clampProgress(positionSec: number, durationSec: number) {
  if (durationSec <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(positionSec / durationSec, 1));
}

export function VideoEffectCanvas({ active = true }: VideoEffectCanvasProps) {
  const rootStatus = useRootWithStatus();
  const root = rootStatus.status === "resolved" ? rootStatus.value : null;

  const [effectFlags, setEffectFlags] = useState(0);
  const effectFlagsRef = useRef(effectFlags);
  effectFlagsRef.current = effectFlags;

  const scrubPreviewSecRef = useRef<number | null>(null);
  const wasPlayingRef = useRef(false);
  const scrubProgressRef = useRef(0);
  const rippleImpulsesRef = useRef(createRippleImpulses());
  const rippleLastPushRef = useRef(EMPTY_RIPPLE_PUSH);
  const wakeStateRef = useRef(createWakeState(SCRUB_CENTER_Y));

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const layoutAspect =
    windowWidth > 0 && windowHeight > 0
      ? windowWidth / windowHeight
      : DEMO_VIDEO_ASPECT;

  const videoRotation = useVideoTextureRotation();
  const videoRotationRef = useRef(videoRotation);
  videoRotationRef.current = videoRotation;

  const videoPlayer = useNativeVideoPlayer(active);
  const videoAspect = videoPlayer.videoAspect || DEMO_VIDEO_ASPECT;

  const gpuResources = useMemo(() => {
    if (!root) {
      return null;
    }

    return createVideoGpuResources(root);
  }, [root]);

  const { ref, ctxRef } = useConfigureContext({ alphaMode: "premultiplied" });

  useEffect(() => {
    if (scrubPreviewSecRef.current !== null) {
      return;
    }

    scrubProgressRef.current = clampProgress(
      videoPlayer.positionSec,
      videoPlayer.durationSec,
    );
  }, [videoPlayer.durationSec, videoPlayer.positionSec]);

  const setScrubPreview = useCallback(
    (seconds: number) => {
      scrubPreviewSecRef.current = seconds;
      scrubProgressRef.current = clampProgress(
        seconds,
        videoPlayer.durationSec,
      );
      videoPlayer.setScrubTarget(seconds);
    },
    [videoPlayer],
  );

  const handleScrubStart = useCallback(() => {
    rippleLastPushRef.current = { ...EMPTY_RIPPLE_PUSH };
    wasPlayingRef.current = videoPlayer.isPlaying;
    videoPlayer.setScrubbing(true);

    if (videoPlayer.isPlaying) {
      videoPlayer.pausePlayback();
    }
  }, [videoPlayer]);

  const handleScrubEnd = useCallback(
    (seconds: number) => {
      videoPlayer.setScrubbing(false);
      scrubPreviewSecRef.current = null;
      videoPlayer.seekTo(seconds);

      if (wasPlayingRef.current) {
        videoPlayer.resumePlayback();
      }
    },
    [videoPlayer],
  );

  useVideoEffectFrame({
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
  });

  if (rootStatus.status === "rejected") {
    const message =
      rootStatus.error instanceof Error
        ? rootStatus.error.message
        : "WebGPU недоступен — нужен prebuild и New Arch";

    return <VideoEffectFallback message={message} />;
  }

  if (
    rootStatus.status === "pending" ||
    !gpuResources ||
    videoPlayer.status === "loading"
  ) {
    return <VideoEffectFallback message="Загрузка видео…" tone="loading" />;
  }

  if (videoPlayer.status === "error") {
    return (
      <VideoEffectFallback message={videoPlayer.error ?? "Видео недоступно"} />
    );
  }

  if (root != null && !supportsNativeVideoTexture(root.device)) {
    return (
      <VideoEffectFallback message="rnwebgpu/native-texture недоступен на этом устройстве" />
    );
  }

  const scrubPositionSec =
    scrubPreviewSecRef.current ?? videoPlayer.positionSec;

  return (
    <View style={styles.root}>
      <View style={styles.stage}>
        <View pointerEvents="none" style={styles.canvasLayer}>
          <Canvas ref={ref} style={styles.canvas} transparent />
        </View>

        {VIDEO_EFFECT_OPTIONS.map(({ flag, label, centerYFromBottom }) => {
          const isActive = hasEffectFlags(effectFlags, flag);

          return (
            <Pressable
              key={flag}
              accessibilityLabel={label}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => {
                setEffectFlags((current) => toggleEffectFlags(current, flag));
              }}
              style={[
                getEffectButtonStyle(centerYFromBottom, layoutAspect),
                styles.effectCapsule,
              ]}
            >
              <Text
                style={[
                  styles.effectLabel,
                  isActive && styles.effectLabelActive,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}

        <Pressable
          accessibilityLabel={videoPlayer.isPlaying ? "Pause" : "Play"}
          accessibilityRole="button"
          hitSlop={8}
          onPress={videoPlayer.togglePlayback}
          style={[getPlayButtonStyle(layoutAspect), styles.playPauseHit]}
        />

        <View
          style={[
            styles.scrubberWrap,
            {
              left: `${SCRUB_LEFT_UV * 100}%`,
              right: `${(1 - getScrubRightUv(layoutAspect)) * 100}%`,
            },
          ]}
        >
          <VideoScrubber
            durationSec={videoPlayer.durationSec}
            positionSec={scrubPositionSec}
            onScrubEnd={handleScrubEnd}
            onScrubMove={setScrubPreview}
            onScrubStart={handleScrubStart}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0b1020",
  },
  stage: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden",
    backgroundColor: "#0b1020",
  },
  canvasLayer: {
    ...StyleSheet.absoluteFill,
  },
  canvas: {
    flex: 1,
  },
  effectCapsule: {
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  effectLabel: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.3,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  effectLabelActive: {
    color: "#f0f8ff",
  },
  playPauseHit: {
    zIndex: 3,
  },
  scrubberWrap: {
    position: "absolute",
    bottom: "4%",
    zIndex: 3,
  },
});
