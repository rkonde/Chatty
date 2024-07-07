import Navigation from "@/navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar } from "react-native";

import "../global.css";

export default function StartingPage() {
  return (
    <NavigationContainer independent={true}>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle={"dark-content"} />
        <Navigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}
