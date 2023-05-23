import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/api/firestoreConfig";
import LoginAndRegister from "./src/screens/LoginAndRegister";
import MainNavigation from "./src/navigation/MainNavigation";
import { useState } from "react";
import VerifyEmail from "./src/screens/VerifyEmail";
import PasswordRecovery from "./src/screens/PasswordRecovery";
import Home from "./src/components/Home";
import { AuthContextProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <Home />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
