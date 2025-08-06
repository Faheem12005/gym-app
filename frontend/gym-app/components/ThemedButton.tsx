import { Pressable, StyleSheet, PressableProps } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = PressableProps & {
  href: string;
  children: React.ReactNode;
  onPress: () => void;
};

export default function ThemedButton({ href, children, onPress, ...rest }: ThemedButtonProps) {
  return (
    <Pressable 
     style={[
      styles.button,
     ]}
     onPress={async () => await onPress()}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.8,
  },
});
