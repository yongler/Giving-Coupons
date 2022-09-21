import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseApp";

export const AuthContext = createContext({ user: null });

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // const login = (email, password) => {
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  // const logout = async () => {
  //   setUser(null);
  //   await signOut(auth);
  // };

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <h4 style={{ margin: 3 }}>Loading... Please wait...</h4>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  useContext(AuthContext);
};

export default AuthContextProvider;
