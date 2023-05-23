import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../api/firestoreConfig";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const VerifyEmail = ({ navigation }) => {
  // const [user, setUser] = useState(null);
  const { user } = useContext(AuthContext);
  const [showSpinner, setShowSpinner] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        sendEmailVerification(user).catch((error) =>
          console.log(`DESDE EL VERIFY EMAIL UFE: `, error)
        );
      } else {
        navigation.navigate("Login");
      }
      //const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      //  if (userFirebase) {
      //    setUser(userFirebase);
      //    sendEmailVerification(userFirebase).catch((error) =>
      //      console.log(`DESDE EL VERIFY EMAIL UFE: `, error)
      //    );
      //  } else {
      //    setUser(null);
      //    navigation.navigate("Login");
      //  }
      //});
      //return unsubscribe;
    }, [])
  );

  const handleSendEmail = () => {
    setShowSpinner(true);
    user &&
      sendEmailVerification(user)
        .then(() => setShowSpinner(false))
        .catch((error) => {
          console.log(error);
          setShowSpinner(false);
        });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20,
      }}
    >
      {showSpinner && <ActivityIndicator size={100} color="grey" />}
      {!showSpinner && (
        <View style={{ width: "80%", height: 100 }}>
          <Text style={{ fontSize: 20 }}>
            Te enviamos un link para que verifiques tu email. Revisá tu bandeja
            de entrada, y también la carpeta de SPAM
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{ backgroundColor: "#333", borderRadius: 5, width: "55%" }}
        onPress={handleSendEmail}
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
        onPress={() => {
          signOut(auth);
          navigation.navigate("Login");
        }}
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
