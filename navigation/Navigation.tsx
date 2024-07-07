import SignIn from "@/app/signIn";
import SignUp from "@/app/signUp";
import Home from "@/components/home/Home";
import useAuth from "@/hooks/useAuth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "./types";

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
