import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "../api/firestoreConfig";
import { getDocumentFromFirestore } from "../api/firestoreController";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, FAB, ListItem, Icon } from "@rneui/themed";

const Routine = ({ navigation }) => {
  const [routine, setRoutine] = useState([]);
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(userFirebase);
      // ...
    } else {
      setUser(null);
    }
  });
  useFocusEffect(
    React.useCallback(() => {
      getDocumentFromFirestore("users", user?.uid)
        .then((res) => {
          setRoutine(res.routine);
        })
        .catch((e) => console.log(`Error de promise de Routine.js`, e));
    }, [user])
  );

  return (
    <ScrollView>
      {routine &&
        routine.map((exercise) => {
          return (
            <ListItem key={exercise.id}>
              <Icon
                name="weight-lifter"
                type="material-community"
                color="grey"
                onPress={() => navigation.navigate("Ejercicio", { exercise })}
              />
              <ListItem.Content>
                <ListItem.Title
                  onPress={() => navigation.navigate("Ejercicio", { exercise })}
                >
                  {exercise.name}
                </ListItem.Title>
              </ListItem.Content>
              <Icon
                name="trash-can-outline"
                type="material-community"
                color="grey"
              />
            </ListItem>
          );
        })}
      <FAB
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="#FF5959"
        onPress={() => navigation.navigate("Agregar Ejercicio")}
      />
    </ScrollView>
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

export default Routine;
