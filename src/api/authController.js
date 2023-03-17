import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { auth } from "./firestoreConfig";
import { db } from "./firestoreConfig";

//const auth = getAuth();

const login = (email, pwd, setUser) => {
  signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      setUser(userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const register = async (emailInput, pwd) => {
  const register = await createUserWithEmailAndPassword(auth, emailInput, pwd);
  const {
    user: { uid, email },
  } = register;
  await setDoc(doc(db, "users", uid), {
    email: email,
    routine: [],
  });
};

export { login, register };
