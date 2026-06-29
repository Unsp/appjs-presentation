import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { FeedPost } from "~screens/VideoScreen/model/feedPosts";
import {
  clearFeedVideoTransitionSource,
  getFeedVideoTransitionSource,
} from "~screens/VideoScreen/model/feedVideoTransitionStore";
import { FeedAvatar } from "~screens/VideoScreen/ui/components/FeedAvatar";
import { ReelsSideActions } from "~screens/VideoScreen/ui/components/ReelsSideActions";
import { useFeedVideoFullscreenTransition } from "~shared/ui/feedVideoFullscreenTransition";
import { FullscreenSwipeDismiss } from "~shared/ui/FullscreenSwipeDismiss";

type ReelsPostSlideProps = {
  isActive: boolean;
  isOpenTarget: boolean;
  post: FeedPost;
};

export function ReelsPostSlide({ isActive, isOpenTarget, post }: ReelsPostSlideProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const [isLiked, setIsLiked] = useState(true);
  const didStartOpenTransition = useRef(false);
  const hasOpenTransition = useRef(isOpenTarget && getFeedVideoTransitionSource() != null);

  const {
    backdropStyle,
    chromeStyle,
    prepareSource,
    runCollapse,
    runExpand,
    videoStyle,
  } = useFeedVideoFullscreenTransition(width, height);

  const player = useVideoPlayer(post.videoSource, (instance) => {
    instance.loop = true;
    instance.muted = false;
  });

  useEffect(() => {
    if (isActive) {
      player.play();
      return;
    }

    player.pause();
  }, [isActive, player]);

  useEffect(() => {
    if (!isOpenTarget || didStartOpenTransition.current) {
      return;
    }

    const sourceLayout = getFeedVideoTransitionSource();
    if (sourceLayout == null) {
      return;
    }

    didStartOpenTransition.current = true;
    prepareSource(sourceLayout);
    requestAnimationFrame(() => {
      runExpand();
    });
  }, [isOpenTarget, prepareSource, runExpand]);

  const handleBack = () => {
    if (hasOpenTransition.current && getFeedVideoTransitionSource() != null) {
      runCollapse(() => {
        clearFeedVideoTransitionSource();
        router.back();
      });
      return;
    }

    router.back();
  };

  const chrome = (
    <>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable
          accessibilityLabel="Назад"
          accessibilityRole="button"
          hitSlop={12}
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons color="#ffffff" name="chevron-back" size={28} />
        </Pressable>

        <View style={styles.topTitleRow}>
          <Text style={styles.reelsTitle}>Reels</Text>
          <Text style={[styles.friendsTitle, styles.shadowText]}>Друзья</Text>
          <View style={styles.friendAvatars}>
            <FeedAvatar label="A" size={22} />
            <View style={styles.friendAvatarOverlap}>
              <FeedAvatar label="M" size={22} />
            </View>
          </View>
        </View>

        <View style={styles.topSpacer} />
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
              <Text numberOfLines={1} style={[styles.username, styles.shadowText]}>
                {post.username}
              </Text>
              {post.isVerified ? (
                <Ionicons color="#0095f6" name="checkmark-circle" size={14} />
              ) : null}
              <Pressable accessibilityRole="button" style={styles.followButton}>
                <Text style={styles.followLabel}>Подписаться</Text>
              </Pressable>
            </View>

            <View style={styles.audioRow}>
              <Ionicons color="#ffffff" name="musical-notes" size={14} />
              <Text numberOfLines={1} style={[styles.audioLabel, styles.shadowText]}>
                {post.audioLabel}
              </Text>
            </View>

            <Text numberOfLines={2} style={[styles.reelsCaption, styles.shadowText]}>
              {post.reelsCaption}
            </Text>

            <Text numberOfLines={1} style={[styles.likedByDetailed, styles.shadowText]}>
              {post.likedByDetailed}
            </Text>
          </View>

          <ReelsSideActions
            commentsLabel={post.commentsLabel}
            isLiked={isLiked}
            likesLabel={post.likesLabel}
            onToggleLike={() => {
              setIsLiked((current) => !current);
            }}
            sharesLabel={post.sharesLabel}
          />
        </View>

        <View style={styles.commentBar}>
          <Text style={styles.commentPlaceholder}>Добавьте комментарий…</Text>
        </View>
      </View>
    </>
  );

  if (hasOpenTransition.current) {
    return (
      <FullscreenSwipeDismiss onDismiss={handleBack} style={{ height, width }}>
        <View style={[styles.root, styles.transparentRoot, { height, width }]}>
          <Animated.View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
          />

          <Animated.View style={videoStyle}>
            <VideoView
              contentFit="cover"
              nativeControls={false}
              player={player}
              style={styles.video}
            />
          </Animated.View>

          <Animated.View pointerEvents="box-none" style={[StyleSheet.absoluteFill, chromeStyle]}>
            {chrome}
          </Animated.View>
        </View>
      </FullscreenSwipeDismiss>
    );
  }

  return (
    <FullscreenSwipeDismiss onDismiss={handleBack} style={{ height, width }}>
      <View style={[styles.root, { height, width }]}>
        <VideoView
          contentFit="cover"
          nativeControls={false}
          player={player}
          style={{ height, width }}
        />
        {chrome}
      </View>
    </FullscreenSwipeDismiss>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#000000",
    overflow: "hidden",
  },
  transparentRoot: {
    backgroundColor: "transparent",
  },
  backdrop: {
    backgroundColor: "#000000",
  },
  video: {
    height: "100%",
    width: "100%",
  },
  shadowText: {
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
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
  topTitleRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  reelsTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  friendsTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.85,
  },
  friendAvatars: {
    flexDirection: "row",
  },
  friendAvatarOverlap: {
    marginLeft: -8,
  },
  topSpacer: {
    width: 36,
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
    maxWidth: 120,
  },
  followButton: {
    borderColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  followLabel: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  audioRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  audioLabel: {
    color: "#ffffff",
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },
  reelsCaption: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 19,
  },
  likedByDetailed: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.92,
  },
  commentBar: {
    backgroundColor: "rgba(38, 38, 38, 0.92)",
    borderRadius: 24,
    marginHorizontal: 14,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  commentPlaceholder: {
    color: "#a8a8a8",
    fontSize: 14,
  },
});
