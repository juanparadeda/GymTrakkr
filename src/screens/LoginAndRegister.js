import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { login, register } from "../api/authController";
import { Icon } from "@rneui/themed";

const LoginAndRegister = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [user, setUser] = useState({});

  const handleLogin = () => {
    login(email, pwd, setUser);
    user && navigation.navigate("Main Navigation");
  };
  const handleRegister = () => {
    register(email, pwd);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputBox}>
        <Icon
          name="weight-lifter"
          color="#FF0C0C"
          size={200}
          type="material-community"
        />

        <TextInput
          inputMode="email"
          keyboardType="email-address"
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={setPwd}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.buttonDark} onPress={handleLogin}>
          <Text style={styles.text}>Ingresá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLight} onPress={handleRegister}>
          <Text style={styles.text}>Registrate</Text>
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
    backgroundColor: "#111",
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
    marginVertical: 5,
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonDark: {
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#800606",
    borderColor: "#BBB",
    borderWidth: 2,
    borderRadius: 50,
  },
  buttonLight: {
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#FF5959",
    borderRadius: 50,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default LoginAndRegister;
