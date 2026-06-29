import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import {
  useFeedMuted,
  useIsFeedPostActive,
  useToggleFeedMuted,
} from "~screens/VideoScreen/model/FeedPlaybackContext";
import type { FeedPost } from "~screens/VideoScreen/model/feedPosts";
import {
  setFeedVideoTransitionSource,
} from "~screens/VideoScreen/model/feedVideoTransitionStore";
import { FeedActionBar } from "~screens/VideoScreen/ui/components/FeedActionBar";
import { FeedAvatar } from "~screens/VideoScreen/ui/components/FeedAvatar";

type FeedPostCardProps = {
  post: FeedPost;
};

export function FeedPostCard({ post }: FeedPostCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = useIsFeedPostActive(post.id);
  const isMuted = useFeedMuted();
  const toggleMuted = useToggleFeedMuted();
  const isFeedVisible = !pathname.startsWith("/reels");
  const { width } = useWindowDimensions();
  const videoHeight = width * 1.15;
  const [isLiked, setIsLiked] = useState(false);
  const videoWrapRef = useRef<View>(null);

  const player = useVideoPlayer(post.videoSource, (instance) => {
    instance.loop = true;
    instance.muted = true;
  });

  useEffect(() => {
    player.muted = isMuted;
  }, [isMuted, player]);

  useEffect(() => {
    if (isActive && isFeedVisible) {
      player.play();
      return;
    }

    player.pause();
  }, [isActive, isFeedVisible, player]);

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
        <Pressable
          accessibilityLabel="Открыть Reels"
          accessibilityRole="button"
          onPress={() => {
            videoWrapRef.current?.measureInWindow((x, y, measuredWidth, measuredHeight) => {
              setFeedVideoTransitionSource({
                height: measuredHeight,
                width: measuredWidth,
                x,
                y,
              });
              router.push(`/reels/${post.id}`);
            });
          }}
          style={styles.videoPressable}
        >
          <VideoView
            contentFit="cover"
            nativeControls={false}
            player={player}
            style={styles.video}
          />
        </Pressable>

        {isActive ? (
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
          setIsLiked((current) => !current);
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
