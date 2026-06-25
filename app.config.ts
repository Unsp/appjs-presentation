import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "WebGPU Demo",
  slug: "app-js-presentation-demo",
  version: "1.0.0",
  orientation: "default",
  userInterfaceStyle: "light",
  scheme: "webgpu-demo",
  icon: "./assets/icon.png",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.presentation.webgpudemo",
  },
  android: {
    package: "com.presentation.webgpudemo",
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
  },
});
