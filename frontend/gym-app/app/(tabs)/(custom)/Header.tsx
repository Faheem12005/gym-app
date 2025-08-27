import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomHeaderProps {
  title?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
}

export default function CustomHeader({ title, right, left }: CustomHeaderProps) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.left}>{left}</View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.right}>{right}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  left: {
    minWidth: 40,
    alignItems: "flex-start",
  },
  right: {
    minWidth: 40,
    alignItems: "flex-end",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
});
