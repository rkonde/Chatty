import { Text, TouchableOpacity, View } from "react-native";

import { UserData } from "@/components/home/Home";

type ChatItemProps = {
  item: UserData;
  index: number;
  onPress: () => void;
};

const ChatItem = ({ item, index, onPress }: ChatItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-2 flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-b-neutral-200"
    >
      <View className="bg-indigo-400 rounded-full h-12 w-12 items-center justify-center">
        <Text className="text-3xl font-medium text-white">
          {item.username?.at(0)?.toUpperCase()}
        </Text>
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-neutral-800 text-lg">
            {item.username}
          </Text>
          <Text className="font-medium text-neutral-500">Time</Text>
        </View>
        <Text className="font-medium text-neutral-500">Last message</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
