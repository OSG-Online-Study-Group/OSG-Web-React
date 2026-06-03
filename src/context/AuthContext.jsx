import { useEffect, useMemo, useState } from "react";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { E2E_FIREBASE_USER, E2E_USER, isE2EMockMode } from "../test/e2eMocks";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(isE2EMockMode ? E2E_USER : null);
  const [firebaseUser, setFirebaseUser] = useState(isE2EMockMode ? E2E_FIREBASE_USER : null);
  const [carregando, setCarregando] = useState(!isE2EMockMode);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (isE2EMockMode) return undefined;

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
    if (isE2EMockMode) {
      setFirebaseUser(null);
      setUsuario(null);
      return;
    }

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
