const { ref, ctxRef } = useConfigureContext();

const ctx = ctxRef.current;
if (!ctx) return;

const externalTexture = root.device.importExternalTexture({
  source: frame,
  rotation: videoRotation,
});

const bindGroup = root.createBindGroup(layout, {
  video: externalTexture,
  sampler,
  params: paramsBuffer,
});

pipeline.with(bindGroup).withColorAttachment({ view: ctx }).draw(3);
ctx.present?.();
