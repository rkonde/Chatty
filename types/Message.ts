import { Timestamp } from "firebase/firestore";

export type Message = {
  userId: string;
  text: string;
  senderName: string;
  createdAt: Timestamp;
};
