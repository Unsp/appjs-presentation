import type { TgpuRoot } from "typegpu";

import { DEMO_VIDEO_ASPECT } from "~features/typegpu/lib/demoVideoMeta";
import {
  createDefaultVideoParams,
  videoParamsSchema,
} from "~features/typegpu/lib/videoEffectParams";
import { createVideoEffectPipeline } from "~features/typegpu/lib/videoEffectPipeline";
import { SCRUB_CENTER_Y } from "~features/typegpu/lib/videoEffectModes";

export function createVideoGpuResources(root: TgpuRoot) {
  const paramsBuffer = root
    .createBuffer(
      videoParamsSchema,
      createDefaultVideoParams(SCRUB_CENTER_Y, DEMO_VIDEO_ASPECT),
    )
    .$usage("uniform");

  return {
    paramsBuffer,
    paramsGpuBuffer: root.unwrap(paramsBuffer),
    pipeline: createVideoEffectPipeline(root),
    sampler: root.createSampler({
      magFilter: "linear",
      minFilter: "linear",
    }),
  };
}

export type VideoGpuResources = ReturnType<typeof createVideoGpuResources>;
