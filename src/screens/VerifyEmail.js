import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firestoreConfig";

const VerifyEmail = ({ navigation }) => {
  //console.log(JSON.stringify(route.params, null, 2));
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(userFirebase);
      // ...
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    sendEmailVerification(user)
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch((error) => console.log(error));
  }, [user]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20,
      }}
    >
      <Text style={{ fontSize: 20, width: "80%" }}>
        Te enviamos un link para que verifiques tu email. Revisá tu bandeja de
        entrada, y también la carpeta de SPAM
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: "#333", borderRadius: 5, width: "55%" }}
        onPress={() => user && sendEmailVerification(user)}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          Enviar nuevamente
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#333", borderRadius: 5, width: "55%" }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          Volver al Inicio
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyEmail;
