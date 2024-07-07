import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "@/config/firebase";

export default function useAuth() {
  const [user, setUser] = useState<User | null>();

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        username: username,
        userId: result.user.uid,
      });

      return { success: true, data: result.user, error: null };
    } catch (error) {
      const message = error.message;

      if (message.includes("(auth/invalid-email)")) {
        return { success: false, data: null, error: "Invalid email" };
      }

      if (message.includes("(auth/email-already-in-use)")) {
        return { success: false, data: null, error: "Email already in use" };
      }

      return { success: false, data: null, error: error.message };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      return { success: true, data: result.user, error: null };
    } catch (error) {
      const message = error.message;

      if (message.includes("(auth/invalid-email)")) {
        return { success: false, data: null, error: "Invalid email" };
      }

      if (message.includes("(auth/invalid-credential)")) {
        return { success: false, data: null, error: "Wrong credentials" };
      }

      return { success: false, data: null, error: error.message };
    }
  };

  const updateUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(
        (user) => ({ ...user, displayName: docSnap.data().username } as User)
      );
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("got user: ", user);

      if (user) {
        setUser(user);
        updateUserData(user.uid);
      } else {
        setUser(null);
      }
    });

    return unsub;
  }, []);

  return { user, signIn, signUp, signOut };
}
