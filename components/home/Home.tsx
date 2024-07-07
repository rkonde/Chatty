import { usersRef } from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import ChatList from "./ui/ChatList";

export type UserData = {
  userId: string;
  username: string;
};

const Home = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    getUsers();
  }, [user]);

  const getUsers = async () => {
    if (user) {
      const usersQuery = query(usersRef, where("userId", "!=", user?.uid));

      const querySnapshot = await getDocs(usersQuery);

      const usersData: UserData[] = [];

      querySnapshot.forEach((doc) => {
        usersData.push(doc.data() as UserData);
      });

      setUsers(usersData);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {users.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color={"rgb(129 140 248)"} />
        </View>
      ) : (
        <ChatList users={users} />
      )}
    </View>
  );
};

export default Home;
