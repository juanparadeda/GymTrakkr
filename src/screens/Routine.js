import React from "react";
import { Button } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { auth, db } from "../api/firestoreConfig";
import {
  getDocumentFromFirestore,
  removeExerciseFromRoutine,
} from "../api/firestoreController";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, FAB, ListItem, Icon, Divider } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { onSnapshot, doc } from "firebase/firestore";
import { startCase } from "lodash";

const Routine = ({ navigation }) => {
  const [routine, setRoutine] = useState([]);
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(userFirebase);
          // ...
        } else {
          setUser(null);
        }
      });
      user &&
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          const response = doc.data();
          const routineRT = response.routine;
          setRoutine(routineRT);
        });
      //getDocumentFromFirestore("users", user?.uid)
      //  .then((res) => {
      //    setRoutine(res.routine);
      //  })
      //  .catch((e) => console.log(`Error de promise de Routine.js`, e));
      return unsubscribe;
    }, [user])
  );
  const handleDelete = (exercise) => {
    removeExerciseFromRoutine(user.uid, exercise);
  };
  return (
    <>
      <ScrollView>
        <View style={{ paddingBottom: 100, flex: 1 }}>
          {routine.length > 0 &&
            routine.map((exercise) => {
              return (
                <ListItem key={exercise.id}>
                  <Icon
                    name="weight-lifter"
                    type="material-community"
                    color="grey"
                    onPress={() =>
                      navigation.navigate("Ejercicio", { exercise })
                    }
                  />
                  <ListItem.Content>
                    <ListItem.Title
                      onPress={() =>
                        navigation.navigate("Ejercicio", { exercise })
                      }
                    >
                      {startCase(exercise.name)}
                    </ListItem.Title>
                  </ListItem.Content>
                  <Icon
                    name="trash-can-outline"
                    type="material-community"
                    color="grey"
                    onPress={() => handleDelete(exercise)}
                  />
                </ListItem>
              );
            })}
          {routine.length === 0 && (
            <Text
              style={{
                alignSelf: "center",
                marginTop: 40,
                fontSize: 30,
                width: "80%",
                textAlign: "center",
              }}
            >
              Tu rutina está vacía. Agregá ejercicios presionando el botón "+"
              de abajo
            </Text>
          )}
        </View>
      </ScrollView>
      <FAB
        style={{ position: "absolute", bottom: 10, alignSelf: "center" }}
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="black"
        onPress={() => navigation.navigate("Agregar Ejercicio")}
      />
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

export default Routine;
