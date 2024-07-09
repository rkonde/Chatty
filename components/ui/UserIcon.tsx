import { Text, View } from "react-native";

type UserIconProps = {
  username: string;
  inverseColors?: boolean;
};

const UserIcon = ({ username, inverseColors }: UserIconProps) => {
  return (
    <View
      className={`${
        inverseColors ? "bg-white" : "bg-indigo-400"
      } rounded-full h-12 w-12 items-center justify-center`}
    >
      <Text
        className={`text-3xl font-medium ${
          inverseColors ? "text-indigo-400" : "text-white"
        }`}
      >
        {username?.at(0)?.toUpperCase()}
      </Text>
    </View>
  );
};

export default UserIcon;
