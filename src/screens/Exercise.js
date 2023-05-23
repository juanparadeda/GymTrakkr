import React, { useContext, useState } from "react";
import { Text, Icon } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { db } from "../api/firestoreConfig";
import { addSetToTraining } from "../api/firestoreController";
import { useFocusEffect } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BaseToast } from "react-native-toast-message";
import { startCase } from "lodash";
import { AuthContext } from "../context/AuthContext";

const toastConfig = {
  success: (props) => {
    return (
      <BaseToast
        {...props}
        style={{ borderLeftColor: `grey`, height: 80 }}
        contentContainerStyle={{ padding: 15 }}
        text1Style={{
          fontSize: 20,
        }}
        text2Style={{ fontSize: 16 }}
      />
    );
  },
};

const Exercise = ({ route }, { navigation }) => {
  const { user } = useContext(AuthContext);
  const { name, id } = route.params.exercise;
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [history, setHistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      !user && navigation.navigate("Login");
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
  const handleSmallPlusWeight = () => {
    const newWeight = weight + 1;
    setWeight(newWeight);
  };

  const handleSmallMinusWeight = () => {
    let newWeight;
    weight >= 1 ? (newWeight = weight - 1) : (newWeight = 0);
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
    addSetToTraining(set);
    Toast.show({
      type: "success",
      text1: `${startCase(name)}`,
      text2: "¡Agregaste la serie a tu historial!",
    });
  };

  return (
    <>
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
              size={40}
              onPress={handleSmallMinusWeight}
            />
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
            <Icon
              type="material-community"
              name="plus-circle"
              size={40}
              onPress={handleSmallPlusWeight}
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
              buttonStyle={{ borderRadius: 10 }}
            />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>HISTORIAL</Text>
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
      <Toast config={toastConfig} position="bottom" visibilityTime={1000} />
    </>
  );
};

const styles = StyleSheet.create({
  weightAndrepsDisplay: {
    borderColor: "black",
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  weight: {
    fontSize: 60,
  },
});

export default Exercise;
