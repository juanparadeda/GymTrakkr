import { SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Rutinas from "../screens/Rutinas";
import Entrenamientos from "../screens/Entrenamientos";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mis Rutinas" component={Rutinas} />
      <Tab.Screen name="Mis Entrenamientos" component={Entrenamientos} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
