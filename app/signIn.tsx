import { Octicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 bg-white justify-center items-center gap-4 p-4">
      <Text className="text-5xl font-bold tracking-wider text-neutral-800 py-8">
        Sign in
      </Text>

      <View className="flex-row gap-4 h-16 px-4 items-center rounded-xl bg-neutral-100">
        <Octicons name="mail" size={24} color={"gray"} />
        <TextInput
          className="text-xl flex-1 font-semibold text-neutral-700"
          placeholder="Email address"
          placeholderTextColor={"gray"}
        />
      </View>
      <View className="flex-row gap-4 h-16 px-4 items-center rounded-xl bg-neutral-100">
        <Octicons name="lock" size={24} color={"gray"} />
        <TextInput
          className="text-xl flex-1 font-semibold text-neutral-700"
          placeholder="Password"
          placeholderTextColor={"gray"}
        />
      </View>

      <Text className="text-lg font-semibold self-end text-neutral-500">
        Forgot password?
      </Text>

      <View className="self-stretch bg-indigo-500 rounded-xl justify-center items-center h-16">
        <Text className="text-2xl text-white font-bold tracking-wider">
          Sign in
        </Text>
      </View>

      <View className="flex-row justify-center gap-1">
        <Text className="text-sm font-semibold text-neutral-500">
          Don't have an account?
        </Text>
        <Pressable>
          <Text className="text-sm font-semibold text-indigo-500">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}
