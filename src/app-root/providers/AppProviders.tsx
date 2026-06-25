import { TamaguiProvider } from "@tamagui/core";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tamaguiConfig from "tamagui.config";

type AppProvidersProps = {
  children?: React.ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TamaguiProvider
          config={tamaguiConfig}
          disableInjectCSS
          defaultTheme="light"
        >
          {children}
        </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default AppProviders;
