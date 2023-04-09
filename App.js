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
const Stack = createNativeStackNavigator();
export default function App() {
  //const defaultRoute = user?.emailVerified ? "Main Navigation" : "Login";
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={`Login`}>
        <Stack.Screen
          name="Login"
          component={LoginAndRegister}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main Navigation"
          component={MainNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Email Verification"
          component={VerifyEmail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Password Recovery"
          component={PasswordRecovery}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
