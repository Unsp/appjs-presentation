declare module "react-native-wgpu" {
  export * from "react-native-webgpu";
}

declare module "react-native-webgpu" {
  import type { Ref } from "react";
  import type { StyleProp, ViewStyle } from "react-native";

  export type NativeVideoPixelFormat = "bgra8" | "nv12";

  export type NativeVideoFrame = {
    readonly handle: bigint;
    readonly height: number;
    readonly pixelFormat: NativeVideoPixelFormat;
    readonly width: number;
    release(): void;
  };

  export type VideoPlayer = {
    copyLatestFrame(): NativeVideoFrame | null;
    getCurrentTime(): number;
    getDuration(): number;
    pause(): void;
    play(): void;
    release(): void;
    seekTo(seconds: number): void;
  };

  export type CanvasRef = {
    getContext(contextId: "webgpu"): GPUCanvasContext | null;
  };

  export type CanvasProps = {
    ref?: Ref<CanvasRef>;
    style?: StyleProp<ViewStyle>;
    transparent?: boolean;
  };

  export function Canvas(props: CanvasProps): JSX.Element;
  export function installWebGPU(): void;
  export function useCanvasRef(): Ref<CanvasRef>;
  export function useDevice(): { device: GPUDevice | null };
}

declare const navigator: Navigator & {
  gpu: GPU;
};

declare const RNWebGPU: {
  createVideoPlayer: (
    path: string,
    pixelFormat?: import("react-native-wgpu").NativeVideoPixelFormat,
  ) => import("react-native-wgpu").VideoPlayer;
  writeTestVideoFile: () => string;
};

type WgpuCanvasContext = GPUCanvasContext & {
  present?: () => void;
};

type GPUExternalTextureDescriptor = {
  mirrored?: boolean;
  rotation?: 0 | 90 | 180 | 270;
  source: import("react-native-wgpu").NativeVideoFrame;
};

type GPUExternalTexture = {
  destroy(): void;
};

// Must stay `interface`, not `type`: merges with @webgpu/types GPUDevice.
// `type GPUDevice = …` replaces the global and breaks `.queue`, `.features`, etc.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- global augmentation
interface GPUDevice {
  importExternalTexture(
    descriptor: GPUExternalTextureDescriptor,
  ): GPUExternalTexture;
}
