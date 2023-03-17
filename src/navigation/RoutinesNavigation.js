import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddExercise from "../screens/AddExercise";
import Rutinas from "../screens/Rutinas";
const Stack = createNativeStackNavigator();

const RoutinesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mi Rutina" component={Rutinas} />
      <Stack.Screen name="Agregar Ejercicio" component={AddExercise} />
    </Stack.Navigator>
  );
};

export default RoutinesNavigation;
