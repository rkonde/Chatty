import { auth } from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";

const Home = () => {
  const { user } = useAuth();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Logged in as {user?.displayName}</Text>
      <Button title="Sign Out" onPress={() => signOut(auth)} />
    </View>
  );
};

export default Home;
