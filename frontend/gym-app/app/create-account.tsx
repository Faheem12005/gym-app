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
import { TextInput, ScrollView } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSession } from "@/auth/authContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "@/components/ui/spinner";
import api from "@/utils/api";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session === undefined) return;

    if (session?.token) {
      router.replace("/training");
    }
  }, [router, session]);

  const handleCreateAccount = async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setHeightError("");
    setWeightError("");
    setGlobalError("");
    let hasError = false;

    if (!name.trim()) {
      setNameError("Name is required.");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (!height) {
      setHeightError("Height is required.");
      hasError = true;
    } else if (isNaN(Number(height)) || Number(height) <= 0) {
      setHeightError("Please enter a valid height in cm.");
      hasError = true;
    } else if (Number(height) < 50 || Number(height) > 300) {
      setHeightError("Height must be between 50-300 cm.");
      hasError = true;
    }

    if (!weight) {
      setWeightError("Weight is required.");
      hasError = true;
    } else if (isNaN(Number(weight)) || Number(weight) <= 0) {
      setWeightError("Please enter a valid weight in kg.");
      hasError = true;
    } else if (Number(weight) < 20 || Number(weight) > 500) {
      setWeightError("Weight must be between 20-500 kg.");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      //TODO
      await api.post("/users/create", {
        email,
        password,
        heightCm: Number(height),
        weightKg: Number(weight),
      });
      router.push("/sign-in");
    } catch (err) {
      console.log(err);
      setGlobalError("Failed to create account. Please try again.");
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
    <SafeAreaView className="flex-1 justify-center items-center">
      <ScrollView>
        <Box className="flex-1 justify-center items-center bg-background-50 px-6">
          <VStack space="lg" className="w-full max-w-md">
            <Text size="4xl" bold className="text-center font-light">
              GymIt
            </Text>
            <Text size="2xl" bold className="text-center font-light">
              Create Your Account
            </Text>

            {globalError && (
              <Text className="text-red-600 text-center">{globalError}</Text>
            )}

            <FormControl isInvalid={!!nameError}>
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                editable={!loading}
                style={{
                  fontSize: 18,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: nameError ? "#dc2626" : "#d1d5db",
                  backgroundColor: "white",
                  marginTop: 8,
                }}
                autoCapitalize="words"
              />
              {nameError && (
                <FormControlError>
                  <FormControlErrorText>{nameError}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

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

            <FormControl isInvalid={!!confirmPasswordError}>
              <FormControlLabel className="mt-4">
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                editable={!loading}
                style={{
                  fontSize: 18,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: confirmPasswordError ? "#dc2626" : "#d1d5db",
                  backgroundColor: "white",
                  marginTop: 8,
                }}
                secureTextEntry
                autoCapitalize="none"
              />
              {confirmPasswordError && (
                <FormControlError>
                  <FormControlErrorText>
                    {confirmPasswordError}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl isInvalid={!!heightError}>
              <FormControlLabel className="mt-4">
                <FormControlLabelText>Height (cm)</FormControlLabelText>
              </FormControlLabel>
              <TextInput
                value={height}
                onChangeText={setHeight}
                placeholder="Enter your height in cm"
                editable={!loading}
                style={{
                  fontSize: 18,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: heightError ? "#dc2626" : "#d1d5db",
                  backgroundColor: "white",
                  marginTop: 8,
                }}
                keyboardType="numeric"
                autoCapitalize="none"
              />
              {heightError && (
                <FormControlError>
                  <FormControlErrorText>{heightError}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl isInvalid={!!weightError}>
              <FormControlLabel className="mt-4">
                <FormControlLabelText>Weight (kg)</FormControlLabelText>
              </FormControlLabel>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                placeholder="Enter your weight in kg"
                editable={!loading}
                style={{
                  fontSize: 18,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: weightError ? "#dc2626" : "#d1d5db",
                  backgroundColor: "white",
                  marginTop: 8,
                }}
                keyboardType="numeric"
                autoCapitalize="none"
              />
              {weightError && (
                <FormControlError>
                  <FormControlErrorText>{weightError}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <Button
              className="rounded-lg w-full flex-row justify-center items-center bg-black"
              onPress={handleCreateAccount}
              disabled={loading}
              action="primary"
              size="lg"
            >
              {loading ? (
                <>
                  <ButtonSpinner color="white" className="mr-2" />
                  <ButtonText className="text-white">
                    Creating Account...
                  </ButtonText>
                </>
              ) : (
                <ButtonText className="text-white">Create Account</ButtonText>
              )}
            </Button>

            <Button
              className="rounded-lg w-full flex-row justify-center items-center bg-transparent border border-gray-300"
              onPress={() => router.push("/sign-in" as any)}
              disabled={loading}
              variant="outline"
              size="lg"
            >
              <ButtonText className="text-gray-700">
                Already have an account? Sign In
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
