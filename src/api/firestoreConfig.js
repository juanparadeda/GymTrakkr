import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDgdYVK_I4yo4jrIZRYLP6LGPlyC8KerWI",
  authDomain: "gymapp-36183.firebaseapp.com",
  projectId: "gymapp-36183",
  storageBucket: "gymapp-36183.appspot.com",
  messagingSenderId: "186998273863",
  appId: "1:186998273863:web:da4bc06a9c206815c97e62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const pers = getReactNativePersistence(AsyncStorage);
const auth = initializeAuth(app, {
  persistence: pers,
  // No popupRedirectResolver defined
});
//setPersistence(auth, pers);
export { auth, db };
