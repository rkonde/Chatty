import { Feather, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import Title from "@/components/auth/ui/Title";
import Button from "@/components/ui/Button";
import KeyboardView from "@/components/ui/KeyboardView";
import useAuth from "@/hooks/useAuth";

export default function SignUp() {
  const navigation = useNavigation();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!usernameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert("Sign up", "Please fill in all fields");
    }

    const result = await signUp(
      emailRef.current,
      passwordRef.current,
      usernameRef.current
    );

    if (result.error) {
      Alert.alert("Sign up", result.error);
    }
  };

  return (
    <KeyboardView>
      <View className="flex-1 bg-white justify-center items-center gap-4 p-4">
        <Title>Sign up</Title>

        <View className="flex-row gap-4 h-16 px-4 items-center rounded-xl bg-neutral-100">
          <Feather name="user" size={24} color={"gray"} />
          <TextInput
            onChangeText={(text) => (usernameRef.current = text)}
            className="text-xl flex-1 font-semibold text-neutral-700"
            placeholder="Username"
            placeholderTextColor={"gray"}
          />
        </View>
        <View className="flex-row gap-4 h-16 px-4 items-center rounded-xl bg-neutral-100">
          <Octicons name="mail" size={24} color={"gray"} />
          <TextInput
            onChangeText={(text) => (emailRef.current = text)}
            className="text-xl flex-1 font-semibold text-neutral-700"
            placeholder="Email address"
            placeholderTextColor={"gray"}
          />
        </View>
        <View className="flex-row gap-4 h-16 px-4 items-center rounded-xl bg-neutral-100">
          <Octicons name="lock" size={24} color={"gray"} />
          <TextInput
            onChangeText={(text) => (passwordRef.current = text)}
            className="text-xl flex-1 font-semibold text-neutral-700"
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={"gray"}
          />
        </View>

        <Button title="Sign up" onPress={handleSignUp} />

        <View className="flex-row justify-center gap-1">
          <Text className="text-sm font-semibold text-neutral-500">
            Already have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text className="text-sm font-semibold text-indigo-500">
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardView>
  );
}
