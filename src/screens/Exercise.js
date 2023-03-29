import React from "react";
import { Text, Icon } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button } from "@rneui/themed";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firestoreConfig";
import { addSetToTraining } from "../api/firestoreController";
import { useFocusEffect } from "@react-navigation/native";
import { getDocumentFromFirestore } from "../api/firestoreController";

const Exercise = ({ route }) => {
  const { name, id } = route.params.exercise;
  // console.log(JSON.stringify(route.params, null, 2));
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

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
          const exerciseHistory = res.trainings.filter((training) => {
            return training.exerciseId === id;
          });
          const sortedExerciseHistory = exerciseHistory.sort((a, b) => {
            return a.rawDate > b.rawDate ? -1 : 1;
          });
          setHistory(sortedExerciseHistory);
        })
        .catch((e) => console.log(`Error de promise de Routine.js`, e));
    }, [user])
  );

  const handleBigPlusWeight = () => {
    const newWeight = weight + 5;
    setWeight(newWeight);
  };

  const handleBigMinusWeight = () => {
    let newWeight;
    weight >= 5 ? (newWeight = weight - 5) : (newWeight = 0);
    setWeight(newWeight);
  };

  const handlePlusReps = () => {
    const newReps = reps + 1;
    setReps(newReps);
  };

  const handleMinusReps = () => {
    let newReps;
    reps >= 1 ? (newReps = reps - 1) : (newReps = 0);
    setReps(newReps);
  };

  const handleSaveSet = () => {
    const date = Date.now();
    const set = {
      exerciseName: name,
      exerciseId: id,
      weight: weight,
      reps: reps,
      rawDate: date,
      uid: user.uid,
    };
    //console.log(date.toLocaleDateString("es-AR", { dateStyle: "full" }));
    addSetToTraining(set);
    //setSets([...sets, set]);

    //console.log(sets);
  };

  return (
    <SafeAreaView style={{ rowGap: 20, flex: 1, alignItems: "center" }}>
      <Text>{name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          type="material-community"
          name="minus-circle"
          size={60}
          onPress={handleBigMinusWeight}
        />
        <View style={styles.weightAndrepsDisplay}>
          <Text style={styles.weight}>{weight}</Text>
          <Text>KG</Text>
        </View>
        <Icon
          type="material-community"
          name="plus-circle"
          size={60}
          onPress={handleBigPlusWeight}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          type="material-community"
          name="minus-circle"
          size={60}
          onPress={handleMinusReps}
        />
        <View style={styles.weightAndrepsDisplay}>
          <Text style={styles.weight}>{reps}</Text>
          <Text>Reps</Text>
        </View>
        <Icon
          type="material-community"
          name="plus-circle"
          size={60}
          onPress={handlePlusReps}
        />
      </View>
      <View style={{ width: "60%" }}>
        <Button
          title="GUARDAR SERIE"
          disabled={reps === 0}
          onPress={handleSaveSet}
          color="black"
          buttonStyle={{ borderRadius: 60 }}
        />
      </View>
      <Text>HISTORIAL DE SERIES</Text>
      {history.map((item) => {
        return (
          <Text key={item.rawDate}>
            {item.weight} KG, {item.reps} reps, {item.todayDate}
          </Text>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  weightAndrepsDisplay: {
    borderColor: "black",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  weight: {
    fontSize: 80,
  },
});

export default Exercise;
