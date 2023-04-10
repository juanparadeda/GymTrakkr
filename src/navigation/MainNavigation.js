import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entrenamientos from "../screens/Entrenamientos";
import RoutinesNavigation from "./RoutinesNavigation";
import Account from "../screens/Account";
import { Icon } from "@rneui/themed";
import AccountNavigation from "./AccountNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Navegacion rutinas"
        component={RoutinesNavigation}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            const color = focused ? "black" : "grey";
            return (
              <Icon name="weight" type="material-community" color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Mis Entrenamientos"
        component={Entrenamientos}
        options={{
          tabBarShowLabel: false,
          title: "Entrenamientos",
          tabBarIcon: ({ focused }) => {
            const color = focused ? "black" : "grey";
            return (
              <Icon
                name="calendar-text"
                type="material-community"
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cuenta"
        component={AccountNavigation}
        options={{
          tabBarShowLabel: false,
          title: "Mi Cuenta",
          tabBarIcon: ({ focused }) => {
            const color = focused ? "black" : "grey";
            return (
              <Icon name="account" type="material-community" color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
