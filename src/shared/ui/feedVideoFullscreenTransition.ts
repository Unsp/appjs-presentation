import { useCallback } from "react";
import { type ViewStyle } from "react-native";
import {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const FEED_VIDEO_FULLSCREEN_TRANSITION_MS = 320;
export const FEED_VIDEO_REPARENT_FADE_MS = 80;
export const FEED_VIDEO_UNDOCK_FADE_MS = 60;

export type VideoSourceLayout = {
  height: number;
  width: number;
  x: number;
  y: number;
};

const TRANSITION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

export type FeedVideoFullscreenTransition = {
  backdropStyle: ViewStyle;
  beginExpandFromInline: (layout: VideoSourceLayout) => void;
  chromeStyle: ViewStyle;
  clearDockedAnchor: () => void;
  commitExpandInHost: () => void;
  completeReparent: () => void;
  dockedAnchorScrollY: SharedValue<number>;
  dockedAnchorY: SharedValue<number>;
  isDocked: SharedValue<number>;
  prepareSource: (layout: VideoSourceLayout) => void;
  prepareSourceFromDocked: (layout: VideoSourceLayout) => void;
  presentedInHost: SharedValue<number>;
  progress: SharedValue<number>;
  revealAndExpand: () => void;
  runCollapse: (onFinished?: () => void) => void;
  runCollapseWithReparent: (onFinished?: () => void) => void;
  runExpand: () => void;
  runUndock: (onFinished?: () => void) => void;
  screenHeight: number;
  screenWidth: number;
  setDockedAnchor: (layout: VideoSourceLayout, scrollY: number) => void;
  sourceHeight: SharedValue<number>;
  sourceWidth: SharedValue<number>;
  sourceX: SharedValue<number>;
  sourceY: SharedValue<number>;
  syncDockedScrollY: (scrollY: number) => void;
  updateSourceLayout: (layout: VideoSourceLayout) => void;
  videoOpacity: SharedValue<number>;
  videoStyle: ViewStyle;
};

export function useFeedVideoFullscreenTransition(
  screenWidth: number,
  screenHeight: number,
): FeedVideoFullscreenTransition {
  const progress = useSharedValue(1);
  const videoOpacity = useSharedValue(1);
  const presentedInHost = useSharedValue(0);
  const sourceX = useSharedValue(0);
  const sourceY = useSharedValue(0);
  const sourceWidth = useSharedValue(screenWidth);
  const sourceHeight = useSharedValue(screenHeight * 0.5);
  const isDocked = useSharedValue(0);
  const dockedAnchorY = useSharedValue(0);
  const dockedAnchorScrollY = useSharedValue(0);

  const clearDockedAnchor = useCallback(() => {
    isDocked.value = 0;
  }, [isDocked]);

  const setDockedAnchor = useCallback(
    (layout: VideoSourceLayout, scrollY: number) => {
      sourceX.value = layout.x;
      sourceY.value = layout.y;
      sourceWidth.value = layout.width;
      sourceHeight.value = layout.height;
      dockedAnchorY.value = layout.y;
      dockedAnchorScrollY.value = scrollY;
      isDocked.value = 1;
    },
    [dockedAnchorScrollY, dockedAnchorY, isDocked, sourceHeight, sourceWidth, sourceX, sourceY],
  );

  const syncDockedScrollY = useCallback(
    (scrollY: number) => {
      if (isDocked.value === 0) {
        return;
      }

      sourceY.value = dockedAnchorY.value - (scrollY - dockedAnchorScrollY.value);
    },
    [dockedAnchorScrollY, dockedAnchorY, isDocked, sourceY],
  );

  const prepareSourceFromDocked = useCallback(
    (layout: VideoSourceLayout) => {
      clearDockedAnchor();
      sourceX.value = layout.x;
      sourceY.value = layout.y;
      sourceWidth.value = layout.width;
      sourceHeight.value = layout.height;
      progress.value = 0;
      videoOpacity.value = 1;
      presentedInHost.value = 1;
    },
    [clearDockedAnchor, presentedInHost, progress, sourceHeight, sourceWidth, sourceX, sourceY, videoOpacity],
  );

  const beginExpandFromInline = useCallback(
    (layout: VideoSourceLayout) => {
      clearDockedAnchor();
      sourceX.value = layout.x;
      sourceY.value = layout.y;
      sourceWidth.value = layout.width;
      sourceHeight.value = layout.height;
      videoOpacity.value = 0;
    },
    [clearDockedAnchor, sourceHeight, sourceWidth, sourceX, sourceY, videoOpacity],
  );

  const commitExpandInHost = useCallback(() => {
    presentedInHost.value = 1;
    progress.value = 0;
  }, [presentedInHost, progress]);

  const revealAndExpand = useCallback(() => {
    videoOpacity.value = 1;
    presentedInHost.value = 1;
    progress.value = withTiming(1, {
      duration: FEED_VIDEO_FULLSCREEN_TRANSITION_MS,
      easing: TRANSITION_EASING,
    });
  }, [presentedInHost, progress, videoOpacity]);

  const prepareSource = useCallback(
    (layout: VideoSourceLayout) => {
      clearDockedAnchor();
      sourceX.value = layout.x;
      sourceY.value = layout.y;
      sourceWidth.value = layout.width;
      sourceHeight.value = layout.height;
      progress.value = 0;
      videoOpacity.value = 1;
      presentedInHost.value = 1;
    },
    [clearDockedAnchor, presentedInHost, progress, sourceHeight, sourceWidth, sourceX, sourceY, videoOpacity],
  );

  const updateSourceLayout = useCallback(
    (layout: VideoSourceLayout) => {
      sourceX.value = layout.x;
      sourceY.value = layout.y;
      sourceWidth.value = layout.width;
      sourceHeight.value = layout.height;
    },
    [sourceHeight, sourceWidth, sourceX, sourceY],
  );

  const runExpand = useCallback(() => {
    videoOpacity.value = 1;
    presentedInHost.value = 1;
    progress.value = withTiming(1, {
      duration: FEED_VIDEO_FULLSCREEN_TRANSITION_MS,
      easing: TRANSITION_EASING,
    });
  }, [presentedInHost, progress, videoOpacity]);

  const runCollapse = useCallback(
    (onFinished?: () => void) => {
      progress.value = withTiming(
        0,
        {
          duration: FEED_VIDEO_FULLSCREEN_TRANSITION_MS,
          easing: TRANSITION_EASING,
        },
        (finished) => {
          if (!finished || onFinished == null) {
            return;
          }

          runOnJS(onFinished)();
        },
      );
    },
    [progress],
  );

  const runCollapseWithReparent = useCallback(
    (onFinished?: () => void) => {
      progress.value = withTiming(
        0,
        {
          duration: FEED_VIDEO_FULLSCREEN_TRANSITION_MS,
          easing: TRANSITION_EASING,
        },
        (finished) => {
          if (!finished) {
            return;
          }

          videoOpacity.value = withTiming(
            0,
            { duration: FEED_VIDEO_REPARENT_FADE_MS },
            (fadeFinished) => {
              if (!fadeFinished || onFinished == null) {
                return;
              }

              presentedInHost.value = 0;
              progress.value = 1;
              runOnJS(onFinished)();
            },
          );
        },
      );
    },
    [presentedInHost, progress, videoOpacity],
  );

  const completeReparent = useCallback(() => {
    videoOpacity.value = 1;
  }, [videoOpacity]);

  const finishUndock = useCallback(
    (onFinished?: () => void) => {
      onFinished?.();
      clearDockedAnchor();
      videoOpacity.value = 1;
    },
    [clearDockedAnchor, videoOpacity],
  );

  const runUndock = useCallback(
    (onFinished?: () => void) => {
      videoOpacity.value = withTiming(
        0,
        { duration: FEED_VIDEO_UNDOCK_FADE_MS },
        (finished) => {
          if (!finished) {
            return;
          }

          presentedInHost.value = 0;
          progress.value = 1;
          runOnJS(finishUndock)(onFinished);
        },
      );
    },
    [finishUndock, presentedInHost, progress, videoOpacity],
  );

  const videoStyle = useAnimatedStyle(() => {
    const p = progress.value;

    return {
      height: sourceHeight.value + (screenHeight - sourceHeight.value) * p,
      left: sourceX.value + (0 - sourceX.value) * p,
      position: "absolute",
      top: sourceY.value + (0 - sourceY.value) * p,
      width: sourceWidth.value + (screenWidth - sourceWidth.value) * p,
    };
  }, [screenHeight, screenWidth]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.92,
  }));

  const chromeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.35, 1], [0, 1], Extrapolation.CLAMP),
  }));

  return {
    backdropStyle: backdropStyle as ViewStyle,
    beginExpandFromInline,
    chromeStyle: chromeStyle as ViewStyle,
    clearDockedAnchor,
    commitExpandInHost,
    completeReparent,
    dockedAnchorScrollY,
    dockedAnchorY,
    isDocked,
    prepareSource,
    prepareSourceFromDocked,
    presentedInHost,
    progress,
    revealAndExpand,
    runCollapse,
    runCollapseWithReparent,
    runExpand,
    runUndock,
    screenHeight,
    screenWidth,
    setDockedAnchor,
    sourceHeight,
    sourceWidth,
    sourceX,
    sourceY,
    syncDockedScrollY,
    updateSourceLayout,
    videoOpacity,
    videoStyle: videoStyle as ViewStyle,
  };
}
