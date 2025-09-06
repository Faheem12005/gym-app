import { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { TextInput } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSession } from "@/auth/authContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "@/components/ui/spinner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, session, isLoading } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session === undefined) return;

    if (session?.token) {
      router.replace("/training");
    }
  }, [session]);

  const handleSignIn = async () => {
    setEmailError("");
    setPasswordError("");
    setGlobalError("");
    let hasError = false;
    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (password.length < 2) {
      setPasswordError("Password must be at least 2 characters.");
      hasError = true;
    }
    if (hasError) return;
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace("/training");
    } catch (err) {
      console.log(err);
      setGlobalError("Invalid email or password.");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Spinner color="black" size="large" />
      </SafeAreaView>
    );
  }
  return (
    <Box className="flex-1 justify-center items-center bg-background-50 px-6">
      <VStack space="lg" className="w-full max-w-md">
        <Text size="4xl" bold className="text-center font-light">
          GymIt
        </Text>
        <Text size="2xl" bold className="text-center font-light">AI Powered Workouts.</Text>
        <FormControl isInvalid={!!emailError}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            editable={!loading}
            style={{
              fontSize: 18,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 9999,
              borderWidth: 2,
              borderColor: emailError ? "#dc2626" : "#d1d5db",
              backgroundColor: "white",
              marginTop: 8,
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError && (
            <FormControlError>
              <FormControlErrorText>{emailError}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
        <FormControl isInvalid={!!passwordError}>
          <FormControlLabel className="mt-4">
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            editable={!loading}
            style={{
              fontSize: 18,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 9999,
              borderWidth: 2,
              borderColor: passwordError ? "#dc2626" : "#d1d5db",
              backgroundColor: "white",
              marginTop: 8,
            }}
            secureTextEntry
            autoCapitalize="none"
          />
          {passwordError && (
            <FormControlError>
              <FormControlErrorText>{passwordError}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
        <Button
          className="rounded-lg w-full flex-row justify-center items-center bg-black"
          onPress={handleSignIn}
          disabled={loading}
          action="primary"
          size="lg"
        >
          {loading ? (
            <>
              <ButtonSpinner color="white" className="mr-2" />
              <ButtonText className="text-white">Loading...</ButtonText>
            </>
          ) : (
            <ButtonText className="text-white">Sign In</ButtonText>
          )}
        </Button>
      </VStack>
    </Box>
  );
}
