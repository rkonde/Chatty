import { useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";

import { UserData } from "@/components/home/Home";
import ChatItem from "@/components/home/ui/ChatItem";

type ChatListProps = {
  users: UserData[];
};

const ChatList = ({ users }: ChatListProps) => {
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 8 }}
        keyExtractor={({ userId }) => userId}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem item={item} index={index} onPress={() => {}} />
        )}
      />
    </View>
  );
};

export default ChatList;
