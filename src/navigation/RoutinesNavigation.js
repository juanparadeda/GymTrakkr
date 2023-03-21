import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddExercise from "../screens/AddExercise";
import Routine from "../screens/Routine";
const Stack = createNativeStackNavigator();

const RoutinesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mi Rutina" component={Routine} />
      <Stack.Screen name="Agregar Ejercicio" component={AddExercise} />
    </Stack.Navigator>
  );
};

export default RoutinesNavigation;
