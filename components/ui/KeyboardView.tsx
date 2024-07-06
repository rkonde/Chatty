import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

type KeyboardViewProps = {
  children: React.ReactNode;
};

const KeyboardView = ({ children }: KeyboardViewProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
