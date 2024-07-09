import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ChatRoomHeader from "@/components/chatRoom/ui/ChatRoomHeader";
import MessageList from "@/components/chatRoom/ui/MessageList";
import KeyboardView from "@/components/ui/KeyboardView";
import { db } from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import { RootStackScreenProps } from "@/navigation/types";
import { Message } from "@/types/Message";

const ChatRoom = () => {
  const { params } = useRoute<RootStackScreenProps<"ChatRoom">["route"]>();

  const [messages, setMessages] = useState<Message[]>([]);

  const currentMessageRef = useRef("");
  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const { user } = useAuth();

  console.log(messages);

  useEffect(() => {
    createRoom();

    if (user) {
      const roomId = getRoomId(user.uid, params.userId);

      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const allMessages = querySnapshot.docs.map((doc) => {
          return doc.data();
        });

        setMessages(allMessages as Message[]);
      });

      return unsubscribe;
    }
  }, [user]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const createRoom = async () => {
    if (user) {
      const roomId = getRoomId(user.uid, params.userId);
      await setDoc(doc(db, "rooms", roomId), {
        roomId: roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
  };

  const getRoomId = (userId1: string, userId2: string) => {
    const roomId = [userId1, userId2].sort().join("-");

    return roomId;
  };

  const handleSendMessage = async () => {
    if (user) {
      const message = currentMessageRef.current;

      if (!message) {
        return;
      }

      try {
        const roomId = getRoomId(user.uid, params.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");

        currentMessageRef.current = "";
        if (textInputRef.current) {
          textInputRef.current.clear();
        }

        const newDoc = await addDoc(messagesRef, {
          userId: user.uid,
          text: message,
          senderName: user.displayName,
          createdAt: Timestamp.fromDate(new Date()),
        });

        console.log("message id:", newDoc.id);
      } catch (error: any) {
        Alert.alert("Message", error.message);
      }
    }
  };

  return (
    <KeyboardView>
      <View className="flex-1 bg-white">
        <ChatRoomHeader user={params} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList
              messages={messages}
              currentUserId={user?.uid || ""}
              scrollViewRef={scrollViewRef}
            />
          </View>
          <View className="pt-2 mb-4">
            <View className="flex-row mx-3 justify-between items-center bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                ref={textInputRef}
                onChangeText={(text) => (currentMessageRef.current = text)}
                onFocus={() =>
                  scrollViewRef.current?.scrollToEnd({ animated: true })
                }
                placeholder="Type a message"
                placeholderTextColor={"#737373"}
                style={{ lineHeight: 20 }}
                className="flex-1 mr-2 text-lg"
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-neutral-200 p-2 mr-1 rounded-full"
              >
                <Feather name="send" size={24} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardView>
  );
};

export default ChatRoom;
