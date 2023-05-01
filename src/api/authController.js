import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getAuth,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "./firestoreConfig";

const login = (email, pwd, setLoginRegisterError, setShowSpinner) => {
  setShowSpinner(true);
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, pwd)
    .then(() => setShowSpinner(false))
    .catch((error) => {
      setShowSpinner(false);
      setLoginRegisterError(`Usuario o Contraseña no válidos`);
    });
};

const register = async (
  email,
  pwd,
  navigation,
  setLoginRegisterError,
  setShowSpinner
) => {
  await createUserWithEmailAndPassword(auth, email, pwd)
    .then(async (res) => {
      const {
        user: { uid, email },
      } = res;
      await setDoc(doc(db, "users", uid), {
        email: email,
        routine: [],
      });
      //signOut(auth)
      //  .then(() => {
      navigation.navigate("Email Verification");
      //  })
      //  .catch((e) => {
      //    console.log(`Sign Out error: `, e);
      //  });
    })

    .catch((error) => {
      error.code === `auth/email-already-in-use` &&
        setLoginRegisterError(
          `Ya existe una cuenta con este email. Iniciá sesión o bien recuperá tu contraseña.`
        );
    });
  setShowSpinner(false);
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
