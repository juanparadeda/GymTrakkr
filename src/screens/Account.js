import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../api/firestoreConfig";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Dialog } from "@rneui/themed";
import { AuthContext } from "../context/AuthContext";

const Account = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [logOutDialogVisible, setlogOutDialogVisible] = useState(false);
  const handleSignOut = () => {
    signOut(auth);
  };
  useFocusEffect(
    React.useCallback(() => {
      !user && navigation.replace("Login");
    }, [user])
  );
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>Tu email: {user?.email}</Text>
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
        <TouchableOpacity
          style={styles.buttonLight}
          onPress={() =>
            Linking.openURL(
              "mailto:juanparadeda@gmail.com?subject=Problemas con GymApp&body=Describí tu problema"
            )
          }
        >
          <Text style={styles.text}>Contactar a Soporte</Text>
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
          <Dialog.Button
            title="Cerrar Sesión"
            titleStyle={{ color: "#888" }}
            onPress={handleSignOut}
          />
          <Dialog.Button
            titleStyle={{ color: "black" }}
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
    width: "80%",
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
