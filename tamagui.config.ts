import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "@tamagui/core";

import shorthands from "~shared/ui/theme/shorthands";

const tamaguiConfig = createTamagui({
  ...defaultConfig,
  shorthands,
  settings: {
    ...defaultConfig.settings,
    disableSSR: true,
    styleCompat: "react-native",
    onlyAllowShorthands: false,
  },
});

export default tamaguiConfig;
