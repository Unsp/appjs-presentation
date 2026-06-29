import type { VideoSourceLayout } from "~shared/ui/feedVideoFullscreenTransition";

let activeTransitionLayout: VideoSourceLayout | null = null;

export function setFeedVideoTransitionSource(layout: VideoSourceLayout): void {
  activeTransitionLayout = layout;
}

export function getFeedVideoTransitionSource(): VideoSourceLayout | null {
  return activeTransitionLayout;
}

export function clearFeedVideoTransitionSource(): void {
  activeTransitionLayout = null;
}
