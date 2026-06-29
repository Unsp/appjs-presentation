import { LegendList, LegendListRenderItemProps } from "@legendapp/list/react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PortalHost, PortalProvider } from "react-native-teleport";

import { TeleportFeedProvider } from "~screens/ReactTeleportDemo/model/TeleportFeedContext";
import { TELEPORT_VIDEO_HOST } from "~screens/ReactTeleportDemo/model/teleportHost";
import { TeleportFeedPostCard } from "~screens/ReactTeleportDemo/ui/components/TeleportFeedPostCard";
import { findActivePostIdForViewportCenter } from "~screens/VideoScreen/model/feedPostLayout";
import {
  FEED_POSTS,
  type FeedPost,
} from "~screens/VideoScreen/model/feedPosts";
import { FeedBottomNav } from "~screens/VideoScreen/ui/components/FeedBottomNav";
import {
  useFeedVideoFullscreenTransition,
  type VideoSourceLayout,
} from "~shared/ui/feedVideoFullscreenTransition";
import { FullscreenSwipeDismiss } from "~shared/ui/FullscreenSwipeDismiss";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ReactTeleportScreen() {
  const insets = useSafeAreaInsets();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const {
    backdropStyle: fullscreenBackdropStyle,
    chromeStyle: fullscreenChromeStyle,
    prepareSource,
    runCollapse,
    runExpand,
    videoStyle: fullscreenVideoStyle,
  } = useFeedVideoFullscreenTransition(screenWidth, screenHeight);
  const [listHeight, setListHeight] = useState(0);
  const [activePostId, setActivePostId] = useState<string>(FEED_POSTS[0]?.id ?? "");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const scrollYRef = useRef(0);
  const expandedPostIdRef = useRef<string | null>(null);
  expandedPostIdRef.current = expandedPostId;

  const toggleMuted = useCallback(() => {
    setIsMuted((current) => !current);
  }, []);

  const expandVideo = useCallback(
    (postId: string, layout: VideoSourceLayout) => {
      prepareSource(layout);
      setExpandedPostId(postId);
      setActivePostId(postId);
      requestAnimationFrame(() => {
        runExpand();
      });
    },
    [prepareSource, runExpand],
  );

  const collapseVideo = useCallback(() => {
    runCollapse(() => {
      setExpandedPostId(null);
    });
  }, [runCollapse]);

  const syncActivePost = useCallback(
    (scrollY: number) => {
      if (listHeight <= 0 || expandedPostIdRef.current != null) {
        return;
      }

      const nextId = findActivePostIdForViewportCenter(
        scrollY,
        listHeight,
        insets.top,
        screenWidth,
        FEED_POSTS,
      );

      setActivePostId((current) => (current === nextId ? current : nextId));
    },
    [insets.top, listHeight, screenWidth],
  );

  useEffect(() => {
    if (listHeight <= 0) {
      return;
    }

    syncActivePost(scrollYRef.current);
  }, [listHeight, syncActivePost]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      scrollYRef.current = scrollY;
      syncActivePost(scrollY);
    },
    [syncActivePost],
  );

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<FeedPost>) => (
      <TeleportFeedPostCard post={item} />
    ),
    [],
  );

  return (
    <PortalProvider>
      <TeleportFeedProvider
        activePostId={activePostId}
        collapseVideo={collapseVideo}
        expandVideo={expandVideo}
        expandedPostId={expandedPostId}
        fullscreenBackdropStyle={fullscreenBackdropStyle}
        fullscreenChromeStyle={fullscreenChromeStyle}
        fullscreenVideoStyle={fullscreenVideoStyle}
        isMuted={isMuted}
        toggleMuted={toggleMuted}
      >
        <View style={styles.root}>
          <StatusBar style="light" />

          <View
            onLayout={(event) => {
              setListHeight(event.nativeEvent.layout.height);
            }}
            style={styles.listWrap}
          >
            <LegendList
              contentContainerStyle={{ paddingTop: insets.top }}
              data={FEED_POSTS}
              keyExtractor={(item) => item.id}
              maintainVisibleContentPosition
              onScroll={onScroll}
              renderItem={renderItem}
              scrollEnabled={expandedPostId == null}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              style={styles.list}
            />
          </View>

          <FeedBottomNav activeTab="home" />

          {expandedPostId != null ? (
            <FullscreenSwipeDismiss
              onDismiss={collapseVideo}
              style={styles.fullscreenOverlay}
            >
              <AnimatedPressable
                accessibilityLabel="Закрыть полноэкранное видео"
                accessibilityRole="button"
                onPress={collapseVideo}
                style={[StyleSheet.absoluteFill, styles.backdrop, fullscreenBackdropStyle]}
              />

              <PortalHost
                name={TELEPORT_VIDEO_HOST}
                style={StyleSheet.absoluteFill}
              />
            </FullscreenSwipeDismiss>
          ) : (
            <PortalHost
              name={TELEPORT_VIDEO_HOST}
              style={styles.portalHostHidden}
            />
          )}
        </View>
      </TeleportFeedProvider>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#000000",
    flex: 1,
  },
  listWrap: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "#000000",
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
  },
  portalHostHidden: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "none",
    zIndex: 20,
  },
});
