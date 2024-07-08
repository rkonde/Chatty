import { ScrollView } from "react-native";
import { Message } from "../ChatRoom";
import MessageItem from "./MessageItem";

type MessageListProps = {
  messages: Message[];
  currentUserId: string;
  scrollViewRef: React.RefObject<ScrollView>;
};

const MessageList = ({
  messages,
  currentUserId,
  scrollViewRef,
}: MessageListProps) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
    </ScrollView>
  );
};

export default MessageList;
