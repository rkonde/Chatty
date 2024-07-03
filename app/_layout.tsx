import { SessionProvider } from "@/context/authContext";
import { Slot } from "expo-router";

export default function _layout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
