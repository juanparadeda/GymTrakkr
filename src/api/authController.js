import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "./firestoreConfig";
import { db } from "./firestoreConfig";

const login = (email, pwd, setUser, setLoginRegisterError, navigation) => {
  signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      if (userCredential.user.emailVerified) {
        setUser(userCredential.user);
      } else {
        sendEmailVerification(userCredential.user).then(() =>
          navigation.navigate("Email Verification", userCredential.user)
        );
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoginRegisterError(`Usuario o Contraseña no válidos`);
    });
};

const register = async (emailInput, pwd, navigation) => {
  await createUserWithEmailAndPassword(auth, emailInput, pwd)
    .then(async (res) => {
      const {
        user: { uid, email },
      } = res;
      await setDoc(doc(db, "users", uid), {
        email: email,
        routine: [],
      });
      navigation.navigate("Email Verification");
    })

    .catch((error) => {
      console.log(error);
    });
};

export { login, register };
