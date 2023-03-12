import getDataFromFirebase from "../api/firestoreController";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FAB, Divider, ListItem } from "@rneui/themed";
import RoutineAccordion from "../components/RoutineAccordion";

const Rutinas = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  user
    ? console.log(JSON.stringify(user, null, 2))
    : console.log(`El usuario es un zapato`);

  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    getDataFromFirebase(`exercises`).then((res) => {
      setExercises(res);
    });
  }, []);

  //const [routines, setRoutines] = useState([]);
  //useEffect(() => {
  //  getDataFromFirebase(`routines`).then((res) => {
  //    setRoutines(res);
  //  });
  //}, []);
  //{
  //console.log(JSON.stringify(exercises, null, 2));
  //console.log(JSON.stringify(routines, null, 2));
  //}

  return (
    <>
      {/*<Text>Ejercicios</Text>
      {/*<FlatList
      {/*  data={exercises}
      {/*  renderItem={({ item }) => <Text>{item.name}</Text>}
      {/*  keyExtractor={(item) => item.id}
      {/* />*/}
      <View style={styles.container}>
        <Card
          containerStyle={{
            marginTop: 15,
            flex: 1,
            backgroundColor: "#111",
          }}
        >
          <Card.Title>RUTINAS</Card.Title>
          <Divider width={5} color={"white"} />
          {<RoutineAccordion />}
        </Card>
        <FAB
          visible={true}
          icon={{ name: "add", color: "white" }}
          color="#FF5959"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    fontSize: 40,
    justifyContent: "space-between",
  },
  fonts: {
    color: "white",
  },
});

export default Rutinas;
