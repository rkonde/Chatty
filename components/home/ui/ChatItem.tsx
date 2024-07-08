import { Text, TouchableOpacity, View } from "react-native";

import { Message } from "@/components/chatRoom/ChatRoom";
import { UserData } from "@/components/home/Home";
import { db } from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type ChatItemProps = {
  item: UserData;
  index: number;
  onPress: () => void;
};

const ChatItem = ({ item, index, onPress }: ChatItemProps) => {
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
