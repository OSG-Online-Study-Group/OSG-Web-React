import { useEffect, useMemo, useState } from "react";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let unsubscribeSnapshot;
    let active = true;

    setPersistence(auth, browserLocalPersistence).catch(() => {
      if (active) setErro("Não foi possível persistir sua sessão.");
    });

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeSnapshot?.();
      setFirebaseUser(user);
      setErro("");

      if (!user) {
        setUsuario(null);
        setCarregando(false);
        return;
      }

      setCarregando(true);
      unsubscribeSnapshot = onSnapshot(
        doc(db, "users", user.uid),
        (snapshot) => {
          setUsuario(snapshot.exists() ? { uid: user.uid, ...snapshot.data() } : null);
          setCarregando(false);
        },
        () => {
          setErro("Não foi possível carregar seu perfil.");
          setCarregando(false);
        },
      );
    });

    return () => {
      active = false;
      unsubscribeAuth();
      unsubscribeSnapshot?.();
    };
  }, []);

  async function logout() {
    await signOut(auth);
  }

  function refreshUsuario(novosDados) {
    setUsuario((previous) => (previous ? { ...previous, ...novosDados } : previous));
  }

  const value = useMemo(
    () => ({ usuario, firebaseUser, carregando, erro, logout, refreshUsuario }),
    [usuario, firebaseUser, carregando, erro],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
