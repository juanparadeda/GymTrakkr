import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
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

export default login;
