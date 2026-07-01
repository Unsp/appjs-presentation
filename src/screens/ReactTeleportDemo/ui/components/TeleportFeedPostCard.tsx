import { Ionicons } from "@expo/vector-icons";
import { useObservable, useSelector } from "@legendapp/state/react";
import { useVideoPlayer } from "expo-video";
import { useEffect, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Portal } from "react-native-teleport";

import {
  useExpandTeleportVideo,
  useIsTeleportPostActive,
  useIsTeleportPostDockedInHost,
  useIsTeleportPostPresentedInHost,
  useIsTeleportVideoExpanded,
  useTeleportFeedMuted,
  useTeleportFeedTransition,
  useToggleTeleportFeedMuted,
} from "~screens/ReactTeleportDemo/model/TeleportFeedContext";
import { TELEPORT_VIDEO_HOST } from "~screens/ReactTeleportDemo/model/teleportHost";
import { TeleportVideoSurface } from "~screens/ReactTeleportDemo/ui/components/TeleportVideoSurface";
import type { FeedPost } from "~screens/VideoScreen/model/feedPosts";
import { FeedActionBar } from "~screens/VideoScreen/ui/components/FeedActionBar";
import { FeedAvatar } from "~screens/VideoScreen/ui/components/FeedAvatar";

type TeleportFeedPostCardProps = {
  post: FeedPost;
};

export function TeleportFeedPostCard({ post }: TeleportFeedPostCardProps) {
  const { width } = useWindowDimensions();
  const videoHeight = width * 1.15;
  const isActive = useIsTeleportPostActive(post.id);
  const isExpanded = useIsTeleportVideoExpanded(post.id);
  const isPresentedInHost = useIsTeleportPostPresentedInHost(post.id);
  const isDocked = useIsTeleportPostDockedInHost(post.id);
  const isMuted = useTeleportFeedMuted();
  const toggleMuted = useToggleTeleportFeedMuted();
  const expandVideo = useExpandTeleportVideo();
  const transition = useTeleportFeedTransition();
  const isLiked$ = useObservable(false);
  const isLiked = useSelector(() => isLiked$.get());
  const videoWrapRef = useRef<View>(null);

  const player = useVideoPlayer(post.videoSource, (instance) => {
    instance.loop = true;
    instance.muted = true;
  });

  useEffect(() => {
    player.muted = isMuted;
  }, [isMuted, player]);

  const wasExpandedRef = useRef(false);

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  useEffect(() => {
    const returnedToFeed = wasExpandedRef.current && !isPresentedInHost && isActive;
    wasExpandedRef.current = isPresentedInHost;

    if (returnedToFeed) {
      player.play();
    }
  }, [isActive, isPresentedInHost, player]);

  const handleExpand = () => {
    videoWrapRef.current?.measureInWindow((x, y, measuredWidth, measuredHeight) => {
      expandVideo(post.id, {
        height: measuredHeight,
        width: measuredWidth,
        x,
        y,
      });
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <FeedAvatar label={post.avatarLabel} />
          <View style={styles.headerText}>
            <View style={styles.usernameRow}>
              <Text numberOfLines={1} style={styles.username}>
                {post.username}
              </Text>
              {post.isVerified ? (
                <Ionicons color="#0095f6" name="checkmark-circle" size={14} />
              ) : null}
            </View>
            <Text numberOfLines={1} style={styles.subtitle}>
              {post.subtitle}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Pressable accessibilityRole="button" style={styles.followButton}>
            <Text style={styles.followLabel}>Подписаться</Text>
          </Pressable>
          <Pressable accessibilityRole="button" hitSlop={8}>
            <Ionicons color="#f5f5f5" name="ellipsis-horizontal" size={20} />
          </Pressable>
        </View>
      </View>

      <View ref={videoWrapRef} style={[styles.videoWrap, { height: videoHeight, width }]}>
        {isPresentedInHost ? <View style={styles.videoPlaceholder} /> : null}

        <Portal hostName={isPresentedInHost ? TELEPORT_VIDEO_HOST : undefined}>
          <TeleportVideoSurface
            feedHeight={videoHeight}
            feedWidth={width}
            isDocked={isDocked}
            isExpanded={isExpanded}
            isMuted={isMuted}
            isPresentedInHost={isPresentedInHost}
            onExpand={handleExpand}
            onToggleMuted={toggleMuted}
            player={player}
            post={post}
            transition={transition}
          />
        </Portal>

        {isActive && !isPresentedInHost ? (
          <Pressable
            accessibilityLabel={isMuted ? "Включить звук" : "Выключить звук"}
            accessibilityRole="button"
            hitSlop={10}
            onPress={toggleMuted}
            style={styles.muteButton}
          >
            <Ionicons
              color="#ffffff"
              name={isMuted ? "volume-mute" : "volume-high"}
              size={16}
            />
          </Pressable>
        ) : null}
      </View>

      <FeedActionBar
        commentsLabel={post.commentsLabel}
        isLiked={isLiked}
        likesLabel={post.likesLabel}
        onToggleLike={() => {
          isLiked$.set((current) => !current);
        }}
        onToggleSave={() => {}}
        savesLabel={post.savesLabel}
        sharesLabel={post.sharesLabel}
      />

      <View style={styles.likedByRow}>
        <View style={styles.likedByAvatars}>
          <FeedAvatar label="A" size={18} />
          <View style={styles.likedByAvatarOverlap}>
            <FeedAvatar label="M" size={18} />
          </View>
        </View>
        <Text numberOfLines={1} style={styles.likedByText}>
          {post.likedByLabel}
        </Text>
      </View>

      <View style={styles.captionRow}>
        <Text style={styles.captionText}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {post.caption}
        </Text>
        <Text style={styles.dateLabel}>{post.dateLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#000000",
    paddingBottom: 18,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerLeft: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginRight: 8,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  usernameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  username: {
    color: "#f5f5f5",
    fontSize: 14,
    fontWeight: "700",
  },
  subtitle: {
    color: "#a8a8a8",
    fontSize: 12,
  },
  headerActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  followButton: {
    backgroundColor: "#0095f6",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  followLabel: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  videoWrap: {
    backgroundColor: "#111111",
    overflow: "hidden",
    position: "relative",
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#111111",
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
  likedByRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  likedByAvatars: {
    flexDirection: "row",
  },
  likedByAvatarOverlap: {
    marginLeft: -8,
  },
  likedByText: {
    color: "#f5f5f5",
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },
  captionRow: {
    gap: 4,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  captionText: {
    color: "#f5f5f5",
    fontSize: 14,
    lineHeight: 20,
  },
  captionUsername: {
    fontWeight: "700",
  },
  dateLabel: {
    color: "#737373",
    fontSize: 12,
    marginTop: 2,
    textTransform: "lowercase",
  },
});
