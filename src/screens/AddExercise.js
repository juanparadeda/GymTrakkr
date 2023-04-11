import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import {
  getCollectionFromFirebase,
  addExerciseToRoutine,
} from "../api/firestoreController";
import { getAuth } from "firebase/auth";
import { SearchBar, ListItem, Button, Icon, Input } from "@rneui/themed";
import makeStringStd from "../functions/makeStringStd";
import { startCase } from "lodash";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BaseToast } from "react-native-toast-message";

//const searchArray = (array, string = "") => {
//  let searchResults = [];
//  array.map((item) => {
//    makeStringStd(item.name).match(makeStringStd(string)) &&
//      searchResults.push(item);
//  });
//  return searchResults;
//};
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
const AddExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchArray = (array, string = "") => {
    let searchResults = [];
    array.map((item) => {
      makeStringStd(item.name).match(makeStringStd(string)) &&
        searchResults.push(item);
    });
    return searchResults;
  };
  const handleAddExercise = (exercise) => {
    const auth = getAuth();
    const user = auth.currentUser.uid;
    addExerciseToRoutine(exercise, user);
    Toast.show({
      type: "success",
      text1: `${startCase(exercise.name)}`,
      text2: "Agregaste este ejercicio a tu rutina",
    });
  };
  useEffect(() => {
    getCollectionFromFirebase("exercises").then((data) => setExercises(data));
  }, []);
  useEffect(() => {
    let res = searchArray(exercises, searchString);
    setSearchResults(res);
  }, [searchString, exercises]);
  return (
    <>
      <SafeAreaView>
        <SearchBar
          placeholder="Ej: sentadilla"
          onChangeText={(text) => setSearchString(text)}
          value={searchString}
        />
        <ScrollView>
          <View style={{ paddingBottom: 100, flex: 1 }}>
            {searchResults.map((exercise) => {
              return (
                <ListItem key={exercise.id}>
                  <Icon
                    name="weight-lifter"
                    type="material-community"
                    color="grey"
                  />
                  <ListItem.Content>
                    <ListItem.Title>{startCase(exercise.name)}</ListItem.Title>
                  </ListItem.Content>
                  <Icon
                    name="playlist-add"
                    type="material"
                    color="grey"
                    onPress={() => handleAddExercise(exercise)}
                  />
                </ListItem>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Toast config={toastConfig} position="bottom" visibilityTime={1000} />
    </>
  );
};

export default AddExercise;
