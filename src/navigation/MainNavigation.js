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
        options={{ headerShown: false, title: "Rutina" }}
      />
      <Tab.Screen
        name="Mis Entrenamientos"
        component={Entrenamientos}
        options={{ headerShown: false, title: "Entrenamientos" }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
