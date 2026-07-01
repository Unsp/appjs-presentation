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
  useTeleportFeedOverlayVisible,
  useTeleportFeedStore,
  useTeleportFeedTransition,
  useTeleportFullscreenBackdropStyle,
} from "~screens/ReactTeleportDemo/model/TeleportFeedContext";
import {
  setTeleportLayoutMetrics,
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

function TeleportFullscreenBackdrop() {
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
  const transition = useTeleportFeedTransition();

  useEffect(() => {
    setTeleportLayoutMetrics(store$, safeAreaTop, screenWidth);
  }, [safeAreaTop, screenWidth, store$]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      transition.syncDockedScrollY(scrollY);
      setTeleportScrollY(store$, scrollY);
      syncTeleportActivePost(store$, scrollY, safeAreaTop, screenWidth, transition);
    },
    [safeAreaTop, screenWidth, store$, transition],
  );

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<FeedPost>) => (
      <TeleportFeedPostCard post={item} />
    ),
    [],
  );

  const expandedPostId = useSelector(() => store$.expandedPostId.get());

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
        scrollEventThrottle={1}
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
  const transition = useTeleportFeedTransition();

  useEffect(() => {
    const listHeight = store$.listHeight.get();
    if (listHeight <= 0) {
      return;
    }

    syncTeleportActivePost(
      store$,
      store$.scrollY.get(),
      safeAreaTop,
      screenWidth,
      transition,
    );
  }, [safeAreaTop, screenWidth, store$, transition]);

  useEffect(() => {
    return store$.listHeight.onChange(({ value }) => {
      if (value <= 0) {
        return;
      }

      syncTeleportActivePost(
        store$,
        store$.scrollY.get(),
        safeAreaTop,
        screenWidth,
        transition,
      );
    });
  }, [safeAreaTop, screenWidth, store$, transition]);

  return null;
}

function TeleportFullscreenLayer() {
  const overlayVisible = useTeleportFeedOverlayVisible();

  if (!overlayVisible) {
    return null;
  }

  return <TeleportFullscreenBackdrop />;
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

          <TeleportFullscreenLayer />

          <PortalHost
            name={TELEPORT_VIDEO_HOST}
            style={styles.portalHost}
          />
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
  portalHost: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "box-none",
    zIndex: 20,
  },
});
