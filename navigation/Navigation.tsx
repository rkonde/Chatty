import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import SignIn from "@/components/auth/signIn/signIn";
import SignUp from "@/components/auth/signUp/signUp";
import ChatRoom from "@/components/chatRoom/ChatRoom";
import Home from "@/components/home/Home";
import Header from "@/components/home/ui/Header";
import useAuth from "@/hooks/useAuth";
import { RootStackParamList } from "@/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ header: () => <Header /> }}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
