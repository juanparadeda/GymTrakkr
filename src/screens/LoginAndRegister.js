import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { login, register } from "../api/authController";

const LoginAndRegister = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const handleLogin = () => {
    login(email, pwd);
  };
  const handleRegister = () => {
    register(email, pwd);
  };

  return (
    <View style={styles.container}>
      <Text>This is the GymApp</Text>
      <TextInput placeholder="E-mail" onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" onChangeText={setPwd} />
      <Button onPress={handleLogin} title="Ingresá" />
      <Button onPress={handleRegister} title="Registrate" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default LoginAndRegister;
