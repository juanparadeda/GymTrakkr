import { createContext, useState } from "react";
import { auth } from "../api/firestoreConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    user ? setUser(user) : setUser(null);
    //if (user) {
    //  setUser(user);
    //} else {
    //  setUser(null);
    //}
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
