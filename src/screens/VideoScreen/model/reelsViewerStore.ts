import { observable } from "@legendapp/state";

import { FEED_POSTS } from "~screens/VideoScreen/model/feedPosts";

export type ReelsViewerStore = ReturnType<typeof createReelsViewerStore>;

export function createReelsViewerStore(initialPostId: string) {
  return observable({
    activePostId: initialPostId || FEED_POSTS[0]?.id || "",
  });
}

export function setReelsActivePostId(store$: ReelsViewerStore, postId: string): void {
  store$.activePostId.set(postId);
}
