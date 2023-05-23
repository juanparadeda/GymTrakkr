import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../screens/Account";
import ChangePassword from "../screens/ChangePassword";

const Stack = createNativeStackNavigator();

const AccountNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
