import {
  getDocs,
  query,
  collection,
  where,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
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

export { getCollectionFromFirebase, addExerciseToRoutine };
