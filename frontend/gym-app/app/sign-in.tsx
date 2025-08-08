import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useSession } from "@/auth/authContext";
import { router } from "expo-router";
import ThemedButton from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPress = async () => {
    try {
      console.log(email, password);
      await signIn(email, password);
      router.replace("/training");
    } catch (error) {
      console.error("Error occurred during sign in: ", error);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <ThemedInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          style={styles.input}
        />
        <ThemedInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          style={styles.input}
        />
      </View>
      <ThemedButton style={{width: 250}} onPress={onPress}>
        <Text>Sign In</Text>
      </ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 250
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: {
    gap: 12, // space between inputs
    marginBottom: 20,
  },
  input: {
    width: 250, // fixed width
  },
});
