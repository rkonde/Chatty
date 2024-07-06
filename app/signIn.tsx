import KeyboardView from "@/components/ui/KeyboardView";
import Loading from "@/components/ui/Loading";
import { auth } from "@/config/firebase";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignIn = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign in", "Please fill in all fields");
    }

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        emailRef.current,
        passwordRef.current
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardView>
      <View className="flex-1 bg-white justify-center items-center gap-4 p-4">
        <Text className="text-5xl font-bold tracking-wider text-neutral-800 py-8">
          Sign in
        </Text>

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

        <Text className="text-lg font-semibold self-end text-neutral-500">
          Forgot password?
        </Text>

        {loading ? (
          <View className="w-full bg-indigo-500 rounded-xl justify-center items-center h-16">
            <Loading />
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleSignIn}
            className="w-full bg-indigo-500 rounded-xl justify-center items-center h-16"
          >
            <Text className="text-2xl text-white font-bold tracking-wider">
              Sign in
            </Text>
          </TouchableOpacity>
        )}

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
