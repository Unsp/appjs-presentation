import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  useCollapseTeleportVideo,
  useTeleportFeedMuted,
  useToggleTeleportFeedMuted,
} from "~screens/ReactTeleportDemo/model/TeleportFeedContext";
import type { FeedPost } from "~screens/VideoScreen/model/feedPosts";
import { FeedAvatar } from "~screens/VideoScreen/ui/components/FeedAvatar";
import { ReelsSideActions } from "~screens/VideoScreen/ui/components/ReelsSideActions";

type TeleportFullscreenChromeProps = {
  post: FeedPost;
};

export function TeleportFullscreenChrome({ post }: TeleportFullscreenChromeProps) {
  const insets = useSafeAreaInsets();
  const collapseVideo = useCollapseTeleportVideo();
  const isMuted = useTeleportFeedMuted();
  const toggleMuted = useToggleTeleportFeedMuted();

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable
          accessibilityLabel="Закрыть"
          accessibilityRole="button"
          hitSlop={12}
          onPress={collapseVideo}
          style={styles.backButton}
        >
          <Ionicons color="#ffffff" name="chevron-back" size={28} />
        </Pressable>
        <Text style={styles.badge}>Teleport</Text>
        <Pressable
          accessibilityLabel={isMuted ? "Включить звук" : "Выключить звук"}
          accessibilityRole="button"
          hitSlop={12}
          onPress={toggleMuted}
          style={styles.backButton}
        >
          <Ionicons
            color="#ffffff"
            name={isMuted ? "volume-mute" : "volume-high"}
            size={22}
          />
        </Pressable>
      </View>

      <View
        style={[
          styles.bottomArea,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <View style={styles.bottomContent}>
          <View style={styles.metaColumn}>
            <View style={styles.profileRow}>
              <FeedAvatar label={post.avatarLabel} size={34} />
              <Text numberOfLines={1} style={styles.username}>
                {post.username}
              </Text>
              {post.isVerified ? (
                <Ionicons color="#0095f6" name="checkmark-circle" size={14} />
              ) : null}
            </View>
            <Text numberOfLines={2} style={styles.reelsCaption}>
              {post.reelsCaption}
            </Text>
          </View>

          <ReelsSideActions
            commentsLabel={post.commentsLabel}
            isLiked
            likesLabel={post.likesLabel}
            onToggleLike={() => {}}
            sharesLabel={post.sharesLabel}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 12,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
  },
  backButton: {
    alignItems: "center",
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  badge: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    opacity: 0.9,
  },
  bottomArea: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  bottomContent: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 14,
  },
  metaColumn: {
    flex: 1,
    gap: 8,
    paddingBottom: 10,
  },
  profileRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  username: {
    color: "#ffffff",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "700",
    maxWidth: 160,
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  reelsCaption: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 19,
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
