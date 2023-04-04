import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/api/firestoreConfig";
import LoginAndRegister from "./src/screens/LoginAndRegister";
import MainNavigation from "./src/navigation/MainNavigation";
import { useState } from "react";
import verifyEmail from "./src/screens/VerifyEmail";
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  // const auth = getAuth();
  // const user = auth.currentUser;
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(userFirebase);
      // ...
    } else {
      setUser(null);
    }
  });
  console.log(JSON.stringify(user, null, 2));
  const defaultRoute = user?.emailVerified ? "Main Navigation" : "Login";
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={`${defaultRoute}`}>
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
          component={verifyEmail}
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
