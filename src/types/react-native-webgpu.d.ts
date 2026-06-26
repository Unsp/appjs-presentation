import type { NativeVideoFrame } from "react-native-webgpu";

declare module "react-native-webgpu" {
  export interface VideoPlayer {
    getCurrentTime(): number;
    getDuration(): number;
    seekTo(seconds: number): void;
  }
}

declare global {
  interface GPUExternalTextureDescriptor {
    source: NativeVideoFrame;
  }

  // Must stay `interface`, not `type`: merges with @webgpu/types GPUDevice.
  interface GPUDevice {
    importExternalTexture(
      descriptor: GPUExternalTextureDescriptor,
    ): GPUExternalTexture;
  }
}

export {};
