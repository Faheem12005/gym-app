import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedInputProps = TextInputProps & {
  lightBackground?: string;
  darkBackground?: string;
  lightTextColor?: string;
  darkTextColor?: string;
};

export default function ThemedInput({
  lightBackground,
  darkBackground,
  lightTextColor,
  darkTextColor,
  style,
  ...rest
}: ThemedInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightBackground, dark: darkBackground },
    "background"
  );

  const color = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    "text"
  );

  return (
    <TextInput
      style={[
        styles.input,
        { backgroundColor, color },
        style
      ]}
      placeholderTextColor={useThemeColor(
        { light: "#888", dark: "#aaa" },
        "text"
      )}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
