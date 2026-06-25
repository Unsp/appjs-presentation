import {
  createStyledContext,
  styled,
  Text,
  withStaticProperties,
} from "@tamagui/core";

import { XStack } from "~shared/ui/components/layout/Stacks";

type ButtonVariant = "primary" | "secondary";

type ButtonContext = {
  variant?: ButtonVariant;
  disabled?: boolean;
};

export const ButtonContext = createStyledContext<ButtonContext>({
  variant: "primary",
  disabled: false,
});

const ButtonFrame = styled(XStack, {
  name: "ButtonFrame",
  context: ButtonContext,
  centered: true,
  height: 48,
  borderRadius: 12,
  paddingHorizontal: 20,
  pressStyle: {
    opacity: 0.85,
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "$blue10",
      },
      secondary: {
        backgroundColor: "$gray4",
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,
});

const ButtonText = styled(Text, {
  name: "ButtonText",
  context: ButtonContext,
  variants: {
    variant: {
      primary: {
        color: "white",
      },
      secondary: {
        color: "$gray12",
      },
    },
  } as const,
});

const ButtonComponent = ButtonFrame.styleable(({ children, ...rest }, ref) => {
  return (
    <ButtonFrame {...rest} ref={ref}>
      {typeof children === "string" ? (
        <ButtonText fontSize={16} fontWeight="600">
          {children}
        </ButtonText>
      ) : (
        children
      )}
    </ButtonFrame>
  );
});

export const Button = withStaticProperties(ButtonComponent, {
  Text: ButtonText,
});
