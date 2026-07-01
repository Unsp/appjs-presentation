import type { FeedPost } from "~screens/VideoScreen/model/feedPosts";

/** Должно совпадать с FeedPostCard styles */
const FEED_POST_HEADER_HEIGHT = 56;
const FEED_POST_VIDEO_ASPECT = 1.15;
const FEED_POST_FOOTER_HEIGHT = 130;

export function getFeedPostHeight(screenWidth: number): number {
  return (
    FEED_POST_HEADER_HEIGHT +
    screenWidth * FEED_POST_VIDEO_ASPECT +
    FEED_POST_FOOTER_HEIGHT
  );
}

export function getFeedPostVideoBoundsInPost(screenWidth: number): {
  end: number;
  start: number;
} {
  const start = FEED_POST_HEADER_HEIGHT;
  const end = start + screenWidth * FEED_POST_VIDEO_ASPECT;
  return { end, start };
}

export function getFeedPostVideoWindowLayout(
  postId: string,
  scrollY: number,
  contentPaddingTop: number,
  screenWidth: number,
  posts: FeedPost[],
): {
  height: number;
  width: number;
  x: number;
  y: number;
} | null {
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex < 0) {
    return null;
  }

  let postTop = contentPaddingTop;
  for (let index = 0; index < postIndex; index += 1) {
    postTop += getFeedPostHeight(screenWidth);
  }

  const video = getFeedPostVideoBoundsInPost(screenWidth);
  const height = screenWidth * FEED_POST_VIDEO_ASPECT;

  return {
    height,
    width: screenWidth,
    x: 0,
    y: postTop + video.start - scrollY,
  };
}

export function findActivePostIdForViewportCenter(
  scrollY: number,
  viewportHeight: number,
  contentPaddingTop: number,
  screenWidth: number,
  posts: FeedPost[],
): string {
  if (posts.length === 0) {
    return "";
  }

  const centerY = scrollY + viewportHeight / 2;
  let postTop = contentPaddingTop;

  for (const post of posts) {
    const video = getFeedPostVideoBoundsInPost(screenWidth);
    const videoTop = postTop + video.start;
    const videoBottom = postTop + video.end;

    if (centerY >= videoTop && centerY <= videoBottom) {
      return post.id;
    }

    postTop += getFeedPostHeight(screenWidth);
  }

  let bestId = posts[0].id;
  let bestDistance = Number.POSITIVE_INFINITY;
  postTop = contentPaddingTop;

  for (const post of posts) {
    const video = getFeedPostVideoBoundsInPost(screenWidth);
    const videoMid = postTop + (video.start + video.end) / 2;
    const distance = Math.abs(centerY - videoMid);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestId = post.id;
    }

    postTop += getFeedPostHeight(screenWidth);
  }

  return bestId;
}
