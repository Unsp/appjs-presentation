import { LegendList, LegendListRenderItemProps } from "@legendapp/list/react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FeedPlaybackProvider } from "~screens/VideoScreen/model/FeedPlaybackContext";
import { findActivePostIdForViewportCenter } from "~screens/VideoScreen/model/feedPostLayout";
import {
  FEED_POSTS,
  type FeedPost,
} from "~screens/VideoScreen/model/feedPosts";
import { FeedBottomNav } from "~screens/VideoScreen/ui/components/FeedBottomNav";
import { FeedPostCard } from "~screens/VideoScreen/ui/components/FeedPostCard";

export function VideoScreen() {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const [listHeight, setListHeight] = useState(0);
  const [activePostId, setActivePostId] = useState<string>(FEED_POSTS[0]?.id ?? "");
  const [isMuted, setIsMuted] = useState(true);

  const toggleMuted = useCallback(() => {
    setIsMuted((current) => !current);
  }, []);

  const syncActivePost = useCallback(
    (scrollY: number) => {
      if (listHeight <= 0) {
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
    syncActivePost(0);
  }, [syncActivePost]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      syncActivePost(event.nativeEvent.contentOffset.y);
    },
    [syncActivePost],
  );

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<FeedPost>) => (
      <FeedPostCard post={item} />
    ),
    [],
  );

  return (
    <FeedPlaybackProvider
      activePostId={activePostId}
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
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />
        </View>

        <FeedBottomNav activeTab="home" />
      </View>
    </FeedPlaybackProvider>
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
});
