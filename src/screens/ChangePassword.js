import React from "react";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../api/firestoreConfig";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, Dialog } from "@rneui/themed";
import { isValidPassword } from "../functions/isValidPassword";

const ChangePassword = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [currentPwd, setCurrentPwd] = useState(``);
  const [newPwd1, setNewPwd1] = useState(``);
  const [newPwd2, setNewPwd2] = useState(``);
  const [pwdChangeError, setPwdChangeError] = useState(``);
  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handlePwdUpdate = () => {
    const credential = EmailAuthProvider.credential(user.email, currentPwd);
    reauthenticateWithCredential(user, credential)
      .then(() => updatePassword(user, newPwd1))
      .then(() => setDialogVisible(true))
      .catch((e) => {
        e.code === "auth/wrong-password" &&
          setPwdChangeError(`La contraseña actual no es válida`);
      });
  };

  const handleDialogEvent = () => {
    signOut(auth);
    navigation.navigate(`Login`);
  };
  useEffect(() => {
    setPwdChangeError(``);
    setUpdateBtnDisabled(true);
    newPwd1 === newPwd2 &&
      isValidPassword(newPwd1) &&
      setUpdateBtnDisabled(false);
    let error = ``;
    newPwd1 != newPwd2 && (error = `Las contraseñas no coinciden. `);
    !isValidPassword(newPwd1) &&
      (error += `La contraseña debe contener al menos 8 caracteres, una letra minúscula, una mayúscula y un número. `);
    setPwdChangeError(error);
  }, [newPwd1, newPwd2]);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(userFirebase);
        } else {
          //setUser(null);
        }
      });
      return unsubscribe;
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <Text style={{ fontSize: 16 }}>
            Al cambiar tu contraseña, se cerrará la sesión y vas a tener que
            ingresar nuevamente con tu email y nueva contraseña
          </Text>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.input}
              placeholder="Contraseña Actual"
              onChangeText={setCurrentPwd}
              secureTextEntry={true}
              value={currentPwd}
              selectionColor="#333"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña Nueva"
              onChangeText={setNewPwd1}
              secureTextEntry={true}
              value={newPwd1}
              selectionColor="#333"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña Nueva"
              onChangeText={setNewPwd2}
              secureTextEntry={true}
              value={newPwd2}
              selectionColor="#333"
            />
            <Text>{pwdChangeError}</Text>
            <Button
              color="black"
              buttonStyle={{ borderRadius: 10, height: 60 }}
              onPress={handlePwdUpdate}
              disabled={updateBtnDisabled}
              title="Actualizar Contraseña"
            />
          </KeyboardAvoidingView>
        </View>
      </View>
      <Dialog isVisible={dialogVisible} onBackdropPress={handleDialogEvent}>
        <Dialog.Title title="Contraseña Actualizada con Éxito" />
        <Text>
          Actualizaste tu contraseña con éxito. Ahora tenés que volver a
          ingresar con tu email y nueva contraseña
        </Text>
        <Dialog.Actions>
          <Dialog.Button title="OK" onPress={handleDialogEvent} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  buttonDark: {
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
  },
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
  },
});

export default ChangePassword;
