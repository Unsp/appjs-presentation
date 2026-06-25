export const NATIVE_TEXTURE_FEATURE = "rnwebgpu/native-texture" as GPUFeatureName;

type CanvasLike = {
  clientHeight: number;
  clientWidth: number;
  height: number;
  width: number;
};

export function readCanvasAspect(canvas: CanvasLike) {
  const width = canvas.width || canvas.clientWidth;
  const height = canvas.height || canvas.clientHeight;
  return height > 0 ? width / height : 1;
}

export function supportsNativeVideoTexture(device: GPUDevice) {
  return device.features.has(NATIVE_TEXTURE_FEATURE);
}
