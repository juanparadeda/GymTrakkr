import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../api/firestoreConfig";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dialog } from "@rneui/themed";
import { TextInput } from "react-native";

const Account = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [logOutDialogVisible, setlogOutDialogVisible] = useState(false);
  const handleSignOut = () => {
    signOut(auth);
    navigation.navigate("Login");
  };

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
      return unsubscribe;
    }, [user])
  );
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Tu email: {user?.email}</Text>
        <TouchableOpacity
          style={styles.buttonLight}
          onPress={() => setlogOutDialogVisible(true)}
        >
          <Text style={styles.text}>Cerrar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonLight}
          onPress={() => navigation.navigate("Change Password")}
        >
          <Text style={styles.text}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
      <Dialog
        isVisible={logOutDialogVisible}
        onBackdropPress={() => setlogOutDialogVisible(!logOutDialogVisible)}
      >
        <Dialog.Title title="Cerrar Sesión" />
        <Text>
          No vas a perder tu rutina, ni tus entrenamientos, pero vas a tener que
          volver a ingresar con tu email y contraseña
        </Text>
        <Dialog.Actions>
          <Dialog.Button title="Cerrar Sesión" onPress={handleSignOut} />
          <Dialog.Button
            title="Seguir Entrenando"
            onPress={() => setlogOutDialogVisible(!logOutDialogVisible)}
          />
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  buttonLight: {
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputBox: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    backgroundColor: "#EEE",
    borderRadius: 10,
    borderColor: "#BBB",
    borderWidth: 1,
    marginVertical: 5,
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default Account;
