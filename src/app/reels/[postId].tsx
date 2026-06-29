import { useLocalSearchParams } from "expo-router";

import { FEED_POSTS } from "~screens/VideoScreen/model/feedPosts";
import { ReelsViewerScreen } from "~screens/VideoScreen/ui/ReelsViewerScreen";

export default function ReelsRoute() {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  return (
    <ReelsViewerScreen
      initialPostId={postId ?? FEED_POSTS[0]?.id ?? "norway-stave-church"}
    />
  );
}
