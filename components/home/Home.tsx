import useAuth from "@/hooks/useAuth";
import { Text, View } from "react-native";

const Home = () => {
  const { user } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Logged in as {user?.displayName}</Text>
    </View>
  );
};

export default Home;
