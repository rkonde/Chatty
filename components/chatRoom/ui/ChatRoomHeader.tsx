import { UserData } from "@/components/home/Home";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

type ChatRoomtHeaderProps = {
  user: UserData;
};

const ChatRoomHeader = ({ user }: ChatRoomtHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between pt-4 pr-4">
      <StatusBar backgroundColor={"white"} />
      <View className="flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={36} color="#737373" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-3">
          <View className="bg-indigo-400 rounded-full h-12 w-12 items-center justify-center">
            <Text className="text-3xl font-medium text-white">
              {user.username?.at(0)?.toUpperCase()}
            </Text>
          </View>
          <Text className="text-neutral-700 font-medium text-2xl">
            {user.username}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-8">
        <Ionicons name="call" size={24} color="#737373" />
        <Ionicons name="videocam" size={24} color="#737373" />
      </View>
    </View>
  );
};

export default ChatRoomHeader;
