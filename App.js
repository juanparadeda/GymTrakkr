import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import LoginAndRegister from "./src/screens/LoginAndRegister";
import MainNavigation from "./src/navigation/MainNavigation";
const Stack = createNativeStackNavigator();
export default function App() {
  const auth = getAuth();
  const defaultRoute = onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      return "Main Navigation";
    } else {
      return "Login";
    }
  });
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
