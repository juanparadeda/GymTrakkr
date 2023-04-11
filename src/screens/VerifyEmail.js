import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../api/firestoreConfig";

const VerifyEmail = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(userFirebase);
          sendEmailVerification(userFirebase).catch((error) =>
            console.log(`DESDE EL VERIFY EMAIL UFE: `, error)
          );
        } else {
          //setUser(null);
        }
      });
      return unsubscribe;
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
