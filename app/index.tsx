import Navigation from "@/navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

import "../global.css";

export default function StartingPage() {
  return (
    <NavigationContainer independent={true}>
      <SafeAreaView className="flex-1">
        <StatusBar style="dark" />
        <Navigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}
