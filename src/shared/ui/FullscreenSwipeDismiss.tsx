import { useCallback, useEffect } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SWIPE_DISMISS_THRESHOLD = 72;
const SWIPE_DISMISS_VELOCITY = 700;

type FullscreenSwipeDismissProps = {
  children: React.ReactNode;
  enabled?: boolean;
  onDismiss: () => void;
  style?: StyleProp<ViewStyle>;
};

export function FullscreenSwipeDismiss({
  children,
  enabled = true,
  onDismiss,
  style,
}: FullscreenSwipeDismissProps) {
  const translateX = useSharedValue(0);
  const isDismissing = useSharedValue(false);

  const dismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    if (enabled) {
      return;
    }

    translateX.value = 0;
    isDismissing.value = false;
  }, [enabled, isDismissing, translateX]);

  const panGesture = Gesture.Pan()
    .enabled(enabled)
    .activeOffsetX(16)
    .failOffsetY([-24, 24])
    .onUpdate((event) => {
      if (isDismissing.value || event.translationX <= 0) {
        return;
      }

      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (isDismissing.value) {
        return;
      }

      const shouldDismiss =
        event.translationX > SWIPE_DISMISS_THRESHOLD ||
        event.velocityX > SWIPE_DISMISS_VELOCITY;

      if (shouldDismiss) {
        isDismissing.value = true;
        translateX.value = 0;
        runOnJS(dismiss)();
        return;
      }

      translateX.value = withTiming(0, { duration: 180 });
    })
    .onFinalize(() => {
      if (isDismissing.value) {
        return;
      }

      translateX.value = withTiming(0, { duration: 180 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - Math.min(translateX.value / 320, 0.35),
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        pointerEvents={enabled ? "auto" : "box-none"}
        style={[style, animatedStyle]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
