import { observable } from "@legendapp/state";

import { findActivePostIdForViewportCenter } from "~screens/VideoScreen/model/feedPostLayout";
import { FEED_POSTS } from "~screens/VideoScreen/model/feedPosts";

export type FeedPlaybackStore = ReturnType<typeof createFeedPlaybackStore>;

export function createFeedPlaybackStore() {
  return observable({
    activePostId: FEED_POSTS[0]?.id ?? "",
    isMuted: true,
    listHeight: 0,
    scrollY: 0,
  });
}

export function toggleFeedPlaybackMuted(store$: FeedPlaybackStore): void {
  store$.isMuted.set((current) => !current);
}

export function setFeedListHeight(store$: FeedPlaybackStore, height: number): void {
  store$.listHeight.set(height);
}

export function setFeedScrollY(store$: FeedPlaybackStore, scrollY: number): void {
  store$.scrollY.set(scrollY);
}

export function setFeedActivePostId(store$: FeedPlaybackStore, postId: string): void {
  store$.activePostId.set((current) => (current === postId ? current : postId));
}

export function syncFeedActivePost(
  store$: FeedPlaybackStore,
  scrollY: number,
  safeAreaTop: number,
  screenWidth: number,
): void {
  const listHeight = store$.listHeight.get();
  if (listHeight <= 0) {
    return;
  }

  const nextId = findActivePostIdForViewportCenter(
    scrollY,
    listHeight,
    safeAreaTop,
    screenWidth,
    FEED_POSTS,
  );

  setFeedActivePostId(store$, nextId);
}
