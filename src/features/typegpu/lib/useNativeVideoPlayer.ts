import { Asset } from "expo-asset";
import { useCallback, useEffect, useRef, useState } from "react";

import type { NativeVideoFrame, VideoPlayer } from "react-native-wgpu";

import { DEMO_VIDEO_DURATION_SEC } from "~features/typegpu/lib/demoVideoMeta";
import { normalizeLandscapeFrameSize } from "~features/typegpu/lib/useScreenLayout";
import demoVideo from "~shared/assets/Test_Video_2.mp4";

type VideoPlayerStatus = "loading" | "ready" | "error";

const FRAME_WAIT_MS = 50;
const FRAME_WAIT_ATTEMPTS = 80;
const PROGRESS_POLL_MS = 100;
const SCRUB_SEEK_DEBOUNCE_SEC = 0.1;
const SCRUB_SEEK_SETTLE_DELTA_SEC = 0.02;

async function resolveDemoVideoPath() {
  const asset = Asset.fromModule(demoVideo);
  await asset.downloadAsync();

  if (!asset.localUri) {
    throw new Error("Не удалось разрешить путь к видео");
  }

  return asset.localUri;
}

async function readVideoFrameSize(player: VideoPlayer) {
  for (let attempt = 0; attempt < FRAME_WAIT_ATTEMPTS; attempt += 1) {
    const frame = player.copyLatestFrame();
    if (frame) {
      const size = normalizeLandscapeFrameSize(frame.width, frame.height);
      frame.release();
      return size;
    }

    await new Promise<void>((resolve) => {
      setTimeout(resolve, FRAME_WAIT_MS);
    });
  }

  throw new Error("Не удалось определить размер видео");
}

function readPlayerDuration(player: VideoPlayer) {
  const duration = player.getDuration();
  if (Number.isFinite(duration) && duration > 0) {
    return duration;
  }
  return DEMO_VIDEO_DURATION_SEC;
}

function clampTime(seconds: number, duration: number) {
  return Math.max(0, Math.min(seconds, duration));
}

function adoptVideoFrame(
  held: NativeVideoFrame | null,
  fresh: NativeVideoFrame | null,
) {
  if (!fresh) {
    return held;
  }

  if (held?.handle === fresh.handle) {
    return held;
  }

  held?.release();
  return fresh;
}

