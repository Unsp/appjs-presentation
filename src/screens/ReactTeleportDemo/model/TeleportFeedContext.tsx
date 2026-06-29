import { createContext, useContext, useMemo } from "react";
import { type ViewStyle } from "react-native";

import type { VideoSourceLayout } from "~shared/ui/feedVideoFullscreenTransition";

type TeleportFeedContextValue = {
  activePostId: string;
  collapseVideo: () => void;
  expandVideo: (postId: string, layout: VideoSourceLayout) => void;
  expandedPostId: string | null;
  fullscreenBackdropStyle: ViewStyle;
  fullscreenChromeStyle: ViewStyle;
  fullscreenVideoStyle: ViewStyle;
  isMuted: boolean;
  toggleMuted: () => void;
};

const TeleportFeedContext = createContext<TeleportFeedContextValue | null>(null);

export function TeleportFeedProvider({
  activePostId,
  children,
  collapseVideo,
  expandVideo,
  expandedPostId,
  fullscreenBackdropStyle,
  fullscreenChromeStyle,
  fullscreenVideoStyle,
  isMuted,
  toggleMuted,
}: {
  activePostId: string;
  children: React.ReactNode;
  collapseVideo: () => void;
  expandVideo: (postId: string, layout: VideoSourceLayout) => void;
  expandedPostId: string | null;
  fullscreenBackdropStyle: ViewStyle;
  fullscreenChromeStyle: ViewStyle;
  fullscreenVideoStyle: ViewStyle;
  isMuted: boolean;
  toggleMuted: () => void;
}) {
  const value = useMemo(
    () => ({
      activePostId,
      collapseVideo,
      expandVideo,
      expandedPostId,
      fullscreenBackdropStyle,
      fullscreenChromeStyle,
      fullscreenVideoStyle,
      isMuted,
      toggleMuted,
    }),
    [
      activePostId,
      collapseVideo,
      expandVideo,
      expandedPostId,
      fullscreenBackdropStyle,
      fullscreenChromeStyle,
      fullscreenVideoStyle,
      isMuted,
      toggleMuted,
    ],
  );

  return (
    <TeleportFeedContext.Provider value={value}>
      {children}
    </TeleportFeedContext.Provider>
  );
}

function useTeleportFeed(): TeleportFeedContextValue {
  const value = useContext(TeleportFeedContext);
  if (value == null) {
    throw new Error("useTeleportFeed must be used within TeleportFeedProvider");
  }
  return value;
}

export function useIsTeleportPostActive(postId: string): boolean {
  const { activePostId, expandedPostId } = useTeleportFeed();
  if (expandedPostId != null) {
    return expandedPostId === postId;
  }
  return activePostId === postId;
}

export function useTeleportFeedMuted(): boolean {
  return useTeleportFeed().isMuted;
}

export function useToggleTeleportFeedMuted(): () => void {
  return useTeleportFeed().toggleMuted;
}

export function useExpandTeleportVideo(): (
  postId: string,
  layout: VideoSourceLayout,
) => void {
  return useTeleportFeed().expandVideo;
}

export function useCollapseTeleportVideo(): () => void {
  return useTeleportFeed().collapseVideo;
}

export function useIsTeleportVideoExpanded(postId: string): boolean {
  return useTeleportFeed().expandedPostId === postId;
}

export function useTeleportFullscreenVideoStyle(): TeleportFeedContextValue["fullscreenVideoStyle"] {
  return useTeleportFeed().fullscreenVideoStyle;
}

export function useTeleportFullscreenChromeStyle(): TeleportFeedContextValue["fullscreenChromeStyle"] {
  return useTeleportFeed().fullscreenChromeStyle;
}

export function useTeleportFullscreenBackdropStyle(): TeleportFeedContextValue["fullscreenBackdropStyle"] {
  return useTeleportFeed().fullscreenBackdropStyle;
}
