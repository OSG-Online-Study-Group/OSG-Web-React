import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);

        const userRef = doc(db, "users", user.uid);

        unsubscribeSnapshot = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setUsuario((prev) => ({
              ...prev,          // 🔥 mantém update local
              ...snap.data(),   // 🔥 sobrescreve com firestore
              uid: user.uid,
            }));
          } else {
            setUsuario(null);
          }
          setCarregando(false);
        });

      } else {
        setFirebaseUser(null);
        setUsuario(null);
        setCarregando(false);

        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  async function logout() {
    await signOut(auth);
    setUsuario(null);
    setFirebaseUser(null);
  }

  // 🔥 IMPORTANTE: optimistic update
  function refreshUsuario(novosDados) {
    setUsuario((prev) => ({
      ...prev,
      ...novosDados,
    }));
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        firebaseUser,
        carregando,
        logout,
        refreshUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}