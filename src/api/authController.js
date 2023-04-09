import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "./firestoreConfig";
import { db } from "./firestoreConfig";

const login = (email, pwd, setUser, setLoginRegisterError, navigation) => {
  signInWithEmailAndPassword(auth, email, pwd)
    //.then((userCredential) => {
    //  if (userCredential.user.emailVerified) {
    //    setUser(userCredential.user);
    //  } else {
    //    userCredential.user && navigation.navigate("Email Verification");
    //  }
    //})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoginRegisterError(`Usuario o Contraseña no válidos`);
    });
};

const register = async (emailInput, pwd, navigation, setLoginRegisterError) => {
  await createUserWithEmailAndPassword(auth, emailInput, pwd)
    .then(async (res) => {
      const {
        user: { uid, email },
      } = res;
      await setDoc(doc(db, "users", uid), {
        email: email,
        routine: [],
      });
      signOut(auth)
        .then(() => {
          navigation.navigate("Email Verification");
        })
        .catch((e) => {
          console.log(`Sign Out error: `, e);
        });
    })

    .catch((error) => {
      console.log(JSON.stringify(error, null, 2));
      error.code === `auth/email-already-in-use` &&
        setLoginRegisterError(
          `Ya existe una cuenta con este email. Iniciá sesión o bien recuperá tu contraseña.`
        );
    });
};

const resetPassword = (email, setEmailError) => {
  sendPasswordResetEmail(auth, email)
    .then((res) => {
      setEmailError(
        `Se envió un email con instrucciones para resetear la contraseña. Revisá tu bandeja de entrada, y tu carpeta de SPAM.`
      );
    })
    .catch((error) => {
      setEmailError(
        `No existe una cuenta con el email ${email}, verificá el email o bien volvé al Login para registrarte`
      );
    });
};

export { login, register, resetPassword };
