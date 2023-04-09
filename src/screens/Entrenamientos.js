import { useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firestoreConfig";
import { getDocumentFromFirestore } from "../api/firestoreController";

const Entrenamientos = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(userFirebase);
          getDocumentFromFirestore("users", userFirebase.uid)
            .then((res) => {
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          width: "80%",
          marginHorizontal: "auto",
        }}
      >
        <Text>Entrenamientos</Text>
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
                  {item.exerciseName}
                </Text>
              )}

              <Text style={{ fontSize: 16 }}>
                {item.weight} KG, {item.reps} reps
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Entrenamientos;
