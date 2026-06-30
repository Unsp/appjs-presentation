import { useSelector } from "@legendapp/state/react";
import { createContext, useContext, useMemo } from "react";

import {
  createFeedPlaybackStore,
  type FeedPlaybackStore,
  toggleFeedPlaybackMuted,
} from "~screens/VideoScreen/model/feedPlaybackStore";

const FeedPlaybackContext = createContext<FeedPlaybackStore | null>(null);

export function FeedPlaybackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store$ = useMemo(() => createFeedPlaybackStore(), []);

  return (
    <FeedPlaybackContext.Provider value={store$}>
      {children}
    </FeedPlaybackContext.Provider>
  );
}

export function useFeedPlaybackStore(): FeedPlaybackStore {
  const store$ = useContext(FeedPlaybackContext);
  if (store$ == null) {
    throw new Error("useFeedPlaybackStore must be used within FeedPlaybackProvider");
  }
  return store$;
}

export function useIsFeedPostActive(postId: string): boolean {
  const store$ = useFeedPlaybackStore();

  return useSelector(() => store$.activePostId.get() === postId);
}

export function useFeedMuted(): boolean {
  const store$ = useFeedPlaybackStore();

  return useSelector(() => store$.isMuted.get());
}

export function useToggleFeedMuted(): () => void {
  const store$ = useFeedPlaybackStore();

  return useMemo(
    () => () => {
      toggleFeedPlaybackMuted(store$);
    },
    [store$],
  );
}
