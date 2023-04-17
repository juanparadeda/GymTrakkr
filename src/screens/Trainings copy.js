import { useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firestoreConfig";
import { getDocumentFromFirestore } from "../api/firestoreController";
import { startCase } from "lodash";

const Trainings = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
        setShowSpinner(true);
        if (userFirebase) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          setUser(userFirebase);
          getDocumentFromFirestore("users", userFirebase.uid)
            .then((res) => {
              setShowSpinner(false);
              const trainings = res.trainings.sort((a, b) => {
                return a.rawDate > b.rawDate ? -1 : 1;
              });

              setHistory(trainings);
            })
            .catch((e) => console.log(e));
          // ...
        } else {
          setUser(null);
        }
      });
      return unsubscribe;
    }, [])
  );

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "80%",
          alignSelf: "center",
          paddingBottom: 30,
        }}
      >
        {showSpinner === true && (
          <ActivityIndicator
            size={100}
            color="grey"
            style={{ marginTop: 80 }}
          />
        )}
        {history.length === 0 && (
          <Text style={{ fontSize: 30, textAlign: "center", marginTop: 80 }}>
            Todavía no tenés historial de entrenamientos registrados. Andá a Mi
            Rutina, entrá a un ejercicio y agregá las series de tu entrenamiento
          </Text>
        )}
        {history.map((item, i) => {
          return (
            <View
              key={item.rawDate}
              style={{
                rowGap: 5,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginHorizontal: "auto",
              }}
            >
              {item.todayDate != history[i - 1]?.todayDate && (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 10,
                    alignSelf: "center",
                  }}
                >
                  {item.todayDate}
                </Text>
              )}
              {item.exerciseName != history[i - 1]?.exerciseName && (
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, marginTop: 7 }}
                >
                  {startCase(item.exerciseName)}
                </Text>
              )}

              <Text style={{ fontSize: 16 }}>
                {item.weight} KG, {item.reps} reps
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Trainings;
