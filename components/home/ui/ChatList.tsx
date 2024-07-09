import { useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";

import ChatItem from "@/components/home/ui/ChatItem";
import { UserData } from "@/types/UserData";

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
        renderItem={({ item }) => (
          <ChatItem
            item={item}
            onPress={() => navigation.navigate("ChatRoom", item)}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
