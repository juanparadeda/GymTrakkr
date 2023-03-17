import { getDocs, query, collection, where } from "firebase/firestore";
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

export { getCollectionFromFirebase };
