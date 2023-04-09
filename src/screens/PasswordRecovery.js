import { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { isValidEmail } from "../functions/isValidEmail";
import { resetPassword } from "../api/authController";

const PasswordRecovery = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const handleSendEmail = () => {
    setEmailError(null);
    isValidEmail(email)
      ? resetPassword(email, setEmailError)
      : setEmailError("El formato del email no es válido");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <KeyboardAvoidingView>
          <TextInput
            inputMode="email"
            keyboardType="email-address"
            placeholder="E-mail"
            onChangeText={setEmail}
            selectionColor="#333"
            style={styles.input}
          />
        </KeyboardAvoidingView>
        <Text>{emailError}</Text>
        <TouchableOpacity style={styles.buttonDark} onPress={handleSendEmail}>
          <Text style={styles.text}>
            Enviar Email para recuperar contraseña
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDark}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.text}>Volver a Login</Text>
        </TouchableOpacity>
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
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },
});
export default PasswordRecovery;
