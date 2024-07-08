import { Text, View } from "react-native";
import { Message } from "../ChatRoom";

type MessageItemProps = {
  message: Message;
  currentUserId: string;
};

const MessageItem = ({ message, currentUserId }: MessageItemProps) => {
  return (
    <View className="flex-1">
      {currentUserId === message.userId ? (
        <View className="flex-row self-end mb-3 mr-3 bg-white p-3 border border-neutral-200 rounded-2xl">
          <Text className="text-neutral-500 text-lg">{message.text}</Text>
        </View>
      ) : (
        <View className="flex-row self-start  mb-3 ml-3 p-3 border border-indigo-200 rounded-2xl bg-indigo-100">
          <Text className="text-neutral-500 text-lg">{message.text}</Text>
        </View>
      )}
    </View>
  );
};

export default MessageItem;
