import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import TestComponent from "./src/components/TestComponent";
import { Button } from "react-native";
import login from "./src/api/authController";

export default function App() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const handleSubmit = () => {
    login(email, pwd);
  };

  return (
    <View style={styles.container}>
      <Text>This is the GymApp</Text>
      <TestComponent />
      <TextInput placeholder="E-mail" onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" onChangeText={setPwd} />
      <StatusBar style="auto" />
      <Button onPress={handleSubmit} title="Submitir" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
