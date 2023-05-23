import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginAndRegister from "../screens/LoginAndRegister";
import MainNavigation from "./MainNavigation";
import VerifyEmail from "../screens/VerifyEmail";
import PasswordRecovery from "../screens/PasswordRecovery";

const Stack = createNativeStackNavigator();
const HomeNavigation = ({ props }) => {
  const { defRoute } = props;
  return (
    //<SafeAreaView>
    //  <Text>{defRoute}</Text>
    //</SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={defRoute}>
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
            unmountOnBlur: true,
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
};

export default HomeNavigation;
