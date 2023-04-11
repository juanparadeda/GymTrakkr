import React from "react";
import { Text, Icon, Card } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Divider } from "@rneui/themed";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firestoreConfig";
import { addSetToTraining } from "../api/firestoreController";
import { useFocusEffect } from "@react-navigation/native";
import { getDocumentFromFirestore } from "../api/firestoreController";
import { ScrollView } from "react-native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../api/firestoreConfig";

const Exercise = ({ route }) => {
  const { name, id } = route.params.exercise;
  // console.log(JSON.stringify(route.params, null, 2));
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentSets, setCurrentSets] = useState([]);

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
          const exerciseHistory = response.trainings?.filter((training) => {
            return training.exerciseId === id;
          });
          const sortedExerciseHistory = exerciseHistory?.sort((a, b) => {
            return a.rawDate > b.rawDate ? -1 : 1;
          });
          setHistory(sortedExerciseHistory);
        });
      return unsubscribe;
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
    setCurrentSets([...currentSets, set]);

    //console.log(sets);
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ rowGap: 20, flex: 1, alignItems: "center" }}>
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
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>HISTORIAL</Text>
        {/*console.log(JSON.stringify(history, null, 2))*/}
        {history?.map(
          (item, i) =>
            i <= 51 && (
              <View
                key={item.rawDate}
                style={{ rowGap: 20, alignItems: "center" }}
              >
                {item.todayDate != history[i - 1]?.todayDate && (
                  <>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      {item.todayDate}
                    </Text>
                  </>
                )}

                <Text>
                  {item.weight} KG, {item.reps} reps
                </Text>
              </View>
            )
        )}
      </SafeAreaView>
    </ScrollView>
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
