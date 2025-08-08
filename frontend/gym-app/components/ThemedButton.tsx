import { Pressable, StyleSheet, PressableProps, ViewStyle, PressableStateCallbackType } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = PressableProps & {
  children: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  onPress: () => void;
};

export default function ThemedButton({
  children,
  onPress,
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "primary");

  return (
    <Pressable
      style={(state: PressableStateCallbackType) => {
        const baseStyle: ViewStyle = { backgroundColor };

        const resolvedStyle =
          typeof style === "function" ? style(state) : style;

        return [baseStyle, styles.button, resolvedStyle];
      }}
      onPress={async () => await onPress()}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
