import { useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../api/firestoreConfig";
import { removeTrainingFromTrainings } from "../api/firestoreController";
import { startCase } from "lodash";
import { ListItem, Icon } from "@rneui/themed";
import { AuthContext } from "../context/AuthContext";

const Trainings = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          const response = doc.data();
          const historySorted = response.trainings?.sort((a, b) => {
            return a.rawDate > b.rawDate ? -1 : 1;
          });
          setShowSpinner(false);
          historySorted && setHistory(historySorted);
        });
      } else {
        navigation.navigate("Login");
      }
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
          width: "100%",
          alignItems: "center",
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
        {history?.map((item, i) => {
          return (
            <View
              key={item.rawDate}
              style={{
                rowGap: 5,
                justifyContent: "flex-start",
                marginHorizontal: "auto",
                width: "100%",
                alignItems: "center",
              }}
            >
              {item.todayDate != history[i - 1]?.todayDate && (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  {item.todayDate}
                </Text>
              )}
              {item.exerciseName != history[i - 1]?.exerciseName && (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    marginVertical: 7,
                  }}
                >
                  {startCase(item.exerciseName)}
                </Text>
              )}

              <ListItem style={{ alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "80%",
                  }}
                >
                  <Icon
                    name="weight-lifter"
                    type="material-community"
                    color="grey"
                  />
                  <View style={{ flexDirection: "row", columnGap: 10 }}>
                    <Text>{item.weight} KG.</Text>
                    <Text>{item.reps} reps.</Text>
                  </View>
                  <Icon
                    name="trash-can-outline"
                    type="material-community"
                    color="grey"
                    onPress={() => removeTrainingFromTrainings(user.uid, item)}
                  />
                </View>
              </ListItem>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Trainings;
