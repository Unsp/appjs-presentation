import { createContext, useContext, useMemo } from "react";

type FeedPlaybackContextValue = {
  activePostId: string;
  isMuted: boolean;
  toggleMuted: () => void;
};

const FeedPlaybackContext = createContext<FeedPlaybackContextValue | null>(null);

export function FeedPlaybackProvider({
  activePostId,
  children,
  isMuted,
  toggleMuted,
}: {
  activePostId: string;
  children: React.ReactNode;
  isMuted: boolean;
  toggleMuted: () => void;
}) {
  const value = useMemo(
    () => ({
      activePostId,
      isMuted,
      toggleMuted,
    }),
    [activePostId, isMuted, toggleMuted],
  );

  return (
    <FeedPlaybackContext.Provider value={value}>
      {children}
    </FeedPlaybackContext.Provider>
  );
}

function useFeedPlayback(): FeedPlaybackContextValue {
  const value = useContext(FeedPlaybackContext);
  if (value == null) {
    throw new Error("useFeedPlayback must be used within FeedPlaybackProvider");
  }
  return value;
}

export function useIsFeedPostActive(postId: string): boolean {
  return useFeedPlayback().activePostId === postId;
}

export function useFeedMuted(): boolean {
  return useFeedPlayback().isMuted;
}

export function useToggleFeedMuted(): () => void {
  return useFeedPlayback().toggleMuted;
}
