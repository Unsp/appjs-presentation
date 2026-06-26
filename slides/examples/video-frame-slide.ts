const frame = player.copyLatestFrame();
if (!frame) {
  return;
}

const externalTexture = root.device.importExternalTexture({
  source: frame,
  rotation: videoRotation,
});

const bindGroup = root.createBindGroup(videoEffectLayout, {
  params: paramsBuffer,
  sampler,
  video: externalTexture,
});

root.device.queue.writeBuffer(paramsGpuBuffer, 0, paramsArray);

pipeline.with(bindGroup).withColorAttachment({ view: ctx }).draw(3);

ctx.present?.();
externalTexture.destroy();
