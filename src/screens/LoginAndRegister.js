import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { login, register } from "../api/authController";
import { Icon } from "@rneui/themed";
import { useEffect } from "react";
import { isValidEmail } from "../functions/isValidEmail";

const LoginAndRegister = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [user, setUser] = useState(null);
  const [loginRegisterError, setLoginRegisterError] = useState(null);
  //const [registerError, setRegisterError] = useState(null);

  const handleLogin = () => {
    setLoginRegisterError(null);
    login(email, pwd, setUser, setLoginRegisterError, navigation);
    // user && navigation.navigate("Main Navigation");
  };
  const handleRegister = () => {
    setLoginRegisterError(null);
    const validEmail = isValidEmail(email);
    !validEmail && setLoginRegisterError(`El email no tiene un formato válido`);
    register(email, pwd, navigation);
  };

  useEffect(() => {
    user && navigation.navigate("Main Navigation");
  }, [user]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <Icon
          name="weight-lifter"
          color="#333"
          size={200}
          type="material-community"
        />
        <KeyboardAvoidingView>
          <TextInput
            inputMode="email"
            keyboardType="email-address"
            style={styles.input}
            placeholder="E-mail"
            onChangeText={setEmail}
            selectionColor="#333"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={setPwd}
            secureTextEntry={true}
            selectionColor="#333"
          />
          <Text>{loginRegisterError}</Text>
          <TouchableOpacity style={styles.buttonDark} onPress={handleLogin}>
            <Text style={styles.text}>Ingresá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLight} onPress={handleRegister}>
            <Text style={styles.text}>Registrate</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
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
