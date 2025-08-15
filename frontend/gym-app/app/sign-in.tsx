import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSession } from "@/auth/authContext";
import { useRouter } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    // Replace with your authentication logic
    if (!email || !password) {
      setError("Email and password are required.");
    } else {
      setError("");
    }
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
    <Box className="flex-1 justify-center items-center bg-background-50">
      <Box className="w-full max-w-md p-6 rounded-xl shadow-lg bg-background-0">
        <VStack space="lg">
          <Text size="2xl" bold className="text-center text-primary-700">
            Sign In
          </Text>
          <FormControl isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </Input>
            <FormControlHelper>
            </FormControlHelper>
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            {error && (
              <FormControlError>
                <FormControlErrorText>{error}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
          <Button
            size="lg"
            action="primary"
            onPress={handleSignIn}
            className="mt-4"
          >
            <ButtonText>Sign In</ButtonText>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
