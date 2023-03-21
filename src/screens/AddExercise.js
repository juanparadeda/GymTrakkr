import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import {
  getCollectionFromFirebase,
  addExerciseToRoutine,
} from "../api/firestoreController";
import { getAuth } from "firebase/auth";
import { SearchBar, ListItem, Button, Icon, Input } from "@rneui/themed";
import makeStringStd from "../functions/makeStringStd";

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
  console.log(`esto es desde AddExercise.jsm handleAddExercise`, auth);
  const user = auth.currentUser.uid;
  addExerciseToRoutine(exercise, user);
};

const AddExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    getCollectionFromFirebase("exercises").then((data) => setExercises(data));
  }, []);
  useEffect(() => {
    let res = searchArray(exercises, searchString);
    setSearchResults(res);
  }, [searchString, exercises]);
  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Ej: sentadilla"
        onChangeText={(text) => setSearchString(text)}
        value={searchString}
      />
      <ScrollView>
        <ListItem>
          <ListItem.Content>
            {searchResults.map((exercise) => {
              return (
                <View
                  key={exercise.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItem.Title>{exercise.name}</ListItem.Title>
                  <Icon
                    onPress={() => handleAddExercise(exercise)}
                    color="red"
                    name="add-circle-outline"
                    type="material"
                    size={40}
                  />
                </View>
              );
            })}
          </ListItem.Content>
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExercise;
