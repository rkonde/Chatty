import KeyboardView from "@/components/ui/KeyboardView";
import Loading from "@/components/ui/Loading";
import useAuth from "@/hooks/useAuth";
import { Feather, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { signUp } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);

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

    setLoading(false);
  };

  return (
    <KeyboardView>
      <View className="flex-1 bg-white justify-center items-center gap-4 p-4">
        <Text className="text-5xl font-bold tracking-wider text-neutral-800 py-8">
          Sign up
        </Text>

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

        {loading ? (
          <View className="w-full bg-indigo-500 rounded-xl justify-center items-center h-16">
            <Loading />
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleSignUp}
            className="w-full bg-indigo-500 rounded-xl justify-center items-center h-16"
          >
            <Text className="text-2xl text-white font-bold tracking-wider">
              Sign up
            </Text>
          </TouchableOpacity>
        )}

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
