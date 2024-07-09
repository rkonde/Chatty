import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Loading from "@/components/ui/Loading";

type ButtonProps = {
  onPress: () => Promise<void>;
  title: string;
};

const Button = ({ onPress, title }: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleOnPress = async () => {
    setLoading(true);

    await onPress();

    setLoading(false);
  };

  return loading ? (
    <View className="w-full bg-indigo-500 rounded-xl justify-center items-center h-16">
      <Loading />
    </View>
  ) : (
    <TouchableOpacity
      onPress={handleOnPress}
      className="w-full bg-indigo-500 rounded-xl justify-center items-center h-16"
    >
      <Text className="text-2xl text-white font-bold tracking-wider">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
