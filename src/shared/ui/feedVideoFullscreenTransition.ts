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

export type VideoSourceLayout = {
  height: number;
  width: number;
  x: number;
  y: number;
};

const TRANSITION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

export type FeedVideoFullscreenTransition = {
  backdropStyle: ViewStyle;
  chromeStyle: ViewStyle;
  prepareSource: (layout: VideoSourceLayout) => void;
  progress: SharedValue<number>;
  runCollapse: (onFinished?: () => void) => void;
  runExpand: () => void;
  videoStyle: ViewStyle;
};

export function useFeedVideoFullscreenTransition(
  screenWidth: number,
  screenHeight: number,
): FeedVideoFullscreenTransition {
  const progress = useSharedValue(1);
  const sourceX = useSharedValue(0);
  const sourceY = useSharedValue(0);
  const sourceWidth = useSharedValue(screenWidth);
  const sourceHeight = useSharedValue(screenHeight * 0.5);

  const prepareSource = useCallback(
    (layout: VideoSourceLayout) => {
      sourceX.value = layout.x;
      sourceY.value = layout.y;
      sourceWidth.value = layout.width;
      sourceHeight.value = layout.height;
      progress.value = 0;
    },
    [progress, sourceHeight, sourceWidth, sourceX, sourceY],
  );

  const runExpand = useCallback(() => {
    progress.value = withTiming(1, {
      duration: FEED_VIDEO_FULLSCREEN_TRANSITION_MS,
      easing: TRANSITION_EASING,
    });
  }, [progress]);

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
    chromeStyle: chromeStyle as ViewStyle,
    prepareSource,
    progress,
    runCollapse,
    runExpand,
    videoStyle: videoStyle as ViewStyle,
  };
}
