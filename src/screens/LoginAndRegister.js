import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { login, register } from "../api/authController";
import { Icon } from "@rneui/themed";
import { isValidEmail } from "../functions/isValidEmail";
import { isValidPassword } from "../functions/isValidPassword";
import { auth } from "../api/firestoreConfig";

const LoginAndRegister = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loginRegisterError, setLoginRegisterError] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
      setPwd("");
      setShowSpinner(false);
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          setUser(userFirebase);
          userFirebase.emailVerified && navigation.navigate("Main Navigation");
          !userFirebase.emailVerified &&
            navigation.navigate("Email Verification");
        }
      });
      return unsubscribe;
    }, [user])
  );
  const handleLogin = () => {
    setLoginRegisterError(null);
    login(email, pwd, setLoginRegisterError, setShowSpinner);
  };
  const handleRegister = () => {
    setShowSpinner(true);
    setLoginRegisterError(null);
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(pwd);
    if (validEmail && validPassword) {
      register(email, pwd, navigation, setLoginRegisterError, setShowSpinner);
    } else {
      let error = "";
      !validEmail && (error = `El email no tiene un formato válido. `);
      !validPassword &&
        (error =
          error +
          `La contraseña debe contener al menos 8 caracteres, una letra minúscula, una mayúscula y un número.`);
      setShowSpinner(false);
      setLoginRegisterError(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputBox}>
          <Icon
            name="weight-lifter"
            color="#333"
            size={200}
            type="material-community"
          />
          {showSpinner && (
            <ActivityIndicator
              animating={showSpinner}
              size={120}
              color="grey"
            />
          )}
          <KeyboardAvoidingView behavior="padding">
            {!showSpinner && (
              <View style={{ height: 120 }}>
                <TextInput
                  inputMode="email"
                  keyboardType="email-address"
                  style={styles.input}
                  placeholder="E-mail"
                  onChangeText={setEmail}
                  value={email}
                  selectionColor="#333"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  onChangeText={setPwd}
                  secureTextEntry={true}
                  value={pwd}
                  selectionColor="#333"
                />
              </View>
            )}
            <Text>{loginRegisterError}</Text>
            <TouchableOpacity style={styles.buttonDark} onPress={handleLogin}>
              <Text style={styles.text}>Ingresá</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLight}
              onPress={handleRegister}
            >
              <Text style={styles.text}>Registrate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Password Recovery")}
            >
              <Text>¿Te olvidaste la contraseña?</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "mailto:juanparadeda@gmail.com?subject=Problemas con GymApp&body=Describí tu problema"
          )
        }
      >
        <Text style={{ textAlign: "center" }}>Esta es una versión Beta</Text>

        <Text style={{ textAlign: "center" }}>Feedback por acá</Text>
      </TouchableOpacity>
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

export default LoginAndRegister;