export function useNativeVideoPlayer(active: boolean) {
  const playerRef = useRef<VideoPlayer | null>(null);
  const lastFrameRef = useRef<NativeVideoFrame | null>(null);
  const isPlayingRef = useRef(true);
  const isScrubbingRef = useRef(false);
  const scrubSeekRef = useRef({
    targetSec: null as number | null,
    appliedSec: Number.NaN,
    lastSeekAtSec: -1,
    lastSeenTargetSec: Number.NaN,
    targetUpdatedAtSec: -1,
  });
  const [status, setStatus] = useState<VideoPlayerStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoAspect, setVideoAspect] = useState<number | null>(null);
  const [positionSec, setPositionSec] = useState(0);
  const [durationSec, setDurationSec] = useState(DEMO_VIDEO_DURATION_SEC);
  const frameSizeRef = useRef({ width: 1920, height: 1080 });

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!active) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const path = await resolveDemoVideoPath();
        const player = RNWebGPU.createVideoPlayer(path);
        player.play();
        const size = await readVideoFrameSize(player);
        const aspect =
          size.width >= size.height
            ? size.width / size.height
            : size.height / size.width;

        if (cancelled) {
          player.release();
          return;
        }

        playerRef.current = player;
        isPlayingRef.current = true;
        frameSizeRef.current = size;
        setVideoAspect(aspect);
        setDurationSec(readPlayerDuration(player));
        setPositionSec(player.getCurrentTime());
        setIsPlaying(true);
        setStatus("ready");
        setError(null);
      } catch (cause) {
        if (!cancelled) {
          setStatus("error");
          setError(
            cause instanceof Error ? cause.message : "Не удалось открыть видео",
          );
        }
      }
    })();

    return () => {
      cancelled = true;
      lastFrameRef.current?.release();
      lastFrameRef.current = null;
      playerRef.current?.release();
      playerRef.current = null;
      setVideoAspect(null);
      setPositionSec(0);
    };
  }, [active]);

  useEffect(() => {
    if (!active || status !== "ready") {
      return;
    }

    const id = setInterval(() => {
      if (isScrubbingRef.current) {
        return;
      }

      const player = playerRef.current;
      if (!player) {
        return;
      }

      const current = player.getCurrentTime();
      const duration = readPlayerDuration(player);
      setDurationSec(duration);
      setPositionSec(current >= 0 ? current : 0);
    }, PROGRESS_POLL_MS);

    return () => {
      clearInterval(id);
    };
  }, [active, status]);

  const copyLatestFrame = useCallback((): NativeVideoFrame | null => {
    const player = playerRef.current;
    if (!player) {
      return lastFrameRef.current;
    }

    const fresh = player.copyLatestFrame();
    if (fresh) {
      const nextSize = normalizeLandscapeFrameSize(fresh.width, fresh.height);
      if (
        nextSize.width !== frameSizeRef.current.width ||
        nextSize.height !== frameSizeRef.current.height
      ) {
        frameSizeRef.current = nextSize;
      }
      lastFrameRef.current = adoptVideoFrame(lastFrameRef.current, fresh);
    }

    return lastFrameRef.current;
  }, []);

  const peekHeldFrame = useCallback((): NativeVideoFrame | null => {
    return lastFrameRef.current;
  }, []);

  const pausePlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    player.pause();
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, []);

  const togglePlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    setIsPlaying((playing) => {
      const nextPlaying = !playing;
      if (nextPlaying) {
        player.play();
      } else {
        player.pause();
      }
      isPlayingRef.current = nextPlaying;
      return nextPlaying;
    });
  }, []);

  const resumePlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    player.play();
    isPlayingRef.current = true;
    setIsPlaying(true);
  }, []);

  const seekTo = useCallback((seconds: number) => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    const duration = readPlayerDuration(player);
    const clamped = clampTime(seconds, duration);
    player.seekTo(clamped);
    setPositionSec(clamped);
    const fresh = player.copyLatestFrame();
    if (fresh) {
      lastFrameRef.current = adoptVideoFrame(lastFrameRef.current, fresh);
    }
  }, []);

  const setScrubTarget = useCallback((seconds: number) => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    const duration = readPlayerDuration(player);
    scrubSeekRef.current.targetSec = clampTime(seconds, duration);
  }, []);

  const tickScrubSeek = useCallback((nowSec: number) => {
    const player = playerRef.current;
    if (!player || !isScrubbingRef.current) {
      return false;
    }

    const state = scrubSeekRef.current;
    const target = state.targetSec;
    if (target === null) {
      return false;
    }

    if (target !== state.lastSeenTargetSec) {
      state.lastSeenTargetSec = target;
      state.targetUpdatedAtSec = nowSec;
    }

    const delta = Math.abs(target - state.appliedSec);
    if (
      Number.isFinite(state.appliedSec) &&
      delta < SCRUB_SEEK_SETTLE_DELTA_SEC
    ) {
      return false;
    }

    const quietFor = nowSec - state.targetUpdatedAtSec;
    if (quietFor < SCRUB_SEEK_DEBOUNCE_SEC) {
      return false;
    }

    state.appliedSec = target;
    state.lastSeekAtSec = nowSec;
    player.seekTo(target);
    return true;
  }, []);

  const setScrubbing = useCallback((scrubbing: boolean) => {
    isScrubbingRef.current = scrubbing;
    scrubSeekRef.current = {
      targetSec: null,
      appliedSec: Number.NaN,
      lastSeekAtSec: -1,
      lastSeenTargetSec: Number.NaN,
      targetUpdatedAtSec: -1,
    };
  }, []);

  return {
    copyLatestFrame,
    durationSec,
    error,
    isPlaying,
    isPlayingRef,
    isScrubbingRef,
    pausePlayback,
    peekHeldFrame,
    positionSec,
    resumePlayback,
    seekTo,
    setScrubTarget,
    setScrubbing,
    status,
    tickScrubSeek,
    togglePlayback,
    videoAspect,
  };
}
