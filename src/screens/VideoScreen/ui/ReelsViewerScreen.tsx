import { StatusBar } from "expo-status-bar";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewToken,
} from "react-native";

import {
  FEED_POSTS,
  type FeedPost,
  getFeedPostIndex,
} from "~screens/VideoScreen/model/feedPosts";
import { ReelsPostSlide } from "~screens/VideoScreen/ui/components/ReelsPostSlide";

type ReelsViewerScreenProps = {
  initialPostId: string;
};

export function ReelsViewerScreen({ initialPostId }: ReelsViewerScreenProps) {
  const { height } = useWindowDimensions();
  const initialIndex = getFeedPostIndex(initialPostId);
  const [activePostId, setActivePostId] = useState<string>(
    FEED_POSTS[initialIndex]?.id ?? FEED_POSTS[0]?.id ?? "",
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<FeedPost>[] }) => {
      const nextActiveId = viewableItems.find((item) => item.isViewable)?.item.id;
      if (nextActiveId) {
        setActivePostId(nextActiveId);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <FlatList
        data={FEED_POSTS}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          index,
          length: height,
          offset: height * index,
        })}
        initialScrollIndex={initialIndex}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
        renderItem={({ item }) => (
          <ReelsPostSlide isActive={item.id === activePostId} post={item} />
        )}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={height}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#000000",
    flex: 1,
  },
});
