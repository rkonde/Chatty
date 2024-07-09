import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import ChatList from "@/components/home/ui/ChatList";
import { usersRef } from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import { UserData } from "@/types/UserData";

const Home = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState<UserData[] | undefined>();

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
      {!users ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color={"rgb(129 140 248)"} />
        </View>
      ) : users.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="font-medium text-neutral-500">No users found</Text>
        </View>
      ) : (
        <ChatList users={users} />
      )}
    </View>
  );
};

export default Home;
