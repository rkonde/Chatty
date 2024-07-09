import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

import UserIcon from "@/components/ui/UserIcon";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const { user, signOut } = useAuth();

  return (
    <View className="flex-row justify-between items-center px-5 bg-indigo-400 p-6 rounded-b-3xl">
      <StatusBar
        backgroundColor={"rgb(129 140 248)"}
        barStyle={"light-content"}
      />
      <View>
        <Text className="text-3xl font-medium text-white">Chats</Text>
      </View>
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

          setIsMenuShown((isMenuShown) => !isMenuShown);
        }}
      >
        <UserIcon username={user?.displayName!} inverseColors />
      </Pressable>
      {isMenuShown && (
        <TouchableOpacity
          onPress={() => signOut()}
          className="absolute top-20 right-5 w-32 bg-gray-300 rounded-lg flex-row items-center justify-center"
        >
          <Feather name="log-out" size={24} color="black" />
          <Text className="p-4 text-nowrap">Sign out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
