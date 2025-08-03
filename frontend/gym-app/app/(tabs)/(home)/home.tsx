import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useSession } from "@/app/auth/authContext";

export default function Index() {
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
      <Link href="/">Go to home screen</Link>
      <Text onPress={() => signOut()}>Sign out</Text>
    </View>
  );
}
