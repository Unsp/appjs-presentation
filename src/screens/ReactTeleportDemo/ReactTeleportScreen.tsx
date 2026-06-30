import { LegendList, LegendListRenderItemProps } from "@legendapp/list/react-native";
import { useSelector } from "@legendapp/state/react";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo } from "react";
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

import {
  TeleportFeedProvider,
  useCollapseTeleportVideo,
  useTeleportFeedExpandedPostId,
  useTeleportFeedStore,
  useTeleportFullscreenBackdropStyle,
} from "~screens/ReactTeleportDemo/model/TeleportFeedContext";
import {
  setTeleportListHeight,
  setTeleportScrollY,
  syncTeleportActivePost,
} from "~screens/ReactTeleportDemo/model/teleportFeedStore";
import { TELEPORT_VIDEO_HOST } from "~screens/ReactTeleportDemo/model/teleportHost";
import { TeleportFeedPostCard } from "~screens/ReactTeleportDemo/ui/components/TeleportFeedPostCard";
import {
  FEED_POSTS,
  type FeedPost,
} from "~screens/VideoScreen/model/feedPosts";
import { FeedBottomNav } from "~screens/VideoScreen/ui/components/FeedBottomNav";
import { useFeedVideoFullscreenTransition } from "~shared/ui/feedVideoFullscreenTransition";
import { FullscreenSwipeDismiss } from "~shared/ui/FullscreenSwipeDismiss";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TeleportFullscreenOverlay() {
  const collapseVideo = useCollapseTeleportVideo();
  const fullscreenBackdropStyle = useTeleportFullscreenBackdropStyle();

  return (
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
  );
}

function TeleportFeedList({
  safeAreaTop,
  screenWidth,
}: {
  safeAreaTop: number;
  screenWidth: number;
}) {
  const store$ = useTeleportFeedStore();
  const expandedPostId = useSelector(() => store$.expandedPostId.get());

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      setTeleportScrollY(store$, scrollY);
      syncTeleportActivePost(store$, scrollY, safeAreaTop, screenWidth);
    },
    [safeAreaTop, screenWidth, store$],
  );

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<FeedPost>) => (
      <TeleportFeedPostCard post={item} />
    ),
    [],
  );

  return (
    <View
      onLayout={(event) => {
        setTeleportListHeight(store$, event.nativeEvent.layout.height);
      }}
      style={styles.listWrap}
    >
      <LegendList
        contentContainerStyle={{ paddingTop: safeAreaTop }}
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
  );
}

function TeleportFeedBootstrap({
  safeAreaTop,
  screenWidth,
}: {
  safeAreaTop: number;
  screenWidth: number;
}) {
  const store$ = useTeleportFeedStore();

  useEffect(() => {
    const listHeight = store$.listHeight.get();
    if (listHeight <= 0) {
      return;
    }

    syncTeleportActivePost(store$, store$.scrollY.get(), safeAreaTop, screenWidth);
  }, [safeAreaTop, screenWidth, store$]);

  useEffect(() => {
    return store$.listHeight.onChange(({ value }) => {
      if (value <= 0) {
        return;
      }

      syncTeleportActivePost(store$, store$.scrollY.get(), safeAreaTop, screenWidth);
    });
  }, [safeAreaTop, screenWidth, store$]);

  return null;
}

function TeleportPortalHost() {
  const expandedPostId = useTeleportFeedExpandedPostId();

  if (expandedPostId != null) {
    return <TeleportFullscreenOverlay />;
  }

  return (
    <PortalHost
      name={TELEPORT_VIDEO_HOST}
      style={styles.portalHostHidden}
    />
  );
}

export function ReactTeleportScreen() {
  const insets = useSafeAreaInsets();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const transition = useFeedVideoFullscreenTransition(screenWidth, screenHeight);

  const layout = useMemo(
    () => ({
      safeAreaTop: insets.top,
      screenWidth,
    }),
    [insets.top, screenWidth],
  );

  return (
    <PortalProvider>
      <TeleportFeedProvider transition={transition}>
        <View style={styles.root}>
          <StatusBar style="light" />

          <TeleportFeedBootstrap
            safeAreaTop={layout.safeAreaTop}
            screenWidth={layout.screenWidth}
          />

          <TeleportFeedList
            safeAreaTop={layout.safeAreaTop}
            screenWidth={layout.screenWidth}
          />

          <FeedBottomNav activeTab="home" />
          <TeleportPortalHost />
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
