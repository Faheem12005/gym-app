import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useSession } from "@/auth/authContext";

export default function CustomPage() {
  const { signOut } = useSession();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/training">Go to home screen</Link>
      <Text onPress={() => signOut()}>Sign out</Text>
    </View>
  );
}
