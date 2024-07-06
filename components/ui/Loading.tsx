import { ActivityIndicator, View } from "react-native";

const Loading = () => {
  return (
    <View className="justify-center items-center">
      <ActivityIndicator className="w-24 h-24" color={"white"} />
    </View>
  );
};

export default Loading;
