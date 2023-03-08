import getDataFromFirebase from "../api/firestoreController";
import { useState, useEffect } from "react";
import { SafeAreaView, Text, FlatList } from "react-native";

const Rutinas = () => {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    getDataFromFirebase().then((res) => {
      setExercises(res);
    });
  }, []);
  return (
    <SafeAreaView styles={{ flex: 1 }}>
      {console.log(exercises)}
      <Text>Ejercicios</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Rutinas;
