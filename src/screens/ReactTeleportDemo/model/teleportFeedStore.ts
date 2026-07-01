import { observable } from "@legendapp/state";

import {
  findActivePostIdForViewportCenter,
  getFeedPostVideoWindowLayout,
} from "~screens/VideoScreen/model/feedPostLayout";
import { FEED_POSTS } from "~screens/VideoScreen/model/feedPosts";
import type { VideoSourceLayout } from "~shared/ui/feedVideoFullscreenTransition";
import type { FeedVideoFullscreenTransition } from "~shared/ui/feedVideoFullscreenTransition";

export type TeleportFeedStore = ReturnType<typeof createTeleportFeedStore>;

export function createTeleportFeedStore() {
  return observable({
    activePostId: FEED_POSTS[0]?.id ?? "",
    collapsingPostId: null as string | null,
    dockedPostId: null as string | null,
    expandedPostId: null as string | null,
    expandedVideoLayout: null as VideoSourceLayout | null,
    isMuted: true,
    listHeight: 0,
    safeAreaTop: 0,
    screenWidth: 0,
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
  store$.collapsingPostId.set(null);

  const wasDocked = store$.dockedPostId.get() === postId;
  const hadOtherDocked =
    store$.dockedPostId.get() != null && store$.dockedPostId.get() !== postId;

  if (hadOtherDocked) {
    store$.dockedPostId.set(null);
    transition.clearDockedAnchor();
    transition.presentedInHost.value = 0;
    transition.progress.value = 1;
    transition.videoOpacity.value = 1;
  } else {
    store$.dockedPostId.set(null);
  }

  store$.expandedVideoLayout.set(layout);
  store$.expandedPostId.set(postId);
  store$.activePostId.set(postId);

  if (wasDocked) {
    transition.prepareSourceFromDocked(layout);
    requestAnimationFrame(() => {
      transition.runExpand();
    });
    return;
  }

  transition.beginExpandFromInline(layout);

  requestAnimationFrame(() => {
    transition.commitExpandInHost();
    requestAnimationFrame(() => {
      transition.revealAndExpand();
    });
  });
}

export function collapseTeleportVideo(
  store$: TeleportFeedStore,
  transition: FeedVideoFullscreenTransition,
): void {
  const expandedPostId = store$.expandedPostId.get();
  if (expandedPostId == null) {
    return;
  }

  const anchorLayout =
    store$.expandedVideoLayout.get() ??
    getFeedPostVideoWindowLayout(
      expandedPostId,
      store$.scrollY.get(),
      store$.safeAreaTop.get(),
      store$.screenWidth.get(),
      FEED_POSTS,
    );

  if (anchorLayout != null) {
    transition.updateSourceLayout(anchorLayout);
  }

  store$.collapsingPostId.set(expandedPostId);

  transition.runCollapse(() => {
    if (anchorLayout == null) {
      finishTeleportCollapseDock(store$, transition, expandedPostId);
      return;
    }

    finishTeleportCollapseDock(
      store$,
      transition,
      expandedPostId,
      anchorLayout,
      store$.scrollY.get(),
    );
  });
}

function finishTeleportCollapseDock(
  store$: TeleportFeedStore,
  transition: FeedVideoFullscreenTransition,
  postId: string,
  anchorLayout?: VideoSourceLayout,
  anchorScrollY?: number,
): void {
  store$.expandedPostId.set(null);
  store$.collapsingPostId.set(null);
  store$.dockedPostId.set(postId);
  transition.presentedInHost.value = 1;
  transition.progress.value = 0;
  transition.videoOpacity.value = 1;

  if (anchorLayout != null && anchorScrollY != null) {
    transition.setDockedAnchor(anchorLayout, anchorScrollY);
  }
}

export function undockTeleportVideo(
  store$: TeleportFeedStore,
  transition: FeedVideoFullscreenTransition,
): void {
  if (store$.dockedPostId.get() == null) {
    return;
  }

  transition.runUndock(() => {
    store$.dockedPostId.set(null);
    store$.expandedVideoLayout.set(null);
  });
}

export function syncDockedVideoLayout(
  store$: TeleportFeedStore,
  transition: FeedVideoFullscreenTransition,
): void {
  if (store$.dockedPostId.get() == null) {
    return;
  }

  transition.syncDockedScrollY(store$.scrollY.get());
}

export function setTeleportLayoutMetrics(
  store$: TeleportFeedStore,
  safeAreaTop: number,
  screenWidth: number,
): void {
  store$.safeAreaTop.set(safeAreaTop);
  store$.screenWidth.set(screenWidth);
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
  transition?: FeedVideoFullscreenTransition,
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

  const dockedPostId = store$.dockedPostId.get();
  if (
    transition != null &&
    dockedPostId != null &&
    nextId !== dockedPostId
  ) {
    undockTeleportVideo(store$, transition);
  }

  store$.activePostId.set((current) => (current === nextId ? current : nextId));
}

export function isTeleportPostPresentedInHost(
  store$: TeleportFeedStore,
  postId: string,
): boolean {
  const expandedPostId = store$.expandedPostId.get();
  const collapsingPostId = store$.collapsingPostId.get();
  const dockedPostId = store$.dockedPostId.get();

  return (
    expandedPostId === postId ||
    collapsingPostId === postId ||
    dockedPostId === postId
  );
}

export function isTeleportPostDockedInHost(
  store$: TeleportFeedStore,
  postId: string,
): boolean {
  return store$.dockedPostId.get() === postId;
}
