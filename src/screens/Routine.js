import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { auth, db } from "../api/firestoreConfig";
import { removeExerciseFromRoutine } from "../api/firestoreController";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { Text, FAB, ListItem, Icon } from "@rneui/themed";
import { onSnapshot, doc } from "firebase/firestore";
import { startCase } from "lodash";

const Routine = ({ navigation }) => {
  const [routine, setRoutine] = useState([]);
  const [user, setUser] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setShowSpinner(true);
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          setUser(userFirebase);
          onSnapshot(doc(db, "users", userFirebase.uid), (doc) => {
            const response = doc.data();
            const routineRT = response.routine;
            setShowSpinner(false);
            setRoutine(routineRT);
          });
        } else {
          setUser(null);
          navigation.navigate("Login");
        }
      });
      return unsubscribe;
    }, [user])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const handleDelete = (exercise) => {
    removeExerciseFromRoutine(user.uid, exercise);
  };
  return (
    <>
      <ScrollView>
        <View style={{ paddingBottom: 100, flex: 1 }}>
          {showSpinner && (
            <ActivityIndicator
              size={100}
              color="grey"
              style={{ marginTop: 100 }}
            />
          )}
          {!showSpinner &&
            (routine.length > 0 ? (
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
              })
            ) : (
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
            ))}
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
