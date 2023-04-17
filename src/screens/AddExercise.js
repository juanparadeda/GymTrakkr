import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  getCollectionFromFirebase,
  addExerciseToRoutine,
} from "../api/firestoreController";
import { getAuth } from "firebase/auth";
import { SearchBar, ListItem, Icon } from "@rneui/themed";
import makeStringStd from "../functions/makeStringStd";
import { startCase } from "lodash";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BaseToast } from "react-native-toast-message";

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
  const [showSpinner, setShowSpinner] = useState(false);

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
    setShowSpinner(true);
    getCollectionFromFirebase("exercises").then((data) => {
      setShowSpinner(false);
      setExercises(data);
    });
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
            {showSpinner && (
              <ActivityIndicator
                size={100}
                color="grey"
                style={{ marginTop: 100 }}
              />
            )}
            {!showSpinner &&
              searchResults.map((exercise) => {
                return (
                  <ListItem key={exercise.id}>
                    <Icon
                      name="weight-lifter"
                      type="material-community"
                      color="grey"
                    />
                    <ListItem.Content>
                      <ListItem.Title>
                        {startCase(exercise.name)}
                      </ListItem.Title>
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
