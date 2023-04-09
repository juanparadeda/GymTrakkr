import {
  getDocs,
  query,
  collection,
  updateDoc,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  arrayRemove,
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

const addExerciseToRoutine = async (exercise, uid) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, { routine: arrayUnion(exercise) });
};

const addSetToTraining = async (set) => {
  //const set = {
  //  rawDate: date,
  //  todayDate: date.toLocaleDateString("es-AR", { dateStyle: "full" }),
  //  exerciseName: exercise,
  //  exerciseId: id,
  //  weight: weight,
  //  reps: reps,
  //};
  const humanDate = new Date(set.rawDate);
  const todayDate = humanDate.toLocaleDateString("es-AR", {
    dateStyle: "full",
  });
  // console.log(JSON.stringify(set, null, 2));
  const docRef = doc(db, "users", set.uid);
  await updateDoc(docRef, { trainings: arrayUnion({ ...set, todayDate }) });
};

const removeExerciseFromRoutine = async (uid, exercise) => {
  const docRef = doc(db, "users", uid);
  try {
    await updateDoc(docRef, { routine: arrayRemove(exercise) });
  } catch (error) {
    console.log(error);
  }
};

export {
  removeExerciseFromRoutine,
  getCollectionFromFirebase,
  addExerciseToRoutine,
  getCurrentUserFromFirestore,
  getDocumentFromFirestore,
  addSetToTraining,
};
