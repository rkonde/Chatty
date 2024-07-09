import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import Title from "@/components/auth/ui/Title";
import Button from "@/components/ui/Button";
import KeyboardView from "@/components/ui/KeyboardView";
import useAuth from "@/hooks/useAuth";

export default function SignIn() {
  const navigation = useNavigation();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign in", "Please fill in all fields");
    }

    const result = await signIn(emailRef.current, passwordRef.current);

    if (result.error) {
      Alert.alert("Sign in", result.error);
    }
  };

  return (
    <KeyboardView>
      <View className="flex-1 bg-white justify-center items-center gap-4 p-4">
        <Title>Sign in</Title>

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

        <Button title="Sign in" onPress={handleSignIn} />

        <View className="flex-row justify-center gap-1">
          <Text className="text-sm font-semibold text-neutral-500">
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-sm font-semibold text-indigo-500">
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardView>
  );
}
