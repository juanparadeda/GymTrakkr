import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firestoreConfig";

//const auth = getAuth();

const login = (email, pwd) => {
  signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      console.log(JSON.stringify(userCredential.user, null, 2));
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const register = (email, pwd) => {
  createUserWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      console.log(JSON.stringify(userCredential.user, null, 2));
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export { login, register };
