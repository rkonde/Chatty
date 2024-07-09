import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import UserIcon from "@/components/ui/UserIcon";
import { db } from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import { Message } from "@/types/Message";
import { UserData } from "@/types/UserData";

type ChatItemProps = {
  item: UserData;
  onPress: () => void;
};

const ChatItem = ({ item, onPress }: ChatItemProps) => {
  const { user } = useAuth();

  const [lastMessage, setLastMessage] = useState<Message>();

  useEffect(() => {
    if (user) {
      const roomId = getRoomId(user.uid, item.userId);

      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const allMessages = querySnapshot.docs.map((doc) => {
          return doc.data();
        });

        setLastMessage((allMessages[0] as Message) || undefined);
      });

      return unsubscribe;
    }
  }, [user]);

  const getRoomId = (userId1: string, userId2: string) => {
    const roomId = [userId1, userId2].sort().join("-");

    return roomId;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-2 flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-b-neutral-200"
    >
      <UserIcon username={item.username} />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="font-semibold text-neutral-800 text-lg">
            {item.username}
          </Text>
          <Text className="font-medium text-neutral-500">
            {lastMessage?.createdAt.toDate().toDateString()}
          </Text>
        </View>
        <Text className="font-medium text-neutral-500">
          {lastMessage?.text || "No message"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
