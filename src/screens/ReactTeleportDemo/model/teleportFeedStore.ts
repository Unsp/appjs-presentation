import { observable } from "@legendapp/state";

import { findActivePostIdForViewportCenter } from "~screens/VideoScreen/model/feedPostLayout";
import { FEED_POSTS } from "~screens/VideoScreen/model/feedPosts";
import type { VideoSourceLayout } from "~shared/ui/feedVideoFullscreenTransition";
import type { FeedVideoFullscreenTransition } from "~shared/ui/feedVideoFullscreenTransition";

export type TeleportFeedStore = ReturnType<typeof createTeleportFeedStore>;

export function createTeleportFeedStore() {
  return observable({
    activePostId: FEED_POSTS[0]?.id ?? "",
    expandedPostId: null as string | null,
    isMuted: true,
    listHeight: 0,
    scrollY: 0,
  });
}

export function toggleTeleportFeedMuted(store$: TeleportFeedStore): void {
  store$.isMuted.set((current) => !current);
}

export function expandTeleportVideo(
  store$: TeleportFeedStore,
  transition: FeedVideoFullscreenTransition,
  postId: string,
  layout: VideoSourceLayout,
): void {
  transition.prepareSource(layout);
  store$.expandedPostId.set(postId);
  store$.activePostId.set(postId);
  requestAnimationFrame(() => {
    transition.runExpand();
  });
}

export function collapseTeleportVideo(
  store$: TeleportFeedStore,
  transition: FeedVideoFullscreenTransition,
): void {
  transition.runCollapse(() => {
    store$.expandedPostId.set(null);
  });
}

export function setTeleportListHeight(store$: TeleportFeedStore, height: number): void {
  store$.listHeight.set(height);
}

export function setTeleportScrollY(store$: TeleportFeedStore, scrollY: number): void {
  store$.scrollY.set(scrollY);
}

export function syncTeleportActivePost(
  store$: TeleportFeedStore,
  scrollY: number,
  safeAreaTop: number,
  screenWidth: number,
): void {
  const listHeight = store$.listHeight.get();
  if (listHeight <= 0 || store$.expandedPostId.get() != null) {
    return;
  }

  const nextId = findActivePostIdForViewportCenter(
    scrollY,
    listHeight,
    safeAreaTop,
    screenWidth,
    FEED_POSTS,
  );

  store$.activePostId.set((current) => (current === nextId ? current : nextId));
}
