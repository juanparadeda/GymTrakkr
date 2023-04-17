import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Trainings from "../screens/Trainings";
import RoutinesNavigation from "./RoutinesNavigation";
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
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Mis Entrenamientos"
        component={Trainings}
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
          unmountOnBlur: true,
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
