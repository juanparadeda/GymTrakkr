import { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { getCollectionFromFirebase } from "../api/firestoreController";
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
  }, [searchString]);

  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Ej: sentadilla"
        onChangeText={(text) => setSearchString(text)}
        value={searchString}
      />
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
    </SafeAreaView>
  );
};

export default AddExercise;
