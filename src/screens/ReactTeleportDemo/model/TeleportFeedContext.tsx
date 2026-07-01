import { useSelector } from "@legendapp/state/react";
import { createContext, type RefObject,useContext, useMemo, useRef } from "react";
import { type ViewStyle } from "react-native";

import {
  collapseTeleportVideo,
  createTeleportFeedStore,
  expandTeleportVideo,
  isTeleportPostPresentedInHost,
  isTeleportPostDockedInHost,
  type TeleportFeedStore,
  toggleTeleportFeedMuted,
} from "~screens/ReactTeleportDemo/model/teleportFeedStore";
import type {
  FeedVideoFullscreenTransition,
  VideoSourceLayout,
} from "~shared/ui/feedVideoFullscreenTransition";

type TeleportFeedContextValue = {
  store$: TeleportFeedStore;
  transitionRef: RefObject<FeedVideoFullscreenTransition>;
};

const TeleportFeedContext = createContext<TeleportFeedContextValue | null>(null);

export function TeleportFeedProvider({
  children,
  transition,
}: {
  children: React.ReactNode;
  transition: FeedVideoFullscreenTransition;
}) {
  const store$ = useMemo(() => createTeleportFeedStore(), []);
  const transitionRef = useRef(transition);
  transitionRef.current = transition;

  const value = useMemo(
    () => ({
      store$,
      transitionRef,
    }),
    [store$],
  );

  return (
    <TeleportFeedContext.Provider value={value}>
      {children}
    </TeleportFeedContext.Provider>
  );
}

function useTeleportFeedContext(): TeleportFeedContextValue {
  const value = useContext(TeleportFeedContext);
  if (value == null) {
    throw new Error("useTeleportFeedContext must be used within TeleportFeedProvider");
  }
  return value;
}

export function useTeleportFeedStore(): TeleportFeedStore {
  return useTeleportFeedContext().store$;
}

export function useIsTeleportPostActive(postId: string): boolean {
  const { store$ } = useTeleportFeedContext();

  return useSelector(() => {
    const expandedPostId = store$.expandedPostId.get();
    if (expandedPostId != null) {
      return expandedPostId === postId;
    }

    return store$.activePostId.get() === postId;
  });
}

export function useIsTeleportVideoExpanded(postId: string): boolean {
  const { store$ } = useTeleportFeedContext();

  return useSelector(() => store$.expandedPostId.get() === postId);
}

export function useIsTeleportPostPresentedInHost(postId: string): boolean {
  const { store$ } = useTeleportFeedContext();

  return useSelector(() => isTeleportPostPresentedInHost(store$, postId));
}

export function useIsTeleportPostDockedInHost(postId: string): boolean {
  const { store$ } = useTeleportFeedContext();

  return useSelector(() => isTeleportPostDockedInHost(store$, postId));
}

export function useTeleportFeedOverlayVisible(): boolean {
  const { store$ } = useTeleportFeedContext();

  return useSelector(() => {
    const expandedPostId = store$.expandedPostId.get();
    const collapsingPostId = store$.collapsingPostId.get();
    return expandedPostId != null || collapsingPostId != null;
  });
}

export function useTeleportFeedExpandedPostId(): string | null {
  const { store$ } = useTeleportFeedContext();

  return useSelector(() => store$.expandedPostId.get());
}

export function useTeleportFeedMuted(): boolean {
  const { store$ } = useTeleportFeedContext();

  return useSelector(() => store$.isMuted.get());
}

export function useToggleTeleportFeedMuted(): () => void {
  const { store$ } = useTeleportFeedContext();

  return useMemo(
    () => () => {
      toggleTeleportFeedMuted(store$);
    },
    [store$],
  );
}

export function useExpandTeleportVideo(): (
  postId: string,
  layout: VideoSourceLayout,
) => void {
  const { store$, transitionRef } = useTeleportFeedContext();

  return useMemo(
    () => (postId: string, layout: VideoSourceLayout) => {
      expandTeleportVideo(store$, transitionRef.current, postId, layout);
    },
    [store$, transitionRef],
  );
}

export function useCollapseTeleportVideo(): () => void {
  const { store$, transitionRef } = useTeleportFeedContext();

  return useMemo(
    () => () => {
      collapseTeleportVideo(store$, transitionRef.current);
    },
    [store$, transitionRef],
  );
}

export function useTeleportFullscreenVideoStyle(): ViewStyle {
  const { transitionRef } = useTeleportFeedContext();

  return transitionRef.current.videoStyle;
}

export function useTeleportFullscreenChromeStyle(): ViewStyle {
  const { transitionRef } = useTeleportFeedContext();

  return transitionRef.current.chromeStyle;
}

export function useTeleportFullscreenBackdropStyle(): ViewStyle {
  const { transitionRef } = useTeleportFeedContext();

  return transitionRef.current.backdropStyle;
}

export function useTeleportFeedTransition(): FeedVideoFullscreenTransition {
  const { transitionRef } = useTeleportFeedContext();

  return transitionRef.current;
}
