import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

import UserIcon from "@/components/ui/UserIcon";
import { UserData } from "@/types/UserData";

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
          <UserIcon username={user.username} />
          <Text className="text-neutral-700 font-medium text-2xl">
            {user.username}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatRoomHeader;
