import "react-native-gesture-handler";
import "react-native-reanimated";
import "react-native-webgpu";

import { Stack } from "expo-router";

import { AppProviders } from "~app-root";

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="teleport" />
        <Stack.Screen
          name="reels/[postId]"
          options={{
            animation: "fade",
            contentStyle: { backgroundColor: "transparent" },
            fullScreenGestureEnabled: true,
            gestureEnabled: true,
            presentation: "transparentModal",
          }}
        />
      </Stack>
    </AppProviders>
  );
}
