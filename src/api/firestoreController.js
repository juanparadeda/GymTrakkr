import {
  getDocs,
  query,
  collection,
  updateDoc,
  arrayUnion,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firestoreConfig";

const processProdIdfromSnapshot = (snapshot) => {
  const list = snapshot.docs.map((doc) => {
    let element = doc.data();
    element.id = doc.id;
    return element;
  });
  return list;
};

const getCollectionFromFirebase = async (col) => {
  const q = query(collection(db, col));
  const querySnapshot = await getDocs(q);
  const data = processProdIdfromSnapshot(querySnapshot);
  return data;
};

const addExerciseToRoutine = async (exercise, uid) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, { routine: arrayUnion(exercise) });
};

const getCurrentUserFromFirestore = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user;
};

const getDocumentFromFirestore = async (col, id) => {
  const userRef = doc(db, col, id);
  const data = await getDoc(userRef);
  const result = data.data();
  return result;
};

export {
  getCollectionFromFirebase,
  addExerciseToRoutine,
  getCurrentUserFromFirestore,
  getDocumentFromFirestore,
};
