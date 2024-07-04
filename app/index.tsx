import { auth } from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Button, Text, View } from "react-native";

export default function StartingPage() {
  const { user } = useAuth();

  return (
    <View className="flex-1 justify-center">
      <Button
        title="Register"
        onPress={async () => {
          try {
            const result = await createUserWithEmailAndPassword(
              auth,
              "konradr97@gmail.com",
              "test1234!"
            );

            console.log(result);
          } catch (error) {
            console.log(error);
          }
        }}
      />
      <Button
        title="Sign in"
        onPress={() => {
          signInWithEmailAndPassword(auth, "konradr97@gmail.com", "test1234!");
        }}
      />
      <Text>{user?.email}</Text>
      <Button
        title="Sign out"
        onPress={() => {
          signOut(auth);
        }}
      />
    </View>
  );
}
