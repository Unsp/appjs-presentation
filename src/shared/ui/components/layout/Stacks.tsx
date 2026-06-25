import { styled, View } from "@tamagui/core";

const sharedVariants = {
  grow: {
    true: {
      flexGrow: 1,
    },
  },
  fill: {
    true: {
      flex: 1,
    },
  },
  centered: {
    true: {
      alignItems: "center",
      justifyContent: "center",
    },
  },
} as const;

export const XStack = styled(View, {
  flexDirection: "row",
  variants: sharedVariants,
});

export const YStack = styled(View, {
  flexDirection: "column",
  variants: sharedVariants,
});
