import "react-native-gesture-handler";
import "react-native-reanimated";
import "react-native-webgpu";

import { Stack } from "expo-router";

import { AppProviders } from "~app-root";

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProviders>
  );
}
