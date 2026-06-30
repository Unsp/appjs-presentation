import {
  LegendList,
  LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { useCallback, useEffect } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useFeedPlaybackStore } from "~screens/VideoScreen/model/FeedPlaybackContext";
import {
  setFeedListHeight,
  setFeedScrollY,
  syncFeedActivePost,
} from "~screens/VideoScreen/model/feedPlaybackStore";
import {
  FEED_POSTS,
  type FeedPost,
} from "~screens/VideoScreen/model/feedPosts";
import { FeedPostCard } from "~screens/VideoScreen/ui/components/FeedPostCard";

function FeedListBootstrap({
  safeAreaTop,
  screenWidth,
}: {
  safeAreaTop: number;
  screenWidth: number;
}) {
  const store$ = useFeedPlaybackStore();

  useEffect(() => {
    return store$.listHeight.onChange(({ value }) => {
      if (value <= 0) {
        return;
      }

      syncFeedActivePost(
        store$,
        store$.scrollY.get(),
        safeAreaTop,
        screenWidth,
      );
    });
  }, [safeAreaTop, screenWidth, store$]);

  return null;
}

function FeedList({
  safeAreaTop,
  screenWidth,
}: {
  safeAreaTop: number;
  screenWidth: number;
}) {
  const store$ = useFeedPlaybackStore();

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      setFeedScrollY(store$, scrollY);
      syncFeedActivePost(store$, scrollY, safeAreaTop, screenWidth);
    },
    [safeAreaTop, screenWidth, store$],
  );

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<FeedPost>) => (
      <FeedPostCard post={item} />
    ),
    [],
  );

  return (
    <View
      onLayout={(event) => {
        setFeedListHeight(store$, event.nativeEvent.layout.height);
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
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}

export function VideoScreen() {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  return (
    <></>
    // <FeedPlaybackProvider>
    //   <View style={styles.root}>
    //     <StatusBar style="light" />

    //     <FeedListBootstrap
    //       safeAreaTop={insets.top}
    //       screenWidth={screenWidth}
    //     />

    //     <FeedList
    //       safeAreaTop={insets.top}
    //       screenWidth={screenWidth}
    //     />

    //     <FeedBottomNav activeTab="home" />
    //   </View>
    // </FeedPlaybackProvider>
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
