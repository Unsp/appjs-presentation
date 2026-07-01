import { Ionicons } from "@expo/vector-icons";
import { type VideoPlayer, VideoView } from "expo-video";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { TeleportFullscreenChrome } from "~screens/ReactTeleportDemo/ui/components/TeleportFullscreenChrome";
import type { FeedPost } from "~screens/VideoScreen/model/feedPosts";
import type { FeedVideoFullscreenTransition } from "~shared/ui/feedVideoFullscreenTransition";

type TeleportVideoSurfaceProps = {
  feedHeight: number;
  feedWidth: number;
  isDocked: boolean;
  isExpanded: boolean;
  isMuted: boolean;
  isPresentedInHost: boolean;
  onExpand: () => void;
  onToggleMuted: () => void;
  player: VideoPlayer;
  post: FeedPost;
  transition: FeedVideoFullscreenTransition;
};

export function TeleportVideoSurface({
  feedHeight,
  feedWidth,
  isDocked,
  isExpanded,
  isMuted,
  isPresentedInHost,
  onExpand,
  onToggleMuted,
  player,
  post,
  transition,
}: TeleportVideoSurfaceProps) {
  const containerStyle = useAnimatedStyle(() => {
    const opacity = transition.videoOpacity.value;

    if (transition.presentedInHost.value === 0) {
      return {
        height: feedHeight,
        left: 0,
        opacity,
        top: 0,
        width: feedWidth,
      };
    }

    const p = transition.progress.value;

    return {
      height:
        transition.sourceHeight.value +
        (transition.screenHeight - transition.sourceHeight.value) * p,
      left: transition.sourceX.value + (0 - transition.sourceX.value) * p,
      opacity,
      position: "absolute" as const,
      top: transition.sourceY.value + (0 - transition.sourceY.value) * p,
      width:
        transition.sourceWidth.value +
        (transition.screenWidth - transition.sourceWidth.value) * p,
    };
  }, [feedHeight, feedWidth, transition]);

  const chromeStyle = transition.chromeStyle;
  const canExpandFromHost = isDocked && !isExpanded;

  return (
    <Animated.View style={containerStyle}>
      <Pressable
        accessibilityLabel={
          canExpandFromHost || !isPresentedInHost
            ? "Открыть видео через Teleport"
            : undefined
        }
        accessibilityRole="button"
        disabled={isPresentedInHost && !canExpandFromHost}
        onPress={onExpand}
        style={styles.videoPressable}
      >
        <VideoView
          contentFit="cover"
          nativeControls={false}
          player={player}
          style={styles.video}
        />
      </Pressable>

      {isDocked && !isExpanded ? (
        <Pressable
          accessibilityLabel={isMuted ? "Включить звук" : "Выключить звук"}
          accessibilityRole="button"
          hitSlop={10}
          onPress={onToggleMuted}
          style={styles.muteButton}
        >
          <Ionicons
            color="#ffffff"
            name={isMuted ? "volume-mute" : "volume-high"}
            size={16}
          />
        </Pressable>
      ) : null}

      {isExpanded ? (
        <Animated.View
          pointerEvents="box-none"
          style={[StyleSheet.absoluteFill, chromeStyle]}
        >
          <TeleportFullscreenChrome post={post} />
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  videoPressable: {
    flex: 1,
  },
  video: {
    height: "100%",
    width: "100%",
  },
  muteButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    borderRadius: 16,
    bottom: 14,
    height: 32,
    justifyContent: "center",
    position: "absolute",
    right: 14,
    width: 32,
    zIndex: 2,
  },
});
