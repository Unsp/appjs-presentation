import { useCallback, useRef } from "react";
import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";

type VideoScrubberProps = {
  durationSec: number;
  positionSec: number;
  onScrubStart: () => void;
  onScrubEnd: (seconds: number) => void;
  onScrubMove: (seconds: number) => void;
};

export function VideoScrubber({
  durationSec,
  onScrubStart,
  onScrubEnd,
  onScrubMove,
}: VideoScrubberProps) {
  const trackWidthRef = useRef(0);
  const onScrubStartRef = useRef(onScrubStart);
  const onScrubEndRef = useRef(onScrubEnd);
  const onScrubMoveRef = useRef(onScrubMove);
  const durationSecRef = useRef(durationSec);

  onScrubStartRef.current = onScrubStart;
  onScrubEndRef.current = onScrubEnd;
  onScrubMoveRef.current = onScrubMove;
  durationSecRef.current = durationSec;

  const positionFromX = useCallback((x: number) => {
    const width = trackWidthRef.current;
    const duration = durationSecRef.current;
    if (width <= 0 || duration <= 0) {
      return 0;
    }
    const ratio = Math.max(0, Math.min(x / width, 1));
    return ratio * duration;
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => {
        onScrubStartRef.current();
        onScrubMoveRef.current(positionFromX(event.nativeEvent.locationX));
      },
      onPanResponderMove: (event) => {
        onScrubMoveRef.current(positionFromX(event.nativeEvent.locationX));
      },
      onPanResponderRelease: (event) => {
        onScrubEndRef.current(positionFromX(event.nativeEvent.locationX));
      },
      onPanResponderTerminate: (event) => {
        onScrubEndRef.current(positionFromX(event.nativeEvent.locationX));
      },
    }),
  ).current;

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    trackWidthRef.current = event.nativeEvent.layout.width;
  }, []);

  return (
    <View
      {...panResponder.panHandlers}
      onLayout={onLayout}
      style={styles.track}
    />
  );
}

const styles = StyleSheet.create({
  track: {
    height: 28,
  },
});
