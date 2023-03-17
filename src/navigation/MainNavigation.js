import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entrenamientos from "../screens/Entrenamientos";
import RoutinesNavigation from "./RoutinesNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Navegacion rutinas"
        component={RoutinesNavigation}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Mis Entrenamientos" component={Entrenamientos} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
